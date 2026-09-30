import { useEffect, useState } from "react";
import { getAllProducts } from "../../services/product/product.api";
import { getCart, updateCartItem, removeCartItem, clearCart } from "../../services/cart/cart.api";
import { createOrder } from "../../services/order/order.api";
import { PiChefHatThin } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";

function Cart() {

    const token = JSON.parse(localStorage.getItem("token"));

    const [cartData, setCartData] = useState(null);
    const [productData, setProductData] = useState([]);

    // Get Cart and Products
    useEffect(() => {

        const fetchCartAndProducts = async () => {
            try {
                const cartRes = await getCart(token);
                const productRes = await getAllProducts();

                setCartData(cartRes);
                setProductData(productRes);

            } catch (error) {
                console.error("Failed to fetch cart/products:", error);
            }
        };

        if (token) {
            fetchCartAndProducts();
        }

    }, [token]);


    const cartItems = cartData?.items || [];

    const cartProducts = cartItems.map((cartItem) => {
        const product = productData.find(
            (item) => item._id === cartItem.productId
        );

        return {
            ...product,
            quantity: cartItem.quantity
        };
    });


    // Update quantity
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) {
            return;
        }

        try {
            await updateCartItem(token, productId, newQuantity);

            setCartData((prev) => ({
                ...prev,
                items: prev.items.map((item) =>
                    item.productId === productId
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            }));
        } catch (error) {
            console.error("Failed to update quantity:", error);
            alert(error.message || "Failed to update quantity");
        }
    };


    // Remove single item
    const handleRemoveItem = async (productId) => {
        try {
            await removeCartItem(token, productId);

            setCartData((prev) => ({
                ...prev,
                items: prev.items.filter(
                    (item) => item.productId !== productId
                )
            }));
        } catch (error) {
            console.error("Failed to remove cart item:", error);
            alert(error.message || "Failed to remove item");
        }
    };


    // Cart Total
    const cartTotal = cartProducts.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );


    // Clear Cart
    const handleClearCart = async () => {
        const confirmClear = window.confirm(
            "Are you sure you want to clear your cart?"
        );

        if (!confirmClear) {
            return;
        }

        try {
            const res = await clearCart(token);

            alert(res.msg);

            setCartData((prev) => ({
                ...prev,
                items: []
            }));

        } catch (error) {
            console.error("Clear cart failed:", error);
            alert(error.message || "Failed to clear cart");
        }
    };


    // Create Order
    const handleCreateOrder = async () => {
        if (cartProducts.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        const confirmOrder = window.confirm(
            "Are you sure you want to place this order?"
        );

        if (!confirmOrder) {
            return;
        }

        try {
            const res = await createOrder(token);

            alert(`Order placed successfully! Order ID: ${res.orderId}`);

            setCartData((prev) => ({
                ...prev,
                items: []
            }));

        } catch (error) {
            console.error("Create order failed:", error);
            alert(error.message || "Failed to place order");
        }
    };


    return (
        <section>
            <header>
                <div className="container d-flex flex-column mt-4">
                    <div className="text-center">
                        <PiChefHatThin size={40} style={{ color: "#df2620" }} />
                        <h1 className="fw-semibold">My Cart</h1>
                        <h2 className="fs-5 text-secondary">Good food brings people together. Enjoy your favourite pizzas!</h2>
                    </div>
                    <div className="text-end mt-2">
                        <button
                            className="btn btn-outline-danger fw-semibold"
                            type="button"
                            onClick={handleClearCart}
                            disabled={!token || cartProducts.length === 0}
                        >
                            <RiDeleteBin6Line className="mb-1 me-2" />Clear Cart
                        </button>
                    </div>
                </div>
            </header>
            
            
            <div className="container mt-3 mb-5">
                <div className="row">
                    <div className="col-12 col-lg-9">
                        <div className="card shadow-sm rounded-3 mb-4">
                            <div className="card-body">
                                <div className="row gap-3">
                                    {cartProducts.map((item) => 
                                    {    
                                        const itemTotal = item.price * item.quantity;

                                        return (
                                            <div className="col-12" key={item._id}>
                                                <div className="card shadow-sm rounded-3">
                                                    <div className="card-body d-flex align-items-center gap-4">

                                                        <div className="cart-image-container">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                style={{
                                                                    width: "120px",
                                                                    height: "120px",
                                                                    objectFit: "cover"
                                                                }}
                                                            />
                                                        </div>
                                                        
                                                        <div className="row w-100 justify-content-between align-items-center">
                                                            <div className="col-12 col-lg-4 text-start">
                                                                <h5>{item.name}</h5>
                                                                <p className="fw-semibold">₹ {item.price}</p>
                                                            </div>

                                                            <div className="col-12 col-lg-4 d-flex justify-content-between mb-3 mb-lg-0">
                                                                <div className="border d-flex justify-content-between align-items-center gap-4 p-2 rounded-3">
                                                                    <button
                                                                        className="btn btn-sm btn-outline-danger px-1 py-0"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleQuantityChange(item._id, item.quantity - 1)
                                                                        }
                                                                        disabled={item.quantity === 1}
                                                                    >
                                                                        -
                                                                    </button>

                                                                    <span className="fw-semibold">{item.quantity}</span>

                                                                    <button
                                                                        className="btn btn-sm btn-outline-danger px-1 py-0"
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleQuantityChange(item._id, item.quantity + 1)
                                                                        }
                                                                    >
                                                                        +
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 col-lg-4 d-flex justify-content-between gap-5">
                                                                <div className="subtotal text-center">
                                                                    <p className="text-secondary m-0">Subtotal</p>
                                                                    <h5 className="text-danger fw-semibold m-0">₹ {itemTotal}</h5>
                                                                </div>
                                                                <div className="item-delete-btn">
                                                                    <button
                                                                        className="btn bg-danger bg-opacity-10"
                                                                        type="button"
                                                                        onClick={() => handleRemoveItem(item._id)}
                                                                    >
                                                                        <RiDeleteBin6Line className="mb-1" color="red" />
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card shadow-sm rounded-3">
                            <div className="card-body">
                                <h4>Cart Summary</h4>

                                <div className="subtotal d-flex justify-content-between">
                                    <p className="text-secondary m-1">SubTotal</p>
                                    <p className="text-dark m-1">₹ {cartTotal}</p>
                                </div>
                                <div className="delivery-charge d-flex justify-content-between">
                                    <p className="text-secondary m-1">Delivery</p>
                                    <p className="text-dark m-1">Free</p>
                                </div>
                                
                                <hr />
                                
                                <div className="total d-flex justify-content-between mb-3">
                                    <p className="m-1">Total</p>
                                    <h5 className="text-danger m-1">₹ {cartTotal}</h5>
                                </div>
                                <button
                                    className="btn px-4 py-2 w-100 btn-danger"
                                    type="button"
                                    onClick={handleCreateOrder}
                                    disabled={!token || cartProducts.length === 0}
                                >
                                    Proceed to Checkout<FaArrowRight className="ms-2 mb-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </section>
    );
}

export default Cart;

// import { FaArrowLeft } from "react-icons/fa6";

//                         <FaArrowLeft className="mb-1 me-2" />Back to My Orders
