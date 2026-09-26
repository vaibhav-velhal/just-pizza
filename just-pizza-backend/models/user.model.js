const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, minlength: 2, maxlength: 20, required: true },
    lastName: { type: String, minlength: 2, maxlength: 20, required: true },
    phone: { type: String, match: /^[0-9]{10}$/, required: true },
    email: { type: String, unique: true, lowercase: true, minlength: 3, maxlength: 30, required: true },
    password: { type: String, minlength: 32, maxlength: 32, required: true },   // Encrypted password from md5 is 32 characters
});

module.exports = mongoose.model('users', userSchema);