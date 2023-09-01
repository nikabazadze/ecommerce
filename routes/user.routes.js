const express = require('express');
const router = express.Router();
const db = require('../controllers/user.controllers');
const { checkUserId } = require('../middleware/user.middleware');
const cartRouter = require('./cart.routes');
const ordersRouter = require('./order.routes');

router.param('userId', checkUserId);

router.use('/:userId/cart', cartRouter);
router.use('/:userId/orders', ordersRouter);

router.get('/', db.getUsers);
router.get('/:userId', db.getUserById);
router.patch('/:userId', db.updateUser);
router.delete('/:userId', db.deleteUser);

module.exports = router;