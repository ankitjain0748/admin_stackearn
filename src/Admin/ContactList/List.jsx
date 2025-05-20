// src/pages/List.jsx
import React, { useEffect, useState, useCallback } from "react";
import Listing from "../Api/Listing";
import DateFormate from "../components/DateFormate";
import MessagePopup from "../components/MessagePopup";
import DeleteTable from "../common/DeleteTable";
import Image from "../components/Image";
import Pagination from "../components/Pagination"; // Import the Pagination component
import DashboardLayout from "../common/DashboardLayout";
import debounce from "lodash.debounce";
import { Search } from "react-feather";
import { Link } from "react-router-dom";

const List = () => {

  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");


  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

  };

  const ContactList = async (selectedOption = "", searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.ContactGet(selectedOption, searchQuery, page, limit);
      const { totalPages, totalcontactmodal } = response?.data?.data || {};
      setListing(response?.data?.data?.contactget);
      setTotalPages(totalPages);
      setTotalItems(totalcontactmodal);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    ContactList(selectedOption, search, currentPage, 15);
  }, [selectedOption, search, currentPage]);

  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => ContactList(selectedOption, searchQuery, 1, 15), 300),
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

  const getInitials = (name) => {
    if (!name) return "?";
    const names = name.split(" ");
    const firstInitial = names[0]?.[0]?.toUpperCase() || "";
    const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">

            <h3 className="mb-2 mb-sm-0 same-height">Contact History</h3>
            <select
              id="contactSelect"
              className={`form-select same-height`}
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Select All</option>
              <option value="valid">Verified </option>
              <option value="invalid">UnVerified</option>
            </select>

            <div className="position-relative same-height search-container"> {/* Added a container */}
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
              />
              <input
                type="text"
                className="form-control psins"
                placeholder="Search our contact name"
                value={search}
                onChange={handleSearchChange}
              />
            </div>
          </div>


          <div className="checkout-form">
            <div className="table-responsive custom-table">
              <table className="table table-nowrap mb-0">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name & Number</th>
                    <th>Email</th>
                    <th>Date</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Page Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : listing.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center">
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    listing.map((item, index) => (
                      <tr key={index}>
                        <td>{(currentPage - 1) * 15 + index + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <h2 className="table-avatar d-flex align-items-center">
                              <Link to={`#`} className="avatar">
                                {item?.ProfileDetails?.profileImage ? (
                                  <Image
                                    classes="avatar-img"
                                    src={item?.ProfileDetails?.profileImage}
                                    alt="User Image"
                                    style={{
                                      objectFit: "cover",
                                    }}
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
                                    {getInitials(item?.name)}
                                  </div>
                                )}
                              </Link>
                              <div className="">
                                <Link to={`#`} className="d-block">
                                  {item?.name}
                                </Link>
                                <Link to={`#`} className="d-block text-muted">
                                  {item?.phone_number}
                                </Link>
                              </div>
                            </h2>
                          </div>
                        </td>
                        <td>{item?.email}</td>
                        <td>
                          <DateFormate data={item?.created_at} />
                        </td>
                        <td>
                          <MessagePopup message={item?.subject} wordLimit={5} />
                        </td>
                        <td>
                          <MessagePopup message={item?.message} wordLimit={5} />
                        </td>
                        <td className="text-capitalize">{item?.role}</td>
                        <td>
                          {item?.Email_verify === "valid" ? (
                            <span className="rounded px-3 py-2 text-capitalize completed-status">
                              Verified
                            </span>
                          ) : item?.Email_verify === "invalid" ? (
                            <span className="rounded px-3 py-2 text-capitalize cancelled-status">
                              UnVerified
                            </span>
                          ) : null}
                        </td>
                        <td>
                          <DeleteTable
                            step={12}
                            Id={item?._id}
                            title="Delete Instructor"
                            fetchMarketLists={ContactList}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>


              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </DashboardLayout>


  );
};

export default List;
