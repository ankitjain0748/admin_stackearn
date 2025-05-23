import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { useNavigate, useParams } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";
import DashboardLayout from "../common/DashboardLayout";

const AddGallery = () => {
    const { Id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [instructorDetails, setInstructorDetails] = useState({
        Image: "",
        content: "",
        title: "",
        short_content: ""
    });

    const fetchInstructorData = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.GalleryGetId(Id); // Fetch instructor by ID
            if (response?.data?.data) {
                setInstructorDetails(response.data.data);
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
        if (Id) fetchInstructorData();
    }, [Id]);

    // Handle text inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInstructorDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle rich-text input
    const handleBioChange = (value) => {
        setInstructorDetails((prevState) => ({
            ...prevState,
            content: value, // Save the rich-text content
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        const main = new Listing();

        try {
            let response;
            if (Id) {
                // Edit API call
                response = await main.galleryupdate(instructorDetails);
            } else {
                // Add API call
                response = await main.GalleryAdd(instructorDetails);
            }

            if (response?.data) {
                toast.success(response.data.message || "Operation successful");
                if (!Id) {
                    // Clear form for new instructor
                    setInstructorDetails({
                        firstName: "",
                        lastName: "",
                        designation: "",
                        lessions: "",
                        students: "",
                        Skill: "",
                        email: "",
                        phoneNumber: "",
                        address: "",
                        profileImage: "",
                        bio: "",
                        gender: "",
                        rating: "",

                    });
                }
                navigate("/admin/gallery-list")
            } else {
                toast.error(response?.data?.message || "Unexpected error occurred.");
            }

            setLoading(false);
        } catch (error) {
            console.error("Error submitting form:", error);
            setLoading(false);
            toast.error(error?.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="settings-widget card-details">
                <div className="settings-menu">
                    <div className="mt-2 mb-2">
                        <h3>{Id ? "Edit Gallery" : "Add Gallery"}</h3>
                        <p>Please fill in the details to add an Gallery</p>
                    </div>

                    {/* Add Instructor Form */}
                    <form onSubmit={handleSubmit} >
                        {/* First Name */}
                        <div className="form-group mt-2">
                            <label>Image</label>
                            <ImageUpload
                                value={instructorDetails.Image}
                                onImageUpload={(url) =>
                                    setInstructorDetails((prevState) => ({
                                        ...prevState,
                                        Image: url,
                                    }))
                                }
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label>Name</label>
                            <input
                                type="text"
                                name="title"
                                value={instructorDetails.title}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group mt-2">
                            <label>
                                Designation
                            </label>
                            <input
                                type="text"
                                name="short_content"
                                value={instructorDetails.short_content}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="login-head button mt-2 " disabled={loading}>
                            {loading
                                ? "Loading..."
                                : Id ? "Update Gallery " : "Add Gallery"}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>

    );
};

export default AddGallery;

