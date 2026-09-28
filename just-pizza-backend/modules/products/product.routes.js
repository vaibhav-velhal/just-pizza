const express = require("express");
const router = express.Router();
const productService = require("./product.service.js");

// Get all products
router.get("/", productService.getAllProducts);

// Get one product by ID
router.get("/:productId", productService.getProductById);

// Add product
router.post("/", productService.addProduct);

// Update product
router.patch("/:productId", productService.updateProduct);

// Delete product
router.delete("/:productId", productService.deleteProduct);

module.exports = router;