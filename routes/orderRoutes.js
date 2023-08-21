const express = require('express');
const router = express.Router();
const db = require('../database/queries/orderQueries');
const { checkOrderId } = require('../middleware/orderMiddleware');

// Uses middleware to check if the order with that id exists
router.param('orderId', checkOrderId);

// Retrieves all orders or filters it by order status
router.get('/', (req, res) => {
    const { status } = req.query;
    if (status) {
        db.getOrdersByStatus(req, res);
    } else {
        db.getOrders(req, res);
    }
});

router.get('/:orderId', db.getOrderById);
router.get('/:orderId/items', db.getOrderItems);
router.post('/', db.addOrder);
router.patch('/:orderId', db.updateOrderStatus);
router.delete('/:orderId', db.deleteOrder);

module.exports = router;