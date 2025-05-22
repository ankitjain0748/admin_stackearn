import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import BlogBanner from '../../assert/blog-banner.jpg';
import toast from 'react-hot-toast';
import RecentPost from './RecentPost';
import FollowUs from './Follow';
import Listing from '../Api/Listing';
import { useNavigate } from "react-router-dom";


const BlogDetails = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const { Id } = useParams();
    console.log("Id", Id)
    const [listing, setListing] = useState("");

    const fetchBlogListId = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.BlogGetId(Id); // Fetch instructor by ID
            console.log("response", response)
            if (response?.data?.data) {
                setListing(response.data.data);
            } else {
                toast.error("Failed to fetch instructor details.");
            }
        } catch (error) {
            console.error("Error fetching instructor data:", error);
            toast.error("Unable to load instructor data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogListId();
    }, [Id]);
    return (
        <div className='main-wrapper'>

            <section className="p-4">
                <div className="row">
                    <div className="col-lg-9 col-md-12">
                        {/* Blog Post */}
                        <button
                            className="btn btn-outline-secondary mb-3"
                            onClick={() => navigate(-1)}
                        >
                            ← Back
                        </button>
                        <div className="blog">
                            <div className="">
                                <img
                                    className="img-fluid"
                                    src={listing?.Image || BlogBanner}
                                    alt="Post Image"
                                    style={{ width: "1000px" }}
                                />
                            </div>

                            <h3 className="blog-details mt-2 mb-3">

                                {listing?.title}
                            </h3>
                            <div className="blog-content">
                                <div
                                    className='blog-details'
                                    dangerouslySetInnerHTML={{ __html: listing.content }}
                                    style={{ marginTop: "1rem" }}
                                />
                            </div>
                        </div>
                        {/* /Blog Post */}
                    </div>
                    {/* Blog Sidebar */}
                    <div className="col-lg-3 col-md-12 sidebar-right theiaStickySidebar">
                        {/* Search */}
                        <div className='stickysidebar'>
                            {/* <div className="card search-widget blog-search blog-widget">
                      <div className="card-body">
                        <form className="search-form">
                          <div className="input-group">
                            <input
                              type="text"
                              placeholder="Search..."
                              className="form-control"
                              
                            />
                            <button type="submit" className="btn btn-primary">
                              <i className="fa fa-search" />
                            </button>
                          </div>
                        </form>
                      </div>
                    </div> */}
                            {/* /Search */}
                            {/* Latest Posts */}
                            <FollowUs />
                            <RecentPost />
                            {/* /Latest Posts */}
                            {/* Categories */}
                            <div className="card category-widget blog-widget">
                                <div className="card-header">
                                    <h4 className="card-title">Categories</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="categories">
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Business
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Courses
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Education
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Graphics Design
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Programming
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #">
                                                <i className="fas fa-angle-right" /> Web Design
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* /Categories */}
                            {/* Archives Categories */}

                            {/* /Archives Categories */}
                            {/* Tags */}
                            <div className="card tags-widget blog-widget tags-card">
                                <div className="card-header">
                                    <h4 className="card-title">Latest Tags</h4>
                                </div>
                                <div className="card-body">
                                    <ul className="tags">
                                        <li>
                                            <Link to=" #" className="tag">
                                                HTML
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #" className="tag">
                                                Java Script
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #" className="tag">
                                                Css
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #" className="tag">
                                                Jquery
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #" className="tag">
                                                Java
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to=" #" className="tag">
                                                React
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            {/* /Tags */}
                        </div>
                    </div>
                    {/* /Blog Sidebar */}
                </div>
            </section>
        </div>
    )
}

export default BlogDetails;