const paymentModel = require("../../models/payment.model.js");

const paymentDb = {};

// Create payment
paymentDb.createPayment = function (paymentObj) {
    return paymentModel.create(paymentObj);
};

// Find payment by order ID
paymentDb.getPaymentByOrderId = function (orderId) {
    return paymentModel.findOne({ orderId });
};

// Find payment by Razorpay order ID
paymentDb.getPaymentByRazorpayOrderId = function (razorpayOrderId) {
    return paymentModel.findOne({
        razorpayOrderId: razorpayOrderId
    });
};

// Update payment
paymentDb.updatePayment = function (razorpayOrderId, paymentObj) {
    return paymentModel.updateOne(
        { razorpayOrderId: razorpayOrderId },
        { $set: paymentObj }
    );
};

module.exports = paymentDb;