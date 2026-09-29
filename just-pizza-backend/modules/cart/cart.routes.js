const express = require("express");
const router = express.Router();
const cartService = require("./cart.service.js");

// Get logged-in user's cart
router.get("/", cartService.getCart);

// Add product to cart
router.post("/", cartService.addToCart);

// Update product quantity
router.patch("/:productId", cartService.updateCartItem);

// Remove product from cart
router.delete("/:productId", cartService.removeCartItem);

// Clear cart
router.delete("/", cartService.clearCart);

module.exports = router;