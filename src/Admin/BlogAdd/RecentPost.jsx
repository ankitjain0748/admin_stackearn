import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "moment"; // Import Moment.js for date formatting
import  Blog5  from "../../assert/blog-05.jpg";
import { FaCalendarAlt } from "react-icons/fa";
import Listing from "../Api/Listing";


const RecentPost = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");

    const [listing, setListing] = useState([]);
    const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
        try {
            const main = new Listing();
            const response = await main.BlogGet(searchQuery, page, limit);
            setListing(response?.data?.data
            );
            setTotalPages(response?.data?.totalPages);
            setCurrentPage(response?.data?.currentPage);
            setTotalItems(response.data.totalUsers);

        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchMarketLists(search, currentPage, 15);
    }, [currentPage]);



    return (
        <div className=" post-widget blog-widget bg-white">
            <div className="card-header">
                <h4 className="card-title">Recent Posts</h4>
            </div>
            <div className="card-body">
                <ul className="latest-posts">
                    {listing?.slice(0, 5).map((item, index) => (
                        <li key={index}>
                            <div className="post-thumb">
                                <Link to={`/blog-details/${item._id}`}>
                                    <img className="img-fluid" src={item.Image || Blog5} alt="Blog Post" />
                                </Link>
                            </div>
                            <div className="post-info">
                                <h4>
                                    <Link to={`/blog-details/${item._id}`}>
                                        {item.title.length > 50 ? `${item.title.substring(0, 50)}...` : item.title}
                                    </Link>
                                </h4>

                                <p className="text-uppercase d-flex align-items-center">
                                    <FaCalendarAlt size={12} className="me-2" />
                                    {Moment(item.createdAt).format("MMM D, YYYY")}
                                </p>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RecentPost;
