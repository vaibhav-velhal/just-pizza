const BASE_URL = import.meta.env.VITE_BACKEND_URL;


// Create Razorpay Payment Order
export const createPayment = async (token, orderId) => {
    const res = await fetch(`${BASE_URL}/api/payment/create`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            orderId
        })
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || "Failed to create payment");
    }

    return data;
};


// Verify Razorpay payment
export const verifyPayment = async (token, paymentData) => {
    const response = await fetch(
        `${BASE_URL}/api/payment/verify`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(paymentData)
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.msg || "Payment verification failed");
    }

    return data;
};