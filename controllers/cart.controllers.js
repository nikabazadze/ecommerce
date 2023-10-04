const db = require('../models/index');
const { checkProductId } = require('../middleware/product.middleware');

// Retrieves user's cart by user id.
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

    // Check if this product is already in the cart
    try {
        const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
        const cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0) {
            res.status(422).json({message: "Could not add item! This item is already in the cart. You can update or remove it instead of adding it."});
            return;
        };
    } catch (err) {
        console.error('Error checking cart item:', err.message);
        res.status(500).json({ message: err.message });
        return;
    };

    let cartTotalValue = parseFloat(req.cart.total_value);
    cartTotalValue += parseFloat(req.product.unit_price) * quantity;
    const addItem = 'INSERT INTO cart_items VALUES ($1, $2, $3, $4)';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';
    try {
        await db.query(addItem, [req.cart.id, req.productId, quantity, variant]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `New product with id - ${req.productId} added in the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error adding cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Updates item quantity in the cart
const updateCartItem = async (req, res) => {
    const quantity = parseInt(req.query.quantity);
    
    // Check if `quantity` query parameter exists and have positive integer value
    if (!quantity || quantity < 1) {
        res.status(400).json({message: "Could not update cart item! Add `quantity` query parameter with positive integer value."});
        return;
    };

    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateItemQuantity = 'UPDATE cart_items SET product_quantity = $1 WHERE cart_id = $2 AND product_id = $3';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';

    try {
        const cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0) {
            const currentQuantity = cartItem.rows[0].product_quantity;

            if (currentQuantity === quantity) {
                res.status(400).json({message: `Could not update cart item! Quantity of the product with id - ${req.productId} is already ${quantity}.`});
                return;
            };
            const valueDiff = (quantity - currentQuantity) * parseFloat(req.product.unit_price);
            cartTotalValue += valueDiff;
        } else {
            res.status(400).json({message: `Could not update cart! There are no products in the cart with product id - ${req.productId}`});
            return;
        };

        await db.query(updateItemQuantity, [quantity, req.cart.id, req.productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product quantity with id - ${req.productId} updated in the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error updating cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Deletes item from the cart
const deleteCartItem = async (req, res) => {
    let cartTotalValue = parseFloat(req.cart.total_value);
    const getCartItem = 'SELECT * FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const deleteCartItem = 'DELETE FROM cart_items WHERE cart_id = $1 AND product_id = $2';
    const updateCartValue = 'UPDATE cart SET total_value = $1 where id = $2';
    try {
        const cartItem = await db.query(getCartItem, [req.cart.id, req.productId]);
        if (cartItem.rowCount !== 0) {
            const quantity = cartItem.rows[0].product_quantity;
            cartTotalValue -= parseFloat(req.product.unit_price) * quantity;
        } else {
            res.status(400).json({message: `Could not remove cart item! There are no products in the cart with product id: ${req.productId}`});
            return;
        };

        await db.query(deleteCartItem, [req.cart.id, req.productId]);
        await db.query(updateCartValue, [cartTotalValue, req.cart.id]);
        res.status(200).json({message: `Product with id - ${req.productId} removed from the cart for the user id: ${req.userId}`});
    } catch (err) {
        console.error('Error removing cart item:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Clears cart by setting cart total_value to 0 and deleting respective cart_items
const clearCart = async (req, res) => {
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
        res.status(200).json({message: `Cart for the user with id: ${req.userId} has been cleared.`});
    } catch (err) {
        console.error('Error clearing cart:', err.message);
        res.status(500).json({ message: err.message });
    };
};

// Processes cart checkout
const checkoutCart = async (req, res) => {
    const cartTotalValue = parseFloat(req.cart.total_value);

    // Check if there is anything in the cart
    if (cartTotalValue === 0) {
        res.status(400).json({message: "Could not checkout cart! There are no items in the cart to checkout."});
        return;
    };

    // Try processing payment
    const paymentProcessed = true;
    if (!paymentProcessed) {
        res.status(400).json({message: "Payment has not processed successfully! Check your payment details!"});
        return;
    };

    // Place a new order
    const date = new Date().toUTCString();
    const addOrderQuery = 'INSERT INTO orders (user_id, total_value, status, created_at) VALUES ($1, $2, $3, $4) RETURNING id';
    const addOrderItemsQuery = 'INSERT INTO order_items (order_id, product_id, product_quantity) SELECT $1, product_id, product_quantity FROM cart_items WHERE cart_id = $2';
    try {
        const newOrder = await db.query(addOrderQuery, [req.userId, cartTotalValue, 'pending', date]);
        await db.query(addOrderItemsQuery, [newOrder.rows[0].id, req.cart.id]);
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

module.exports = {
    getUserCart,
    getCartItems,
    addCartItem,
    updateCartItem,
    deleteCartItem,
    clearCart,
    checkoutCart
};