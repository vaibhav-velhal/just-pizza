const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("carts", cartSchema);