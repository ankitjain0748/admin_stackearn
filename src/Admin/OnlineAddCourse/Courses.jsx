import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import Delete from "../common/Delete";
import LoadingPage from "../components/LoadingPage";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import debounce from "lodash.debounce";
import NoDataPage from "../components/NoDataPage";
import VideoModal from "../services/VideoModal";

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.OnlineGet(searchQuery, page, limit);
      setListing(response?.data?.data?.Courseget);
      setTotalPages(response?.data?.data.totalPages);
      // setCurrentPage(response?.data?.data.currentPage); // Ensure currentPage is updated here if needed
      setTotalItems(response.data.data.totalCourse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketLists(search, currentPage, 15);
  }, [search, currentPage]); // Include 'search' in the dependency array

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
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page); // Only update the currentPage state
  };

  return (
    <DashboardLayout>
      <div className="settings-widget card-info">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
            <h3> Online Videos</h3>
            <Link
              className="login-head button"
              to="/admin/add-online-content"
            >
              Online Videos
            </Link>
          </div>
          <div className="checkout-form ">
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
                    listing.map((online, onlineIndex) => (
                      <div className="col-md-6" key={onlineIndex}>
                        <div className="mb-4 rounded">
                          <div className="card h-100 rounded">
                            {/* Video Player or Placeholder */}
                            <div className="video-container rounded-lg">
                              {online?.video ? (
                                <VideoModal
                                  videoLink={online.video}
                                  thumbnail={online?.thumbnail}
                                />
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center bg-light"
                                  style={{ height: '200px' }}
                                >
                                  <p className="text-muted">No Video Available</p>
                                </div>
                              )}
                            </div>

                            <div className="p-2">
                              <h5 className="mt-1 fs-6 card-subtitle">
                                {online.title || "Untitled Content"}
                              </h5>

                              {/* Edit and Delete Buttons */}
                              <hr className="my-3" />
                              <div className="d-flex justify-content-between p-2">
                                <Link
                                  to={`/admin/update-online-content/${online?._id}`}
                                  className="upcoming-status rounded px-1 py-1 d-flex align-items-center"
                                >
                                  <i className="bx bx-edit" />
                                  <span style={{ marginLeft: '2px' }}>Edit</span>
                                </Link>
                                <Delete
                                  step={5}
                                  Id={online?._id}
                                  title="Delete Instructor"
                                  fetchMarketLists={fetchMarketLists}
                                />
                              </div>
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

export default Courses;