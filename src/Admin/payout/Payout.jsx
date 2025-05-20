import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import DashboardLayout from "../common/DashboardLayout";
import Pagination from "../components/Pagination";
import { Search } from "react-feather";
import EventRow from "../components/EventRow";
import PaymentOut from "../UserList/PaymentOut";
import User2 from "../../assert/course-02.jpg";

const Payout = () => {
    const discountPercent = localStorage && localStorage.getItem("percntage")
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [activeTab, setActiveTab] = useState("today");

    const itemsPerPage = 10;

    const fetchPaymentListing = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response =
                activeTab === "today"
                    ? await main.UserRefral(searchQuery, currentPage, itemsPerPage)
                    : await main.PassiveUserRefral(searchQuery, currentPage, itemsPerPage); // Assuming another method for passive
            setListing(response?.data?.userDetails || []);
            setTotalPages(response?.data?.totalPages || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPaymentListing();
    }, [searchQuery, currentPage, activeTab]);


    return (
        <DashboardLayout>
            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
                        <h3>{activeTab === "today" ? "Today Payout" : "Passive Payout"}</h3>
                        <div className="position-relative">
                            <Search size={16} className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger" />
                            <input
                                type="text"
                                className="form-control psins"
                                placeholder="Search by Username"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <ul className="nav nav-tabs my-3">
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "today" ? "active" : ""}`}
                                onClick={() => {
                                    setCurrentPage(1);
                                    setActiveTab("today");
                                }}
                            >
                                Today Payout
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${activeTab === "passive" ? "active" : ""}`}
                                onClick={() => {
                                    setCurrentPage(1);
                                    setActiveTab("passive");
                                }}
                            >
                                Passive Payout
                            </button>
                        </li>
                    </ul>

                    <div className="checkout-form">
                        <div className="table-responsive custom-table">
                            {activeTab === "today" ? (
                                <table className="table table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>User</th>
                                            <th>Account Holder Name</th>
                                            <th>Bank Name</th>
                                            <th>Account Number</th>
                                            <th>IFSC Code</th>
                                            <th>Current Balance</th>
                                            <th>Today Income</th>
                                            <th>Today Payout</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="10" className="text-center py-4">Loading...</td>
                                            </tr>
                                        ) : listing.length > 0 ? (
                                            listing.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <h2 className="table-avatar d-flex align-items-center">
                                                                <Link to={`/admin/user-profile-Id/${item?._id}`} className="avatar">
                                                                    <img
                                                                        className="avatar-img"
                                                                        src={item?.ProfileDetails?.profileImage || User2}
                                                                        alt="User"
                                                                    />
                                                                </Link>
                                                                <div className="sell-tabel-info">
                                                                    <p className="mb-1">
                                                                        <Link to={`/admin/user-profile-Id/${item?._id}`} className="course-title">
                                                                            {item?.name || "N/A"}
                                                                        </Link>
                                                                    </p>
                                                                    <p className="instructor-name text-muted mb-0">
                                                                        {item?.phone_number || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </h2>
                                                        </div>
                                                    </td>
                                                    <td>{item?.bank_details?.BankName || "N/A"}</td>
                                                    <td>{item?.bank_details?.BranchName || "N/A"}</td>
                                                    <td>{item?.bank_details?.BankNumber || "N/A"}</td>
                                                    <td>{item?.bank_details?.IFSC || "N/A"}</td>
                                                    <td>{(item?.lastTodayIncome) - (item?.UnPaidAmounts) || 0}</td>

                                                    <td>{item?.referred_user_pay_daily || 0}</td>
                                                    <td>{(item?.lastTodayIncome) - (item?.UnPaidAmounts) || 0}</td>
                                                    <td>
                                                        <EventRow status={"Pending"} />
                                                    </td>
                                                    <td className="link-box">
                                                        <PaymentOut
                                                            Id={item?._id}
                                                            fetchMarketLists={fetchPaymentListing}
                                                            step={2}
                                                            lastTodayIncome={(item?.lastTodayIncome) - (item?.UnPaidAmounts)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center py-4">
                                                    No Valid Data Available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            ) : (
                                <table className="table table-nowrap mb-0">
                                    <thead>
                                        <tr>
                                            <th>S. No.</th>
                                            <th>User</th>
                                            <th>User Status</th>

                                            <th>Account Holder Name</th>
                                            <th>Bank Name</th>
                                            <th>Account Number</th>
                                            <th>IFSC Code</th>
                                            <th>Current Balance</th>
                                            <th>Passive Payout</th>
                                            <th>Active  Price</th>
                                            <th>Deduction ({discountPercent}%)</th>
                                            <th>Inactive  price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loading ? (
                                            <tr>
                                                <td colSpan="10" className="text-center py-4">Loading...</td>
                                            </tr>
                                        ) : listing.length > 0 ? (
                                            listing.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <h2 className="table-avatar d-flex align-items-center">
                                                                <Link to={`/admin/user-profile-Id/${item?._id}`} className="avatar">
                                                                    <img
                                                                        className="avatar-img"
                                                                        src={item?.ProfileDetails?.profileImage || User2}
                                                                        alt="User"
                                                                    />
                                                                </Link>
                                                                <div className="sell-tabel-info">
                                                                    <p className="mb-1">
                                                                        <Link to={`/admin/user-profile-Id/${item?._id}`} className="course-title">
                                                                            {item?.name || "N/A"}
                                                                        </Link>
                                                                    </p>
                                                                    <p className="instructor-name text-muted mb-0">
                                                                        {item?.phone_number || "N/A"}
                                                                    </p>
                                                                </div>
                                                            </h2>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <EventRow status={item?.user_status || "N/A"} />
                                                    </td>
                                                    <td>{item?.bank_details?.BankName || "N/A"}</td>
                                                    <td>{item?.bank_details?.BranchName || "N/A"}</td>
                                                    <td>{item?.bank_details?.BankNumber || "N/A"}</td>
                                                    <td>{item?.bank_details?.IFSC || "N/A"}</td>
                                                    <td>{item?.pervious_passive_income_month || 0}</td>
                                                    <td>{(item?.first_user_pay) + (item?.second_user_pay) || 0}</td>
                                                    <td>{(item?.first_user_pay) + (item?.second_user_pay) || 0}</td>
                                                    <td>{
                                                        (
                                                            ((item?.first_user_pay || 0) + (item?.second_user_pay || 0)) *
                                                            (1 - discountPercent / 100)
                                                        ).toFixed(2) - (item?.first_user_pay) + (item?.second_user_pay)
                                                        || 0}</td>

                                                    <td>
                                                        {(
                                                            ((item?.first_user_pay || 0) + (item?.second_user_pay || 0)) *
                                                            (1 - discountPercent / 100)
                                                        ).toFixed(2)}
                                                    </td>

                                                    <td>
                                                        <EventRow status={"Pending"} />
                                                    </td>
                                                    {item?.pervious_passive_income_month != 0 && (
                                                        <td className="link-box">
                                                            <PaymentOut
                                                                Id={item?._id}
                                                                fetchMarketLists={fetchPaymentListing}
                                                                step={2}
                                                                lastTodayIncome={item?.user_status === "active" ? ((item?.first_user_pay) + (item?.second_user_pay)) :
                                                                    (
                                                                        ((item?.first_user_pay || 0) + (item?.second_user_pay || 0)) *
                                                                        (1 - discountPercent / 100)
                                                                    ).toFixed(2)

                                                                }
                                                            />
                                                        </td>
                                                    )
                                                    }

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="10" className="text-center py-4">
                                                    No Valid Data Available
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}

                        </div>
                    </div>
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
        </DashboardLayout>
    );
};

export default Payout;
