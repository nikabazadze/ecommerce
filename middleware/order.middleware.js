const db = require('../models/index');

/**
 * Checks if there are any orders for given user id in the database. If the 
 * orders are found they get attached to the request body.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next
 */
const checkUserOrders = async (req, res, next) => {
    const queryString = 'SELECT * FROM orders WHERE user_id = $1';
    try {
        const result = await db.query(queryString, [req.userId]);
        if (result.rowCount !== 0) {
            req.orders = result.rows;
            next();
        } else {
            res.status(404).json({message: `Orders for user id - ${req.userId} does not exist!`});
        }
    } catch (err) {
        console.error('Error checking user id in orders:', err.message);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Checks if the order with given id is in the database. If the 
 * order is found order and orderId gets attached to the request body.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @param {String} id 
 */
const checkOrderId = async (req, res, next, id) => {
    const orderId = parseInt(id);
    const order = req.orders.find((order) => order.id === orderId);
    if (order) {
        req.order = order;
        req.orderId = orderId;
        next();
    } else {
        res.status(404).json({ message: `Order with id: ${orderId} was not found!`});
    }
};

module.exports = { checkUserOrders, checkOrderId };