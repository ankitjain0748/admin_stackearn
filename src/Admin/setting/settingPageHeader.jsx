import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const StudentSettingPageHeader = () => {
  const location = useLocation();
  return (
    <div className="settings-page-head">
      <ul className="settings-pg-links list-unstyled px-1">
        <li className="mb-1">
          <Link
            to="/admin/admin-setting"
            className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/admin-setting" ? "active " : ""}`}
          >
            <i className="bx bx-edit me-2" />
            Edit Profile
          </Link>
        </li>
        <li className="mb-1">
          <Link
            to="/admin/admin-change-password"
            className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/admin-change-password" ? "active " : ""}`}
          >
            <i className="bx bx-lock me-2" />
            Change Password
          </Link>
        </li>

        <li className="mb-1">
          <Link
            to="/admin/admin-social-profile"
            className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/admin-social-profile" ? "active " : ""}`}
          >
            <i className="bx bx-user-circle me-2" />
            Social Profile
          </Link>
        </li>
        <li className="mb-1">
          <Link
            to="/admin/admin-policy"
            className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/admin-policy" ? "active " : ""}`}
          >
            <i className="bx bx-user-circle me-2" />
            Privacy Policy
          </Link>
        </li>
        <li className="mb-1">
          <Link
            to="/admin/admin-term"
            className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/admin-term" ? "active " : ""}`}
          >
            <i className="bx bx-user-circle me-2" />
            Terms & Conditions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default StudentSettingPageHeader;
