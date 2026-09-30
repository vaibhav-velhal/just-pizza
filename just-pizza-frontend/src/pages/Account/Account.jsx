import { userDetails } from '../../services/user/user.api';
import { deleteUser } from '../../services/user/user.api';
import { getOrders } from '../../services/order/order.api';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PiChefHatThin } from "react-icons/pi";
import { IoPerson } from 'react-icons/io5';
import { BiFoodMenu } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { RiLogoutCircleRLine, RiLoginCircleLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";

function Account() {

    const token = JSON.parse(localStorage.getItem("token"));
    const userId = localStorage.getItem("userId");

    const navigate = useNavigate();

    const [userData, setUserData] = useState({});
    const [orders, setOrders] = useState([]);

    // Get User details
    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await userDetails(token, userId);
                
                setUserData(res);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, [token, userId]);


    // Get recent orders
    useEffect(() => {

        const getUserOrders = async () => {
            try {
                const res = await getOrders(token);

                console.log("Recent Orders:", res);

                setOrders(res);

            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };

        if (token) {
            getUserOrders();
        }

    }, [token]);


    // Handle Edit Button
    function handleEditBtn() {
        navigate(`/edit/${userId}`)
    }

    // Handle Edit Button
    function handleMyOrdersBtn() {
        navigate(`/edit/${userId}`)
    }

    // Logout button
    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");

        if(confirmLogout) {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            navigate("/");
        }
    };

    // Handle Delete User
    const handleDeleteUser = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if(confirmDelete) {
            try {
                const res = await deleteUser(token, userId);
    
                if(res.msg === "User deleted successfully!") {
                    alert(res.msg);
                    localStorage.removeItem("token");
                    localStorage.removeItem("userId");
                    navigate("/");
                }
            } catch(error) {
                if (!navigator.onLine) {
                    alert("Please check your internet connection");
                } else {
                    alert(error.message || "Account delete failed");
                }
                console.error("Account delete failed:", error);
            }
        }
    }
    
    return(

        <section>
            <header>
                <div className="container text-center mt-5">
                    <PiChefHatThin size={40} style={{color: "#df2620"}} />
                    <h1 className="fw-semibold">My Account</h1>
                    <h2 className="fs-5 text-secondary">Manage your profile, orders and more.</h2>
                </div>
            </header>

            {
                token ? 
                    (null) : 
                    (
                        <section>
                            <div className="text-center mt-4">
                                <p className="m-0">Please login to see details...</p>
                                <Link to="/login">Login here...</Link>
                            </div>
                        </section>
                    )
            }

            <section>
                <div className="container-fluid px-lg-3 mt-4 mt-md-5 mb-5">
                    <div className="row flex-column-reverse flex-lg-row justify-content-center">
                        <div className="col-12 col-md-3 mb-4 mb-lg-0">
                            <div className="card shadow-sm border border-opacity-10 rounded-4">
                                <div className="card-body d-flex flex-column">
                                    <Link className="btn btn-danger profile-btn text-start" to={`/account/${userId}`}>
                                        <IoPerson className="mb-1 me-1" size={20} />Profile
                                    </Link>

                                    <hr className="my-2"/>
                                    
                                    <button
                                        className="btn border-0 my-orders-btn text-start"
                                        onClick={handleMyOrdersBtn} disabled={token ? false : true}
                                    >
                                        <BiFoodMenu className="mb-1 me-1" size={20} />
                                        My Orders
                                    </button>
                                    
                                    <hr className="my-2"/>
                                    
                                    <button 
                                        className="btn border-0 edit-profile-btn text-start" type='button' 
                                        onClick={handleEditBtn} disabled={token ? false : true}
                                    >
                                        <FiEdit className="mb-2 me-1" size={20} />Edit Profile
                                    </button>
                                    
                                    <hr className="my-2"/>
                                    
                                    <button 
                                        className="btn border-0 delete-profile-btn text-start" type='button' 
                                        onClick={handleDeleteUser} disabled={token ? false : true}
                                    ><MdDeleteOutline className="mb-2" size={21} />Delete account</button>
                                    
                                    <hr className="my-2" />
                                    
                                    {
                                        token ? 
                                        (
                                            <button 
                                                className="btn logout-btn text-start" type="button" 
                                                onClick={handleLogout}
                                            >
                                                <RiLogoutCircleRLine className="mb-1 me-1" size={20} />
                                                Logout
                                            </button>
                                        ) :
                                        (
                                            <Link className="btn logout-btn text-start" to="/login">
                                                <RiLoginCircleLine className="mb-1 me-1" size={20} />
                                                Login
                                            </Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-8 mt-4 mt-lg-0">
                            <div className="container">
                                <section>
                                    <div className="profile-section mb-4">
                                        <div className="card shadow-sm p-3 p-md-4 px-md-5 rounded-4">
                                            <div className="card-header-content mb-3 d-flex justify-content-between align-items-center">
                                                <h2 className="fs-4">Profile Information</h2>
                                                <button 
                                                    className="btn btn-outline-danger px-3 py-1" type='button' 
                                                    onClick={handleEditBtn} disabled={token ? false : true}
                                                >
                                                    Edit
                                                </button>
                                            </div>

                                            <div className="card-body p-0">
                                                <div className="profile-info d-flex align-items-center">
                                                    <div className="image-container">
                                                        <div className="border border-3 border-secondary border-opacity-75 rounded-circle mb-1 p-2">
                                                            <IoPerson className="text-secondary mb-1" size={65} />
                                                        </div>
                                                    </div>
                                                    <div className="personal-info ms-4">
                                                        <h3 className="full-name fs-5 mb-1 fw-semibold">
                                                            { userData.firstName && userData.lastName ? (<span>{userData.firstName} {userData.lastName}</span>) : (<span>Guest</span>)}
                                                        </h3>
                                                        <p className="email text-secondary mb-1">
                                                            { userData.email ? (<span>{userData.email}</span>) : (<span>abc@gmail.com</span>)}
                                                        </p>
                                                        <p className="phone text-secondary m-0">
                                                            { userData.phone ? (<span>{userData.phone}</span>) : (<span>123456789</span>)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <div className="recent-orders-section mb-3 mb-lg-0">
                                        <div className="card recent-orders-container shadow-sm rounded-4">
                                            <div className="card-body p-4 pb-2">
                                                <header>
                                                    <div className="header-content mb-3 d-flex justify-content-between align-items-center">
                                                        <h2 className="fs-5">Recent Orders</h2>
                                                        <button
                                                            className="btn border-0 text-danger fw-semibold"
                                                            onClick={handleMyOrdersBtn} disabled={token ? false : true}
                                                        >
                                                            View All
                                                            <FaArrowRight className="mb-1 ms-2 fw-semibold" />
                                                        </button>
                                                    </div>
                                                </header>
                                                {
                                                    orders.length === 0 ? (
                                                        <p className="text-secondary text-center">
                                                            No orders yet...
                                                        </p>
                                                    ) : (
                                                        orders.slice(0, 3).map((order) => (
                                                            <div
                                                                className="card mb-3 rounded-3"
                                                                key={order._id}
                                                            >
                                                                <div className="card-body d-flex justify-content-between align-items-center">

                                                                    <div>
                                                                        <h5 className="mb-1">
                                                                            Order #{order._id.slice(-6)}
                                                                        </h5>

                                                                        <p className="text-secondary mb-0">
                                                                            ₹ {order.totalAmount}
                                                                        </p>
                                                                    </div>

                                                                    <div className="text-end">

                                                                        <p className="mb-1 text-capitalize">
                                                                            {order.status}
                                                                        </p>

                                                                        <p className="text-secondary mb-0">
                                                                            {new Date(order.createdAt).toLocaleDateString()}
                                                                        </p>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </section>
    )
}

export default Account;