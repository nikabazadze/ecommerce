const db = require('../models/index');

// Retrieves user's all orders
const getOrders = (req, res) => {
    res.status(200).json(req.orders);
};

// Retrvieves user's orders filtered by order status
const getOrdersByStatus = (req, res) => {
    const { status } = req.query;
    if (!(status === "pending" || status === "completed")) {
        res.status(400).json({message: "Invalid status value in the query string! Status value must be `pending` or `completed`!"});
        return;
    }

    const orders = req.orders;
    const result = orders.filter((order) => order.status === status);
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message: `No orders found with status: ${status}`});
    };
};

// Retrieves user's order by order id
const getOrderById = (req, res) => {
    res.status(200).json(req.order);
};

// Retrieves order items
const getOrderItems = async (req, res) => {
    const queryString = 'SELECT products.product_name, order_items.product_quantity FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = $1';
    try {
        const result = await db.query(queryString, [req.orderId]);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving order items:', err.message);
        res.status(500).json({ message: err.message });
    }
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

module.exports = {
    getOrders,
    getOrdersByStatus,
    getOrderById,
    getOrderItems,
    updateOrderStatus,
    deleteOrder
};