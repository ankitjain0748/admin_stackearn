import React, { useState, useEffect } from "react";
import StudentSidebar from "../sidebar/index";
import PhoneSideBar from "../sidebar/PhoneSideBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adduser, reduxdatauser } from "../../Redux/UserSlice";


const DashboardLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async (signal) => {
    try {
      const main = new Listing();
      const response = await main.profileVerify({ signal });
      console.log("response", response)
      dispatch(adduser(response?.data?.data));
      dispatch(reduxdatauser(response?.data?.profileData));
    } catch (error) {
      localStorage && localStorage.removeItem("AdminToken");
      toast.error("Please log in first.");
      navigate("/admin/login");
    }
  }


  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const token = localStorage.getItem("AdminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Only call API if data isn't already in Redux or sessionStorage
    const alreadyFetched = sessionStorage.getItem("profileFetched");

    if (!alreadyFetched) {
      fetchData(signal);
      sessionStorage.setItem("profileFetched", "true");
    }

    return () => controller.abort();
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Mobile view if width is less than or equal to 768px
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false); // Close sidebar when moving to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call the function on initial render

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="main-wrapper">
      {/* Page Content */}
      <Header onopen={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen} />
      <div className=" page-content">
        <div className="pagepadding">
          <div className="row">
            <div className="col-md-3 col-lg-3 d-none d-md-block">
              <StudentSidebar />
            </div>

            {/* Mobile Sidebar (Popup Overlay) */}
            {isSidebarOpen && isMobile && (
              <>
                {/* Overlay background */}
                <div
                  className="overlay"
                  onClick={() => setIsSidebarOpen(false)}
                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.5)",
                    zIndex: 1000,
                  }}
                />
                <div
                  className="position-fixed top-0 start-0 h-100 bg-white shadow-lg p-3 overflow-y-auto"
                  style={{
                    width: "280px", // Set width explicitly
                    zIndex: 1050,
                    transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >

                  {/* Close Button */}

                  <PhoneSideBar onclose={() => setIsSidebarOpen(false)} />
                </div>
              </>
            )}

            {/* Main Content */}
            <div className="col-md-9 col-lg-9">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
