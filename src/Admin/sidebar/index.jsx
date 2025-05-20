import React from "react";
import StickyBox from "react-sticky-box";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";


// eslint-disable-next-line react/prop-types
export default function StudentSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AdminToken"); // Remove token or any other user-related data
    navigate("/admin/login");  // Redirect user to the login page after logout
  };

  return (
    <div className=" theiaStickySidebar">
      <StickyBox offsetTop={20} offsetBottom={20}>

        {/* <ProfileIcon /> */}
        <div className="settings-widget account-settings ">
          <div className="settings-menu">
            <h3>Dashboard</h3>
            <ul className="admin_account">
              <li className={` nav-item ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}>
                <Link to="/admin/dashboard" className="nav-link">
                  <i className="bx bxs-cart" />
                  Dashboard
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/admin/admin-contact' ? 'active' : ''}`}>
                <Link to="/admin/admin-contact" className="nav-link">
                  <i className="bx bxs-cart" />
                  Contacts
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/webniar-list' ? 'active' : ''}`}>
                <Link to="/admin/webniar-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Webniar
                </Link>
              </li>


              <li className={`nav-item ${location.pathname === '/admin/payout' ? 'active' : ''}`}>
                <Link to="/admin/payout" className="nav-link">
                  <i className="bx bxs-cart" />
                  Today Payout
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/subsribe' ? 'active' : ''}`}>
                <Link to="/admin/subsribe" className="nav-link">
                  <i className="bx bxs-cart" />
                  Subscribes
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/user' ? 'active' : ''}`}>
                <Link to="/admin/user" className="nav-link">
                  <i className="bx bxs-cart" />
                  Users
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/instructor' ? 'active' : ''}`}>
                <Link to="/admin/instructor" className="nav-link">
                  <i className="bx bxs-cart" />
                  Instructors
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/course-list' ? 'active' : ''}`}>
                <Link to="/admin/course-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Courses
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/course-content-list' ? 'active' : ''}`}>
                <Link to="/admin/course-content-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Course Contents
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/payment-list' ? 'active' : ''}`}>
                <Link to="/admin/payment-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Payments
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/gallery-list' ? 'active' : ''}`}>
                <Link to="/admin/gallery-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Gallery
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/review-list' ? 'active' : ''}`}>
                <Link to="/admin/review-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Reviews
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/admin/blog-list' ? 'active' : ''}`}>
                <Link to="/admin/blog-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Blogs
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/online-list' ? 'active' : ''}`}>
                <Link to="/admin/online-list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Online Videos
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/admin-refral' ? 'active' : ''}`}>
                <Link to="/admin/admin-refral" className="nav-link">
                  <i className="bx bxs-cart" />
                  Refral Management
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/payment-data' ? 'active' : ''}`}>
                <Link to="/admin/payment-data" className="nav-link">
                  <i className="bx bxs-cart" />
                  Transactions
                </Link>
              </li>

              <li className={`nav-item ${location.pathname === '/admin/video_list' ? 'active' : ''}`}>
                <Link to="/admin/video_list" className="nav-link">
                  <i className="bx bxs-cart" />
                  Training Video
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/admin/best_course' ? 'active' : ''}`}>
                <Link to="/admin/best_course" className="nav-link">
                  <i className="bx bxs-cart" />
                  Best Selling Course
                </Link>
              </li>
              <li className={`nav-item ${location.pathname === '/admin/email' ? 'active' : ''}`}>
                <Link to="/admin/email" className="nav-link">
                  <i className="bx bxs-cart" />
                  Email
                </Link>
              </li>
            </ul>
            <h3>Account Settings</h3>
            <ul className="admin_account">
              <li
                className={`nav-item ${location.pathname === '/admin/admin-setting' ||
                  location.pathname === '/admin/admin--change-password' ||
                  location.pathname === '/admin/admin--social-profile' ||
                  location.pathname === '/admin/admin--linked-accounts' ||
                  location.pathname === '/admin/admin--notification'
                  ? 'active'
                  : ''
                  }`}
              >
                <Link to="/admin/admin-setting" className="nav-link">
                  <i className="bx bxs-cog" />
                  Settings
                </Link>
              </li>
              <li className="nav-item" onClick={handleLogout}>
                <Link to="#" className="nav-link">
                  <i className="bx bxs-log-out" />
                  Logout
                </Link>
              </li>
            </ul>

          </div>
        </div>
      </StickyBox>
    </div>
  );
}
