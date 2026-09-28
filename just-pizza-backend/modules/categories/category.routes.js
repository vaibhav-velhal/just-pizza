const express = require("express");
const router = express.Router();

const categoryService = require("./category.service.js");

// Get all categories
router.get("/", categoryService.getAllCategories);

// Get one category
router.get("/:categoryId", categoryService.getCategoryById);

// Add category
router.post("/", categoryService.addCategory);

// Update category
router.patch("/:categoryId", categoryService.updateCategory);

// Delete category
router.delete("/:categoryId", categoryService.deleteCategory);

module.exports = router;