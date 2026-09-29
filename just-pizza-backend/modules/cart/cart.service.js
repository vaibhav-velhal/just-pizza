const joi = require("joi");
const cartDb = require("./cart.db.js");

const cartService = {};

// Get cart
cartService.getCart = async function(req, res, next) {
    try {
        const userId = req.headers.userId;

        let cart = await cartDb.getCartByUserId(userId);

        if (!cart) {
            cart = await cartDb.createCart(userId);
        }

        const cartItems = await cartDb.getCartItems(cart._id);

        res.status(200).json({
            cartId: cart._id,
            userId: cart.userId,
            items: cartItems
        });

    } catch(error) {
        next(error);
    }
};

// Add product to cart
cartService.addToCart = async function(req, res, next) {
    try {
        const userId = req.headers.userId;
        const reqBody = req.body;

        const schema = joi.object({
            productId: joi.string().required(),
            quantity: joi.number().integer().min(1).required()
        });

        const { error, value } = schema.validate(reqBody);

        if(error) {
            res.status(400).json({
                msg: "Invalid request"
            }).end();
            return;
        }

        let cart = await cartDb.getCartByUserId(userId);

        if(!cart) {
            cart = await cartDb.createCart(userId);
        }

        const existingItem = await cartDb.getCartItem(
            cart._id,
            value.productId
        );

        if(existingItem) {
            const newQuantity = existingItem.quantity + value.quantity;

            await cartDb.updateCartItem(
                cart._id,
                value.productId,
                newQuantity
            );

            res.status(200).json({
                msg: "Product quantity updated in cart!"
            });

            return;
        }

        await cartDb.addCartItem(
            cart._id,
            value.productId,
            value.quantity
        );

        res.status(201).json({
            msg: "Product added to cart!"
        });

    } catch(error) {
        next(error);
    }
};

// Update quantity
cartService.updateCartItem = async function(req, res, next) {
    try {
        const userId = req.headers.userId;
        const productId = req.params.productId;

        const schema = joi.object({
            quantity: joi.number().integer().min(1).required()
        });

        const { error, value } = schema.validate(req.body);

        if(error) {
            res.status(400).json({
                msg: "Invalid request"
            }).end();
            return;
        }

        const cart = await cartDb.getCartByUserId(userId);

        if(!cart) {
            res.status(404).json({
                msg: "Cart not found."
            }).end();
            return;
        }

        const output = await cartDb.updateCartItem(
            cart._id,
            productId,
            value.quantity
        );

        if(output.matchedCount === 0) {
            res.status(404).json({
                msg: "Cart item not found."
            }).end();
            return;
        }

        res.status(200).json({
            msg: "Cart item updated successfully!"
        });

    } catch(error) {
        next(error);
    }
};

// Remove product
cartService.removeCartItem = async function(req, res, next) {
    try {
        const userId = req.headers.userId;
        const productId = req.params.productId;

        const cart = await cartDb.getCartByUserId(userId);

        if(!cart) {
            res.status(404).json({
                msg: "Cart not found."
            }).end();
            return;
        }

        const output = await cartDb.deleteCartItem(
            cart._id,
            productId
        );

        if(output.deletedCount === 0) {
            res.status(404).json({
                msg: "Cart item not found."
            }).end();
            return;
        }

        res.status(200).json({
            msg: "Product removed from cart!"
        });

    } catch(error) {
        next(error);
    }
};

// Clear cart
cartService.clearCart = async function(req, res, next) {
    try {
        const userId = req.headers.userId;

        const cart = await cartDb.getCartByUserId(userId);

        if(!cart) {
            res.status(404).json({
                msg: "Cart not found."
            }).end();
            return;
        }

        await cartDb.clearCart(cart._id);

        res.status(200).json({
            msg: "Cart cleared successfully!"
        });

    } catch(error) {
        next(error);
    }
};

module.exports = cartService;