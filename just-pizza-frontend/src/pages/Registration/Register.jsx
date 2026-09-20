import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/auth/auth.api.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import "./Register.css";


function Register() {

    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // Handle Registration
    const handleRegistration = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const userData = {
            firstName,
            lastName,
            phone,
            email,
            password
        };

        try {
            const res = await registerUser(userData);

            alert(res.msg);

            setFirstName("");
            setLastName("");
            setPhone("");
            setEmail("");
            setPassword("");

            setShowPassword(false);
            setIsLoading(false);

            if(res.msg === "User has inserted successfully!") {
                navigate("/login");
            }
        } catch(error) {
            if (!navigator.onLine) {
                alert("Please check your internet connection");
            } else {
                alert(error.message || "Registration failed");
            }
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return(
        <>
            <div className="row m-0 registration-page">
                <div className="col-md-8 col-12 ms-auto py-5 registration-container d-flex flex-column justify-content-center">
                    <section>
                        <h1 className="text-center mb-1 fs-2">
                            <img src="./../../../logo.png" alt="JustPizza-logo" className="mb-2" style={{height: 30, width: 30}}/>
                            JustPizza
                        </h1>
                        <h2 className="text-center fs-1">Create Account</h2>
                        <p className="text-center mb-md-5 mb-4 text-secondary">Join JustPizza and start ordering!</p>
                    </section>

                    <section>
                        <div className="form-container">
                            <form onSubmit={handleRegistration} method="POST">
                                <div className="fullName-box d-md-flex gap-md-3">
                                    <div className="firstName-input-box w-100 mb-3">
                                        <label htmlFor="firstName" className="form-label fw-semibold">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            name="firstName"
                                            className="form-control"
                                            placeholder="Enter your first name"
                                            title="First name must be 2-20 characters."
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
                                            title="Last name must be 2-20 characters."
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
                                
                                <div className="email-input-box mb-3">
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

                                <div className="password-input-box mb-3">
                                    <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                    <div className="input-group">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            placeholder="Create a password"
                                            title="Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                            minLength={8} maxLength={12}
                                            pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,12}"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <button className="input-group-text" type="button" onClick={togglePasswordVisibility}>
                                            {
                                                showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                                            }
                                        </button>
                                    </div>
                                </div>

                                <button className="btn text-light my-3 w-100" type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                        </>
                                    ) : (
                                        'Register'
                                    )}
                                </button>

                                <div className="desc text-center">
                                    <p className="m-0">Already have an account? <Link to="/login" className="fw-semibold">Login here</Link></p>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Register;