import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import DateFormate from "../common/DateFormate";
import  User2  from "../../assert/course-02.jpg";
import DeleteTable from "../common/DeleteTable";
import ViewIcon from "../components/ViewIcon";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import debounce from "lodash.debounce";
import { Search } from "react-feather";
import EventRow from "../components/EventRow";
import Image from "../components/Image";
const UserList = () => {
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [item, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelectedOption(value);

    };


    const fetchMarketLists = async (selectedOption = "", searchQuery = "", page = 1, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.userList(selectedOption, searchQuery, page, limit);
            setListing(response?.data?.data?.users
            );
            setTotalPages(response?.data?.data.totalPages);
            setTotalItems(response.data.data.totalUsers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketLists(selectedOption, search, currentPage, 15);
    }, [selectedOption, search, currentPage]);

    const debouncedFetchMarketLists = useCallback(
        debounce((searchQuery) => fetchMarketLists(selectedOption, searchQuery, 1, 15), 300),
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
            <div className="">
                <div className="settings-widget card-details">
                    <div className="settings-menu p-0">
                        <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
                            <h3>User History</h3>
                            <select
                                id="contactSelect"
                                className={`form-select same-height`}
                                value={selectedOption}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select All</option>
                                <option value="active">active </option>
                                <option value="inactive">InActive </option>
                                <option value="enrolled">Enrolled </option>
                                <option value="registered">Registered</option>
                            </select>

                            <div className="position-relative mr-4 me-3">
                                <Search
                                    size={16}
                                    className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                                />
                                <input
                                    type="text"
                                    className="form-control psins"
                                    placeholder="Search our User name"
                                    value={search}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>
                        <div className="checkout-form">
                            {/* Tab Content */}

                            <div className="tab-content">
                                {/* Today */}
                                <div className="tab-pane show active" id="today">
                                    <div className="table-responsive custom-table">
                                        <table className="table table-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th>S. No.</th>
                                                    <th> Name</th>
                                                    <th>Join  Date</th>
                                                    <th>Email</th>
                                                    <th>Course Name</th>
                                                    <th>Status</th>
                                                    <th>View</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {loading ? (
                                                    <tr>
                                                        <td colSpan="7" className="text-center py-4">
                                                           Loading...
                                                        </td>
                                                    </tr>
                                                ) : item && item.length > 0 ? (
                                                    item.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{(currentPage - 1) * 15 + (index + 1)}</td>
                                                            <td>
                                                                <div className="d-flex align-items-center">
                                                                    <h2 className="table-avatar d-flex align-items-center">
                                                                        <Link to={`/admin/user-profile-Id/${item?._id}`} className="avatar">
                                                                            {item?.ProfileDetails?.profileImage ? (
                                                                                <Image
                                                                                    classes="avatar-img"
                                                                                    src={item?.ProfileDetails?.profileImage || User2}
                                                                                    alt="User Image"
                                                                                    style={{ objectFit: "cover" }}
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
                                                                        <div className="text-capitalize">
                                                                            <Link to={`/admin/user-profile-Id/${item?._id}`} className="d-block">
                                                                                {item?.name}
                                                                            </Link>
                                                                            <Link to={`/admin/user-profile-Id/${item?._id}`} className="d-block text-muted">
                                                                                {item?.phone_number}
                                                                            </Link>
                                                                        </div>
                                                                    </h2>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <DateFormate data={item?.created_at} />
                                                            </td>
                                                            <td>{item?.email}</td>
                                                            <td>{item?.CourseId?.title || "No Course"}</td>
                                                            <td>
                                                                <EventRow status={item?.user_status} />
                                                            </td>
                                                            <td>
                                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                    <ViewIcon link={`/admin/user-profile-Id/${item?._id}`} />
                                                                    <DeleteTable step={1} Id={item?._id} fetchMarketLists={fetchMarketLists} />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="7" className="text-center py-4">
                                                            No Data Available
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>


                                        </table>
                                    </div>
                                </div>
                            </div>
                            {/* /Tab Content */}
                        </div>
                    </div>
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </DashboardLayout>
    );
};

export default UserList;
