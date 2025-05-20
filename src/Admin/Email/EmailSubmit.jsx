import React, { useState } from "react";

import ImageUpload from "../components/ImageUpload";

const EmailSubmit = () => {
    const [showModal, setShowModal] = useState(false);
    const [emailData, setEmailData] = useState({
        senderName: "",
        senderEmail: "",
        subject: "",
        emailType: "Promotion",
        heading: "",
        message: "",
        imageUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData({ ...emailData, [name]: value });
    };

    const handleSendEmail = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-4">
            {/* Button to Open Modal */}
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                Compose Email
            </button>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog"
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", position: "fixed", inset: "0" }}
                >
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Compose Email</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Subject</label>
                                            <input type="text" className="form-control" name="subject"
                                                value={emailData.subject} onChange={handleChange} placeholder="Enter email subject"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <div className="form-group">
                                            <label>Email Type</label>
                                            <select className="form-control" name="emailType"
                                                value={emailData.emailType} onChange={handleChange}>
                                                <option value="Promotion">Promotion</option>
                                                <option value="Newsletter">Newsletter</option>
                                                <option value="Notification">Notification</option>
                                                <option value="Alert">Alert</option>
                                                <option value="Update">Update</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Heading</label>
                                            <input type="text" className="form-control" name="heading"
                                                value={emailData.heading} onChange={handleChange} placeholder="Enter email heading"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Message</label>
                                            <textarea className="form-control" name="message"
                                                value={emailData.message} onChange={handleChange}
                                                placeholder="Enter email message" rows="4"
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label>Image Upload</label>
                                            <ImageUpload value={emailData.imageUrl} onImageUpload={(url) =>
                                                setEmailData((prevState) => ({ ...prevState, imageUrl: url }))
                                            } />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary" onClick={handleSendEmail}>
                                    Send Email
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Email Preview */}
            {emailData.subject && (
                <div className="mt-4 row">
                    <div className="col-12 col-md-8 mx-auto">
                        <h3>Email Preview</h3>
                        <div className="p-3 border rounded bg-light">
                            <p><strong>From:</strong> {emailData.senderName} ({emailData.senderEmail})</p>
                            <p><strong>Subject:</strong> {emailData.subject}</p>
                            <p><strong>Email Type:</strong> {emailData.emailType}</p>
                            <h1 className="text-primary">{emailData.heading}</h1>
                            <p>{emailData.message}</p>
                            {emailData.imageUrl && (
                                <img src={emailData.imageUrl} alt="Email Visual"
                                    className="img-fluid rounded"
                                />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailSubmit;
