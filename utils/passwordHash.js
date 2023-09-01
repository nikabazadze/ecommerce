const bcrypt = require("bcrypt");

// Hashes given password
const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.log(err);
    }
    return null;
};

// Compares plain text password to hashed password
const comparePasswords = async (password, hash) => {
    try {
        const matchFound = await bcrypt.compare(password, hash);
        return matchFound;
    } catch (err) {
        console.log(err);
    }
    return false;
};

module.exports = {
    hashPassword,
    comparePasswords
};