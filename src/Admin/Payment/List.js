import React, { useEffect, useState, useRef } from "react";
import Listing from "../Api/Listing";
import EventRow from "../components/EventRow";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import { Search } from "react-feather";
import DateFormate from "../common/DateFormate";

const List = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [payment_date, setPayment_date] = useState("");
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const searchTimeout = useRef(null);

  const handleUserSearchChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      PaymentLisitng(selectedOption, search, value, payment_date, 1, 15);
    }, 300);
  };

  const handlePaymentSearchChange = (e) => {
    const value = e.target.value;
    setPayment_date(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      PaymentLisitng(selectedOption, search, username, value, 1, 15);
    }, 300);
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };
  const PaymentLisitng = async (
    selectedOption = "",
    searchQuery = "",
    username = "",
    payment_date = "",
    page = 1,
    limit = 15
  ) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.PaymentList(
        selectedOption,
        searchQuery,
        username,
        payment_date,
        page,
        limit
      );
      setListing(response?.data?.payments);
      setTotalPages(response?.data.totalPages);
      setTotalItems(response.data.totalUsers);
    } catch (error) {
      console.error(error);
      // alert("Failed to fetch payments. Please try again."); // Example error handling
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PaymentLisitng(selectedOption, search, username, payment_date, currentPage, 15);
  }, [selectedOption, search, username, payment_date, currentPage]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      PaymentLisitng(selectedOption, value, username, payment_date, 1, 15);
    }, 300);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="container">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <h3>Payment History</h3>
              </div>
              <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group position-relative">
                  <Search
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                  />
                  <input
                    type="text"
                    className="form-control psins"
                    placeholder="Search Payment ID"
                    value={search}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group position-relative">
                  <p className="d-block d-md-none">Search By Date</p>
                  <input
                    type="date"
                    className="form-control "
                    placeholder="search by date"
                    value={payment_date}
                    onChange={handlePaymentSearchChange}
                  />
                </div>

              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group position-relative">
                  <Search
                    size={16}
                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                  />
                  <input
                    type="text"
                    name="username"
                    className="form-control psins"
                    placeholder="Search Username"
                    value={username}
                    onChange={handleUserSearchChange}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="form-group position-relative">
                  <select
                    id=""
                    className="form-select psins"
                    value={selectedOption}
                    onChange={handleSelectChange}
                  >
                    <option value="">Select All</option>
                    <option value="success">Success</option>
                    <option value="cancel">Cancel</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="checkout-form">
            <div className="tab-content">
              <div className="tab-pane show active" id="today">
                <div className="table-responsive custom-table">
                  <table className="table table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th>S. No.</th>
                        <th>Username </th>
                        <th>Course Name</th>
                        <th>Order Id</th>
                        <th>Payment Id</th>
                        <th>Payment Method</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            Loading...
                          </td>
                        </tr>
                      ) : listing?.length > 0 ? (
                        listing.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item?.UserId?.name || "N/A"}</td>
                            <td>{item?.CourseId?.title || "N/A"}</td>
                            <td>{item?.order_id || "N/A"}</td>
                            <td>{item?.payment_id || "N/A"}</td>
                            <td>{item?.payment_method || "Card" || "N/A"}</td>
                            <td>
                              <DateFormate data={item?.payment_date} />
                            </td>
                            <EventRow status={item?.payment_status || "Unknown"} />
                            <td>
                              <LiaRupeeSignSolid size={22} />
                              {item?.amount || "0"}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center py-4">
                            No Data Available
                          </td>
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
    </DashboardLayout>
  );
};

export default List;