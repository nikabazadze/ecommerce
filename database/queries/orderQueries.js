const db = require('../index');
const { checkProductId } = require('../../middleware/productMiddleware');

// Retrvieves all orders
const getOrders = async (req, res) => {
    const queryString = 'SELECT * FROM orders';
    try {
        const result = await db.query(queryString);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving orders:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Retrvieves orders filtered by order status
const getOrdersByStatus = async (req, res) => {
    if (!(req.query.status === "pending" || req.query.status === "complete")) {
        res.status(422).json({message: "Invalid status value in the query string! Status value must be `pending` or `complete`!"});
        return;
    }

    const queryString = 'SELECT * FROM orders WHERE status = $1';
    try {
        const result = await db.query(queryString, [req.query.status])
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({message: `No orders found with status: ${req.query.status}`});
        }
    } catch (err) {
        console.error('Error retrieving orders by status:', err.message);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves a single order by order id.
 * Middleware has already checked order id and attached order to the 
 * request object. That's why this method sends order without any query
 */
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
}

// Adds new order in the database
const addOrder = async (req, res, next) => {
    const requestBody = req.body;

    // Check if all the required order properties are in the request body
    if (!(requestBody.user_id && requestBody.order_items)) {
        res.status(422).json({
            message: "Could not add order! Include all required order properties to add order.",
            requiredProperties: ["user_id", "order_items"]
        });
        return;
    }
  
    const date = new Date().toUTCString();
    const queryString = 'INSERT INTO orders (user_id, total_value, status, created_at) VALUES ($1, $2, $3, $4)';
    try {
        const newOrder = await db.query(queryString, [requestBody.user_id, orderValue, 'pending', date]);
        res.status(201).json({message: "New order added"});
    } catch (err) {
        console.error('Error adding order:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Updates an order
const updateOrderStatus = async (req, res) => {
    if (req.body.status) {
        if (!(req.body.status === "pending" || req.body.status === "complete")) {
            res.status(422).json({message: "Could not update order status! New status value must be `pending` or `complete`!"});
            return;
        }
    } else {
        res.status(422).json({message: "Could not update order status! Add status property in the request body!"});
        return;
    }

    const queryString = 'UPDATE orders SET status = $1 WHERE id = $2';
    try {
        await db.query(queryString, [req.body.status, req.orderId]);
        res.status(200).json({message: `Order status updated to > '${req.body.status}' for order with ID: ${req.orderId}`});
    } catch (err) {
        console.error('Error updating order:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Deletes an order
const deleteOrder = async (req, res) => {
    const queryString = 'DELETE FROM orders WHERE id = $1';
    try {
        await db.query(queryString, [req.orderId]);
        res.status(200).json({message: `Order deleted with ID: ${req.orderId}`});
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getOrders,
    getOrdersByStatus,
    getOrderById,
    getOrderItems,
    addOrder,
    updateOrderStatus,
    deleteOrder
};