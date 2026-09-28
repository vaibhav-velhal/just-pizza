const joi = require("joi");
const categoryDb = require("./category.db.js");

const categoryService = {};

// Get all categories
categoryService.getAllCategories = function (req, res, next) {
    try {
        categoryDb.getAllCategories()
            .then(function (categories) {
                res.status(200).json(categories);
            })
            .catch(function (error) {
                next(error);
            });
    } catch (error) {
        next(error);
    }
};


// Get one category by ID
categoryService.getCategoryById = function (req, res, next) {
    try {
        const categoryId = req.params.categoryId;

        categoryDb.getCategoryById(categoryId)
            .then(function (category) {

                if (!category) {
                    return res.status(404).json({
                        msg: "Category not found."
                    });
                }

                res.status(200).json(category);
            })
            .catch(function (error) {
                next(error);
            });
    } catch (error) {
        next(error);
    }
};


// Add category
categoryService.addCategory = function (req, res, next) {
    try {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(50).required()
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        categoryDb.addCategory(value)
            .then(function () {
                res.status(201).json({
                    msg: "Category has been added successfully!"
                });
            })
            .catch(function (error) {
                if (error.code === 11000) {
                    return res.status(409).json({
                        msg: "Category already exists"
                    });
                }

                next(error);
            });

    } catch (error) {
        next(error);
    }
};


// Update category
categoryService.updateCategory = function (req, res, next) {
    try {
        const categoryId = req.params.categoryId;
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(50)
        }).min(1);

        const { error, value } = schema.validate(reqBody);

        if (error) {
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        categoryDb.updateCategory(categoryId, value)
            .then(function (output) {

                if (output.matchedCount === 0) {
                    return res.status(404).json({
                        msg: "Category not found."
                    });
                }

                res.status(200).json({
                    msg: "Category has been updated successfully!"
                });
            })
            .catch(function (error) {
                next(error);
            });

    } catch (error) {
        next(error);
    }
};


// Delete category
categoryService.deleteCategory = function (req, res, next) {
    try {
        const categoryId = req.params.categoryId;

        categoryDb.deleteCategory(categoryId)
            .then(function (output) {

                if (output.deletedCount === 0) {
                    return res.status(404).json({
                        msg: "Category not found."
                    });
                }

                res.status(200).json({
                    msg: "Category has been deleted successfully!"
                });
            })
            .catch(function (error) {
                next(error);
            });

    } catch (error) {
        next(error);
    }
};


module.exports = categoryService;