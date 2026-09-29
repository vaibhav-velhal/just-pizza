const cartModel = require("../../models/cart.model.js");
const cartItemModel = require("../../models/cart-item.model.js");

const cartDb = {};

// Find cart of a user
cartDb.getCartByUserId = function(userId) {
    return cartModel.findOne({ userId: userId });
};

// Create cart
cartDb.createCart = function(userId) {
    const newCart = new cartModel({
        userId: userId
    });

    return newCart.save();
};

// Find cart item
cartDb.getCartItem = function(cartId, productId) {
    return cartItemModel.findOne({
        cartId: cartId,
        productId: productId
    });
};

// Add cart item
cartDb.addCartItem = function(cartId, productId, quantity) {
    const newCartItem = new cartItemModel({
        cartId: cartId,
        productId: productId,
        quantity: quantity
    });

    return newCartItem.save();
};

// Get all cart items
cartDb.getCartItems = function(cartId) {
    return cartItemModel.find({ cartId: cartId });
};

// Update cart item quantity
cartDb.updateCartItem = function(cartId, productId, quantity) {
    return cartItemModel.updateOne(
        {
            cartId: cartId,
            productId: productId
        },
        {
            $set: {
                quantity: quantity
            }
        }
    );
};

// Delete cart item
cartDb.deleteCartItem = function(cartId, productId) {
    return cartItemModel.deleteOne({
        cartId: cartId,
        productId: productId
    });
};

// Delete all cart items
cartDb.clearCart = function(cartId) {
    return cartItemModel.deleteMany({
        cartId: cartId
    });
};

module.exports = cartDb;