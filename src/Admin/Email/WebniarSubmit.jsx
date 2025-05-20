import React, { useEffect, useState } from "react";

import Listing from "../Api/Listing";
import ReactQuill from "react-quill";
import toast from "react-hot-toast";
import ImageUpload from "../components/ImageUpload";

const WebniarSubmit = ({ selectedUsers, disabled }) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [search, setSearch] = useState("");

    const fetchWebinars = async (searchQuery = "", page = 1, limit = 15) => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.WebniarGet(searchQuery, page, limit);
            const { currentPage, nextPage, previousPage, totalPages, totalcontactmodal } = response?.data?.data || {};
            setListing(response?.data?.data?.Courseget);
            setTotalPages(totalPages);
            setCurrentPage(currentPage);
            setTotalItems(totalcontactmodal);
            setLoading(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchWebinars(search, currentPage, 15);
    }, [search, currentPage]);

    const [emailData, setEmailData] = useState({
        title: "",
        selectedUsers: selectedUsers,
        content: "",
        BgImage: ""
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData({ ...emailData, [name]: value });
    };
    const handleBioChange = (value) => {
        setEmailData((prevState) => ({
            ...prevState,
            content: value, // Save the rich-text content
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // Prevent multiple submissions
        setLoading(true);

        try {
            // Validate required fields
            if (!emailData?.title || !emailData?.content || !selectedUsers?.length) {
                toast.error("Please fill out all required fields.");
                setLoading(false);
                return;
            }


            const main = new Listing(); // Assuming `Listing` is your API helper class
            const response = await main.WebniarEmail({
                title: emailData.title,
                selectedUsers: selectedUsers,
                content: emailData.content,
                BgImage: emailData.BgImage
            });


            if (response?.data) {
                setShowModal(false);

                toast.success(response.data.message || "Email sent successfully!");
                // Reset emailData state
                setEmailData({
                    title: "",
                    selectedUsers: [], // Reset selected users
                    content: "",
                });
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
                className="btn btn-primary cursor-pointer"
                onClick={handleOpen}
            >
                Webinar
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
                                    <label>Webinar Title</label>
                                    <select
                                        className="form-control"
                                        name="title" // Update name to match the email data field
                                        value={emailData.title}
                                        onChange={handleChange} // Handle changes to update the emailData state
                                    >
                                        <option value="" disabled>
                                            Select Webinar Title
                                        </option>
                                        {listing.map((webinar, index) => (
                                            <option key={index} value={webinar.title}>
                                                {webinar.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {/* <div className="form-group">
                                    <label>Heading</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="heading"
                                        value={emailData.heading}
                                        onChange={handleChange}
                                        placeholder="Enter email heading"
                                    />
                                </div> */}
                                <div className="form-group">
                                    <label>Message</label>
                                    <ReactQuill
                                        value={emailData.content}
                                        onChange={handleBioChange}
                                        className="rich-text-editor"
                                        required
                                    />
                                </div>
                                <div className="form-group mt-5">
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


        </div>
    );
};

export default WebniarSubmit;
