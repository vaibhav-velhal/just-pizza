const orderModel = require("../../models/order.model.js");
const orderItemModel = require("../../models/order-item.model.js");

const orderDb = {};

// Create Order
orderDb.createOrder = function (orderData) {
    const newOrder = new orderModel(orderData);
    return newOrder.save();
};

// Create Order Items
orderDb.createOrderItems = function (orderItems) {
    return orderItemModel.insertMany(orderItems);
};

// Get Orders of a User
orderDb.getOrdersByUser = function (userId) {
    return orderModel
        .find({ userId })
        .sort({ createdAt: -1 });
};

// Get Single Order
orderDb.getOrderById = function (orderId, userId) {
    return orderModel.findOne({
        _id: orderId,
        userId: userId
    });
};

// Get Order Items
orderDb.getOrderItems = function (orderId) {
    return orderItemModel.find({ orderId });
};

module.exports = orderDb;