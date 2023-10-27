const { hasError } = require('../utils/error');
const db = require('../models/index');
const chalk = require('chalk');


// Retrieves a single product by product id
const getProductById = async (req, res) => {
    const product = await retrieveProduct(req.product);
    hasError(product) ? res.status(500).json({ message: "Error retrieving product!" }) : res.status(200).json(product);
};

// Retrvieves all products
const getProducts = async (req, res) => {
    const queryString = 'SELECT * FROM products ORDER BY id ASC';
    try {
        const products = await db.query(queryString);
        const result = [];
        for (const product of products.rows) {
            const retrievedProduct = await retrieveProduct(product);
            if (hasError(retrievedProduct)) return res.status(500).json({ message: "Error retrieving product!" });
            result.push(retrievedProduct);
            console.log(chalk.cyan.bold("Retrieved a product from database."));
        }

        console.log(chalk.magentaBright.bold("Retrieved all products from database."));
        res.status(200).json(result);
    } catch (err) {
        console.error('Error retrieving products:', err.message);
        res.status(500).json({ message: "Error retrieving products!" });
    }
};

// Retrvieves products filtered by category
const getProductsByCategoryId = async (req, res) => {
    const id = parseInt(req.query.categoryId);

    const queryString = 'SELECT * FROM products WHERE main_category_id = $1';
    try {
        const products = await db.query(queryString, [id]);
        
        if (products.rowCount !== 0) {
            const result = [];
            for (const product of products.rows) {
                const retrievedProduct = await retrieveProduct(product);
                if (hasError(retrievedProduct)) return res.status(500).json({ message: "Error retrieving product!" });
                result.push(retrievedProduct);
                console.log(chalk.cyan.bold(`Retrieved a product with category id: ${id} from database.`));
            }

            console.log(chalk.magentaBright.bold(`Retrieved all products with category id: ${id} from database.`));
            res.status(200).json(result);
        } else {
            return res.status(404).json({message: `No products found with category id: ${id}`});
        }
    } catch (err) {
        console.error('Error retrieving products by category id:', err.message);
        res.status(500).json({ message: "Error retrieving products by category id!" });
    }
};

