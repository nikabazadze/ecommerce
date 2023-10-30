const db = require('../models/index');
const moment = require('moment');
const { hasError } = require('../utils/error');
const { getProductVariants } = require('../controllers/product.controllers');

// Retrieves all orders
const getOrders = async (req, res) => {
    let ordersMeta = [];
    const queryString = 'SELECT * FROM orders ORDER BY id DESC';
    try {
        const queryResult = await db.query(queryString);
        ordersMeta = queryResult.rows;
    } catch (err) {
        console.error('Error getting orders meta:', err.message);
        return res.status(500).json({ message: "Error getting orders meta." });
    }

    let result = [];

    for (const orderMeta of ordersMeta) {
        const order = await retrieveOrderInfo(orderMeta);
        if (hasError(order)) return res.status(500).json({ message: "Error retrieving order info."});
        result.push(order);
    }

    res.status(200).json(result);
};

// Retrvieves all orders filtered by order status
const getOrdersByStatus = async (req, res) => {
    const { status } = req.query;
    let ordersMeta = [];
    const queryString = 'SELECT * FROM orders WHERE status = $1 ORDER BY id DESC';
    try {
        const queryResult = await db.query(queryString, [status.toLowerCase()]);
        ordersMeta = queryResult.rows;
    } catch (err) {
        console.error('Error getting orders meta:', err.message);
        return res.status(500).json({ message: "Error getting orders meta." });
    }

    if (ordersMeta.length === 0) return res.status(404).json({ message: `No orders found with the status - ${status}!`});

    let result = [];

    for (const orderMeta of ordersMeta) {
        const order = await retrieveOrderInfo(orderMeta);
        if (hasError(order)) return res.status(500).json({ message: "Error retrieving order info."});
        result.push(order);
    }

    res.status(200).json(result);
};

// Retrieves user's all orders
const getUserOrders = async (req, res) => {
    let ordersMeta = [];
    const queryString = 'SELECT * FROM orders WHERE user_id = $1 ORDER BY id DESC';
    try {
        const queryResult = await db.query(queryString, [req.userId]);
        ordersMeta = queryResult.rows;
    } catch (err) {
        console.error('Error getting order info by user id:', err.message);
        res.status(500).json({ message: "Error getting order info by user id." });
    }

    if (ordersMeta.length === 0) return res.status(404).json({ message: `No orders found for the user with id - ${req.userId}!`});

    let result = [];

    for (const orderMeta of ordersMeta) {
        const order = await retrieveOrderInfo(orderMeta);
        if (hasError(order)) return res.status(500).json({ message: "Error retrieving order info."});
        result.push(order);
    }

    res.status(200).json(result);
};

// Retrieves user's all orders filtered by status
const getUserOrdersByStatus = async (req, res) => {
    const { status } = req.query;
    let ordersMeta = [];
    const queryString = 'SELECT * FROM orders WHERE user_id = $1 AND status = $2 ORDER BY id DESC';
    try {
        const queryResult = await db.query(queryString, [req.userId, status.toLowerCase()]);
        ordersMeta = queryResult.rows;
    } catch (err) {
        console.error('Error getting order info by user id and order status:', err.message);
        res.status(500).json({ message: "Error getting order info by user id and order status." });
    }

    if (ordersMeta.length === 0) return res.status(404).json({ message: `No orders found for the user id - ${req.userId} with status - ${status}!`});

    let result = [];

    for (const orderMeta of ordersMeta) {
        const order = await retrieveOrderInfo(orderMeta);
        if (hasError(order)) return res.status(500).json({ message: "Error retrieving order info."});
        result.push(order);
    }

    res.status(200).json(result);
};

// Gets order by order id
const getOrderById = async (req, res) => {
    const result = await retrieveOrderInfo(req.order);
    if (hasError(result)) return res.status(500).json({ message: "Error retrieving order info."});

    res.status(200).json(result);
};

// Updates order status
const updateOrderStatus = async (req, res) => {
    const newStatus = req.query.status;

    if (!newStatus) return res.status(400).json({ message: "You must use `status` query string to update order status!"});

    const queryString = 'UPDATE orders SET status = $1 WHERE id = $2';
    try {
        await db.query(queryString, [newStatus, req.orderId]);
        res.status(200).json({message: `Order status updated to > '${newStatus}' for the order with ID: ${req.orderId}`});
    } catch (err) {
        console.error('Error updating order status:', err.message);
        res.status(500).json({ message: "Error updating order status" });
    }
};

// Deletes an order
const deleteOrder = async (req, res) => {
    const queryString = 'DELETE FROM orders WHERE id = $1';
    try {
        await db.query(queryString, [req.orderId]);
        res.status(200).json({message: `Order with id: ${req.orderId} deleted`});
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).json({ message: "Error deleting order" });
    }
};



// Helper functions

// Retrieves order's full info
const retrieveOrderInfo = async (orderMeta) => {
    const result = {
        orderId: orderMeta.id,
        totalValue: orderMeta.total_value,
        status: orderMeta.status,
        createdAt: moment(orderMeta.created_at).format('MMMM DD, YYYY'),
    };

    const orderAddress = await getOrderAddress(orderMeta.id);
    if (hasError(orderAddress)) return orderAddress;

    const orderItems = await getOrderItems(orderMeta.id);
    if (hasError(orderItems)) return orderItems;

    result.orderAddress = orderAddress;
    result.orderItems = orderItems;
    return result;
};

// Gets order address
const getOrderAddress = async (orderId) => {
    let address = {};
    const queryString = 'SELECT * FROM order_address WHERE order_id = $1';
    try {
        const queryResult = await db.query(queryString, [orderId]);
        address = queryResult.rows[0];
    } catch (err) {
        console.error('Error retrieving order address:', err.message);
        return err;
    }

    const result = {
        firstName: address.first_name,
        lastName: address.last_name,
        country: address.country,
        address: address.address,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        zipCode: address.zipcode,
        phone: address.phone
    };

    return result;
};

// Gets order items
const getOrderItems = async (orderId) => {
    // Get product meta of each order item
    let products = [];
    const queryString = 'SELECT products.id, products.product_name, order_items.product_quantity, order_items.product_variant FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = $1';
    try {
        const queryResult = await db.query(queryString, [orderId]);
        products = queryResult.rows;
    } catch (err) {
        console.error('Error retrieving product meta from order:', err.message);
        return err;
    }

    let orderItems = [];

    // Get product variants for each product in the order
    for (const product of products) {
        const productVariants = await getProductVariants(product.id);
        const variant = productVariants[product.product_variant];
        const orderItem = {
            productId: product.id,
            productName: product.product_name,
            productQuantity: product.product_quantity,
            productVariant: product.product_variant,
            unitPrice: variant.unitPrice,
            colorName: variant.colorName,
            imgUrl: variant.imgUrls[0],
        };
        orderItems.push(orderItem);
    }

    return orderItems;
}

module.exports = {
    getOrders,
    getOrdersByStatus,
    getUserOrders,
    getUserOrdersByStatus,
    getOrderById,
    updateOrderStatus,
    deleteOrder,
    retrieveOrderInfo
};