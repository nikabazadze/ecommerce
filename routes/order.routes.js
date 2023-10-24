const express = require('express');
const router = express.Router();
const db = require('../controllers/order.controllers');
const { checkUserOrders, checkOrderId } = require('../middleware/order.middleware');

// router.use(checkUserOrders);
router.param('orderId', checkOrderId);

router.get('/', (req, res) => req.query.status ? db.getOrdersByStatus(req, res) : db.getOrders(req, res));
router.get('/:orderId', db.getOrderById);
router.get('/:orderId/items', db.getOrderItems);
router.patch('/:orderId', db.updateOrderStatus);
router.delete('/:orderId', db.deleteOrder);

module.exports = router;