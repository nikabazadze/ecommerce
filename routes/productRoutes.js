const express = require('express');
const router = express.Router();
const db = require('../database/queries/productQueries');
const { checkProductId } = require('../middleware/productMiddleware');

router.param('productId', checkProductId);          // Uses middleware to check if the user with that id exists

// Retrvieves all products or filters it by category
router.get('/', (req, res) => {
    const { categoryId } = req.query;
    if (categoryId) {
        db.getProductsByCategoryId(req, res);
    } else {
        db.getProducts(req, res);
    }
});

router.get('/:productId', db.getProductById);       // Retrieves a single product  
router.post('/', db.addProduct);                    // Adds new product in the database
router.patch('/:productId', db.updateProduct);      // Updates a product
router.delete('/:productId', db.deleteProduct);     // Deletes a product

module.exports = router;