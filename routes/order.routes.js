const express = require('express');
const router = express.Router();
const db = require('../controllers/order.controllers');
const { checkOrderId } = require('../middleware/order.middleware');
const { checkUserId } = require('../middleware/user.middleware');

router.param('orderId', checkOrderId);
router.param('userId', checkUserId);

router.get('/', (req, res) => req.query.status ? db.getOrdersByStatus(req, res) : db.getOrders(req, res));
router.get('/user/:userId', (req, res) => req.query.status ? db.getUserOrdersByStatus(req, res) : db.getUserOrders(req, res));
router.get('/:orderId', db.getOrderById);
router.patch('/:orderId', db.updateOrderStatus);
router.delete('/:orderId', db.deleteOrder);

module.exports = router;