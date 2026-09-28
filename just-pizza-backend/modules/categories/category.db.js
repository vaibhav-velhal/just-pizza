const categoryModel = require("../../models/category.model.js");

const categoryDb = {};

// Get all categories
categoryDb.getAllCategories = function () {
    return categoryModel.find({});
};

// Get one category by ID
categoryDb.getCategoryById = function (categoryId) {
    return categoryModel.findById(categoryId);
};

// Add category
categoryDb.addCategory = function (categoryObj) {
    const newCategory = new categoryModel(categoryObj);
    return newCategory.save();
};

// Update category
categoryDb.updateCategory = function (categoryId, categoryObj) {
    return categoryModel.updateOne(
        { _id: categoryId },
        { $set: categoryObj }
    );
};

// Delete category
categoryDb.deleteCategory = function (categoryId) {
    return categoryModel.deleteOne({ _id: categoryId });
};

module.exports = categoryDb;