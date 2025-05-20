import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { IoMdClose } from "react-icons/io";
import DeleteImg from "../../assert/delete.webp"

export default function DeleteTable({ step, Id, fetchMarketLists, className }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = () => setIsOpen(false);
    const toggleModal = () => setIsOpen(!isOpen);

    const handleinstrorDelete = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.InstrutorDelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                fetchMarketLists();
                toggleModal();
            } else {
                toast.error(res.data?.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message || "Error deleting package.");
        } finally {
            setLoading(false);
        }
    };

    const handleUserDelete = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.DeleteUsers({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message || "Error deleting user.");
        } finally {
            setLoading(false);
        }
    };

    const handleCourseDelete = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.courseDelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBlogDelete = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.BlogDelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleOnlineCourse = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.OnlineDelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleGallery = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.galleryDelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleWebniar = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.Webniardelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    const HandleVideo = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.Videodelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const HandleContactVideo = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.contactdelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };


    const HandleSubscribeVideo = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.subscribedelete({ Id });
            if (res?.data?.status) {
                toast.success(res.data.message);
                toggleModal();
                fetchMarketLists();
            } else {
                toast.error(res.data?.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (step === 1) handleUserDelete();
        else if (step === 2) handleinstrorDelete();
        else if (step === 3) handleCourseDelete();
        else if (step === 4) handleBlogDelete();
        else if (step === 5) HandleOnlineCourse();
        else if (step === 6) HandleGallery();
        else if (step === 7) HandleWebniar();
        else if (step === 8) HandleVideo();
        else if (step === 12) HandleContactVideo();
        else if (step === 13) HandleSubscribeVideo();



        else console.warn("Invalid step");
    };

    return (
        <div>
            {/* Delete Button */}
            <div
                onClick={toggleModal}
                style={{ cursor: 'pointer' }}
                className={`d-flex cancelled-status px-2 py-1 rounded align-items-center justify-content-center ${className}`}
            >
                <MdDelete size={20} className="text-red-600"/>
                <span >Delete</span>
            </div>

            {/* Modal */}
            {isOpen && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg custom-modal-dialog" // Added custom-modal-dialog class for larger size
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header py-2 px-3 gap-3"> {/* Added py-3 for padding and my-3 for margin */}
                                <h5 className="modal-title">Delete</h5>
                                <button
                                    type="button"
                                    className=" custom-close-btn"
                                    onClick={handleClose}
                                    aria-label="Close"
                                >
                                    <IoMdClose size={24} color='black' /> {/* Used icon here */}
                                </button>

                            </div>

                            <div className="modal-body">
                                <img src={DeleteImg} alt="" className="img-fluid modal-image" />
                                <p className="text-wrap text-break text-center mt-2 font-bold text-black">
                                    ⚠️ Are you sure? This action <span className="text-danger">cannot be undone!</span>
                                </p>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={toggleModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleClick}
                                >
                                    {loading ? "Loading..." : "Delete"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

DeleteTable.propTypes = {
    step: PropTypes.number.isRequired,
    Id: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    fetchMarketLists: PropTypes.func.isRequired,
};
