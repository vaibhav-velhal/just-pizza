import { userDetails } from '../../services/user/user.api';
import { editUser } from '../../services/user/user.api';
import { FiEdit } from "react-icons/fi";
import { IoPerson } from 'react-icons/io5';
import { GiCheckMark } from "react-icons/gi";
import { FcIdea } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


function EditProfile() {

    const token = JSON.parse(localStorage.getItem("token"));
    const userId = localStorage.getItem("userId");

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const navigate = useNavigate();


    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await userDetails(token, userId);
                
                setFirstName(res.firstName);
                setLastName(res.lastName);
                setPhone(res.phone);
                setEmail(res.email);
            } catch (error) {
                console.error(error);
            }
        };

        getUser();
    }, [token, userId]);


    // Handle Edit user
    const handleUserEdit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        
        if ((newPassword || confirmPassword) && newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        
        const userData = {
            firstName,
            lastName,
            phone,
            email,
            password: newPassword
        };

        try {
            const res = await editUser(token, userId, userData);
            
            setShowNewPassword(false);
            setShowConfirmPassword(false);
            setIsLoading(false);

            if(res.msg === "User has updated successfully!") {
                alert(res.msg);
                navigate(`/account/${userId}`);
            }
        } catch(error) {
            if (!navigator.onLine) {
                alert("Please check your internet connection");
            } else {
                alert(error.message || "Update failed");
            }
            console.error("Update failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function toggleNewPasswordVisibility() {
        setShowNewPassword(!showNewPassword);
    }

    function toggleConfirmPasswordVisibility() {
        setShowConfirmPassword(!showConfirmPassword);
    }

    function handleCancelBtn() {
        const confirmCancel = window.confirm("Are you sure you want to discard changes?");

        if(confirmCancel) {
            navigate(`/account/${userId}`);
        }
    }

    return(
        <>
            <section>
                <div className="container my-3 mb-5">
                    <div className="row px-lg-4 gap-4 gap-lg-0">

                        <div className="col-12 col-lg-8">
                            <div className="card shadow-sm rounded-4">
                                <div className="card-header-section p-4 pb-3">
                                    <div className="row">
                                        <div className="col-1 me-3 me-lg-0">
                                            <FiEdit className="mb-2" size={30} />
                                        </div>
                                        <div className="col-10 col-lg-11">
                                            <div className="card-title">
                                                <h1 className="fs-3">Edit Profile</h1>
                                                <h2 className="text-secondary fs-6">Update your personal information and keep your account up to date.</h2>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-4">
                                    <div className="profile-section">
                                        <div className="profile-picture-container text-center">
                                            <div className="profile-picture-logo d-inline-block border border-3 border-secondary border-opacity-75 rounded-circle mb-1 p-2">
                                                <IoPerson className="text-secondary mb-1" size={75} />
                                            </div>
                                        </div>
                                        <div className="personal-information-section mt-4">
                                            <div className="form-container">
                                                <form method="POST" onSubmit={handleUserEdit}>
                                                    <div className="personal-information mb-5 mb-lg-4">
                                                        <div className="fullName-box d-md-flex gap-md-3">
                                                            <div className="firstName-input-box w-100 mb-3">
                                                                <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                                                                <input
                                                                    id="firstName"
                                                                    type="text"
                                                                    name="firstName"
                                                                    className="form-control"
                                                                    placeholder="Enter your first name"
                                                                    title="Enter your first name."
                                                                    minLength={2}
                                                                    maxLength={20}
                                                                    pattern="[A-Za-z ]+"
                                                                    value={firstName}
                                                                    onChange={(e) => setFirstName(e.target.value)}
                                                                    required
                                                                />
                                                            </div>

                                                            <div className="lastName-input-box w-100 mb-3">
                                                                <label htmlFor="lastName" className="form-label fw-semibold">Last Name</label>
                                                                <input
                                                                    id="lastName"
                                                                    type="text"
                                                                    name="lastName"
                                                                    className="form-control"
                                                                    placeholder="Enter your last name"
                                                                    title="Enter your last name."
                                                                    minLength={2}
                                                                    maxLength={20}
                                                                    pattern="[A-Za-z ]+"
                                                                    value={lastName}
                                                                    onChange={(e) => setLastName(e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="phone-input-box mb-3">
                                                            <label htmlFor="phone" className="form-label fw-semibold">Phone Number</label>
                                                            <input
                                                                id="phone"
                                                                type="tel"
                                                                name="phone"
                                                                className="form-control"
                                                                placeholder="Enter your phone number"
                                                                title="Please enter a 10-digit phone number."
                                                                pattern="[0-9]{10}"
                                                                value={phone}
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                        
                                                        <div className="email-input-box">
                                                            <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                                            <input
                                                                id="email"
                                                                type="email"
                                                                name="email"
                                                                className="form-control"
                                                                placeholder="Enter your email"
                                                                title="Enter your valid email."
                                                                maxLength={30}
                                                                value={email}
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                required
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="change-password-box pt-lg-2">
                                                        <label className="fw-semibold mb-2">Change Password (Optional)</label>

                                                        <div className="password-box d-md-flex gap-md-3">
                                                            <div className="new-password-input-box mb-3">
                                                                <label htmlFor="password" className="form-label fw-semibold">New Password</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        id="password"
                                                                        type={showNewPassword ? "text" : "password"}
                                                                        name="password"
                                                                        className="form-control"
                                                                        placeholder="Enter new password"
                                                                        title="Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                                                        minLength={8} maxLength={12}
                                                                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,12}"
                                                                        value={newPassword}
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                    />
                                                                    <button className="input-group-text" type="button" onClick={toggleNewPasswordVisibility}>
                                                                        {
                                                                            showNewPassword ? <FaRegEye /> : <FaRegEyeSlash />
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className="confirm-password-input-box mb-3">
                                                                <label htmlFor="password" className="form-label fw-semibold">Confirm Password</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        id="password"
                                                                        type={showConfirmPassword ? "text" : "password"}
                                                                        name="password"
                                                                        className="form-control"
                                                                        placeholder="Confirm new password"
                                                                        title="Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                                                        minLength={8} maxLength={12}
                                                                        pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,12}"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    />
                                                                    <button className="input-group-text" type="button" onClick={toggleConfirmPasswordVisibility}>
                                                                        {
                                                                            showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />
                                                                        }
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    
                                                    <div className="button-section text-end">
                                                        <button className="btn btn-outline-secondary me-2" type="button" onClick={handleCancelBtn}>Cancel</button>
                                                        <button className="btn btn-danger my-3" type="submit">
                                                            {isLoading ? (
                                                                <>
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                ></span>
                                                                </>
                                                            ) : (
                                                                'Save changes'
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>
                        
                        <div className="col-12 col-lg-4">
                            <div className="card shadow-sm h-100 rounded-4">
                                <div className="header-section px-3 pt-4 pb-0">
                                    <div className="imgage-container text-center mb-3">
                                        <img src="./../../../logo.png" alt="JustPizza-logo" style={{height: 80, width: 80}}/>
                                    </div>
                                    <h1 className="fs-5 fw-semibold">Keep Your Information Updated</h1>
                                    <p className="text-secondary">
                                        Your profile helps us serve you better and gives you a smoother ordering experience.
                                    </p>
                                </div>
                                <hr className="mx-3 my-2" />
                                <div className="card-body">

                                    <div className="list-section d-flex flex-column mb-4">
                                        <ul className="list text-secondary p-0" style={{listStyleType: "none"}}>
                                            <li className="list-item mb-3"><GiCheckMark className="text-danger me-2" />Update your personal details</li>
                                            <li className="list-item mb-3"><GiCheckMark className="text-danger me-2" />Enter valid email</li>
                                            <li className="list-item mb-3"><GiCheckMark className="text-danger me-2" />Enter valid phone number</li>
                                            <li className="list-item"><GiCheckMark className="text-danger me-2" />Keep your account secure</li>
                                        </ul>
                                    </div>

                                    <div className="order-now-card">
                                        <div className="card bg-danger bg-opacity-10 border-0 rounded-3">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-2"><FcIdea size={35} /></div>
                                                    <div className="col-10">
                                                        <div className="card-title">
                                                            <h4 className="fs-5 text-danger">Tip</h4>
                                                        </div>
                                                        <div className="desc">
                                                            <p className="text-secondary">
                                                                Make sure your phone number and email are correct for correct order updates.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default EditProfile;