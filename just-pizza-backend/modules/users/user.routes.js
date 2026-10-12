const express = require("express");
const router = express.Router();
const userService = require("./user.service.js");


// Get users
// router.get("/", userService.getAllUsers);

// Get a single user
router.get("/", userService.getUserById);

// // Insert user
// router.post("/", userService.addUser);

// Delete user
router.delete("/", userService.deleteUser);

// Update user
router.patch("/", userService.updateUser);


module.exports = router;