// Adds a new product in the database
const addProduct = async (req, res) => {
    const requestBody = req.body;

    // Check if all the required product fields are in the request body
    if (!requestBody.productName || !requestBody.mainCategoryId || (!requestBody.subCategoryId && requestBody.subCategoryId !== null) || 
        !requestBody.smallDescription || !requestBody.mainDescription || !requestBody.productQuantity || 
        !requestBody.productVariants || !requestBody.features || !requestBody.specifications || !requestBody.highlights) {
        return res.status(400).json({
            message: "Could not add a product! Include all required fields to add a product.",
            note: "Check example request body for new product in the documentation to properly add a new product",
            requiredFields: ["productName", "mainCategoryId", "subCategoryId", "smallDescription", "mainDescription", 
                             "productQuantity", "productVariants", "features", "specifications", "highlights"]
        });
    }

    // Check if there are String values in the respective fields
    if ((typeof requestBody.productName !== "string") || (typeof requestBody.smallDescription !== "string") || (typeof requestBody.mainDescription !== "string")) {
        return res.status(400).json({message: "`productName`, `smallDescription` and `mainDescription` fields must have a value typeof `string`!"});
    }

    // Check if there are Number values in the respective fields
    if ((typeof requestBody.mainCategoryId !== "number") || (typeof requestBody.productQuantity !== "number")) {
        return res.status(400).json({message: "Non numeric value! `mainCategoryId` and `productQuantity` must have `number` value type."});
    }

    // Check if productQuantity is positive integer
    if (requestBody.productQuantity <= 0) {
        return res.status(400).json({message: "Negavite value! `productQuantity` must have positive values."});
    }

    // Check if subCategoryId has number or null value
    if ((typeof requestBody.subCategoryId !== "number") && (requestBody.subCategoryId !== null)) {
        return res.status(400).json({message: "subCategoryId must have value type of `number` on `null`!"});
    }

    // Check if mainCategoryId and subCategoryId exists in database
    const checkMainCategoryId = 'SELECT * FROM categories WHERE id = $1';
    const checkSubCategoryId = (typeof requestBody.subCategoryId === "number") ? 'SELECT * FROM subcategories WHERE id = $1' : null;
    try {
        const category = await db.query(checkMainCategoryId, [requestBody.mainCategoryId]);
        if (category.rowCount === 0) return res.status(404).json({message: `No categories found with id: ${requestBody.mainCategoryId}`});
        if (checkSubCategoryId !== null) {
            const subcategory = await db.query(checkSubCategoryId, [requestBody.subCategoryId]);
            if (subcategory.rowCount === 0) return res.status(404).json({message: `No subcategories found with id: ${requestBody.subCategoryId}`});
        }
    } catch (err) {
        console.error('Error checking main or subCategory Id:', err.message);
        return res.status(500).json({ message: "Error checking main or subCategory Id!" });
    }

    // Check if there is at least 1 valid product variant in req.body
    if (Array.isArray(requestBody.productVariants)) {
        for (const variant of requestBody.productVariants) {

            if ((typeof variant === 'object') && (variant.constructor === Object)) {
                const fields = Object.keys(variant);
    
                if (!fields.includes("colorName") || !fields.includes("colorCode") || !fields.includes("unitPrice") || !fields.includes("imgUrls")) {
                    return res.status(400).json({
                        message: "Missing required fields in the `productVariants` object!",
                        requiredFields: ["colorName", "colorCode", "unitPrice", "imgUrls"]
                    });
                }

                if ((typeof variant.colorName !== "string") || (typeof variant.colorCode !== "string")) {
                    return res.status(400).json({message: "productVariants's > `colorName` and `colorCode` fields must have values typeof string!"});
                }

                if ((typeof variant.unitPrice !== "number") || variant.unitPrice <= 0) {
                    return res.status(400).json({message: "productVariants's > `unitPrice` field must have positive number value!"});
                }
        
                if (Array.isArray(variant.imgUrls)) {
                    for (const url of variant.imgUrls) {
                        if (typeof url !== "string") return res.status(400).json({message: "productVariants's > `imgUrls` array must have values typeof `string` storing image urls!"});
                    };
                } else {
                    return res.status(400).json({message: "productVariants's > `imgUrls` field must be array with string url values"});
                }
        
            } else {
                return res.status(400).json({message: "`productVariants` must have `Object` values!"});
            }
        };
    } else {
        return res.status(400).json({message: "`productVariants` must be an array with `Object` values!"});
    }

    // Check if features is an array with string values
    if (Array.isArray(requestBody.features)) {
        for (const feature of requestBody.features) {
            if (typeof feature !== "string") return res.status(400).json({message: "`features` array must have values typeof `string`!"});
        };
    } else {
        return res.status(400).json({message: "`features` must be an array with values typeof `string`!"});
    }

    // Check if there is at least 1 valid product specification in req.body
    if (Array.isArray(requestBody.specifications)) {
        for (const specification of requestBody.specifications) {
            if ((typeof specification === 'object') && (specification.constructor === Object)) {
                const fields = Object.keys(specification);
    
                if (fields.includes("specName") && fields.includes("specContent")) {
                    if ((typeof specification.specName !== "string") || (typeof specification.specContent !== "string")) {
                        return res.status(400).json({message: "specifications's > `specName` and `specContent` fields must have values typeof string!"});
                    }
                } else {
                    return res.status(400).json({
                        message: "Missing required fields in the `specifications` array's one of the object!",
                        requiredFields: ["specName", "specContent"]
                    });
                }

            } else {
                return res.status(400).json({message: "`specifications` must have `Object` values!"});
            }
        };
    } else {
        return res.status(400).json({message: "`specifications` must be an array with `Object` values!"});
    }

    // Check if there is at least 1 valid product highlight in req.body
    if (Array.isArray(requestBody.highlights)) {
        for (const highlight of requestBody.highlights) {
            if ((typeof highlight === 'object') && (highlight.constructor === Object)) {
                const fields = Object.keys(highlight);
    
                if (fields.includes("title") && fields.includes("content") && fields.includes("imgUrl")) {
                    if ((typeof highlight.title !== "string") || (typeof highlight.content !== "string") || (typeof highlight.imgUrl !== "string")) {
                        return res.status(400).json({message: "highlights's > `title`, `content` and `imgUrl` fields must have values typeof string!"});
                    }
                } else {
                    return res.status(400).json({
                        message: "Missing required fields in the `highlights` array's one of the object!",
                        requiredFields: ["title", "content", "imgUrl"]
                    });
                }

            } else {
                return res.status(400).json({message: "`highlights` must have `Object` values!"});
            }
        };
    } else {
        return res.status(400).json({message: "`highlights` must be an array with `Object` values!"});
    }


    let step = 1;     // Simply counts number of completed steps before adding a product
    // Fill products table
    let productId = "";
    const productsTableQuery = 'INSERT INTO products (product_name, main_category_id, sub_category_id, small_description, main_description, product_quantity) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    try {
        const newProduct = await db.query(productsTableQuery, [requestBody.productName, requestBody.mainCategoryId, requestBody.subCategoryId, 
                                                               requestBody.smallDescription, requestBody.mainDescription, requestBody.productQuantity,]);
        productId = newProduct.rows[0].id;
        console.log(chalk.cyan.bold(`${step++}. Product details added in products table.`));
    } catch (err) {
        console.error('Error adding product:', err.message);
        return res.status(500).json({ message: "Error adding product!" });
    }

    // Fill product_colors and product_images tables
    for (const variant of requestBody.productVariants) {
        
        // Check if the variant's color exist. If not add in the database
        let colorId = null;
        const checkColorQuery = 'SELECT * FROM colors WHERE name = $1 AND code = $2';
        try {
            const result = await db.query(checkColorQuery, [variant.colorName.toLowerCase(), variant.colorCode.toLowerCase()]);
            if (result.rowCount === 0) {
                const addColorQuery = 'INSERT INTO colors (name, code) VALUES ($1, $2) RETURNING id';
                const newColor = await db.query(addColorQuery, [variant.colorName.toLowerCase(), variant.colorCode.toLowerCase()]);
                colorId = newColor.rows[0].id;
                console.log(chalk.yellow("--- New color added in `colors` table."));
            } else {
                colorId = result.rows[0].id;
            }
        } catch (err) {
            console.error('Error checking/adding color in the colors table:', err.message);
            return res.status(500).json({ message: "Error checking/adding color in the colors table!" });
        }

        // Fill product_colors table
        const productColorsQuery = 'INSERT INTO product_colors (product_id, color_id, unit_price) VALUES ($1, $2, $3)';
        try {
            await db.query(productColorsQuery, [productId, colorId, variant.unitPrice]);
            console.log(chalk.yellow("--- Product color added in `product_colors` table."));
        } catch (err) {
            console.error('Error adding product color in the product_colors table:', err.message);
            return res.status(500).json({ message: "Error adding product color in the product_colors table!" });
        }

        // Fill product_images table
        const productImagesQuery = 'INSERT INTO product_images VALUES ($1, $2, $3)';
        for (const url of variant.imgUrls) {
            try {
                await db.query(productImagesQuery, [productId, colorId, url]);
            } catch (err) {
                console.error('Error adding product image in the product_images table:', err.message);
                return res.status(500).json({ message: "Error adding product image in the product_images table!" });
            }
        };
        console.log(chalk.yellow(`--- Product images for color: ${variant.colorName} added in product_images table.`));
    };
    console.log(chalk.cyan.bold(`${step++}. All product colors and respective images added in product_colors and product_images tables.`));

    // Fill product_features table
    const featuresQuery = 'INSERT INTO product_features VALUES ($1, $2)';
    for (const feature of requestBody.features) {
        try {
            await db.query(featuresQuery, [productId, feature]);
        } catch (err) {
            console.error('Error adding product feature in the product_features table:', err.message);
            return res.status(500).json({ message: "Error adding product feature in the product_features table!" });
        }
    };
    console.log(chalk.cyan.bold(`${step++}. Product features added in product_features table.`));

    // Fill product_specifications table
    const specificationsQuery = 'INSERT INTO product_specifications VALUES ($1, $2, $3)';
    for (const spec of requestBody.specifications) {
        try {
            await db.query(specificationsQuery, [productId, spec.specName, spec.specContent]);
        } catch (err) {
            console.error('Error adding product specification in the product_specifications table:', err.message);
            return res.status(500).json({ message: "Error adding product specification in the product_specifications table!" });
        }
    };
    console.log(chalk.cyan.bold(`${step++}. Product specifications added in product_specifications table.`));
    

    // Fill product_highlights table
    const highlightsQuery = 'INSERT INTO product_highlights VALUES ($1, $2, $3, $4)';
    for (const highlight of requestBody.highlights) {
        try {
            await db.query(highlightsQuery, [productId, highlight.title, highlight.content, highlight.imgUrl]);
        } catch (err) {
            console.error('Error adding product highlight in the product_highlights table:', err.message);
            return res.status(500).json({ message: "Error adding product highlight in the product_highlights table!" });
        }
    };
    console.log(chalk.cyan.bold(`${step++}. Product highlights added in product_highlights table.`));


    res.status(201).json({message: "New product added"});
    console.log(chalk.magentaBright.bold(`${step}. (*_*) New product with id: ${productId} added in the database.`));
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
        res.status(500).json({ message: "Error updating product!" });
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
        res.status(500).json({ message: "Error deleting product!" });
    }
};



