import React, { useState } from "react";
import { LoginImg } from "../imagepath";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import PropTypes from "prop-types";
import axios from 'axios';

function Contact({ datarole }) {

    const API_KEY = process.env.REACT_APP_ZEROBOUNCE_API_KEY;
    const [Regs, setRegs] = useState({
        name: "",
        email: "",
        role: datarole,
        message: "",
        subject: "",
        phone_number: "",
    });
    const handleInputs = (e) => {
        const { name, value } = e.target;
        setRegs((prevState) => ({ ...prevState, [name]: value }));
    };

    const [loading, setLoading] = useState(false);

    const handleForms = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (!Regs.name || !Regs.email || !Regs.phone_number || !Regs.subject || !Regs.message) {
            toast.error("Please fill out all fields.");
            setLoading(false); // Ensure loading state is reset in case of validation failure
            return;
        }
        const main = new Listing();
        try {
            const EmailResponse = await axios.get(
                `https://api.zerobounce.net/v2/validate?api_key=${API_KEY}&email=${Regs.email}` // Make sure to use Regs.email
            );

            const emailStatus = EmailResponse?.data?.status;
            if (!emailStatus) {
                toast.error("Email verification failed. Please try again.");
                setLoading(false); // Ensure loading state is reset here
                return;
            }

            // if (emailStatus !== "valid") {
            //     toast.error("Invalid email address. Please try again.");
            //     setLoading(false); // Ensure loading state is reset here
            //     return;
            // }

            // Step 2: Create an updated Regs object including Email_verify
            const updatedRegs = {
                ...Regs,
                Email_verify: emailStatus,
            };

            const response = await main.contact(updatedRegs);

            if (response?.data?.status) {
                toast.success(response.data.message);
                setRegs({
                    name: "",
                    email: "",
                    role: datarole,
                    message: "",
                    subject: "",
                    phone_number: "",
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error); // Log the error for debugging
            toast.error("Something went wrong, please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container">
            <div className="row">
                {/* Left Section */}
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center bg-light text-center p-4">
                    <img src={LoginImg} alt="Login Banner" className="img-fluid mb-2" />
                    <h2 className="mb-1">Welcome to DreamsLMS Courses</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam.
                    </p>
                </div>
                {/* Right Section */}
                <div className="col-md-6  loginbox bg-white p-4">
                    <h1 className="mb-1">Contact Us</h1>
                    <p className="mb-1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                        ad minim veniam.
                    </p>
                    <form onSubmit={handleForms}>
                        <div className="input-block">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={Regs.name}
                                onChange={handleInputs}
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="input-block">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={Regs.email}
                                onChange={handleInputs}
                                className="form-control"
                                placeholder="Enter your email address"
                                required
                            />
                        </div>
                        <div className="input-block">
                            <label className="form-label">Phone Number</label>
                            <input
                                type="number"
                                className="form-control"
                                required
                                name="phone_number"
                                value={Regs?.phone_number || ""}
                                onChange={(e) => {
                                    if (e.target.value.length <= 10) handleInputs(e);
                                }}
                                placeholder="Enter your Phone Number"
                                min="1000000000"
                                max="9999999999"
                            />


                        </div>
                        <div className="input-block">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={Regs.subject}
                                onChange={handleInputs}
                                className="form-control"
                                placeholder="Enter your subject"
                                required
                            />
                        </div>
                        <div className="input-block">
                            <label className="form-label">Message</label>
                            <textarea
                                rows={3}
                                name="message"
                                value={Regs.message}
                                onChange={handleInputs}
                                className="form-control"
                                placeholder="Enter your message"
                                required
                            ></textarea>

                        </div>
                        <div className="d-grid mb-[10px]">
                            <button className="login-head button" type="submit" disabled={loading}>

                                {loading ? "Loading..." : "Contact Us"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Contact.propTypes = {
    datarole: PropTypes.string.isRequired, // Ensures datarole is a required string
};

export default Contact;
