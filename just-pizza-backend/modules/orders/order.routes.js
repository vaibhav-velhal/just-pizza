const express = require("express");
const router = express.Router();

const orderService = require("./order.service.js");

// Create Order
router.post("/", orderService.createOrder);

// Get all orders of logged-in user
router.get("/", orderService.getOrders);

// Get single order
router.get("/:orderId", orderService.getOrderById);

module.exports = router;