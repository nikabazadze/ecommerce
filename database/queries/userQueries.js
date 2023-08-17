const db = require('../index');

const getUsers = async (req, res) => {
    const queryString = 'SELECT * FROM users';
    try {
        const result = await db.query(queryString);
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const queryString = 'SELECT * FROM users WHERE id = $1';
    try {
        const result = await db.query(queryString, [id]);
        res.status(200).send(result.rows);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const { first_name, last_name, email } = req.body;
    const queryString = 'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4';
    try {
        const result = await db.query(queryString, [first_name, last_name, email, id]);
        res.status(200).send(`User modified with ID: ${id}`);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteUser = async (req, res) => {
    const id = parseInt(req.params.id);
    const queryString = 'DELETE FROM users WHERE id = $1';
    try {
        const result = await db.query(queryString, [id]);
        res.status(200).send(`User deleted with ID: ${id}`);
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