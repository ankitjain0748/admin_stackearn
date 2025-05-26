import  logo  from "../../assert/logo.png";
import LoginImg from "../../assert/login-img.png";

import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";

const Login = () => {

    const [passwordType, setPasswordType] = useState("password");
    const [errors, setErrors] = useState({});



    const [Regs, setRegs] = useState({
        email: "",
        password: "",
        role: "admin"
    });

    const validateForm = () => {
        let formErrors = {};
        if (!Regs.email) {
            formErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(Regs.email)) {
            formErrors.email = "Invalid email format";
        }
        if (!Regs.password) {
            formErrors.password = "Password is required";
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };
    const handleInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
    };


    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }


    var settings = {
        items: 1,
        margin: 25,
        dots: true,
        nav: true,
        navText: [
            '<i className="fas fa-arrow-left"></i>',
            '<i className="fas fa-arrow-right"></i>',
        ],

        loop: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1170: {
                items: 1,
            },
        },
    };



    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const handleForms = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        if (loading) return;
        setLoading(true);
        const main = new Listing();
        try {
            const response = await main.adminlogin(Regs);
            if (response?.data?.status) {
                toast.success(response.data.message);
                setRegs({
                    email: "",
                    password: "",
                    name: "",
                    refral_code: "",
                    role: "",
                    phone_number: ""
                })
                localStorage.setItem("AdminToken", response?.data?.token);
                navigate("/admin/dashboard")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("error",error)
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="main-wrapper log-wrap">
                <div className="row">
                    {/* Login Banner */}
                    <div className="col-md-6 login-bg">
                        <div className="owl-carousel login-slide owl-theme">
                                <div  className="welcome-login">
                                    <div className="login-banner">
                                        <img src={LoginImg} className="img-fluid" alt="Logo" />
                                    </div>
                                    <div className="mentor-course text-center">
                                        <h2>Welcome to <br /> DreamsLMS Courses</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    {/* /Login Banner */}
                    <div className="col-md-6 login-wrap-bg">
                        {/* Login */}
                        <div className="login-wrapper">
                            <div className="loginbox">
                                <div className="w-100">
                                    <div className="img-logo">
                                        <Link to="/">
                                            <img src={logo} className="img-fluid" alt="Logo" />
                                        </Link>
                                    </div>
                                    <h1>Sign into Your Account</h1>
                                    <form onSubmit={handleForms}>

                                        <div className="input-block">
                                            <label className="form-control-label">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={Regs.email}
                                                onChange={handleInputs}
                                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                                placeholder="Enter your email address"
                                            />
                                            {errors.email && <small className="text-danger">{errors.email}</small>}
                                        </div>
                                        <div className="input-block">
                                            <label className="form-control-label">Password</label>
                                            <div className="pass-group">
                                                <input
                                                    type={passwordType}
                                                    name="password"
                                                    required
                                                    value={Regs.password}
                                                    onChange={handleInputs}
                                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                                    placeholder="Password"
                                                />
                                                <span className="toggle-password feather-eye" onClick={togglePassword}>
                                                    {passwordType === "password" ? (
                                                        <FeatherIcon icon="eye-off" />
                                                    ) : (
                                                        <FeatherIcon icon="eye" />
                                                    )}
                                                </span>
                                            </div>
                                            {errors.password && (
                                                <small className="text-danger">{errors.password}</small>
                                            )}
                                        </div>
                                        <div className="forgot">
                                            <Link className="forgot-link" to="/forgot-password">
                                                Forgot Password?
                                            </Link>
                                        </div>

                                        <div className="d-grid">
                                            <button className="login-head button" type="submit" disabled={loading}>
                                                {loading ? "Submitting..." : "Sign In"}
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* /Login */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;
