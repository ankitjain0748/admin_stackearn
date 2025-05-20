import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from "react-icons/io";

const MessagePopup = ({ message, wordLimit }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const truncateMessage = (text, limit) => {
        const words = text?.split(' ');
        return words?.length > limit
            ? words.slice(0, limit)?.join(' ') + '...'
            : text;
    };

    return (
        <div>
            <p
                onClick={handleShow}
                style={{ cursor: 'pointer' }}
                className="mt-0 mb-0 text-black"
            >
                {truncateMessage(message, wordLimit)}
            </p>

            {/* Bootstrap Modal */}
            {show && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    style={{
                        display: 'block',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
                    }}
                    role="dialog"
                >
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg custom-modal-dialog" // Added custom-modal-dialog class for larger size
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header py-3 my-3 gap-3"> {/* Added py-3 for padding and my-3 for margin */}
                                <h5 className="modal-title">Popup Message</h5>
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
                                <p className="text-wrap text-black text-break">{message}</p> {/* text-wrap and text-break classes for proper wrapping and breaking */}
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

MessagePopup.propTypes = {
    wordLimit: PropTypes.number, // Word limit as a prop
    message: PropTypes.string.isRequired, // Ensures message is a required string
};

MessagePopup.defaultProps = {
    wordLimit: 5, // Default word limit
};

export default MessagePopup;
