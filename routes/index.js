const express = require('express');
const router = express.Router();
const usersRouter = require('./user.routes');
const productsRouter = require('./product.routes');
const ordersRouter = require('./order.routes');
const db = require('../controllers/checkout.controllers');

// API Routes
router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/orders', ordersRouter)

module.exports = router;