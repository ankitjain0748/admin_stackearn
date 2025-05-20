import React, { useEffect, useState, useCallback } from "react";
import Listing from "../Api/Listing";
import LoadingPage from "../components/LoadingPage";
import DateFormate from "../components/DateFormate";
import DeleteTable from "../common/DeleteTable";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import debounce from "lodash.debounce";
import { Search } from "react-feather";
const SubscribeHistory = () => {
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

    };

    const SubscribeList = async (selectedOption = "", searchQuery = "", page, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.subscribeGet(selectedOption, searchQuery, page, limit);
            setTotalPages(response?.data?.data.totalPages);
            setTotalItems(response.data.data.totalsubscribemodal);
            setListing(response?.data?.data?.subscribedata);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        SubscribeList(selectedOption, search, currentPage, 15);
    }, [selectedOption, search, currentPage]);

    const debouncedFetchMarketLists = useCallback(
        debounce((searchQuery) => SubscribeList(selectedOption, searchQuery, currentPage, 15), 300),
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
        <>
            <DashboardLayout>
                <div className="settings-widget card-details">
                    <div className="settings-menu p-0">
                        <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
                            <h3>Subscribe History</h3>
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
                            <div className="position-relative mr-4 me-3">
                                <Search
                                    size={16}
                                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                                />
                                <input
                                    type="text"
                                    className="form-control psins"
                                    placeholder="Search our email"

                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        {/* Tab Content */}

                        <div className="checkout-form">
                            <div className="tab-content">
                                {/* Today */}
                                <div className="tab-pane show active" id="today">
                                    <div className="table-responsive custom-table">
                                        <table className="table table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>S. No.</th>
                                                    <th>Email</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                    <th>Action </th>
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
                                                            <td>{(currentPage - 1) * 15 + (index + 1)}</td>
                                                            <td>{item?.email}</td>
                                                            <td>
                                                                <DateFormate data={item?.created_at} />
                                                            </td>
                                                            <td>
                                                                {item?.Email_verify && (
                                                                    <span
                                                                        className={`rounded px-3 py-2 text-capitalize ${item.Email_verify === "valid" ? "completed-status" : "cancelled-status"
                                                                            }`}
                                                                    >
                                                                        {item.Email_verify === "valid" ? "Verified" : "UnVerified"}
                                                                    </span>
                                                                )}
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    {/* Delete Action */}
                                                                    <DeleteTable
                                                                        step={13}
                                                                        Id={item?._id}
                                                                        title="Delete Instructor"
                                                                        fetchMarketLists={SubscribeList}
                                                                    />
                                                                </div>
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
                        {/* /Tab Content */}
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </DashboardLayout>
        </>

    );
};

export default SubscribeHistory;
