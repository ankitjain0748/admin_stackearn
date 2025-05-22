import React, { useEffect, useState, useCallback } from "react";
import Icon1 from "../../assert/icon-01.svg";
import User1 from "../../assert/user1.jpg";
import UserIconSvg from "../../assert/user-icon.svg";
import course02 from "../../assert/course-02.jpg";
import { Link } from "react-router-dom";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import Listing from "../Api/Listing";
import LoadingPage from "../components/LoadingPage";
import Delete from "../common/Delete";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import NoDataPage from "../components/NoDataPage";
import Image from "../components/Image";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.courseGet(searchQuery, page, limit);
      setListing(response?.data?.data?.Courseget
      );
      setTotalPages(response?.data.data.totalPages);
      setCurrentPage(response?.data.data.currentPage);
      setTotalItems(response.data.data.totalUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchMarketLists(search, currentPage, 15);
  }, [currentPage]);

  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => fetchMarketLists(searchQuery, 1, 15), 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length === 0 || value.length >= 3) {
      debouncedFetchMarketLists(value);
    }

    if (value.length > 1) {
      debouncedFetchMarketLists(value);
    }
  };


  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchMarketLists(page, 15);
  };



  return (
    <DashboardLayout>

      <div>
        <div className="settings-widget card-info">
          <div className="settings-menu p-0">
            <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
              <h3> Courses List</h3>
              <div className="position-relative">
                <Search
                  size={16}
                  className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                />
                <input
                  type="text"
                  className="form-control psins"
                  placeholder="Search our Course Name"

                  value={search}
                  onChange={handleSearchChange}
                />
              </div>
              <Link
                className="login-head button"
                to="/admin/add-course"
              >
                Add Course
              </Link>
            </div>
            {/* featured-section-five */}
            <section className="mt-4">
              <div className="container">
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center py-5">
                      <LoadingPage />
                    </div>
                  ) : listing && listing.length > 0 ? (
                    listing.map((item, index) => (
                      <div className="col-xl-6 col-lg-6 col-md-6 mb-4" key={index}>
                        <div className="card h-100">
                          {/* Badge + Course Image */}
                          <div className="position-relative">
                            <span className="badge bg-primary position-absolute top-0 start-0 m-2 text-uppercase">
                              {item.category || "Uncategorized"}
                            </span>
                            <Link to={`/admin/course-details/${item._id}`}>
                              <img
                                src={item.courseImage || course02}
                                className="card-img-top"
                                style={{ height: "300px", objectFit: "cover" }}
                                alt={item.title || "Course Image"}
                              />
                            </Link>
                            <div className="position-absolute bottom-0 start-0 bg-white px-2 py-1 m-2 rounded d-flex align-items-center">
                              <LiaRupeeSignSolid size={16} />
                              <span className="fw-bold ms-1">{item.discountPrice || 0}</span>
                              {item.price && (
                                <span className="text-danger text-decoration-line-through ms-2">
                                  <LiaRupeeSignSolid size={14} /> {item.price}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="card-body">
                            {/* Instructor */}
                            <div className="d-flex align-items-center mb-3">
                              <img
                                src={item?.InstrutorId?.profileImage || User1}
                                alt="Instructor"
                                className="rounded-circle me-2"
                                style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              />
                              <div>
                                <h6 className="mb-0">
                                  <Link to={`/admin/course-details/${item._id}`} className="text-decoration-none text-dark">
                                    {item?.InstrutorId?.firstName || "Instructor"}
                                  </Link>
                                </h6>
                                <div className="text-muted small">
                                  {Array.from({ length: 5 }).map((_, i) => (
                                    <i
                                      key={i}
                                      className={`fas fa-star ${i < (item?.InstrutorId?.rating || 0) ? "text-warning" : "text-muted"}`}
                                    ></i>
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Course Title */}
                            <h5 className="card-title">
                              <Link to={`/admin/course-details/${item._id}`} className="text-dark text-decoration-none">
                                {item?.title || "Untitled Course"}
                              </Link>
                            </h5>

                            {/* Lessons & Students */}
                            <div className="d-flex justify-content-between text-muted mt-3 mb-2">
                              <div className="d-flex align-items-center">
                                <img src={Icon1} alt="Lessons" className="me-1" />
                                <small>{item?.InstrutorId?.lessions || 0}+ Lessons</small>
                              </div>
                              <div className="d-flex align-items-center">
                                <img src={UserIconSvg} alt="Students" className="me-1" />
                                <small>{item?.InstrutorId?.students || 0}+ Students</small>
                              </div>
                            </div>

                            <hr />

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-between mt-3">
                              <Link
                                to={`/admin/update-course/${item._id}`}
                                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                              >
                                <i className="bx bx-edit me-1" />
                                Edit
                              </Link>

                              <Delete
                                step={3}
                                Id={item._id}
                                title="Delete Course"
                                fetchMarketLists={fetchMarketLists}
                                className="btn btn-danger btn-sm"
                              >
                                Delete
                              </Delete>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <NoDataPage message="No courses available. Please add new courses or check back later." />
                    </div>
                  )}
                </div>
              </div>
            </section>



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

export default Courses;
