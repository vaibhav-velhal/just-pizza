import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../../services/order/order.api";
import { PiChefHatThin } from "react-icons/pi";

function Orders() {

    const token = JSON.parse(localStorage.getItem("token"));

    const [orders, setOrders] = useState([]);

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

                                        <div className="d-flex justify-content-between align-items-center">

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

                                                <Link
                                                    to={`/orders/${order._id}`}
                                                    className="btn btn-outline-danger btn-sm"
                                                >
                                                    View Details
                                                </Link>

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