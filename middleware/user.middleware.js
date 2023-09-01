const db = require('../models/index');

/**
 * Checks if the user with given id is in the database. If the 
 * user is found user and userId gets attached to the request body.
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 * @param {String} id 
 */
const checkUserId = async (req, res, next, id) => {
    const userId = parseInt(id);
    const queryString = 'SELECT * FROM users WHERE id = $1';
    try {
        const result = await db.query(queryString, [userId]);
        if (result.rowCount !== 0) {
            req.user = result.rows[0];
            req.userId = userId;
            next();
        } else {
            res.status(404).json({message: `User with id - ${userId} does not exist!`});
        }
    } catch (err) {
        console.error('Error checking user id:', err.message);
        res.status(500).json({ message: err.message });
    }
}

module.exports = { checkUserId };