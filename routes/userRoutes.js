const express = require('express');
const router = express.Router();
const db = require('../database/queries/userQueries');
const { checkUserId, checkUserIdInOrders } = require('../middleware/userMiddleware');

router.param('userId', checkUserId);                    // Uses middleware to check if the user with that id exists
router.use('/:userId/orders', checkUserIdInOrders);     // Uses middleware to check if there are any orders for that user id

router.get('/', db.getUsers);               // Retrieves all users
router.get('/:userId', db.getUserById);     // Retrieves a single user   
router.patch('/:userId', db.updateUser);    // Updates a user
router.delete('/:userId', db.deleteUser);   // Deletes a user

// Retrieves user's all orders or filters them by order status
router.get('/:userId/orders', (req, res) => {
    const { status } = req.query;
    if (status) {
        db.getUserOrdersByStatus(req, res);
    } else {
        db.getUserOrders(req, res);
    }
});

module.exports = router;