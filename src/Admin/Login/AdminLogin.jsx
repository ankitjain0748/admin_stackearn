import logo from "../../assert/logo.png";
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
            console.log("error", error)
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="container py-5">
                <div className="row justify-content-center">
                    {/* Left Column - Login Section */}
                    <div className="col-md-6 bg-light p-5  ">
                        <div className="text-center mb-4">
                            <Link to="/">
                                <img src={logo} className="img-fluid mb-3" alt="Logo" style={{ maxWidth: '150px' }} />
                            </Link>
                            <h2>Sign into Your Account</h2>
                        </div>

                        <form onSubmit={handleForms}>
                            {/* Email Field */}
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={Regs.email}
                                    onChange={handleInputs}
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                            </div>

                            {/* Password Field */}
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <div className="input-group">
                                    <input
                                        type={passwordType}
                                        name="password"
                                        required
                                        value={Regs.password}
                                        onChange={handleInputs}
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Password"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary"
                                        onClick={togglePassword}
                                        tabIndex={-1}
                                    >
                                        {passwordType === "password" ? (
                                            <FeatherIcon icon="eye-off" />
                                        ) : (
                                            <FeatherIcon icon="eye" />
                                        )}
                                    </button>
                                    {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                </div>
                            </div>

                            {/* Forgot Password Link */}
                            <div className="mb-3 text-end">
                                <Link className="text-decoration-none" to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <div className="d-grid">
                                <button className="login-head button cursor-pointer"
                                    type="submit" disabled={loading}>
                                    {loading ? "Submitting..." : "Sign In"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;
