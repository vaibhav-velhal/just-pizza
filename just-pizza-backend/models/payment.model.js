const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orders",
            required: true
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },

        razorpayOrderId: {
            type: String,
            required: true
        },

        razorpayPaymentId: {
            type: String,
            default: null
        },

        amount: {
            type: Number,
            required: true
        },

        currency: {
            type: String,
            default: "INR"
        },

        status: {
            type: String,
            enum: ["created", "pending", "paid", "failed"],
            default: "created"
        },

        signature: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("payments", paymentSchema);