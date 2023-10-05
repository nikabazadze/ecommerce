const express = require('express');
const router = express.Router();
const db = require('../controllers/cart.controllers');
const { checkUserCart } = require('../middleware/cart.middleware');
const { checkProductId } = require('../middleware/product.middleware');
 
router.use(checkUserCart);
router.param('productId', checkProductId);

router.get('/', db.getUserCart);
router.post('/items/:productId', db.addCartItem);
router.patch('/items/:productId', db.updateCartItem);
router.delete('/items/:productId', db.deleteCartItem);
router.post('/checkout', db.checkoutCart);
router.delete('/', db.clearCart);

module.exports = router;