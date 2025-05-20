import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import Delete from "../common/Delete";
import LoadingPage from "../components/LoadingPage";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"; // Import icons from react-icons
import moment from "moment";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import debounce from "lodash.debounce";
import { Search } from "react-feather";
import NoDataPage from "../components/NoDataPage";
import VideoModal from "../services/VideoModal";

const WebniarList = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const fetchWebinars = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.WebniarGet(searchQuery, page, limit);
      const { totalPages, totalcontactmodal } = response?.data?.data || {};
      setListing(response?.data?.data?.Courseget);
      setTotalPages(totalPages);
      setTotalItems(totalcontactmodal);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWebinars(search, currentPage, 15);
  }, [search, currentPage]);

  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => fetchWebinars(searchQuery, 1, 15), 300),
    []
  );


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.length > 3) {
      debouncedFetchMarketLists(value);
    }
  };


  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>

      <div className="settings-widget card-info">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
            <h3>Webinar</h3>
            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
              />
              <input
                type="text"
                className="form-control ps-ins"
                placeholder="Search our webinar title"
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <Link
              className="btn btn-primary"
              to="/admin/add-webniar"
            >
              Add New Webinar
            </Link>
          </div>

          <div className="checkout-form pb-0">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="enroll-courses"
              >
                {loading ? (
                  <LoadingPage />
                ) : (
                  <div className="row">
                    {listing.length > 0 ? (
                      listing.map((webinar, index) => {
                        const today = moment().format("YYYY-MM-DD"); // Get today's date
                        const startTime = moment(`${today} ${webinar?.webnair_time}`, "YYYY-MM-DD HH:mm");
                        const endTime = moment(`${today} ${webinar?.webniar_end_time}`, "YYYY-MM-DD HH:mm");

                        return (
                          <div className="col-md-6 gap-3" key={index}>
                            <div className="card h-100 rounded">
                              {/* Video Player */}
                              <div className="rounded-lg mb-3">
                                <VideoModal videoLink={webinar?.video} thumbnail={webinar?.thumbnail} />
                              </div>
                              {/* Title */}
                              <div className="p-1">
                                <h5 className="card-subtitle mt-1 mb-2">{webinar?.title}</h5>
                                <div className="rounded d-flex align-items-center mt-1">
                                  <FaCalendarAlt size={18} className="text-primary" />
                                  <p className="card-text mb-0 ms-2">
                                    {webinar?.webnair_date}
                                    {startTime.isValid() ? ` ${startTime.format("hh:mm A")}` : " Invalid time"}
                                    →
                                    {endTime.isValid() ? ` ${endTime.format("hh:mm A")}` : " Invalid time"}
                                  </p>
                                </div>
                                <div className="rounded d-flex align-items-center mt-1">
                                  <FaMapMarkerAlt size={18} className="text-primary" />
                                  <p className="card-subtitle mb-0 ms-2">
                                    {webinar?.place}
                                  </p>
                                </div>

                                <hr className="my-3" />
                                {/* Edit and Delete Buttons */}
                                <div className="d-flex justify-content-between p-2">
                                  <Link
                                    to={`/admin/update-webinar/${webinar?._id}`}
                                    className="upcoming-status rounded px-2 font-normal py-1 text-capitalize "
                                  >
                                    <i className="bx bx-edit" />
                                    <span style={{ marginLeft: "2px" }}>Edit</span>
                                  </Link>
                                  <Delete
                                    step={7}
                                    Id={webinar?._id}
                                    title="Delete Webinar"
                                    fetchMarketLists={fetchWebinars}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="col-12 text-center ">
                        <NoDataPage />
                      </div>
                    )}
                  </div>
                )}



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

export default WebniarList;
