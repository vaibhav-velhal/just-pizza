import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../services/order/order.api";
import { createPayment, verifyPayment } from "../../services/payment/payment.api";
import { clearCart } from "../../services/cart/cart.api";
import { PiChefHatThin } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa6";

function Orders() {

    const token = JSON.parse(localStorage.getItem("token"));

    const [orders, setOrders] = useState([]);

    // Get orders
    useEffect(() => {

        const fetchOrders = async () => {
            try {
                const res = await getOrders(token);

                setOrders(res);

            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        if (token) {
            fetchOrders();
        }

    }, [token]);


    // Load Razorpay checkout
    useEffect(() => {

        const script = document.createElement("script");

        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };

    }, []);


    // Handle Payment
    const handlePayNow = async (order) => {

        const confirmPayment = window.confirm(
            "Do you want to continue with the payment?"
        );

        if (!confirmPayment) {
            return;
        }

        try {

            // Step 1: Create Razorpay payment order
            // for the EXISTING application order
            const paymentData = await createPayment(
                token,
                order._id
            );

            console.log("Pay Now Payment Data:", paymentData);


            // Step 2: Open Razorpay Checkout
            const options = {

                key: import.meta.env.RAZORPAY_KEY_ID,

                amount: paymentData.amount,
                currency: paymentData.currency,

                name: "JustPizza",
                description: "Pizza Order",

                order_id: paymentData.razorpayOrderId,

                handler: async function (response) {

                    try {

                        console.log(
                            "Pay Now Razorpay Response:",
                            response
                        );

                        const paymentDetails = {

                            razorpay_order_id:
                                response.razorpay_order_id,

                            razorpay_payment_id:
                                response.razorpay_payment_id,

                            razorpay_signature:
                                response.razorpay_signature

                        };


                        // Verify payment
                        const verifyRes = await verifyPayment(
                            token,
                            paymentDetails
                        );

                        console.log(
                            "Pay Now Payment Verification:",
                            verifyRes
                        );


                        alert("Payment successful!");


                        // Clear cart after successful payment
                        await clearCart(token);


                        // Refresh orders
                        const updatedOrders = await getOrders(token);

                        setOrders(updatedOrders);

                    } catch (error) {

                        console.error(
                            "Pay Now payment verification failed:",
                            error
                        );

                        alert(
                            error.message ||
                            "Payment verification failed"
                        );
                    }
                },


                theme: {
                    color: "#df2620"
                }

            };


            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error(
                "Pay Now payment failed:",
                error
            );

            alert(
                error.message ||
                "Payment failed"
            );
        }
    };


    return (
        <section>

            <header>
                <div className="container text-center mt-5">
                    <PiChefHatThin
                        size={40}
                        style={{ color: "#df2620" }}
                    />

                    <h1 className="fw-semibold">My Orders</h1>

                    <h2 className="fs-5 text-secondary">
                        View your order history and order details.
                    </h2>
                </div>
            </header>


            <div className="container mt-4 mb-5">

                {orders.length === 0 ? (

                    <div className="text-center text-secondary">
                        <p>No orders found.</p>
                    </div>

                ) : (

                    <div className="row">

                        {orders.map((order) => (

                            <div
                                className="col-12 mb-3"
                                key={order._id}
                            >

                                <div className="card shadow-sm rounded-3">

                                    <div className="card-body">

                                        <div className="d-lg-flex justify-content-between align-items-center">

                                            <div>
                                                <h5 className="mb-2">
                                                    Order #{order._id}
                                                </h5>

                                                <p className="text-secondary mb-1">
                                                    Total: ₹ {order.totalAmount}
                                                </p>

                                                <p className="text-secondary mb-1">
                                                    Date: {new Date(order.createdAt).toLocaleString()}
                                                </p>

                                                <p className="text-secondary mb-0">
                                                    Status: {order.status}
                                                </p>
                                            </div>

                                            <div className="text-end">

                                                <p className="mb-1">
                                                    Payment: {order.paymentStatus}
                                                </p>


                                                <div className="d-flex justify-content-end gap-2">

                                                    {order.status === "pending" &&
                                                        order.paymentStatus === "pending" && (

                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                type="button"
                                                                onClick={() => handlePayNow(order)}
                                                            >
                                                                Pay Now
                                                            </button>

                                                        )
                                                    }


                                                    <Link
                                                        to={`/orders/${order._id}`}
                                                        className="btn btn-outline-danger btn-sm"
                                                    >
                                                        View Details
                                                        <FaArrowRight className="ms-1" />
                                                    </Link>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </section>
    );
}

export default Orders;