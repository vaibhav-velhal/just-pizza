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


app.use(express.json());

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