const db = require('../index');

// Retrvieves all users
const getUsers = async (req, res) => {
    const queryString = 'SELECT * FROM users';
    try {
        const result = await db.query(queryString);
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves a single user by user id.
 * Middleware has already check user id and attached user to the 
 * request object. That's why this method sends user without any query
 */
const getUserById = async (req, res) => {
    res.status(200).send(req.user);
}

// Updates a user
const updateUser = async (req, res) => {
    const { first_name, last_name, email } = req.body;
    const queryString = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4';
    try {
        const result = await db.query(queryString, [first_name, last_name, email, req.userId]);
        res.status(200).send(`User modified with ID: ${req.userId}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Deletes a user
const deleteUser = async (req, res) => {
    const queryString = 'DELETE FROM users WHERE id = $1';
    try {
        const result = await db.query(queryString, [req.userId]);
        res.status(200).send(`User deleted with ID: ${req.userId}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};