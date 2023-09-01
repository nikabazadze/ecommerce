const express = require('express');
const router = express.Router();
const usersRouter = require('./user.routes');
const productsRouter = require('./product.routes');
const ordersRouter = require('./order.routes');

// API Routes
router.use('/users', usersRouter);
router.use('/products', productsRouter);

module.exports = router;