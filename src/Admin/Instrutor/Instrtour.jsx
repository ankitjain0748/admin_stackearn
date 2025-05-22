import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import DateFormate from "../common/DateFormate";
import User2 from "../../assert/user16.jpg";
import DeleteTable from "../common/DeleteTable";
import EditData from "../common/EditData";
import { Search } from "react-feather";
import debounce from "lodash.debounce";

import ViewIcon from "../components/ViewIcon";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import Image from "../components/Image";
const Instrtour = () => {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");

    const fetchMarketLists = async (searchQuery = "", page = 1, limit = 25) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.InstrutorGet(searchQuery, page, limit);
            setListing(response?.data?.data?.Instructorget || []);
            setTotalPages(response?.data?.data?.totalPages || 1);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketLists(search, currentPage, 25);
    }, [currentPage]);

    const debouncedFetchMarketLists = useCallback(
        debounce((searchQuery) => fetchMarketLists(searchQuery, 1, 25), 300),
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
                    <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">                        {/* Heading */}
                        <h3 className="mb-2 mb-sm-0">Instructor History</h3>

                        {/* Search Box */}
                        <div className="position-relative">
                            <Search
                                size={16}
                                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                            />
                            <input
                                type="text"
                                className="form-control psins"
                                placeholder="Search our Instructor"

                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>

                        {/* Button */}
                        <Link className="login-head button" to="/admin/add/instructor">
                            Add Instructor
                        </Link>
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
                                                <th>View</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-4">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : listing && listing.length > 0 ? (
                                                listing.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{(currentPage - 1) * 15 + (index + 1)}</td>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <h2 className="table-avatar d-flex align-items-center">
                                                                    <Link to={`/admin/add/instructor/${item?._id}`} className="avatar">
                                                                        {item?.profileImage ? (
                                                                            <Image
                                                                                classes="avatar-img"
                                                                                src={item?.profileImage || User2}
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
                                                                                    fontSize: "18px",
                                                                                    width: '40px',
                                                                                    height: '40px',
                                                                                    display: "flex",
                                                                                    padding: "8px"
                                                                                }}
                                                                            >
                                                                                {getInitials(item?.firstName)}
                                                                            </div>
                                                                        )}

                                                                    </Link>
                                                                    <Link to={`/admin/add/instructor/${item?._id}`} className="ms-2">
                                                                        {item?.firstName} {item?.lastName}
                                                                        <span className="d-flex text-muted">{item?.phoneNumber}</span>
                                                                    </Link>
                                                                </h2>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <DateFormate data={item?.createdAt} />
                                                        </td>
                                                        <td>{item?.email}</td>
                                                        <td>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                                <ViewIcon link={`/admin/add/instructor/${item?._id}`} />
                                                                <EditData link={`/admin/update/instructor/${item?._id}`} />
                                                                <DeleteTable
                                                                    step={2}
                                                                    Id={item?._id}
                                                                    title="Delete Instructor"
                                                                    fetchMarketLists={fetchMarketLists}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center py-4 text-muted">
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

        </DashboardLayout>

    );
};

export default Instrtour;
