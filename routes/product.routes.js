const express = require('express');
const router = express.Router();
const db = require('../controllers/product.controllers');
const { checkProductId } = require('../middleware/product.middleware');

router.param('productId', checkProductId);

router.get('/', (req, res) => req.query.categoryId ? db.getProductsByCategoryId(req, res) : db.getProducts(req, res));
router.get('/:productId', db.getProductById);
router.post('/', db.addProduct);
router.patch('/:productId', db.updateProduct);
router.delete('/:productId', db.deleteProduct);

module.exports = router;