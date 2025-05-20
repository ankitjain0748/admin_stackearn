import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assert/logo.png";
import ProfileIcon from "./ProfileIcon";

const Header = ({ onopen }) => {
    useEffect(() => {
        document.body?.classList?.remove("menu-opened");
        return () => {
            document.body.className = "";
        };
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [navbar, setNavbar] = useState(false);

    const changeHeaderBackground = () => {
        if (window.scrollY >= 90) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };

    window.addEventListener("scroll", changeHeaderBackground);

    // Dummy User Data (Agar API se data aata hai to props se pass kar sakte ho)

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <header className="w-100 position-fixed top-0 start-0 z-3 ">
            <div className="bg-white  shadow-sm">
                <nav
                    className={`navbar navbar-expand-lg    header-nav scroll-sticky ${navbar ? "add-header-bg" : ""
                        }`}
                >
                    <div className="container d-flex justify-content-between align-items-center">
                        {/* Left Side - Logo */}
                        {isMobile ? (
                            <div className="navbar-header d-flex align-items-center">
                                <div id="mobile_btn" onClick={onopen} className="cursor-pointer">
                                    <span className="bar-icon">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                </div>
                                <Link to="/admin/dashboard" className="navbar-brand logo">
                                    <img src={logo} className="img-fluid" alt="Logo" />
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link to="/admin/dashboard" className="navbar-brand logo">
                                    <img src={logo} className="img-fluid" alt="Logo" />
                                </Link>
                                <ProfileIcon />
                            </>
                        )}



                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;