const db = require('../index');

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
    const queryString = 'SELECT * FROM products WHERE category_id = $1';
    try {
        const result = await db.query(queryString, [req.query.categoryId])
        if (result.rowCount !== 0) {
            res.status(200).json(result.rows);
        } else {
            res.status(404).json({message: `No products found with category id: ${req.query.categoryId}`});
        }
    } catch (err) {
        console.error('Error retrieving products by category id:', err.message);
        res.status(500).json({ message: err.message });
    }
};

/**
 * Retrieves a single product by product id.
 * Middleware has already checked product id and attached product to the 
 * request object. That's why this method sends product without any query
 */
const getProductById = (req, res) => {
    res.status(200).json(req.product);
};

// Adds new product in the database
const addProduct = async (req, res) => {
    const requestBody = req.body;

    // Check if all the required product properties are in the request body
    if (!(requestBody.product_name && requestBody.category_id && requestBody.description && requestBody.unit_price && requestBody.quantity_left)) {
        res.status(422).json({
            message: "Could not add a product! Include all required product properties to add a product.",
            requiredProperties: ["product_name", "category_id", "description", "unit_price", "quantity_left"]
        });
        return;
    }

    const queryString = 'INSERT INTO products (product_name, category_id, description, unit_price, quantity_left) VALUES ($1, $2, $3, $4, $5)';
    try {
        await db.query(queryString, [requestBody.product_name, requestBody.category_id, requestBody.description, requestBody.unit_price, requestBody.quantity_left]);
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

    // Check if there are any valid property in the request body to update a product
    if (!(requestBody.product_name || requestBody.category_id || requestBody.description || requestBody.unit_price || requestBody.quantity_left)) {
        res.status(422).json({
            message: "Could not update a product because of no valid product properties in the request body!",
            validProperties: ["product_name", "category_id", "description", "unit_price", "quantity_left"]
        });
        return;
    };

    // Apply changes from the request body
    if (requestBody.product_name) product.product_name = requestBody.product_name;
    if (requestBody.category_id) product.category_id = requestBody.category_id;
    if (requestBody.description) product.description = requestBody.description;
    if (requestBody.unit_price) product.unit_price = requestBody.unit_price;
    if (requestBody.quantity_left) product.quantity_left = requestBody.quantity_left;

    const queryString = 'UPDATE products SET product_name = $1, category_id = $2, description = $3, unit_price = $4, quantity_left = $5 WHERE id = $6';
    try {
        await db.query(queryString, [product.product_name, product.category_id, product.description, product.unit_price, product.quantity_left, req.productId]);
        res.status(200).json({message: `Product modified with ID: ${req.productId}`});
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
        res.status(200).json({message: `Product deleted with ID: ${req.productId}`});
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