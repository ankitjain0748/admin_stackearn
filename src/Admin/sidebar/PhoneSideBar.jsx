import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assert/logo.png";
import User16 from "../../assert/user16.jpg";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import { MdClose } from "react-icons/md";
import Image from "../components/PhoneImage";
import { useSelector } from "react-redux";

export default function PhoneSideBar({ onclose }) {

    const location = useLocation();
    const navigate = useNavigate();
    const users = useSelector(state => state.users.users);

    console.log("users", users)
    const listing = users?.[0] || "";
    const profile = users?.[1] || "";


    const handleLogout = () => {
        localStorage.removeItem("AdminToken");
        navigate("/admin/login");
    };

    const menuItems = [
        { path: "/admin/dashboard", label: "Dashboard" },
        { path: "/admin/admin-contact", label: "Contacts" },
        { path: "/admin/webniar-list", label: "Webniar" },
        { path: "/admin/payout", label: "Today Payout" },
        { path: "/admin/subsribe", label: "Subscribes" },
        { path: "/admin/user", label: "Users" },
        { path: "/admin/instructor", label: "Instructors" },
        { path: "/admin/course-list", label: "Courses" },
        { path: "/admin/course-content-list", label: "Course Contents" },
        { path: "/admin/payment-list", label: "Payments" },
        { path: "/admin/gallery-list", label: "Gallery" },
        { path: "/admin/review-list", label: "Reviews" },
        { path: "/admin/blog-list", label: "Blogs" },
        { path: "/admin/online-list", label: "Online Videos" },
        { path: "/admin/admin-refral", label: "Refral Management" },
        { path: "/admin/payment-data", label: "Transactions" },
        { path: "/admin/video_list", label: "Training Video" },
        { path: "/admin/best_course", label: "Best Selling Course" },
        { path: "/admin/email", label: "Email" }
    ];
    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        const firstInitial = names[0]?.[0]?.toUpperCase() || "";
        const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <Link to="/admin/dashboard" className="image-logo">
                    <img src={logo} className="img-fluid" alt="Logo" />
                </Link>
                <div onClick={onclose} className="cursor-pointer">
                    <MdClose size={24} className="text-black" />
                </div>
            </div>
            <div className="theiaStickySidebar ">

                <div className="settings-widget account-settings mt-3">

                    <div className="d-flex align-items-center gap-2 p-2">
                        {/* Profile Image */}
                        {profile?.profileImage ? (
                            <Image
                                src={profile?.profileImage ? profile?.profileImage : User16}
                                alt="User"
                                classes="rounded-circle border border-2"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                            />
                        ) : (
                            <div
                                className="flex items-center justify-center avatar-img"
                                style={{
                                    backgroundColor: "#002058",
                                    borderRadius: "50%",
                                    color: "#ffffff",
                                    fontWeight: "normal",
                                    fontSize: "1em",
                                    width: '50px',
                                    height: '50px',
                                    display: "flex",
                                    padding: "13px"
                                }}
                            >
                                {getInitials(`${listing?.name}`)}

                            </div>
                        )}


                        {/* User Info */}
                        <div className="d-flex flex-column">
                            {/* Name */}
                            <span className="fs-6 fw-semibold text-dark text-capitalize   ">
                                {profile?.firstname && profile?.lastname
                                    ? `${profile.firstname} ${profile.lastname}`
                                    : listing?.name}
                            </span>

                            {/* Email */}
                            <span className="text-muted">{listing?.email}</span>

                            {/* Role */}
                            {/* <span className="text-capitalize text-primary">{listing?.role}</span> */}
                        </div>
                    </div>

                </div>

                <div className="settings-widget account-settings">
                    <div className="settings-menu">
                        <div className="phone-sidebar">
                            <ul className="">
                                {menuItems.map(({ path, label }) => (
                                    <li key={path} className={`nav-item  text-uppercase ${location.pathname === path ? 'active' : ''}`}>
                                        <Link to={path} className="nav-link  ">
                                            <i className="bx bxs-cart" /> {label}
                                        </Link>
                                    </li>
                                ))}
                                <li className={`nav-item   ${location.pathname.includes('/admin/admin-setting') ? 'active' : ''}`}>
                                    <Link to="/admin/admin-setting" className="nav-link">
                                        <i className="bx bxs-cog" /> Settings
                                    </Link>
                                </li>
                                <li className="nav-item  " onClick={handleLogout}>
                                    <Link to="#" className="nav-link">
                                        <i className="bx bxs-log-out" /> Logout
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
