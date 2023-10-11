const db = require('../models/index');
const { getProductVariants } = require('../controllers/product.controllers');
const { hasError } = require('../utils/error');

// Retrieves user's cart
const getUserCart = async (req, res) => {
    const result = {
        cardId: req.cart.id,
        totalValue: req.cart.total_value,
    };

    const cartItems = await getCartItems(req.cart.id);
    if (hasError(cartItems)) return res.status(500).json({ message: "Error retrieving cart items"});

    result.cartItems = cartItems;
    res.status(200).json(result);
};

// Adds item in the cart
const addCartItem = async (req, res) => {
    const variant = parseInt(req.query.variant);
    const quantity = parseInt(req.query.quantity);

    // Check if `variant` query parameter exists and have integer value >= 0
    if ((!variant && variant !== 0) || variant < 0) {
        return res.status(400).json({message: "Could not add cart item! Add `variant` query parameter with integer value >= 0."});
    }
    
    // Check if `quantity` query parameter exists and have positive integer value
    if (!quantity || quantity < 1) {
        return res.status(400).json({message: "Could not add cart item! Add `quantity` query parameter with positive integer value."});
    };


    // Get cart / item info
    let cartTotalValue = parseFloat(req.cart.total_value);
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';

    const productVariants = await getProductVariants(req.productId);
    const itemVariant = productVariants[variant];
    const itemPrice = itemVariant.unitPrice;

    // If this product is already in the cart then update it's quantity
    try {
        const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
        const cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0  && cartItem.rows[0].product_variant === variant) {
            // Update quantity and cart value
            cartTotalValue += (itemPrice * quantity);
            const newQuantity = cartItem.rows[0].product_quantity + quantity;
            const updateItemQuantity = 'UPDATE cart_items SET product_quantity = $1 WHERE cart_id = $2 AND product_id = $3';
            await db.query(updateItemQuantity, [newQuantity, req.cart.id, req.productId]);
            await db.query(updateCartValue, [cartTotalValue, req.cart.id]);

            return res.status(200).json({message: `Product quantity with id - ${req.productId} updated in the cart for the user id: ${req.userId}`});
        };
    } catch (err) {
        console.error('Error checking / updating cart item:', err.message);
        return res.status(500).json({ message: "Error checking / updating cart item" });
    };

    // Add cart item
    cartTotalValue += parseFloat(itemPrice) * quantity;
    const addItem = 'INSERT INTO cart_items VALUES ($1, $2, $3, $4)';
    try {
        await db.query(addItem, [req.cart.id, req.productId, quantity, variant]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `New product with id - ${req.productId} added in the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error adding cart item:', err.message);
        res.status(500).json({ message: "Error adding cart item" });
    }
};

// Updates item quantity in the cart
const updateCartItem = async (req, res) => {
    const quantity = parseInt(req.query.quantity);
    
    // Check if `quantity` query parameter exists and have positive integer value
    if (!quantity || quantity < 1) {
        return res.status(400).json({message: "Could not update cart item! Add `quantity` query parameter with positive integer value."});
    };

    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateItemQuantity = 'UPDATE cart_items SET product_quantity = $1 WHERE cart_id = $2 AND product_id = $3';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';

    try {
        let cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0) {
            cartItem = cartItem.rows[0];
            const productVariants = await getProductVariants(req.productId);
            const itemVariant = productVariants[cartItem.product_variant];

            const cartItemPrice = itemVariant.unitPrice;
            const currentQuantity = cartItem.product_quantity;

            if (currentQuantity === quantity) {
                return res.status(400).json({message: `Could not update cart item! Quantity of the product with id - ${req.productId} is already ${quantity}.`});
            };
            const valueDiff = (quantity - currentQuantity) * parseFloat(cartItemPrice);
            cartTotalValue += valueDiff;
        } else {
            return res.status(400).json({message: `Could not update cart! There are no products in the cart with product id - ${req.productId}`});
        };

        await db.query(updateItemQuantity, [quantity, req.cart.id, req.productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product quantity with id - ${req.productId} updated in the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).json({ message: "Error updating cart item" });
    }
};

// Deletes item from the cart
const deleteCartItem = async (req, res) => {
    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const deleteCartItem = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';
    try {
        let cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0) {
            cartItem = cartItem.rows[0];
            const productVariants = await getProductVariants(req.productId);
            const itemVariant = productVariants[cartItem.product_variant];

            const cartItemPrice = itemVariant.unitPrice;
            const quantity = cartItem.product_quantity;
            cartTotalValue -= parseFloat(cartItemPrice) * quantity;
        } else {
            return res.status(400).json({message: `Could not remove cart item! There are no products in the cart with product id: ${req.productId}`});
        };

        await db.query(deleteCartItem, [req.cart.id, req.productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product with id - ${req.productId} removed from the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error removing cart item:', err.message);
        res.status(500).json({ message: "Error removing cart item" });
    }
};

// Clears cart by setting cart total_value to 0 and deleting respective cart_items
const clearCart = async (req, res) => {
    // Check if there is anything in the cart
    const cartTotalValue = parseFloat(req.cart.total_value);
    if (cartTotalValue === 0) {
        return res.status(400).json({message: "Could not clear cart! There are no items in the cart to clear."});
    };

    const clearCart = 'UPDATE cart SET total_value = $1 where id = $2';
    const clearCartItems = 'DELETE FROM cart_items WHERE cart_id = $1';
    try {
        await db.query(clearCart, [0, req.cart.id]);
        await db.query(clearCartItems, [req.cart.id]);
        res.status(200).json({message: `Cart for the user with id: ${req.userId} has been cleared.`});
    } catch (err) {
        console.error('Error clearing cart:', err.message);
        res.status(500).json({ message: "Error clearing cart" });
    };
};

// Processes cart checkout
const checkoutCart = async (req, res) => {
    const cartTotalValue = parseFloat(req.cart.total_value);

    // Check if there is anything in the cart
    if (cartTotalValue === 0) {
        return res.status(400).json({message: "Could not checkout cart! There are no items in the cart to checkout."});
    };

    // Try processing payment
    const paymentProcessed = true;
    if (!paymentProcessed) {
        return res.status(400).json({message: "Payment has not processed successfully! Check your payment details!"});
    };

    // Place a new order
    let newOrderId = null;
    const date = new Date().toUTCString();
    const addOrderQuery = 'INSERT INTO orders (user_id, total_value, status, created_at) VALUES ($1, $2, $3, $4) RETURNING id';
    const addOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, product_quantity, product_variant) SELECT $1, product_id, product_quantity, product_variant FROM cart_items WHERE cart_id = $2';
    try {
        const newOrder = await db.query(addOrderQuery, [req.userId, cartTotalValue, 'pending', date]);
        newOrderId = newOrder.rows[0].id;
        await db.query(addOrderItemsQuery, [newOrderId, req.cart.id]);
    } catch (err) {
        console.error('Error creating order:', err.message);
        return res.status(500).json({ message: "Error creating order" });
    };

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
    const clearCart = 'UPDATE cart SET total_value = $1 where id = $2';
    const clearCartItems = 'DELETE FROM cart_items WHERE cart_id = $1';
    try {
        await db.query(clearCart, [0, req.cart.id]);
        await db.query(clearCartItems, [req.cart.id]);
        return res.status(201).json({message: "Order placed successfully!"});
    } catch (err) {
        console.error('Error clearing cart:', err.message);
        return res.status(500).json({ message: "Error clearing cart" });
    };
};



// Helper functions

// Retrieves cart items
const getCartItems = async (cartId) => {
    // Get product meta of each cart item
    let products = [];
    const queryString = 'SELECT products.id, products.product_name, cart_items.product_quantity, cart_items.product_variant FROM cart_items JOIN products ON cart_items.product_id = products.id WHERE cart_items.cart_id = $1';
    try {
        const queryResult = await db.query(queryString, [cartId]);
        products = queryResult.rows;
    } catch (err) {
        console.error('Error retrieving product meta from cart:', err.message);
        return err;
    }

    let cartItems = [];

    // Get product variants for each product in the cart
    for (const product of products) {
        const productVatiants = await getProductVariants(product.id);
        const variant = productVatiants[product.product_variant];
        const cartItem = {
            productId: product.id,
            productName: product.product_name,
            productQuantity: product.product_quantity,
            unitPrice: variant.unitPrice,
            colorName: variant.colorName,
            imgUrl: variant.imgUrls[0],
        };
        cartItems.push(cartItem);
    }

    return cartItems;
};

module.exports = {
    getUserCart,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    clearCart,
    checkoutCart
};