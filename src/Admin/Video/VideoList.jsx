import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import Delete from "../common/Delete";
import LoadingPage from "../components/LoadingPage";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import NoDataPage from "../components/NoDataPage";
import VideoModal from "../services/VideoModal";
const VideoList = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const fetchWebinars = async (searchQuery = "", page = 1, limit = 50) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.VideoGets(searchQuery, page, limit);
      setListing(response?.data?.data?.Courseget
      );
      setTotalPages(response?.data?.data.totalPages);
      setTotalItems(response.data.data.totalCourse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWebinars(search, currentPage, 50);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="settings-widget card-info">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
            <h3>Tranning Video</h3>
            <Link
              className="login-head button"
              to="/admin/video_add"
            >
              Add New Video
            </Link>
          </div>

          <div className="checkout-form pb-0">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="enroll-courses"
              >
                <div className="row">
                  {loading ? (
                    <div className="col-12 text-center py-5">
                      <LoadingPage />
                    </div>
                  ) : listing && listing.length > 0 ? (
                    listing.map((webinar, index) => (
                      <div className="col-md-6 mb-2" key={index}>
                        <div className="card h-100 rounded">

                          {/* Video Player or Placeholder */}
                          <div className="rounded-lg">
                            {webinar?.video ? (
                              <VideoModal videoLink={webinar.video} thumbnail={webinar?.thumbnail} />
                            ) : (
                              <div
                                className="d-flex align-items-center justify-content-center bg-light"
                                style={{ height: '200px' }}
                              >
                                <p className="text-muted">No Video Available</p>
                              </div>
                            )}
                          </div>

                          {/* Title and Content */}
                          <div className="p-2">
                            <h5 className="card-subtitle mt-1">
                              {webinar?.title || "Untitled Webinar"}
                            </h5>
                            {/* <p className="blog-limits mt-2">
                              {webinar?.content || "No description available."}
                            </p> */}

                            <hr className="my-3" />

                            {/* Edit and Delete Buttons */}
                            <div className="d-flex justify-content-between p-2">
                              <Link
                                to={`/admin/video_add/${webinar?._id}`}
                                className="upcoming-status rounded px-2 font-normal py-1 text-capitalize"
                              >
                                <i className="bx bx-edit" />
                                <span style={{ marginLeft: '5px' }}>Edit</span>
                              </Link>
                              <Delete
                                step={8}
                                Id={webinar?._id}
                                title="Delete Video"
                                fetchMarketLists={fetchWebinars}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center py-5">
                      <NoDataPage />
                    </div>
                  )}
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
    </DashboardLayout>
  );
};

export default VideoList;
