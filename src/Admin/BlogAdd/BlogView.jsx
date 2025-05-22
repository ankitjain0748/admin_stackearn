import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import course02 from "../../assert/course-02.jpg";
import { FaCalendarAlt, FaEye } from "react-icons/fa";
import Delete from "../common/Delete";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import { Search } from "react-feather";
import debounce from "lodash.debounce";
import NoDataPage from "../components/NoDataPage";
import Image from "../components/Image"
import DateFormate from "../common/DateFormate";
const BlogView = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.BlogGet(searchQuery, page, limit);
            setListing(response?.data?.data
            );
            setTotalPages(response?.data?.totalPages);
            setTotalItems(response.data.totalUsers);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMarketLists(search, currentPage, 15);
    }, [currentPage]);

    const debouncedFetchMarketLists = useCallback(
        debounce((searchQuery) => fetchMarketLists(searchQuery, 1, 15), 300),
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
    return (
        <DashboardLayout>

            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading d-flex flex-column flex-md-row justify-content-md-between align-items-md-center gap-3">
                        <h3>Blog History</h3>
                        <div className="position-relative">
                            <Search
                                size={16}
                                className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                            />
                            <input
                                type="text"
                                className="form-control psins"
                                placeholder="Search our Blog Name"

                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <Link
                            className="login-head button"
                            to="/admin/blog-add"
                        >
                            Add Blog
                        </Link>
                    </div>

                    <div className="checkout-form pb-0">
                        <div className="tab-content">
                            <div
                                className="tab-pane fade show active"
                                id="enroll-courses"
                            >

                                <div className="row">
                                    {loading ? (
                                        <div className="col-12 text-center py-5">
                                            <p>Loading...</p>
                                        </div>
                                    ) : listing && listing.length > 0 ? (
                                        listing.map((online, onlineIndex) => (
                                            <div className="col-md-6" key={onlineIndex}>
                                                <div className="mb-4 rounded">
                                                    <div className="card h-100 rounded">

                                                        {/* Blog Image or Video */}
                                                        <Link to={`/admin/blog-details/${online._id}`}>
                                                            <Image
                                                                className="img-fluid"
                                                                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                                                alt={online.title || 'Blog Image'}
                                                                src={online.Image || course02} // Fallback if no image
                                                            />
                                                        </Link>

                                                        {/* Blog Info */}
                                                        <div className="p-2">
                                                            <div className="text-left">
                                                                <div className="d-flex justify-content-between align-items-center">

                                                                    {/* Publish Date */}
                                                                    <div className="d-flex align-items-center">
                                                                        <FaCalendarAlt className="me-2 text-primary fs-4" size={18} />
                                                                        <p className="mb-0 align-middle">
                                                                            <DateFormate data={online?.createdAt} />
                                                                        </p>
                                                                    </div>

                                                                    {/* View Count */}
                                                                    <Link to={`/blog-details/${online._id}`} className="d-flex align-items-center">
                                                                        <FaEye className="me-2 text-success fs-4" size={18} />
                                                                        <p className="mb-0 align-middle">{online?.views || 0}</p>
                                                                    </Link>
                                                                </div>
                                                            </div>

                                                            {/* Title and Short Content */}
                                                            <h5 className="card-subtitle mt-2">{online.title || "Untitled Blog"}</h5>
                                                            <p className="mt-2 blog-limit">{online?.short_content || "No content available."}</p>

                                                            {/* Edit and Delete Buttons */}
                                                            <hr className="my-3" />
                                                            <div className="d-flex justify-content-between mt-3 mb-3">
                                                                <Link
                                                                    to={`/admin/blog-update/${online?._id}`}
                                                                    className="upcoming-status rounded px-2 py-1 d-flex align-items-center"
                                                                >
                                                                    <i className="bx bx-edit me-2" />
                                                                    Edit
                                                                </Link>
                                                                <Delete
                                                                    step={4}
                                                                    Id={online?._id}
                                                                    title="Delete Blog"
                                                                    fetchMarketLists={fetchMarketLists}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-12 text-center py-5">
                                            <NoDataPage />
                                        </div>
                                    )}
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

export default BlogView;
