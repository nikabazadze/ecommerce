const db = require('../models/index');

// Retrvieves all products
const getProducts = async (req, res) => {
    const queryString = 'SELECT * FROM products';
    try {
        const result = await db.query(queryString);
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error retrieving products:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Retrvieves products filtered by category id
const getProductsByCategoryId = async (req, res) => {
    const categoryId = parseInt(req.query.categoryId);
    const queryString = 'SELECT * FROM products WHERE category_id = $1';
    try {
        const result = await db.query(queryString, [categoryId])
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({message: `No products found with category id: ${categoryId}`});
        }
    } catch (err) {
        console.error('Error retrieving products by category id:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Retrieves a single product by product id
const getProductById = (req, res) => {
    res.status(200).json(req.product);
};

// Adds a new product in the database
const addProduct = async (req, res) => {
    const requestBody = req.body;

    // Check if all the required product fields are in the request body
    if (!requestBody.productName || !requestBody.categoryId || !requestBody.description || !requestBody.unitPrice || !requestBody.quantityLeft) {
        res.status(400).json({
            message: "Could not add a product! Include all required fields to add a product.",
            requiredFields: ["productName", "categoryId", "description", "unitPrice", "quantityLeft"]
        });
        return;
    }

    const queryString = 'INSERT INTO products (product_name, category_id, description, unit_price, quantity_left) VALUES ($1, $2, $3, $4, $5)';
    try {
        await db.query(queryString, [requestBody.productName, requestBody.categoryId, requestBody.description, requestBody.unitPrice, requestBody.quantityLeft]);
        res.status(201).json({message: "New product added"});
    } catch (err) {
        console.error('Error adding product:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Updates a product
const updateProduct = async (req, res) => {
    const product = req.product;
    const requestBody = req.body;

    // Check if there are any valid fields in the request body to update a product
    if (!(requestBody.productName || requestBody.categoryId || requestBody.description || requestBody.unitPrice || requestBody.quantityLeft)) {
        res.status(400).json({
            message: "Could not update a product because of no valid fields in the request body!",
            validFields: ["productName", "categoryId", "description", "unitPrice", "quantityLeft"]
        });
        return;
    };

    // Apply changes from the request body
    if (requestBody.productName) product.product_name = requestBody.productName;
    if (requestBody.categoryId) product.category_id = requestBody.categoryId;
    if (requestBody.description) product.description = requestBody.description;
    if (requestBody.unitPrice) product.unit_price = requestBody.unitPrice;
    if (requestBody.quantityLeft) product.quantity_left = requestBody.quantityLeft;

    const queryString = 'UPDATE products SET product_name = $1, category_id = $2, description = $3, unit_price = $4, quantity_left = $5 WHERE id = $6';
    try {
        await db.query(queryString, [product.product_name, product.category_id, product.description, product.unit_price, product.quantity_left, req.productId]);
        res.status(200).json({message: `Product with ID: ${req.productId} modified!`});
    } catch (err) {
        console.error('Error updating product:', err.message);
        res.status(500).json({ message: err.message });
    }
};

// Deletes a product
const deleteProduct = async (req, res) => {
    const queryString = 'DELETE FROM products WHERE id = $1';
    try {
        await db.query(queryString, [req.productId]);
        res.status(200).json({message: `Product with ID: ${req.productId} deleted!`});
    } catch (err) {
        console.error('Error deleting product:', err.message);
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    getProductsByCategoryId,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};