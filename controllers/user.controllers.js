const db = require('../models/index');

// Retrvieves all users
const getUsers = async (req, res) => {
    const queryString = 'SELECT * FROM users';
    try {
        const result = await db.query(queryString);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving users:', err.message);
        res.status(500).json({ message: "Error retrieving users" });
    }
};

// Retrieves a single user by user id
const getUserById = (req, res) => {
    res.status(200).json(req.user);
}

// Updates a user
const updateUser = async (req, res) => {
    const user = req.user;
    const requestBody = req.body;

    // Check if there are any valid fields in the request body to update user
    if (!(requestBody.firstName || requestBody.lastName || requestBody.email || requestBody.password)) {
        return res.status(400).json({
            message: "Could not update user because of no valid user fields in the request body!",
            validFields: ["firstName", "lastName", "email", "password"]
        });
    };

    // Apply changes from the request body
    if (requestBody.firstName) user.first_name = requestBody.firstName;
    if (requestBody.lastName) user.last_name = requestBody.lastName;
    if (requestBody.email) user.email = requestBody.email;
    if (requestBody.password) user.password = requestBody.password;

    const queryString = 'UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5';
    try {
        await db.query(queryString, [user.first_name, user.last_name, user.email, user.password, req.userId]);
        res.status(200).json({message: `User modified with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error updating user:', err.message);
        res.status(500).json({ message: "Error updating user" });
    }
};

// Deletes a user
const deleteUser = async (req, res) => {
    const queryString = 'DELETE FROM users WHERE id = $1';
    try {
        await db.query(queryString, [req.userId]);
        res.status(200).json({message: `User deleted with ID: ${req.userId}`});
    } catch (err) {
        console.error('Error deleting user:', err.message);
        res.status(500).json({ message: "Error deleting user" });
    }
};

// Checks if there is a user in the database with given email
const checkUserByEmail = async (email) => {
    const queryString = 'SELECT * FROM users WHERE email = $1';
    try {
        const user = await db.query(queryString, [email]);
        return user.rows[0];
    } catch (err) {
        console.error('Error checking user in the database:', err.message);
    };
};

/**
 * Finds user by id in the database.
 * Defined this function to be used in the authentication process.
 * We could not use already defined function `getUserById` for this,
 * because that function uses middleware which we don't need in authentication. 
 */
const findUserById = async (id) => {
    const queryString = 'SELECT * FROM users WHERE id = $1';
    try {
        const user = await db.query(queryString, [id]);
        return user.rows[0];
    } catch (err) {
        console.error('Error checking user by id:', err.message);
    };
};

// Adds new user in the database and creates empty cart
const createUser = async (firstName, lastName, email, password, res) => {
    const date = new Date().toUTCString();
    const addUserQuery = 'INSERT INTO users (first_name, last_name, email, password, created_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const createCartQuery = 'INSERT INTO cart (user_id, total_value) VALUES ($1, $2)';
    try {
        const newUser = await db.query(addUserQuery, [firstName, lastName, email, password, date]);
        await db.query(createCartQuery, [newUser.rows[0].id, 0]);
        res.status(201).json({
            message: "New user added in the database.",
            user: newUser.rows[0]
        });
    } catch (err) {
        console.error('Error adding new user:', err.message);
        res.status(500).json({ message: "Error adding new user" });
    };
};

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    checkUserByEmail,
    findUserById,
    createUser
};