const db = require('../models/index');
const { hasError } = require('../utils/error');
const { getProductVariants } = require('../controllers/product.controllers');

// Retrieves user's all orders
const getOrders = (req, res) => {
    res.status(200).json(req.orders);
};

// Retrvieves user's orders filtered by order status
const getOrdersByStatus = (req, res) => {
    const { status } = req.query;
    if (!(status === "pending" || status === "completed")) {
        res.status(400).json({message: "Invalid status value in the query string! Status value must be `pending` or `completed`!"});
        return;
    }

    const orders = req.orders;
    const result = orders.filter((order) => order.status === status);
    if (result.length > 0) {
        res.status(200).json(result);
    } else {
        res.status(404).json({message: `No orders found with status: ${status}`});
    };
};


const getOrderById = async (req, res) => {
    const result = {
        orderId: req.orderId,
        totalValue: req.order.total_value,
        status: req.order.status,
        createdAt: req.order.created_at,
    };

    const orderAddress = await getOrderAddress(req.orderId);
    if (hasError(orderAddress)) return res.status(500).json({ message: "Error retrieving order address."});

    const orderItems = await getOrderItems(req.orderId);
    if (hasError(orderItems)) return res.status(500).json({ message: "Error retrieving order items."});

    result.orderAddress = orderAddress;
    result.orderItems = orderItems;
    res.status(200).json(result);
};

// Retrieves order items
// const getOrderItems = async (req, res) => {
//     const queryString = 'SELECT products.product_name, order_items.product_quantity FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = $1';
//     try {
//         const result = await db.query(queryString, [req.orderId]);
//         res.status(200).json(result.rows);
//     } catch (err) {
//         console.error('Error retrieving order items:', err.message);
//         res.status(500).json({ message: err.message });
//     }
// };

// Updates order status
const updateOrderStatus = async (req, res) => {
    const newStatus = req.query.status;

    if (!newStatus) return res.status(400).json({ message: "You must use `status` query string to update order status!"});

    const queryString = 'UPDATE orders SET status = $1 WHERE id = $2';
    try {
        await db.query(queryString, [newStatus, req.orderId]);
        res.status(200).json({message: `Order status updated to > '${newStatus}' for the order with ID: ${req.orderId}`});
    } catch (err) {
        console.error('Error updating order status:', err.message);
        res.status(500).json({ message: "Error updating order status" });
    }
};

// Deletes an order
const deleteOrder = async (req, res) => {
    const queryString = 'DELETE FROM orders WHERE id = $1';
    try {
        await db.query(queryString, [req.orderId]);
        res.status(200).json({message: `Order with id: ${req.orderId} deleted`});
    } catch (err) {
        console.error('Error deleting order:', err.message);
        res.status(500).json({ message: "Error deleting order" });
    }
};



// Helper functions

// Gets order address
const getOrderAddress = async (orderId) => {
    let address = {};
    const queryString = 'SELECT * FROM order_address WHERE order_id = $1';
    try {
        const queryResult = await db.query(queryString, [orderId]);
        address = queryResult.rows[0];
    } catch (err) {
        console.error('Error retrieving order address:', err.message);
        return err;
    }

    const result = {
        firstName: address.first_name,
        lastName: address.last_name,
        country: address.country,
        address: address.address,
        apartment: address.apartment,
        city: address.city,
        state: address.state,
        zipCode: address.zipcode,
        phone: address.phone
    };

    return result;
};

// Gets order items
const getOrderItems = async (orderId) => {
    // Get product meta of each order item
    let products = [];
    const queryString = 'SELECT products.id, products.product_name, order_items.product_quantity, order_items.product_variant FROM order_items JOIN products ON order_items.product_id = products.id WHERE order_items.order_id = $1';
    try {
        const queryResult = await db.query(queryString, [orderId]);
        products = queryResult.rows;
    } catch (err) {
        console.error('Error retrieving product meta from order:', err.message);
        return err;
    }

    let orderItems = [];

    // Get product variants for each product in the order
    for (const product of products) {
        const productVariants = await getProductVariants(product.id);
        const variant = productVariants[product.product_variant];
        const orderItem = {
            productId: product.id,
            productName: product.product_name,
            productQuantity: product.product_quantity,
            productVariant: product.product_variant,
            unitPrice: variant.unitPrice,
            colorName: variant.colorName,
            imgUrl: variant.imgUrls[0],
        };
        orderItems.push(orderItem);
    }

    return orderItems;
}

module.exports = {
    getOrders,
    getOrdersByStatus,
    getOrderById,
    getOrderItems,
    updateOrderStatus,
    deleteOrder
};