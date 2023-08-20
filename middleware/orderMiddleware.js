const db = require('../database/index');

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
    const queryString = 'SELECT * FROM orders WHERE id = $1';
    try {
        const result = await db.query(queryString, [orderId]);
        if (result.rowCount !== 0) {
            req.order = result.rows[0];
            req.orderId = orderId;
            next();
        } else {
            res.status(404).json({message: `Order with id - ${orderId} does not exist!`});
        }
    } catch (err) {
        console.error('Error checking order id:', err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {checkOrderId};