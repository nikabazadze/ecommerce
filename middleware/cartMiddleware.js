const db = require('../database/index');

/**
 * Checks if the cart for the specified user is in the database. If the 
 * cart is found then it gets attached to the request body.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @param {String} id 
 */
const checkCart = async (req, res, next) => {
    const queryString = 'SELECT * FROM cart WHERE user_id = $1';
    try {
        const result = await db.query(queryString, [req.userId]);
        if (result.rowCount !== 0) {
            req.cart = result.rows[0];
            next();
        } else {
            console.log(`Cart for the user with id - ${req.userId} does not exist!. It must be created ASAP!`);
            res.status(404).json({message: `Cart for the user with id - ${req.userId} does not exist!`});
        }
    } catch (err) {
        console.error('Error checking user cart:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {checkCart};