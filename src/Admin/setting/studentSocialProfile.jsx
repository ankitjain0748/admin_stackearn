import React, { useEffect, useState } from "react";
import StudentSettingPageHeader from "./settingPageHeader";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import DashboardLayout from "../common/DashboardLayout";

const StudentSocialProfile = () => {
  const [listing, setListing] = useState("");

  const [Regs, setRegs] = useState({
    website: "",
    linkedin: "",
    instragram: "",
    facebook: "",
    twitter: "",
    youtube: "",
    id: ""
  });

  const handleInputs = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };

  const [loading, setLoading] = useState(false);

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
        response = await main.userSocialEdit(Regs);
      } else {
        // Add API call
        response = await main.userSocialAdd(Regs);
      }
      if (response?.data) {
        toast.success(response.data.message);
        setRegs({
          email: "",
          newPassword: ""
        })
        ProfileData();
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log("error", error);
      toast.error(error);
      setLoading(false);
    }
  }


  const ProfileData = async () => {
    try {
      const main = new Listing();
      const response = await main.userprfileId();
      setListing(response?.data?.social || {});
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
      website: listing?.website || "",
      linkedin: listing?.linkedin || "",
      instragram: listing?.instragram || "",
      twitter: listing?.twitter || "",
      facebook: listing?.facebook || "",
      youtube: listing?.youtube || "",
      _id: listing?._id || ""
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
            <div className="checkout-form settings-wrap">
              <div className="row">
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Telegram </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.website}
                      name="website"
                      placeholder="Enter your Telegram URL"
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Youtube</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.youtube}
                      name="youtube"
                      placeholder="Enter your Youtube URL"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.instragram}
                      name="instragram"
                      placeholder="Enter your Instagram URL"
                      
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Facebook</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.facebook}
                      name="facebook"
                      placeholder="Enter your Facebook URL"
                      
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Twitter</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.twitter}
                      name="twitter"
                      placeholder="Enter your Twitter URL"
                      
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="input-block">
                    <label className="form-label">Linkedin</label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleInputs}
                      value={Regs?.linkedin}
                      name="linkedin"
                      placeholder="Enter your Linkedin URL"
                      
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <button className="login-head button" type="submit" disabled={loading}>
                    {loading ? "Loading..." : " Save Social link"}
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

export default StudentSocialProfile;