// Helper functions

const retrieveProduct = async (product) => {
    const id = product.id;
    const productMeta = product;

    const productVariants = await getProductVariants(id);
    if (hasError(productVariants)) return productVariants;

    const features = await getFeatures(id);
    if (hasError(features)) return features;

    const specifications = await getSpecifications(id);
    if (hasError(specifications)) return specifications;

    const highlights = await getHighlights(id);
    if (hasError(highlights)) return highlights;

    const result = {
        id: id,
        productName: productMeta.product_name,
        mainCategoryId: productMeta.main_category_id,
        subCategoryId: productMeta.sub_category_id,
        smallDescription: productMeta.small_description,
        mainDescription: productMeta.main_description,
        reviewsScore: productMeta.reviews_score,
        reviewsQuantity: productMeta.reviews_quantity,
        quantityLeft: productMeta.quantity_left,
        productVariants: productVariants,
        features: features,
        specifications: specifications,
        highlights: highlights
    }

    return result;
};

const getProductVariants = async (id) => {
    let colors = [];
    const colorQuery = 'SELECT color_id, name, code, unit_price FROM product_colors JOIN colors ON product_colors.color_id = colors.id WHERE product_colors.product_id = $1 ORDER BY product_colors.id';
    try {
        colors = await db.query(colorQuery, [id]);
    } catch (err) {
        console.error('Error getting product colors:', err.message);
        return err;
    }

    let images = [];
    const imagesQuery = 'SELECT img_url FROM product_images WHERE product_id = $1 AND color_id = $2';
    for (const color of colors.rows) {
        try {
            const result = await db.query(imagesQuery, [id, color.color_id]);
            images.push(result.rows);
        } catch (err) {
            console.error(`Error getting product images for color ${color.name}:`, err.message);
            return err;
        }
    }

    const productVariants = [];
    for (let i = 0; i < colors.rows.length; i++) {
        const variant = {
            colorName: colors.rows[i].name,
            colorCode: colors.rows[i].code,
            unitPrice: colors.rows[i].unit_price,
            imgUrls: []
        };

        for (const colorImages of images[i]) {
            variant.imgUrls.push(colorImages.img_url);
        }

        productVariants.push(variant);
    }

    return productVariants;
};

const getFeatures = async (id) => {
    let features = [];
    const queryString = 'SELECT product_feature FROM product_features WHERE product_id = $1';
    try {
        features = await db.query(queryString, [id]);
    } catch (err) {
        console.error('Error getting product features:', err.message);
        return err;
    }

    const result = [];
    let index = 0;
    for (const feature of features.rows) {
        result.push({id: index++, content: feature.product_feature});
    }

    return result;
};

const getSpecifications = async (id) => {
    let specifications = [];
    const queryString = 'SELECT spec_name AS name, spec_content AS content FROM product_specifications WHERE product_id = $1';
    try {
        specifications = await db.query(queryString, [id]);
    } catch (err) {
        console.error('Error getting product specifications:', err.message);
        return err;
    }

    return specifications.rows;
};

const getHighlights = async (id) => {
    let highlights = [];
    const queryString = 'SELECT title, content, img_url AS url FROM product_highlights WHERE product_id = $1';
    try {
        highlights = await db.query(queryString, [id]);
    } catch (err) {
        console.error('Error getting product highlights:', err.message);
        return err;
    }

    return highlights.rows;
};

module.exports = {
    getProducts,
    getProductsByCategoryId,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductVariants
};