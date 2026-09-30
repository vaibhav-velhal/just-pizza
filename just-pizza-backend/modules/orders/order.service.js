const mongoose = require("mongoose");

const orderDb = require("./order.db.js");
const cartModel = require("../../models/cart.model.js");
const cartItemModel = require("../../models/cart-item.model.js");
const productModel = require("../../models/product.model.js");

const orderService = {};


// Create Order
orderService.createOrder = async function(req, res, next) {
    try {
        const userId = req.headers.userId;

        // Get user's cart
        const cart = await cartModel.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                msg: "Cart not found."
            });
        }

        // Get cart items
        const cartItems = await cartItemModel.find({
            cartId: cart._id
        });

        if (cartItems.length === 0) {
            return res.status(400).json({
                msg: "Cart is empty."
            });
        }

        // Get products from database
        const productIds = cartItems.map((item) => item.productId);

        const products = await productModel.find({
            _id: { $in: productIds }
        });

        // Create a product lookup
        const productMap = {};

        products.forEach((product) => {
            productMap[product._id.toString()] = product;
        });

        // Prepare order items and calculate total
        let totalAmount = 0;

        const orderItems = cartItems.map((cartItem) => {

            const product = productMap[cartItem.productId.toString()];

            if (!product) {
                throw new Error("Product not found.");
            }

            const itemTotal = product.price * cartItem.quantity;

            totalAmount += itemTotal;

            return {
                productId: product._id,
                quantity: cartItem.quantity,
                price: product.price
            };
        });

        // Create Order
        const order = await orderDb.createOrder({
            userId: userId,
            totalAmount: totalAmount
        });

        // Add orderId to every order item
        const orderItemsWithOrderId = orderItems.map((item) => ({
            ...item,
            orderId: order._id
        }));

        // Create Order Items
        await orderDb.createOrderItems(orderItemsWithOrderId);

        // Clear Cart
        await cartItemModel.deleteMany({
            cartId: cart._id
        });

        res.status(201).json({
            msg: "Order created successfully!",
            orderId: order._id,
            totalAmount: order.totalAmount,
            status: order.status,
            paymentStatus: order.paymentStatus
        });

    } catch(error) {
        next(error);
    }
};


// Get User Orders
orderService.getOrders = async function(req, res, next) {
    try {
        const userId = req.headers.userId;

        const orders = await orderDb.getOrdersByUser(userId);

        res.status(200).json(orders);

    } catch(error) {
        next(error);
    }
};


// Get Single Order
orderService.getOrderById = async function(req, res, next) {
    try {
        const userId = req.headers.userId;
        const orderId = req.params.orderId;

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            return res.status(400).json({
                msg: "Invalid order ID."
            });
        }

        const order = await orderDb.getOrderById(
            orderId,
            userId
        );

        if (!order) {
            return res.status(404).json({
                msg: "Order not found."
            });
        }

        const orderItems = await orderDb.getOrderItems(orderId);

        res.status(200).json({
            order,
            items: orderItems
        });

    } catch(error) {
        next(error);
    }
};


module.exports = orderService;