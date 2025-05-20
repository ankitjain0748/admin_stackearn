import React, { useEffect, useState } from "react";
import StudentSettingPageHeader from "./settingPageHeader";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import ProfileImageUpload from "../components/ProfileImageUpload";
import DashboardLayout from "../common/DashboardLayout";

const StudentSetting = () => {
  const [listing, setListing] = useState("");
  const [Regs, setRegs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    phone_number: "",
    designation: "",
    bio: "",
    address: "",
    bsemail: "",
    profileImage: listing?.profile?.profileImage || "",
    policy: listing?.profile?.policy || "",
    term: listing?.profile?.term || "",
    id: "",
    email: "",
  });


  const [loading, setLoading] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  async function handleForms(e) {
    e.preventDefault();
    if (loading) {
      return false;
    }
    setLoading(true);
    const main = new Listing();
    try {
      const isEdit = Regs._id;
      let response;
      if (isEdit) {
        // Edit API call
        response = await main.userprofileEdit(Regs);
      } else {
        // Add API call
        response = await main.userProfileAdd(Regs);
      }
      if (response?.data) {
        toast.success(response.data.message);
        setRegs({
          firstname: "",
          profileImage: "",
          lastname: "",
          username: "",
          phone_number: "",
          designation: "",
          bio: "",
          address: ""
        });
        ProfileData();
      } else {
        toast.error(response?.data?.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("error", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  const ProfileData = async () => {
    try {
      const main = new Listing();
      const response = await main.userprfileId();
      setListing(response?.data || {});
    } catch (error) {
      console.error("ProfileData error:", error);
      toast.error("Failed to load profile data.");
    }
  };

  useEffect(() => {
    ProfileData();
  }, []);


  useEffect(() => {
    setRegs((prevState) => ({
      ...prevState,
      firstname: listing?.profile?.firstname || listing?.user?.name || "",
      lastname: listing?.profile?.lastname || "",
      username: listing?.profile?.username || "",
      email: listing?.user?.email || "",
      phone_number: listing?.profile?.phone_number || listing?.user?.phone_number || "",
      designation: listing?.profile?.designation || "",
      bio: listing?.profile?.bio || "",
      address: listing?.profile?.address || "",
      _id: listing?.profile?._id || "",
      bsemail: listing?.profile?.bsemail || "",
      profileImage: listing?.profile?.profileImage || "",
      policy: listing?.profile?.policy || "",
      term: listing?.profile?.term || ""

    }));
  }, [listing]);
  return (
    <DashboardLayout>
      <div className="settings-widget card-details">
        <div className="settings-menu p-0">
          <div className="profile-heading">
            <h3>Settings</h3>
            <p>
              You have full control to manage your own account
              settings
            </p>
          </div>
          <StudentSettingPageHeader />
          <form onSubmit={handleForms}>
            <ProfileImageUpload
              value={Regs.profileImage}
              onImageUpload={(url) =>
                setRegs((prevState) => ({
                  ...prevState,
                  profileImage: url,
                }))
              }
            />
            <div className="checkout-form settings-wrap">
              <div className="edit-profile-info">
                <h5>Personal Details</h5>
                <p>Edit your personal information</p>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      value={Regs?.firstname}
                      onChange={handleInputs}
                      name="firstname"
                      className="form-control"
                      required
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Last Name </label>
                    <input
                      type="text"
                      value={Regs?.lastname}
                      onChange={handleInputs}
                      name="lastname"
                      className="form-control"
                      required

                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Support Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      required
                      name="phone_number"
                      value={Regs?.phone_number || ""}
                      onChange={handleInputs}
                      placeholder="Enter your Phone Number"
                      pattern="\d{10}"
                      maxLength="10"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-block">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={Regs?.email}
                      onChange={handleInputs}
                      name="email"
                      placeholder="Enter your Email"
                      required

                      className="form-control"
                    />
                  </div>

                </div>

                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Business Email</label>
                    <input
                      type="email"
                      value={Regs?.bsemail}
                      onChange={handleInputs}
                      name="bsemail"
                      placeholder="Enter your Business Email"

                      required

                      className="form-control"
                    />
                  </div>

                </div>

                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Address</label>
                    <input
                      value={Regs?.address}
                      onChange={handleInputs}
                      name="address"
                      className="form-control"
                      required
                      placeholder="address"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button className="login-head button" type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Update Profile"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>


  );
};

export default StudentSetting;
