const express = require("express");
const router = express.Router();
const paymentService = require("./payment.service.js");

// Razorpay Webhook
router.post("/", paymentService.handleWebhook);

module.exports = router;