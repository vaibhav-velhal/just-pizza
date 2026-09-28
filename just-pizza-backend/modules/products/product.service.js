const joi = require("joi");
const productDb = require("./product.db.js");

const productService = {};

// Get all products
productService.getAllProducts = function(req, res, next) {
    try {
        productDb.getAllProducts()
            .then(function(products) {
                res.status(200).json(products);
            })
            .catch(function(error) {
                next(error);
            });
    } catch(error) {
        next(error);
    }
};

// Get one product by ID
productService.getProductById = function(req, res, next) {
    try {
        const productId = req.params.productId;

        productDb.getProductById(productId)
            .then(function(product) {
                if (!product) {
                    return res.status(404).json({
                        msg: "Product not found."
                    });
                }

                res.status(200).json(product);
            })
            .catch(function(error) {
                next(error);
            });
    } catch(error) {
        next(error);
    }
};

// Add product
productService.addProduct = function(req, res, next) {
    try {
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(100).required(),
            description: joi.string().min(2).max(500).required(),
            price: joi.number().min(0).required(),
            image: joi.string().required(),
            categoryIds: joi.array()
                .items(joi.string().required())
                .min(1)
                .required()
        });

        const { error, value } = schema.validate(reqBody);

        if (error) {
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        productDb.addProduct(value)
            .then(function() {
                res.status(201).json({
                    msg: "Product has been added successfully!"
                });
            })
            .catch(function(error) {
                next(error);
            });

    } catch(error) {
        next(error);
    }
};

// Update product
productService.updateProduct = function(req, res, next) {
    try {
        const productId = req.params.productId;
        const reqBody = req.body;

        const schema = joi.object({
            name: joi.string().min(2).max(100),
            description: joi.string().min(2).max(500),
            price: joi.number().min(0),
            image: joi.string(),
            categoryIds: joi.array()
                .items(joi.string().required())
                .min(1)
        }).min(1);

        const { error, value } = schema.validate(reqBody);

        if (error) {
            return res.status(400).json({
                msg: "Invalid request"
            });
        }

        productDb.updateProduct(productId, value)
            .then(function(output) {
                if (output.matchedCount === 0) {
                    return res.status(404).json({
                        msg: "Product not found."
                    });
                }

                res.status(200).json({
                    msg: "Product has been updated successfully!"
                });
            })
            .catch(function(error) {
                next(error);
            });

    } catch(error) {
        next(error);
    }
};

// Delete product
productService.deleteProduct = function(req, res, next) {
    try {
        const productId = req.params.productId;

        productDb.deleteProduct(productId)
            .then(function(output) {
                if (output.deletedCount === 0) {
                    return res.status(404).json({
                        msg: "Product not found."
                    });
                }

                res.status(200).json({
                    msg: "Product has been deleted successfully!"
                });
            })
            .catch(function(error) {
                next(error);
            });

    } catch(error) {
        next(error);
    }
};

module.exports = productService;