import { useNavigate, NavLink } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import "./Navbar.css";

function Navbar() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm(
            "Are you sure you want to logout?"
        );

        if (confirmLogout) {
            localStorage.removeItem("token");
            navigate("/");
        }
    };

    const closeOffcanvas = () => {
        const offcanvasElement = document.getElementById("mobileNavbar");
        const offcanvasInstance = window.bootstrap?.Offcanvas.getInstance(
            offcanvasElement
        );

        offcanvasInstance?.hide();
    };

    const navLinks = [
        { to: "/", label: "Home" },
        { to: "/menu", label: "Menu" },
        { to: "/about", label: "About" },
    ];

    const renderNavLinks = (isMobile = false) =>
        navLinks.map(({ to, label }) => (
            <li className="nav-item fw-semibold" key={to}>
                <NavLink
                    to={to}
                    end={to === "/"}
                    className="nav-link"
                    onClick={isMobile ? closeOffcanvas : undefined}
                >
                    {label}
                </NavLink>
            </li>
        ));

    const cartBtn = (
        <NavLink
            to="/cart"
            className="cart-link"
            aria-label="Shopping cart"
            onClick={closeOffcanvas}
        >
            <BsCart3 size={24} />
        </NavLink>
    );

    const accountBtn = (
        <NavLink
            to="/account"
            className="account-btn px-3 py-2 text-light fw-semibold rounded-2"
            onClick={closeOffcanvas}
        >
            Account
        </NavLink>
    );

    const authBtn = token ? (
        <button
            className="btn btn-outline-dark rounded-pill px-3 py-1"
            type="button"
            onClick={() => {
                closeOffcanvas();
                handleLogout();
            }}
        >
            Logout
        </button>
    ) : (
        <NavLink
            className="btn btn-outline-dark rounded-pill px-3 py-1"
            to="/login"
            onClick={closeOffcanvas}
        >
            Login
        </NavLink>
    );

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid px-md-5">

                {/* Mobile: menu toggle */}
                <button
                    className="navbar-toggler border-0 p-0 shadow-none d-lg-none"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#mobileNavbar"
                    aria-controls="mobileNavbar"
                    aria-label="Open navigation menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Desktop logo */}
                <NavLink
                    to="/"
                    className="navbar-brand d-none d-lg-flex align-items-center fs-4 fw-semibold"
                >
                    <img
                        src="/logo.png"
                        alt=""
                        className="me-1"
                        style={{ height: 30, width: 30 }}
                    />
                    JustPizza
                </NavLink>

                {/* Mobile logo */}
                <NavLink
                    to="/"
                    className="navbar-brand mx-auto d-lg-none fs-4 fw-semibold"
                >
                    <img
                        src="/logo.png"
                        alt=""
                        className="mb-1 me-1"
                        style={{ height: 30, width: 30 }}
                    />
                    JustPizza
                </NavLink>

                {/* Desktop navigation */}
                <div className="d-none d-lg-flex align-items-center flex-grow-1">
                    <ul className="navbar-nav mx-auto gap-1 gap-xl-2">
                        {renderNavLinks()}
                    </ul>

                    <ul className="navbar-nav align-items-center gap-3">
                        <li className="nav-item">
                            {cartBtn}
                        </li>
                        <li className="nav-item">
                            {accountBtn}
                        </li>
                        <li className="nav-item">
                            {authBtn}
                        </li>
                    </ul>
                </div>

                {/* Mobile cart */}
                <div className="d-lg-none">
                    {cartBtn}
                </div>

                {/* Mobile offcanvas */}
                <div
                    className="offcanvas offcanvas-start d-lg-none"
                    tabIndex="-1"
                    id="mobileNavbar"
                    aria-labelledby="mobileNavbarLabel"
                >
                    <div className="offcanvas-header border-bottom">
                        <NavLink
                            to="/"
                            className="navbar-brand fs-4 fw-semibold"
                            onClick={closeOffcanvas}
                        >
                            <img
                                src="/logo.png"
                                alt=""
                                className="mb-1 me-1"
                                style={{ height: 30, width: 30 }}
                            />
                            <span id="mobileNavbarLabel">JustPizza</span>
                        </NavLink>

                        <button
                            type="button"
                            className="btn-close shadow-none"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close navigation menu"
                        ></button>
                    </div>

                    <div className="offcanvas-body d-flex flex-column">
                        <ul className="navbar-nav gap-0">
                            {renderNavLinks(true)}
                        </ul>

                        <hr />

                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                {accountBtn}
                            </li>

                            <li className="nav-item">
                                {authBtn}
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;