import React, { useCallback, useEffect, useRef, useState } from "react";
import Listing from "../Api/Listing";
import PaymentStatus from "../components/PaymentStatus";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import DateFormate from "../components/DateFormate";

const AdminPayment = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [payment_date, setPayment_date] = useState("");
  const searchTimeout = useRef(null);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
  };

  const handlePaymentSearchChange = (e) => {
    const value = e.target.value;
    setPayment_date(value);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      PaymentLisitng(selectedOption, search, value, 1, 15);
    }, 300);
  };

  const PaymentLisitng = async (
    selectedOption = "",
    search = "",
    payment_date = "",
    page = 1,
    limit = 15
  ) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.AdminPayments(
        selectedOption,
        search,
        payment_date,
        page,
        limit
      );
      setListing(response?.data?.payment);
      setTotalPages(response?.data?.data.totalPages);
      setTotalItems(response.data.data.totalUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PaymentLisitng(selectedOption, search, payment_date, currentPage, 15);
  }, [selectedOption, search, payment_date, currentPage]);

  const debouncedFetchMarketLists = useCallback(
    debounce((searchQuery) => {
      PaymentLisitng(selectedOption, searchQuery, payment_date, 1, 15);
    }, 300),
    [selectedOption, payment_date]
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


  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
            <h3>Transaction</h3>

            <select
              id="contactSelect"
              className="form-select same-height"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="">Select All</option>
              <option value="payout">Payout</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="Add">Add</option>
            </select>

            <div className="position-relative">
              <p className="d-block d-md-none">Search By Date</p>
              <input
                type="date"
                className="form-control psins"
                value={payment_date}
                onChange={handlePaymentSearchChange}
              />
            </div>


            <div className="position-relative">
              <Search
                size={16}
                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
              />
              <input
                type="text"
                className="form-control psins"
                placeholder="Search by Username"
                value={search}
                onChange={handleSearchChange}
              />
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
                        <th>Date</th>
                        <th>Transaction Id</th>
                        <th>UserName</th>
                        <th>Payment method</th>
                        <th>Payment Reason</th>
                        <th>Status</th>
                        <th>Payout Income</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            Loading...
                          </td>
                        </tr>
                      ) : listing && listing.length > 0 ? (
                        listing.map((item, index) => (
                          <tr key={index}>
                            <td>{(currentPage - 1) * 15 + (index + 1)}</td>
                            <td>
                              <DateFormate data={item.payment_date} />
                            </td>
                            <td>{item?.transactionId || item?._id}</td>
                            <td>{item?.userId?.name || "N/A"}</td>
                            <td>
                              {item?.paymentMethod ||
                                item?.payment_type ||
                                "N/A"}
                            </td>
                            <td>
                              {item?.withdrawal_reason ||
                                item?.success_reasons ||
                                "N/A"}
                            </td>
                            <td>
                              <PaymentStatus status={item?.page} />
                            </td>
                            <td className="text-uppercase">
                              {`${item.payment_income} Income`}
                            </td>

                            <td>
                              <LiaRupeeSignSolid size={20} />
                              {item?.payment_key || item?.payment_Add || 0}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="8" className="text-center py-5">
                            <h4>No Transactions Available</h4>
                            <p>
                              Please check back later or add new transactions.
                            </p>
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

export default AdminPayment;
