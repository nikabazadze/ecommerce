const db = require('../database/index');

/**
 * Checks if the user with id is in the database. If the 
 * user is found user and userId get attached to the request body.
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
            res.status(404).send(`User with id - ${userId} does not exist!`);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {checkUserId};