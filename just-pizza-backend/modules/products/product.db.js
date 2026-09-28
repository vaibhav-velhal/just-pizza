const productModel = require("../../models/product.model.js");

const productDb = {};

// Get all products
productDb.getAllProducts = function () {
    return productModel.find({});
};

// Get one product
productDb.getProductById = function (productId) {
    return productModel.findById(productId);
};

// Add product
productDb.addProduct = function (productObj) {
    const newProduct = new productModel(productObj);
    return newProduct.save();
};

// Update product
productDb.updateProduct = function (productId, productObj) {
    return productModel.updateOne(
        { _id: productId },
        { $set: productObj }
    );
};

// Delete product
productDb.deleteProduct = function (productId) {
    return productModel.deleteOne({ _id: productId });
};

module.exports = productDb;