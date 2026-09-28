const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },

    categoryIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
        required: true
    }]
});

module.exports = mongoose.model("products", productSchema);