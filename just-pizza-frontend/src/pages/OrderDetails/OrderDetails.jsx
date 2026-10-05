import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../../services/order/order.api";
import { getAllProducts } from "../../services/product/product.api";
import { PiChefHatThin } from "react-icons/pi";
import { FaArrowLeft } from "react-icons/fa6";

function OrderDetails() {

    const { orderId } = useParams();

    const token = JSON.parse(localStorage.getItem("token"));

    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [productData, setProductData] = useState([]);

    useEffect(() => {

        const fetchOrder = async () => {
            try {
                const orderRes = await getOrderById(token, orderId);
                const productRes = await getAllProducts();

                console.log("Order Details:", orderRes);

                setOrder(orderRes.order);
                setOrderItems(orderRes.items);
                setProductData(productRes);

            } catch (error) {
                console.error("Failed to fetch order details:", error);
            }
        };

        if (token && orderId) {
            fetchOrder();
        }

    }, [token, orderId]);


    const orderProducts = orderItems.map((orderItem) => {
        const product = productData.find(
            (item) => item._id === orderItem.productId
        );

        return {
            ...product,
            quantity: orderItem.quantity,
            orderPrice: orderItem.price
        };
    });


    if (!order) {
        return (
            <section>
                <div className="container text-center mt-5">
                    <p className="text-secondary">
                        Loading order details...
                    </p>
                </div>
            </section>
        );
    }


    return (
        <section>

            <header>
                <div className="container text-center mt-5">

                    <PiChefHatThin
                        size={40}
                        style={{ color: "#df2620" }}
                    />

                    <h1 className="fw-semibold">
                        Order Details
                    </h1>

                    <h2 className="fs-5 text-secondary">
                        Order #{order._id}
                    </h2>

                </div>
            </header>


            <div className="container mt-4 mb-5">
                

                <div className="text-end mb-3">

                    <Link
                        to="/orders"
                        className="btn btn-outline-danger"
                    >
                        <FaArrowLeft className="mb-1 me-2" />Back to My Orders
                    </Link>

                </div>

                <div className="card shadow-sm rounded-3">

                    <div className="card-body">

                        <h4>Order Information</h4>

                        <hr />

                        <p>
                            <strong>Order ID:</strong>{" "}
                            {order._id}
                        </p>

                        <p>
                            <strong>Total Amount:</strong>{" "}
                            ₹ {order.totalAmount}
                        </p>

                        <p>
                            <strong>Order Status:</strong>{" "}
                            {order.status}
                        </p>

                        <p>
                            <strong>Payment Status:</strong>{" "}
                            {order.paymentStatus}
                        </p>

                        <p>
                            <strong>Order Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                        </p>

                    </div>

                </div>

            </div>

            <div className="container mb-5">

                <div className="card shadow-sm rounded-3">
                    <div className="card-body">

                        <h4>Items in This Order</h4>

                        <hr />

                        {
                            orderProducts.map((item) => {

                                const itemTotal = item.orderPrice * item.quantity;

                                return (
                                    <div
                                        className="d-flex align-items-center mb-3"
                                        key={item._id}
                                    >

                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            style={{
                                                width: "90px",
                                                height: "90px",
                                                objectFit: "cover"
                                            }}
                                            className="rounded-3"
                                        />

                                        <div className="ms-3 flex-grow-1">

                                            <h5 className="mb-1">
                                                {item.name}
                                            </h5>

                                            <p className="text-secondary mb-1">
                                                ₹ {item.orderPrice} × {item.quantity}
                                            </p>

                                            <p className="text-secondary mb-1">
                                                {item.description}
                                            </p>

                                            <h6 className="mb-0">
                                                Total: <span className="text-danger">₹ {itemTotal}</span>
                                            </h6>
                                        </div>

                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </div>

        </section>
    );
}

export default OrderDetails;