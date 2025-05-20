import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Email = () => {
  const location = useLocation();
  return (
    <div>
      <div className="settings-page-head">
        <ul className="settings-pg-links list-unstyled  px-2">
          <li className="mb-1">
            <Link
              to="/admin/news_letter"
              className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/news_letter" ? "active " : ""}`}
            >
              <i className="bx bx-user-circle me-2" />
              All Users
            </Link>
          </li>
          <li className="mb-1">
            <Link
              to="/admin/email"
              className={`d-flex align-items-center p-2 rounded ${location.pathname === "/admin/email" ? "active " : ""}`}
            >
              <i className="bx bx-edit me-2" />
              User List
            </Link>
          </li>
        </ul>

      </div>

    </div>
  );
};

export default Email;
