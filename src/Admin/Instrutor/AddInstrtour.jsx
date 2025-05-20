import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import ProfileImageUpload from "../components/ProfileImageUpload";
import DashboardLayout from "../common/DashboardLayout";

function AddInstructor() {
  const navigate = useNavigate();
  const { Id } = useParams(); // Fetch ID from route
  const [loading, setLoading] = useState(false);
  const [instructorDetails, setInstructorDetails] = useState({
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
    sales: "",
    rating: "",
    Id: Id
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInstructorDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Fetch instructor data for editing
  const fetchInstructorData = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.InstrutorGetId(Id); // Fetch instructor by ID
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

  // Handle form submission for add/edit
  const handleForms = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const main = new Listing();

    try {
      let response;
      if (Id) {
        // Edit API call
        response = await main.UpdateInstructor(instructorDetails);
      } else {
        // Add API call
        response = await main.CreateInstructor(instructorDetails);
      }

      if (response?.data) {
        toast.success(response.data.message || "Operation successful");
        navigate("/admin/instructor")
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

  // Fetch data for edit mode
  useEffect(() => {
    if (Id) fetchInstructorData();
  }, [Id]);


  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading">
            <h3>{Id ? "Update Instructor" : "Add Instructor"}</h3>
            <p>Please fill in the details to add an instructor</p>
          </div>

          {/* Add Instructor Form */}
          <form onSubmit={handleForms}>
            <div className="checkout-form settings-wrap">
              <div className="row">
                <ProfileImageUpload
                  value={instructorDetails.profileImage}
                  onImageUpload={(url) =>
                    setInstructorDetails((prevState) => ({
                      ...prevState,
                      profileImage: url,
                    }))
                  }
                />
                {/* First Name */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={instructorDetails.firstName}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter First Name"
                      required
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={instructorDetails.lastName}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Last Name"
                      required
                    />
                  </div>
                </div>

                {/* Designation */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={instructorDetails.designation}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Designation"
                      required
                    />
                  </div>
                </div>

                {/* Lessons */}
                <div className="col-md-3">
                  <div className="input-block">
                    <label className="form-label">Lessons</label>
                    <input
                      type="text"
                      name="lessions"
                      value={instructorDetails.lessions}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Number of Lessons"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="input-block">
                    <label className="form-label">Sales</label>
                    <input
                      type="text"
                      name="sales"
                      value={instructorDetails.sales}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Number of Lessons"
                      required
                    />
                  </div>
                </div>

                {/* Students */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Students</label>
                    <input
                      type="text"
                      name="students"
                      value={instructorDetails.students}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Number of Students"
                      required
                    />
                  </div>
                </div>

                {/* Skill */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Skill</label>
                    <input
                      type="text"
                      name="Skill"
                      value={instructorDetails.Skill}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Skills"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={instructorDetails.email}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Email Address"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      name="phoneNumber"
                      value={instructorDetails?.phoneNumber || ""}
                      onChange={handleInputChange}
                      placeholder="Enter Phone Number"
                      pattern="\d{10}"
                      maxLength="10"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      name="rating"
                      value={instructorDetails.rating}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Rating (0-5)"
                      required
                      max="5"
                      min="0"
                    />
                  </div>
                </div>

                {/* Gender */}
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Gender</label>
                    <select
                      name="gender"
                      value={instructorDetails.gender}
                      onChange={handleInputChange}
                      className="form-control"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Address */}
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={instructorDetails.address}
                      onChange={handleInputChange}
                      className="form-control"
                      placeholder="Enter Address"
                      required
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Bio</label>
                    <textarea
                      name="bio"
                      value={instructorDetails.bio}
                      onChange={handleInputChange}
                      className="form-control"
                      rows="4"
                      placeholder="Enter a short bio"
                    ></textarea>
                  </div>
                </div>

                {/* Gender */}


                <div className="col-md-12">
                  <button className="login-head button" type="submit">
                    {loading ? "Loading.." : " Instructor"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AddInstructor;
