const { use } = require('../../routes/userRoutes');
const db = require('../index');

// Retrvieves all users
const getUsers = async (req, res) => {
    const queryString = 'SELECT * FROM users';
    try {
        const result = await db.query(queryString);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving users:', err.message);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves a single user by user id.
 * Middleware has already checked user id and attached user to the 
 * request object. That's why this method sends user without any query
 */
const getUserById = async (req, res) => {
    res.status(200).json(req.user);
}

// Updates a user
const updateUser = async (req, res) => {
    const user = req.user;
    const requestBody = req.body;

    // Check if there are any valid property in the request body to update user
    if (!(requestBody.first_name || requestBody.last_name || requestBody.email || requestBody.password)) {
        res.status(422).json({
            message: "Could not update user because of no valid user properties!",
            validProperties: ["first_name", "last_name", "email", "password"]
        });
        return;
    };

    // Apply changes from the request body
    if (requestBody.first_name) user.first_name = requestBody.first_name;
    if (requestBody.last_name) user.last_name = requestBody.last_name;
    if (requestBody.email) user.email = requestBody.email;
    if (requestBody.password) user.password = requestBody.password;

    const queryString = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5';
    
    try {
        const result = await db.query(queryString, [user.first_name, user.last_name, user.email, user.password, req.userId]);
        res.status(200).json({message: `User modified with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Deletes a user
const deleteUser = async (req, res) => {
    const queryString = 'DELETE FROM users WHERE id = $1';
    try {
        const result = await db.query(queryString, [req.userId]);
        res.status(200).json({message: `User deleted with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};