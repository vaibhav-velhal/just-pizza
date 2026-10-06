require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/mongodb.connect.js");

const categoryModel = require("../models/category.model.js");
const productModel = require("../models/product.model.js");

const seedDatabase = async function() {
    try {
        await connectDB;

        console.log("MongoDB connected.");

        await productModel.deleteMany({});
        await categoryModel.deleteMany({});

        console.log("Existing categories and products cleared.");

        const categories = await categoryModel.insertMany([
            { name: "Veg" },
            { name: "Non-Veg" },
            { name: "Popular" },
            { name: "Specialty" },
            { name: "Cheese" }
        ]);

        const categoryMap = {};

        categories.forEach((category) => {
            categoryMap[category.name] = category._id;
        });

        await productModel.insertMany([
            {
                name: "Margherita Pizza",
                description: "Classic pizza topped with tomato sauce, mozzarella cheese and fresh basil.",
                price: 249,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606526/margherita-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "Pepperoni Pizza",
                description: "Classic pizza topped with rich tomato sauce, mozzarella cheese and spicy pepperoni slices.",
                price: 349,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790605470/pepperoni-pizza.jpg",
                categoryIds: [
                    categoryMap["Non-Veg"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "Mediterranean Pizza",
                description: "A flavorful pizza topped with fresh vegetables, olives, herbs and mozzarella cheese.",
                price: 299,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606577/mediterranean-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"],
                    categoryMap["Specialty"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "New York Style Pizza",
                description: "Classic New York-style pizza with a thin, crispy crust, tomato sauce and melted mozzarella cheese.",
                price: 349,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606558/new-york-style-pizza.jpg",
                categoryIds: [
                    categoryMap["Specialty"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "Four Cheese Pizza",
                description: "A rich and creamy pizza made with a delicious blend of four different cheeses.",
                price: 399,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606522/four-cheese-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"],
                    categoryMap["Cheese"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "BBQ Chicken Pizza",
                description: "Savory pizza topped with tender chicken, smoky barbecue sauce, mozzarella cheese and fresh toppings.",
                price: 429,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606474/bbq-chicken-pizza.jpg",
                categoryIds: [
                    categoryMap["Non-Veg"],
                    categoryMap["Popular"]
                ]
            },

            {
                name: "Supreme Pizza",
                description: "Loaded pizza topped with vegetables, pepperoni, chicken, mozzarella cheese and flavorful tomato sauce.",
                price: 350,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606581/supreme-pizza.jpg",
                categoryIds: [
                    categoryMap["Non-Veg"]
                ]
            },

            {
                name: "Chicken Alfredo Pizza",
                description: "Creamy pizza topped with tender chicken, Alfredo sauce, mozzarella cheese and Italian herbs.",
                price: 399,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606547/chicken-alfredo-pizza.jpg",
                categoryIds: [
                    categoryMap["Non-Veg"]
                ]
            },

            {
                name: "Neapolitan Pizza",
                description: "Traditional Italian pizza with a soft thin crust, tomato sauce, mozzarella cheese and fresh basil.",
                price: 350,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606526/neapolitan-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"],
                    categoryMap["Specialty"]
                ]
            },

            {
                name: "Sicilian Pizza",
                description: "Thick-crust Italian pizza topped with tomato sauce, mozzarella cheese, herbs and fresh toppings.",
                price: 299,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606576/sicilian-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"],
                    categoryMap["Specialty"]
                ]
            },

            {
                name: "Mushroom Pizza",
                description: "Delicious vegetarian pizza topped with fresh mushrooms, mozzarella cheese, tomato sauce and Italian herbs.",
                price: 399,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606518/mushroom-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"]
                ]
            },

            {
                name: "Veggie Pizza",
                description: "Fresh vegetarian pizza topped with colorful vegetables, tomato sauce, mozzarella cheese and Italian herbs.",
                price: 399,
                image: "https://res.cloudinary.com/h4etvqli/image/upload/v1790606582/veggie-pizza.jpg",
                categoryIds: [
                    categoryMap["Veg"]
                ]
            }
        ]);

        console.log("Categories and products seeded successfully.");

    } catch (error) {
        console.error("Database seeding failed:", error);
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB disconnected.");
    }
};

seedDatabase();