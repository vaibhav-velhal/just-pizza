const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const router = express.Router();

const mongoDbConn = require("./config/mongodb.connect.js");
const middleware = require("./middleware.js");

const authRoutes = require("./modules/auth/auth.routes.js");
const userRoutes = require("./modules/users/user.routes.js");
const categoryRoutes = require("./modules/categories/category.routes.js");
const productRoutes = require("./modules/products/product.routes.js");
const cartRoutes = require("./modules/cart/cart.routes.js");
const orderRoutes = require("./modules/orders/order.routes.js");
const paymentRoutes = require("./modules/payments/payment.routes.js");
const paymentWebhookRoutes = require("./modules/payments/payment.webhook.routes.js");


app.use(
    express.json({
        verify: function(req, res, buf) {
            req.rawBody = buf;
        }
    })
);

app.use(cors());


// Routes
// auth route
router.use("/api/auth", authRoutes);

// User route
router.use("/api/user", middleware.auth, userRoutes);

// Category route
router.use("/api/category", categoryRoutes);

// Product route
router.use("/api/product", productRoutes);

// Cart route
router.use("/api/cart", middleware.auth, cartRoutes);

// Order route
router.use("/api/order", middleware.auth, orderRoutes);

// Razorpay Webhook
router.use("/api/payment/webhook", paymentWebhookRoutes);

// Payment route
router.use("/api/payment", middleware.auth, paymentRoutes);


// Response middleware
router.use(middleware.resp);

app.use(router);


// Run server
mongoDbConn
    .then(function(db){
        app.locals.db = db.connection;
        console.log("[>>>] Connected to DB.");        
        app.listen(3000, function(){
            console.log("[>>>] The server is up and running...");
        });
    }).catch(function(error){
        console.log(error);
    });