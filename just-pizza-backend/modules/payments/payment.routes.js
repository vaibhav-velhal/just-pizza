const express = require("express");
const router = express.Router();
const paymentService = require("./payment.service.js");

// Create Razorpay Order
router.post("/create", paymentService.createPayment);

// Verify Razorpay payment
router.post("/verify", paymentService.verifyPayment);

module.exports = router;