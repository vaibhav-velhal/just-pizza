import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/auth/auth.api.js";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import './Login.css';

function Login() {
    
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    // Handle login
    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const res = await loginUser(email, password);

            localStorage.setItem("token", JSON.stringify(res.token));
            localStorage.setItem("userId", res.userId);

            if(res.token){
                setEmail("");
                setPassword("");
                setShowPassword(false);
                setIsLoading(false);
                
                alert("Login successful");
                navigate("/");
            }else{
                alert(res.msg || "Login failed");
            }
        } catch(error) {
            if (!navigator.onLine) {
                alert("Please check your internet connection");
            } else {
                alert(error.message || "Login failed");
                console.error("Login failed:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }

    return(
        <>
            <div className="row m-0 login-page">
                <div className="col-md-8 col-12 ms-auto login-container d-flex flex-column justify-content-center">
                    <section>
                        <h1 className="text-center mb-1 fs-2">
                            <img src="./../../../logo.png" alt="JustPizza-logo" className="mb-2" style={{height: 30, width: 30}}/>
                            JustPizza
                        </h1>
                        <h2 className="text-center fs-1">Welcome Back!</h2>
                        <p className="text-center mb-md-5 mb-4 text-secondary">Login to your account</p>
                    </section>

                    <section>
                        <div className="form-container">
                            <form onSubmit={handleLogin} method="POST">

                                <div className="email-input-box mb-3">
                                    <label htmlFor="email" className="form-label fw-semibold">
                                        Email
                                    </label>
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
                                
                                <div className="password-input-box mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control"
                                            placeholder="Enter your password"
                                            title="Password must be 8-20 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
                                            minLength={8} maxLength={12}
                                            // pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,12}"
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
                                        'Login'
                                    )}
                                </button>

                                <div className="desc text-center">                                    
                                    <p className="text-secondary mb-1">Don't have account? <Link to="/register" className="fw-semibold">Register here</Link></p>                                    
                                    <Link to="/" className="fw-semibold">Return to Home</Link>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default Login;