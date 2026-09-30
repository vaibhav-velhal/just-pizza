const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Create Order
export const createOrder = async (token) => {
    const res = await fetch(`${BASE_URL}/api/order`, {
        method: "POST",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to create order");
    }

    return data;
};


// Get All Orders
export const getOrders = async (token) => {
    const res = await fetch(`${BASE_URL}/api/order`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch orders");
    }

    return data;
};


// Get Single Order
export const getOrderById = async (token, orderId) => {
    const res = await fetch(`${BASE_URL}/api/order/${orderId}`, {
        method: "GET",
        headers: {
            "authorization": `Bearer ${token}`
        }
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to fetch order details");
    }

    return data;
};