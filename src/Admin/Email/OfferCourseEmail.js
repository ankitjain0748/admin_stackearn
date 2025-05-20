import React, { useEffect, useState } from "react";

import ImageUpload from "../components/ImageUpload";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";

const OfferCourseEmail = ({ selectedUsers, disabled }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");

    const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.courseGet(searchQuery, page, limit);
            setListing(response?.data?.data?.Courseget
            );
            setTotalPages(response?.data.data.totalPages);
            setCurrentPage(response?.data.data.currentPage);
            setTotalItems(response.data.data.totalUsers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };




    useEffect(() => {
        fetchMarketLists(search, currentPage, 15);
    }, [currentPage]);

    const [emailData, setEmailData] = useState({
        title: "",
        selectedUsers: selectedUsers,
        content: "",
        dicount: "",
        courseImage: "",
        SubContent: "",
        BgImage: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData({ ...emailData, [name]: value });
    };
    const handleBioChange = (value) => {
        setEmailData((prevState) => ({
            ...prevState,
            SubContent: value, // Save the rich-text content
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // Prevent multiple submissions
        setLoading(true);

        try {
            // Validate required fields
            if (!emailData?.title || !selectedUsers?.length) {
                toast.error("Please fill out all required fields.");
                setLoading(false);
                return;
            }


            const main = new Listing(); // Assuming `Listing` is your API helper class
            const response = await main.OfferCourseEmail({
                title: emailData.title,
                selectedUsers: selectedUsers,
                SubContent: emailData.SubContent,
                dicount: emailData.dicount,
                courseImage: emailData.courseImage,
                BgImage: emailData.BgImage,
            });


            if (response?.data) {
                toast.success(response.data.message || "Email sent successfully!");
                // Reset emailData state
                setEmailData({
                    title: "",
                    selectedUsers: [], // Reset selected users
                    content: "",
                });
                setShowModal(false);
            }
        } catch (error) {
            console.error("API error:", error);
            toast.error(error?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleOpen = () => {
        if (selectedUsers.length === 0) {
            toast.error("Please select at least one user.");
            return;
        }
        setShowModal(true);
    };

    return (
        <div>
            {/* Button to Open Modal */}
            <button
                className="btn btn-primary"
                onClick={handleOpen}
            >
                Offer Course
            </button>

            {/* Modal */}
            {showModal && (
                <div
                    className="modal show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        position: "fixed",
                        top: "0",
                        left: "0",
                        right: "0",
                        bottom: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: "1050", // Ensure modal is on top of other elements
                    }}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Compose Email</h5>
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span>&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Email Form */}
                                <div className="form-group">
                                    <label>Course Title</label>
                                    <select
                                        className="form-control"
                                        name="title" // Update name to match the email data field
                                        value={emailData.title}
                                        onChange={handleChange} // Handle changes to update the emailData state
                                    >
                                        <option value="" disabled>
                                            Select Course Title
                                        </option>
                                        {listing.map((webinar, index) => (
                                            <option key={index} value={webinar.title}>
                                                {webinar.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Discount %</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="dicount"
                                        value={emailData.dicount}
                                        onChange={handleChange}
                                        placeholder="Enter email discount"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Course Image</label>

                                    <ImageUpload
                                        value={emailData.courseImage}
                                        onImageUpload={(url) =>
                                            setEmailData((prevState) => ({
                                                ...prevState,
                                                courseImage: url,
                                            }))
                                        }
                                    />

                                </div>

                                <div className="form-group">
                                    <label className="form-label">Offer Background Image</label>

                                    <ImageUpload
                                        value={emailData.BgImage}
                                        onImageUpload={(url) =>
                                            setEmailData((prevState) => ({
                                                ...prevState,
                                                BgImage: url,
                                            }))
                                        }
                                    />

                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Loading.." : "Send Mail"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Preview */}

        </div>
    );
};

export default OfferCourseEmail;
