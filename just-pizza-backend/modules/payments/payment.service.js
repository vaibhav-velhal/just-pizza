const crypto = require("crypto");
const razorpay = require("../../config/razorpay.config.js");
const paymentDb = require("./payment.db.js");
const orderModel = require("../../models/order.model.js");
const cartModel = require("../../models/cart.model.js");
const cartItemModel = require("../../models/cart-item.model.js");
const { ObjectId } = require("mongoose").Types;

const paymentService = {};


// Create Razorpay Order
paymentService.createPayment = async function (req, res, next) {
    try {

        const userId = req.headers.userId;
        const { orderId } = req.body;

        if (!orderId) {
            return res.status(400).json({
                msg: "Order ID is required."
            });
        }

        const order = await orderModel.findOne({
            _id: new ObjectId(orderId),
            userId: new ObjectId(userId)
        });

        if (!order) {
            return res.status(404).json({
                msg: "Order not found."
            });
        }

        if (order.status !== "pending") {
            return res.status(400).json({
                msg: "This order cannot be paid."
            });
        }

        // Amount is stored in rupees in our database.
        // Razorpay requires amount in paise.
        const amountInPaise = order.totalAmount * 100;

        const razorpayOrder = await razorpay.orders.create({
            amount: amountInPaise,
            currency: "INR",
            receipt: orderId
        });

        const payment = await paymentDb.createPayment({
            orderId: order._id,
            userId: new ObjectId(userId),
            razorpayOrderId: razorpayOrder.id,
            amount: order.totalAmount,
            currency: "INR",
            status: "created"
        });

        res.status(201).json({
            msg: "Razorpay order created successfully!",
            paymentId: payment._id,
            orderId: order._id,
            razorpayOrderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });

    } catch (error) {
        next(error);
    }
};


// Verify Razorpay payment
paymentService.verifyPayment = async function(req, res, next) {
    try {
        const userId = req.headers.userId;

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                msg: "Invalid payment details."
            });
        }

        // Find payment record
        const payment = await paymentDb.getPaymentByRazorpayOrderId(
            razorpay_order_id
        );

        if (!payment) {
            return res.status(404).json({
                msg: "Payment not found."
            });
        }

        // Check payment ownership
        if (payment.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                msg: "Access forbidden!"
            });
        }

        // Generate signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_order_id + "|" + razorpay_payment_id
            )
            .digest("hex");

        // Compare signatures
        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({
                msg: "Payment verification failed."
            });
        }

        // Update payment record
        await paymentDb.updatePayment(
            razorpay_order_id,
            {
                razorpayPaymentId: razorpay_payment_id,
                signature: razorpay_signature,
                status: "paid"
            }
        );

        // Update order payment status
        await orderModel.updateOne(
            { _id: new ObjectId(payment.orderId) },
            {
                $set: {
                    paymentStatus: "paid",
                    status: "confirmed"
                }
            }
        );

        // Clear cart after successful payment
        const cart = await cartModel.findOne({
            userId: payment.userId
        });

        if (cart) {
            await cartItemModel.deleteMany({
                cartId: cart._id
            });
        }

        res.status(200).json({
            msg: "Payment verified successfully!"
        });

    } catch (error) {
        next(error);
    }
};



// Razorpay Webhook
paymentService.handleWebhook = async function(req, res, next) {
    try {

        const webhookSignature = req.headers["x-razorpay-signature"];

        if (!webhookSignature) {
            return res.status(400).json({
                msg: "Webhook signature is missing."
            });
        }

        // Verify Razorpay webhook signature
        const generatedSignature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_WEBHOOK_SECRET
            )
            .update(req.rawBody)
            .digest("hex");

        if (generatedSignature !== webhookSignature) {
            return res.status(400).json({
                msg: "Invalid webhook signature."
            });
        }

        const event = req.body.event;

        // console.log("Razorpay Webhook Event:", event);

        // Payment captured successfully
        if (event === "payment.captured") {

            const paymentEntity = req.body.payload.payment.entity;

            const razorpayOrderId = paymentEntity.order_id;
            const razorpayPaymentId = paymentEntity.id;

            const payment = await paymentDb.getPaymentByRazorpayOrderId(
                razorpayOrderId
            );

            if (!payment) {
                return res.status(404).json({
                    msg: "Payment not found."
                });
            }

            // Idempotency check
            if (payment.status === "paid") {
                return res.status(200).json({
                    msg: "Payment already processed."
                });
            }

            // Update payment
            await paymentDb.updatePayment(
                razorpayOrderId,
                {
                    razorpayPaymentId: razorpayPaymentId,
                    status: "paid"
                }
            );

            // Update order
            await orderModel.updateOne(
                { _id: new ObjectId(payment.orderId) },
                {
                    $set: {
                        paymentStatus: "paid",
                        status: "confirmed"
                    }
                }
            );

            // Clear cart after successful payment
            const cart = await cartModel.findOne({
                userId: payment.userId
            });

            if (cart) {
                await cartItemModel.deleteMany({
                    cartId: cart._id
                });
            }

            // console.log("Payment marked as paid through webhook.");
        }


        // Payment failed
        if (event === "payment.failed") {

            const paymentEntity = req.body.payload.payment.entity;

            const razorpayOrderId = paymentEntity.order_id;
            const razorpayPaymentId = paymentEntity.id;

            const payment = await paymentDb.getPaymentByRazorpayOrderId(
                razorpayOrderId
            );

            if (!payment) {
                return res.status(404).json({
                    msg: "Payment not found."
                });
            }

            // Update payment
            await paymentDb.updatePayment(
                razorpayOrderId,
                {
                    razorpayPaymentId: razorpayPaymentId,
                    status: "failed"
                }
            );

            // Update order
            await orderModel.updateOne(
                { _id: new ObjectId(payment.orderId) },
                {
                    $set: {
                        paymentStatus: "failed",
                        status: "cancelled"
                    }
                }
            );

            // console.log("Payment marked as failed through webhook.");
        }

        res.status(200).json({
            msg: "Webhook processed successfully."
        });

    } catch (error) {
        next(error);
    }
};


module.exports = paymentService;