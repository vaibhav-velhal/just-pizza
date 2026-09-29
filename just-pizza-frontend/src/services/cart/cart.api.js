const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Get Cart
export const getCart = async (token) => {
    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch cart");
    }

    return data;
};


// Add Product to Cart
export const addToCart = async (token, productId, quantity) => {
    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            productId,
            quantity
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to add product to cart");
    }

    return data;
};


// Update Cart Item Quantity
export const updateCartItem = async (token, productId, quantity) => {
    const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "PATCH",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            quantity
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to update cart item");
    }

    return data;
};


// Remove Product from Cart
export const removeCartItem = async (token, productId) => {
    const res = await fetch(`${BASE_URL}/api/cart/${productId}`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to remove cart item");
    }

    return data;
};


// Clear Cart
export const clearCart = async (token) => {
    const res = await fetch(`${BASE_URL}/api/cart`, {
        method: "DELETE",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to clear cart");
    }

    return data;
};