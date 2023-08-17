const express = require('express');
const router = express.Router();
const db = require('../database/queries/userQueries');
const { checkUserId } = require('../middleware/userMiddleware');

router.param('userId', checkUserId);        // Uses middleware to check if the user with that id exists

router.get('/', db.getUsers);               // Retrvieves all users
router.get('/:userId', db.getUserById);     // Retrieves a single user   
router.put('/:userId', db.updateUser);      // Updates a user
router.delete('/:userId', db.deleteUser);   // Deletes a user

module.exports = router;