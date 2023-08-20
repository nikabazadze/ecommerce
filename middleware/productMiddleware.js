const db = require('../database/index');

/**
 * Checks if the product with given id is in the database. If the 
 * product is found product and productId gets attached to the request body.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @param {String} id 
 */
const checkProductId = async (req, res, next, id) => {
    const productId = parseInt(id);
    const queryString = 'SELECT * FROM products WHERE id = $1';
    try {
        const result = await db.query(queryString, [productId]);
        if (result.rowCount !== 0) {
            req.product = result.rows[0];
            req.productId = productId;
            next();
        } else {
            res.status(404).json({message: `Product with id - ${productId} does not exist!`});
        }
    } catch (err) {
        console.error('Error checking product id:', err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {checkProductId};