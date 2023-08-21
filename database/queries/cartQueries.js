const db = require('../index');
const { checkProductId } = require('../../middleware/productMiddleware');

/**
 * Retrieves a cart by cart id.
 * Middleware has already checked cart id and attached cart to the 
 * request object. That's why this method sends cart without any query
 */
const getUserCart = (req, res) => {
    res.status(200).json(req.cart);
};

// Retrieves cart items
const getCartItems = async (req, res) => {
    const queryString = 'SELECT products.product_name, cart_items.product_quantity FROM cart_items JOIN products ON cart_items.product_id = products.id WHERE cart_items.cart_id = $1';
    try {
        const result = await db.query(queryString, [req.cart.id]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving cart items:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Adds new item, changes quantity or removes item from the cart
const updateCart = async (req, res) => {
    let { productId, productQuantity, action } = req.query;

    if (productId && action) {
        await checkProductId(req, res, () => {}, productId);
        productId = parseInt(req.query.productId);
        productQuantity = parseInt(req.query.productQuantity);
        if (!req.product && req.productId !== productId) return;

        if (action === "remove") {
            removeCartItem(req, res, productId);
        } else if (action === "update") {
            updateCartItem(req, res, productId, productQuantity);
        } else if (action === "add") {
            addCartItem(req, res, productId, productQuantity);
        } else {
            res.status(400).json({
                message: "Could not update cart! Use valid values for 'action' parameter in the query string!",
                validActionValues: ["add", "update", "remove"]
            });
        };
    } else {
        res.status(400).json({
            message: "Could not update cart! Use `productId` and `action` query parameters if removing item. Add `productQuantity` query parameter if adding or updating item.",
            validActionValues: ["add", "update", "remove"]
        });
    };
};

// Clears cart by setting cart total_value to 0 and deleting respective cart_items
const clearCart = async (req, res) => {
    const { clear } = req.query;
    if (clear === "true") {
        // Check if there is anything in the cart
        const cartTotalValue = parseFloat(req.cart.total_value);
        if (cartTotalValue === 0) {
            res.status(400).json({message: "Could not clear cart! There are no items in the cart to clear."});
            return;
        };

        const clearCart = 'UPDATE cart SET total_value = $1 where id = $2';
        const clearCartItems = 'DELETE FROM cart_items WHERE cart_id = $1';
        try {
            await db.query(clearCart, [0, req.cart.id]);
            await db.query(clearCartItems, [req.cart.id]);
            res.status(200).json({message: `Cart for the user with ID: ${req.userId} has been cleared.`});
        } catch (err) {
            console.error('Error clearing cart:', err.message);
            res.status(500).json({ message: err.message });
        };
    } else {
        res.status(400).json({message: "Could not clear cart! Use `?clear=true` query string. If you want to update cart item use `PATCH` http method instead."});
        return;
    };
};

// Processes cart checkout
const checkoutCart = async (req, res, next) => {
    const cartTotalValue = parseFloat(req.cart.total_value);

    // Check if there is anything in the cart
    if (cartTotalValue === 0) {
        res.status(400).json({message: "Could not checkout cart! There are no items in the cart to checkout."});
        return;
    };

    // Try processing payment
    const paymentProcessed = processPayment();
    if (!paymentProcessed) {
        res.status(400).json({message: "Payment has not processed successfully! Check your payment details!"});
        return;
    };

    // Place a new order
    const date = new Date().toUTCString();
    const addOrderQuery = 'INSERT INTO orders (user_id, total_value, status, created_at) VALUES ($1, $2, $3, $4)';
    const getOrderQuery = 'SELECT * FROM orders WHERE user_id = $1 AND total_value = $2 AND status = $3 AND created_at = $4';
    const addOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, product_quantity) SELECT $1, product_id, product_quantity FROM cart_items WHERE cart_id = $2';
    try {
        await db.query(addOrderQuery, [req.userId, cartTotalValue, 'pending', date]);
        const newOrder = await db.query(getOrderQuery, [req.userId, cartTotalValue, 'pending', date]);
        const orderId = newOrder.rows[0].id;
        await db.query(addOrderItemsQuery, [orderId, req.cart.id]);
    } catch (err) {
        console.error('Error creating order:', err.message);
        res.status(500).json({ message: err.message });
    };

    // Clear cart
    const clearCart = 'UPDATE cart SET total_value = $1 where id = $2';
    const clearCartItems = 'DELETE FROM cart_items WHERE cart_id = $1';
    try {
        await db.query(clearCart, [0, req.cart.id]);
        await db.query(clearCartItems, [req.cart.id]);
        res.status(200).json({message: "Order placed successfully!"});
    } catch (err) {
        console.error('Error placing order:', err.message);
        res.status(500).json({ message: err.message });
    };
};



/**
 * Helper functions
 */

const addCartItem = async (req, res, productId, productQuantity) => {
    if (productQuantity < 1) {
        res.status(400).json({message: "Could not add item in the cart! Use `productQuantity` query parameter with integer value more than 0."});
        return;
    };

    // Check if this product is already in the cart
    try {
        const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
        const cartItem = await db.query(getCartItem, [req.cart.id, productId]);
        if (cartItem.rowCount !== 0) {
            res.status(422).json({message: "Could not add product! This product is already in the cart. You can update or remove it instead of adding it."});
            return;
        };
    } catch (err) {
        console.error('Error checking cart item:', err.message);
        res.status(500).json({ message: err.message });
    };

    let cartTotalValue = parseFloat(req.cart.total_value);
    cartTotalValue += parseFloat(req.product.unit_price) * productQuantity;
    const addItem = 'INSERT INTO cart_items VALUES ($1, $2, $3)';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';
    try {
        await db.query(addItem, [req.cart.id, productId, productQuantity]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `New product with id - ${productId} added in the cart for the user with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error adding cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const updateCartItem = async (req, res, productId, newQuantity) => {
    if (!newQuantity || newQuantity < 1) {
        res.status(400).json({message: "Could not update cart item! Add `productQuantity` query parameter with integer value more than 0."});
        return;
    };

    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateItemQuantity = 'UPDATE cart_items SET product_quantity = $1 WHERE cart_id = $2 AND product_id = $3';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';

    try {
        const cartItem = await db.query(getCartItem, [req.cart.id, productId]);
        if (cartItem.rowCount !== 0) {
            const currentQuantity = cartItem.rows[0].product_quantity;

            if (currentQuantity === newQuantity) {
                res.status(400).json({message: `Could not update cart item! Quantity of the product with id - ${productId} is already ${newQuantity}.`});
                return;
            };
            const valueDiff = (newQuantity - currentQuantity) * parseFloat(req.product.unit_price);
            cartTotalValue += valueDiff;
        } else {
            res.status(400).json({message: `Could not update cart! There are no products in the cart with product id - ${productId}`});
            return;
        };

        await db.query(updateItemQuantity, [newQuantity, req.cart.id, productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product quantity with id - ${productId} updated in the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const removeCartItem = async (req, res, productId) => {
    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const deleteCartItem = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';
    try {
        const cartItem = await db.query(getCartItem, [req.cart.id, productId]);
        if (cartItem.rowCount !== 0) {
            const quantity = cartItem.rows[0].product_quantity;
            cartTotalValue -= parseFloat(req.product.unit_price) * quantity;
        } else {
            res.status(400).json({message: `Could not remove cart item! There are no products in the cart with product id - ${productId}`});
            return;
        };

        await db.query(deleteCartItem, [req.cart.id, productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product with id - ${productId} removed from the cart for the user with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error removing cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const processPayment = () => {
    return true;
};

module.exports = {
    getUserCart,
    getCartItems,
    updateCart,
    clearCart,
    checkoutCart
};