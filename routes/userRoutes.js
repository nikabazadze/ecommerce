const express = require('express');
const router = express.Router();
const db = require('../database/queries/userQueries');
const { checkUserId, checkUserIdInOrders } = require('../middleware/userMiddleware');
const cartRouter = require('./cartRoutes');

router.param('userId', checkUserId);                    // Uses middleware to check if the user with that id exists
router.use('/:userId/orders', checkUserIdInOrders);     // Uses middleware to check if there are any orders for that user id

router.use('/:userId/cart', cartRouter);

router.get('/', db.getUsers);
router.get('/:userId', db.getUserById);
router.patch('/:userId', db.updateUser);
router.delete('/:userId', db.deleteUser);

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