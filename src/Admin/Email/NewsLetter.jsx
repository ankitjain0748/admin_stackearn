import React, { useCallback, useEffect, useState } from "react";
import Listing from "../Api/Listing";
import Email from "./Email";
import WebniarSubmit from "./WebniarSubmit";
import PrmotionSubmit from "./PrmotionSubmit";
import OfferCourseEmail from "./OfferCourseEmail";
import debounce from "lodash.debounce";
import DashboardLayout from "../common/DashboardLayout";
import Pagination from "../components/Pagination";
import { Search } from "react-feather";
import LoadingPage from "../components/LoadingPage";

const NewsLetter = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchEmail, setSearchEmail] = useState(""); // ✅ Search input state
  const [currentPage, setCurrentPage] = useState(1); // ✅ Pagination - current page
  const [limit, setLimit] = useState(10); // ✅ Pagination - results per page
  const [totalPages, setTotalPages] = useState(1); // ✅ Total pages

  // Fetch User List
  const SubscribeList = async (searchEmail, currentPage, limit) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.ContactEmail(searchEmail, currentPage, limit);
      setListing(response?.data?.data?.uniqueEmails || []);
      setTotalPages(response?.data?.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    SubscribeList(searchEmail, currentPage, 15);
  }, [currentPage]);


  // Handle individual checkbox change
  const handleCheckboxChange = (email) => {
    if (selectedUsers.includes(email)) {
      setSelectedUsers(selectedUsers.filter((userEmail) => userEmail !== email));
    } else {
      setSelectedUsers([...selectedUsers, email]);
    }
  };

  // Handle "Select All" checkbox change
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(listing); // Select all emails
    }
    setSelectAll(!selectAll);
  };

  // Handle search input change
  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => SubscribeList(searchQuery, 1, 15), 300),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchEmail(value);
    if (value.length === 0 || value.length >= 3) {
      debouncedFetchMarketLists(value);
    }

    if (value.length > 1) {
      debouncedFetchMarketLists(value);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
            <h3 className="h5 font-weight-bold">News Letter</h3>

            {/* Search Input */}

            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
              />
              <input
                type="text"
                className="form-control psins"
                placeholder="Search by email..."
                value={searchEmail}
                onChange={handleSearchChange}
              />
            </div>

            {/* Action Buttons */}
            <div className="d-flex gap-4">
              <WebniarSubmit selectedUsers={selectedUsers} disabled={selectedUsers.length === 0} />
              <PrmotionSubmit selectedUsers={selectedUsers} disabled={selectedUsers.length === 0} />
              <OfferCourseEmail selectedUsers={selectedUsers} disabled={selectedUsers.length === 0} />
            </div>
          </div>

          {loading ? <LoadingPage /> : <Email />}

          {/* Table */}
          <div className="checkout-form">
            <div className="table-responsive custom-table">
              <table className="table table-nowrap mb-0">
                <thead>
                  <tr>
                    <th className="text-left">
                      <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                      <span className="ms-2">Select All</span>
                    </th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user)}
                          onChange={() => handleCheckboxChange(user)}
                        />
                      </td>
                      <td>{user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
            <Pagination
              currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}
            />
          </div>

          {/* Pagination Controls */}

        </div>
      </div>
    </DashboardLayout>
  );
};

export default NewsLetter;
