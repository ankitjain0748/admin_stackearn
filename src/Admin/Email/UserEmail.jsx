import React, { useCallback, useEffect, useState } from "react";
import Listing from "../Api/Listing";
import LoadingPage from "../components/LoadingPage";
import Email from "./Email";
import WebniarSubmit from "./WebniarSubmit";
import DashboardLayout from "../common/DashboardLayout";
import Pagination from "../components/Pagination";
import debounce from "lodash.debounce";
import { Search } from "react-feather";


const UserEmail = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchMarketLists = async (searchEmail, currentPage, limit) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.UserEmail(searchEmail, currentPage, limit);
      setListing(response?.data?.data?.users || []);
      setTotalPages(response?.data?.data?.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMarketLists(searchEmail, currentPage, 15);
  }, [currentPage]);


  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => fetchMarketLists(searchQuery, 1, 15), 300),
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
            <h3 className="h5 font-weight-bold">Registered Users</h3>

            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
              />
              <input
                type="text"
                className="form-control psins"
                placeholder="Search our email "
                value={searchEmail}
                onChange={handleSearchChange}
              />
            </div>
            {/* Search Input */}
            {/* Submit Button */}
            <WebniarSubmit selectedUsers={selectedUsers} disabled={selectedUsers.length === 0} />
          </div>

          {loading ? <LoadingPage /> : <Email />}

          {/* User Table */}
          <div className="checkout-form">
            <div className="table-responsive custom-table">
              <table className="table table-nowrap mb-0">
                <thead>
                  <tr>
                    <th>
                      <input type="checkbox" checked={selectAll} onChange={() => setSelectAll(!selectAll)} />
                      <span className="ms-2">Select All</span>
                    </th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user._id)}
                          onChange={() => setSelectedUsers((prev) =>
                            prev.includes(user._id) ? prev.filter((id) => id !== user._id) : [...prev, user._id]
                          )}
                        />
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}
            />
          </div>

          {/* Pagination Component */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserEmail;
