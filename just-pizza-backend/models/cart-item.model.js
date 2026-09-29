const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        required: true
    },

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true
    },

    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

cartItemSchema.index(
    { cartId: 1, productId: 1 },
    { unique: true }
);

module.exports = mongoose.model("cartItems", cartItemSchema);