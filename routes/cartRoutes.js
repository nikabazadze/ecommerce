const express = require('express');
const router = express.Router();
const db = require('../database/queries/cartQueries');
const { checkCart } = require('../middleware/cartMiddleware');
 
// Uses middleware to check if the cart exists
router.use(checkCart);

router.get('/', db.getUserCart);
router.get('/items', db.getCartItems);
router.patch('/', db.updateCart);
router.put('/', db.clearCart); 


module.exports = router;