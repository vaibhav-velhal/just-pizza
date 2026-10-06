require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/mongodb.connect.js");

const userModel = require("../models/user.model.js");
const cartModel = require("../models/cart.model.js");
const cartItemModel = require("../models/cart-item.model.js");
const categoryModel = require("../models/category.model.js");
const productModel = require("../models/product.model.js");
const orderModel = require("../models/order.model.js");
const orderItemModel = require("../models/order-item.model.js");
const paymentModel = require("../models/payment.model.js");

const migrateDatabase = async function () {
    try {
        await connectDB;

        console.log("MongoDB connected.");

        await Promise.all([
            userModel.syncIndexes(),
            cartModel.syncIndexes(),
            cartItemModel.syncIndexes(),
            categoryModel.syncIndexes(),
            productModel.syncIndexes(),
            orderModel.syncIndexes(),
            orderItemModel.syncIndexes(),
            paymentModel.syncIndexes()
        ]);

        console.log("Database indexes synchronized successfully.");

    } catch (error) {
        console.error("Database migration failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

migrateDatabase();