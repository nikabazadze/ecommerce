const db = require('../models/index');
const chalk = require('chalk');

// Handles checkout process
const checkoutCart = async (req, res) => {
    // Check if required address fields are provided 
    const requestBody = req.body;
    if (!requestBody.cart || !requestBody.firstName || !requestBody.lastName || !requestBody.country || !requestBody.address ||
        !requestBody.city || !requestBody.state || !requestBody.zipCode || !requestBody.phone) {
        return res.status(400).json({
            message: "Could not place an order! Include all required fields to place a new order.",
            requiredFields: ["cart", "firstName", "lastName", "country", "address", "city", "state", "zipCode", "phone"],
            optionalFields: ["userId", "apartment"]
        });
    }

    // Check if there is anything in the cart
    if (requestBody.cart.totalValue === 0) {
        return res.status(400).json({message: "Could not checkout cart! There are no items in the cart to checkout."});
    };



    // Place a new order

    // Fill orders table
    let newOrderId = null;
    const date = new Date().toUTCString();
    const addOrderQuery = 'INSERT INTO orders (user_id, total_value, status, created_at) VALUES ($1, $2, $3, $4) RETURNING id';
    try {
        const newOrder = await db.query(addOrderQuery, [requestBody.userId ? requestBody.userId : null, requestBody.cart.totalValue, 'processing', date]);
        newOrderId = newOrder.rows[0].id;
    } catch (err) {
        console.error('Error creating new order:', err.message);
        return res.status(500).json({ message: "Error creating new order" });
    };

    // Fill order_items table
    const addOrderItemsQuery = 'INSERT INTO order_items VALUES ($1, $2, $3, $4)';
    if (Array.isArray(requestBody.cart.cartItems)) {
        for (const cartItem of requestBody.cart.cartItems) {
            if ((typeof cartItem === 'object') && (cartItem.constructor === Object)) {
                try {
                    await db.query(addOrderItemsQuery, [newOrderId, cartItem.productId, cartItem.productQuantity, cartItem.productVariant]);
                } catch (err) {
                    console.error('Error adding order items for new order:', err.message);
                    return res.status(500).json({ message: "Error adding order items for new order" });
                }
            } else {
                return res.status(400).json({message: "`cartItems` must have `Object` values!"});
            }
        }
    } else {
        return res.status(400).json({ message: "`cart.cartItems` must be an array with `Object` values!" });
    }

    // Fill order_address table
    const addOrderAddressQuery = 'INSERT INTO order_address (order_id, first_name, last_name, country, address, apartment, city, state, zipcode, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    try {
        await db.query(addOrderAddressQuery, [newOrderId, requestBody.firstName, requestBody.lastName, requestBody.country, requestBody.address, 
                                              requestBody.apartment ? requestBody.apartment : null, requestBody.city, requestBody.state, requestBody.zipCode, requestBody.phone]);
    } catch (err) {
        console.error('Error adding order address for new order:', err.message);
        return res.status(500).json({ message: "Error adding order address for new order" });
    }


    // Reduce product quantities from the order
    let orderItems = [];
    const getOrderItemsQuery = 'SELECT * FROM order_items WHERE order_id = $1';
    try {
        orderItems = await db.query(getOrderItemsQuery, [newOrderId]);
    } catch (err) {
        console.error('Error retrieving order items:', err.message);
        return res.status(500).json({ message: "Error retrieving order items" });
    }

    for (const item of orderItems.rows) {
        const productId = item.product_id;
        const orderItemQuantity = item.product_quantity;
        const getProductQuery = 'SELECT * FROM products WHERE id = $1';
        const reduceProductQuantityQuery = 'UPDATE products SET product_quantity = $1 WHERE id = $2';
        try {
            const product = await db.query(getProductQuery, [productId]);
            const currentProductQuantity = product.rows[0].product_quantity;
            const newQuantity = currentProductQuantity - orderItemQuantity;
            await db.query(reduceProductQuantityQuery, [newQuantity, productId]);
        } catch (err) {
            console.error('Error updating product quantity:', err.message);
            return res.status(500).json({ message: "Error updating product quantity" });
        }
    }

    // Clear cart
    if (requestBody.userId) {
        const clearCart = 'UPDATE cart SET total_value = $1 where id = $2';
        const clearCartItems = 'DELETE FROM cart_items WHERE cart_id = $1';
        try {
            await db.query(clearCart, [0, requestBody.cart.cartId]);
            await db.query(clearCartItems, [requestBody.cart.cartId]);
        } catch (err) {
            console.error('Error clearing cart:', err.message);
            return res.status(500).json({ message: "Error clearing cart" });
        };
    }

    console.log(chalk.magentaBright.bold
        (`New order with order id - ${newOrderId} has been placed for the ${requestBody.userId ? `user with id - ${requestBody.userId}!` : "guest user!"}`));
    res.status(201).json({message: "Order placed successfully!"});
};

module.exports = { checkoutCart };