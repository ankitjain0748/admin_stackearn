import React, { useEffect, useState } from "react";
import TermsPageHeader from "./settingPageHeader";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import DashboardLayout from "../common/DashboardLayout";
import ReactQuillEditor from "../common/ReactQuillEditor";

const Terms = () => {
    const [listing, setListing] = useState("");
    const [Regs, setRegs] = useState({
        firstname: "",
        lastname: "",
        username: "",
        phone_number: "",
        designation: "",
        bio: "",
        address: "",
        profileImage: listing?.profile?.profileImage || "",
        policy: listing?.profile?.policy || "",
        term: listing?.profile?.term || "",
        id: "",
        email: "",
    });


    const [loading, setLoading] = useState(false);

    const handleBioChange = (value) => {
        setRegs((prevState) => ({
            ...prevState,
            term: value, // Save the rich-text content
        }));
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
                    <TermsPageHeader />
                    <form onSubmit={handleForms}>
                        <div className="checkout-form settings-wrap">
                            <div className="col-md-12">
                                <div className="input-block">
                                    <ReactQuillEditor
                                        desc={Regs?.term}
                                        handleBioChange={handleBioChange}
                                    />

                                </div>
                            </div>
                            <div className="col-md-12">
                                <button className="login-head button" type="submit" disabled={loading}>
                                    {loading ? "Loading..." : "Update Terms"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>

    );
};

export default Terms;
