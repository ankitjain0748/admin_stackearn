import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import DateFormate from "../common/DateFormate";
import MessagePopup from "../components/MessagePopup"
import LoadingPage from "../components/LoadingPage";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";
import  User2  from "../../assert/course-02.jpg";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import Image from "../components/Image";
const List = () => {

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [search, setSearch] = useState("");

  const ReviewList = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.ReviewGet(searchQuery, page, limit);
      setListing(response?.data?.reviews);
      setTotalPages(response?.data.totalPages);
      setTotalItems(response.data.totalUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };





  useEffect(() => {
    ReviewList(search, currentPage, 15);
  }, [search, currentPage]);

  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => ReviewList(searchQuery, 1, 15), 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0 || value.length >= 3) {
      debouncedFetchMarketLists(value);
    }
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };


  const toggleReadStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "read" ? "unread" : "read";
      const main = new Listing();
      // Call API to update status
      const response = await main.ReviewStatus({
        _id: id, // Pass the unique ID
        status: newStatus, // Pass the updated status
      });
      if (response?.data?.status === true) {
        toast.success(response?.data?.message);
        ReviewList();

      } else {
        toast.error(response?.data?.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    const names = name.split(" ");
    const firstInitial = names[0]?.[0]?.toUpperCase() || "";
    const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <DashboardLayout>

      <div className="">
        <div className="settings-widget card-details">
          <div className="settings-menu p-0">
            <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">

              <h3>Review History</h3>
              <div className="position-relative">
                <Search
                  size={16}
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                />
                <input
                  type="text"
                  className="form-control psins"
                  placeholder="Search our Review User Name"

                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="checkout-form">

              <div className="tab-content">
                {/* Today */}
                <div className="tab-pane show active" id="today">
                  <div className="table-responsive custom-table">
                    <table className="table table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th>S. No.</th>
                          <th>Name </th>
                          <th>Course Name </th>
                          <th> Date</th>
                          <th>Message</th>
                          <th>Rating </th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="7" className="text-center py-4">Loading...</td>
                          </tr>
                        ) : listing && listing.length > 0 ? (
                          listing.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <h2 className="table-avatar d-flex align-items-center">
                                    <Link to={`/admin/user-profile-Id/${item?.user?._id}`} className="avatar">
                                      {item?.profile?.profileImage ? (
                                        <Image
                                          classes="avatar-img"
                                          src={item?.profile?.profileImage || User2}
                                          alt="User Image"
                                          style={{ objectFit: "cover" }}
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
                                            width: '40px',
                                            height: '40px',
                                            display: "flex",
                                            padding: "10px"
                                          }}
                                        >
                                          {getInitials(item?.user?.name)}
                                        </div>
                                      )}
                                    </Link>
                                    <div className="ms-3 ">
                                      <Link to={`/admin/user-profile-Id/${item?.user?._id}`} className="d-block text-capitalize">
                                        {item?.user?.name || "N/A"}
                                      </Link>
                                      <Link to={`/admin/user-profile-Id/${item?.user?._id}`} className="d-block text-muted">
                                        {item?.user?.email || "N/A"}
                                      </Link>
                                    </div>
                                  </h2>
                                </div>
                              </td>

                              <td>{item?.course?.title || "N/A"}</td>
                              <td>
                                <DateFormate data={item?.created_at} />
                              </td>

                              <td>
                                <MessagePopup message={item?.message || "No message available"} wordLimit={5} />
                              </td>

                              <td>
                                <div className="rating">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i key={i} className={`fas fa-star ${i < (item?.rating || 0) ? "filled" : ""}`}></i>
                                  ))}
                                </div>
                              </td>

                              <td>
                                <div className="review-action">
                                  <div className="d-flex justify-content-end align-items-center">
                                    <div className="toggle-switch ml-auto">
                                      <input
                                        type="checkbox"
                                        className="checkbox"
                                        id={`toggle-${item?._id}`}
                                        checked={item?.status === "read"}
                                        onChange={() => toggleReadStatus(item?._id, item?.status)}
                                      />
                                      <label className="label" htmlFor={`toggle-${item?._id}`}>
                                        <span className="inner" />
                                        <span className="switch" />
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="7" className="text-center py-4">No Data Available</td>
                          </tr>
                        )}
                      </tbody>



                    </table>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </DashboardLayout>


  );
};

export default List;