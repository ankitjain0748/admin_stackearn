import { useEffect, useRef, useState } from "react";
import AddressIcon from "../../assert/address-icon.png";
import ReviewIcon from "../../assert/review-icon.png";
import ProfileAvatar from "../../assert/profile-avatar.jpg";
import PhoneIcon from "../../assert/phone-icon.png";
import EmailIcon from "../../assert/email-icon.png";
import CoursesIcon from "../../assert/courses-icon.png";
import LoadingPage from "../components/LoadingPage";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCheckCircle } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

import { FaFacebook, FaInstagram, FaRegClock, FaRupeeSign, FaTimes, FaTwitter } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Listing from "../Api/Listing";
import { MdOutlineVerified } from "react-icons/md";
import PaymentOut from "./PaymentOut";
import PaymentData from "./PaymentData";
import toast from "react-hot-toast";
import Refral from "./Refral";
import AdminPaymentOut from "./Payment"

export default function ProfileId() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [data, setData] = useState([]);
    const [referral, setReferral] = useState("");
    const [payment, setPayment] = useState([]);
    const [Course, setCourse] = useState([]);
    const [activeTab, setActiveTab] = useState("referredUsers");
    const RefralDataManeg = localStorage && localStorage?.getItem("Refral")
    const [transcation, settranscation] = useState([]);
    const ProfileData = () => {
        setLoading(true);

        const main = new Listing();
        main.userprfileget({ id })
            .then((response) => {
                setListing(response?.data);
                setData(response?.data?.data);
                setReferral(response?.data?.user?.referral_code);
                setPayment(response?.data?.overallAdminPayments);
                setCourse(response?.data?.user);
                settranscation(response?.data?.Transactions)
            })
            .catch((error) => {
                console.error("Error fetching profile data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const inputRef = useRef(null);

    const copyToClipboard = () => {
        if (inputRef.current) {
            const referralLink = inputRef.current.value;
            navigator.clipboard
                .writeText(referralLink)
                .then(() => {
                    toast.success("Referral link copied!");
                })
                .catch((err) => {
                    console.error("Failed to copy:", err);
                    toast.error("Failed to copy referral link.");
                });
        }
    };

    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        const firstInitial = names[0]?.[0]?.toUpperCase() || "";
        const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };


    useEffect(() => {
        if (id) {
            ProfileData();
        }
    }, [id]);
    const status = listing?.user?.user_status;


    const getStatusDetails = (status) => {
        switch (status) {
            case "active":
                return {
                    className: "text-success font-bold",
                    icon: <MdOutlineVerified size={18} color="text-success" />,
                    label: "Active",
                };
            case "inactive":
                return {
                    className: "text-danger font-bold",
                    icon: <FaTimes style={{ marginRight: "8px" }} color="text-danger" />,
                    label: "Inactive",
                };
            case "registered":
                return {
                    className: "text-warning font-bold",
                    icon: <FaRegClock style={{ marginRight: "8px" }} />,
                    label: "Registered",
                };
            case "enrolled":
                return {
                    className: "text-info font-bold",
                    icon: <FaCheckCircle style={{ marginRight: "8px" }} />,
                    label: "Enrolled",
                };
            default:
                return {
                    className: "text-muted",
                    icon: null,
                    label: "Unknown",
                };
        }
    };

    const { className, icon, label } = getStatusDetails(status);

    const datapayment = (Course?.UnPaidAmounts !== 0
        ? ((Course?.UnPaidAmounts || 0) - (listing?.totalPaymentWithdrawal || 0) - (listing?.totalPayoutPayment))
        : ((Course?.lastTodayIncome || 0) - (Course?.UnPaidAmounts || 0))
    );



    return (
        <>
            <div>
                {/* Breadcrumb */}
                {loading ? (
                    <LoadingPage />
                ) : (
                    <>
                        <div className="page-banner mt-4 instructor-bg-blk md-flex align-items-center">
                            <div className=" mt-4">
                                <div className="row">
                                    <div className="col-md-12 col-12 ">
                                        <div className="profile-info-blk">
                                            {listing?.profile?.profileImage ? (
                                                <Link to="#" className="profile-info-img">
                                                    <img
                                                        src={listing?.profile?.profileImage || ProfileAvatar}
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{ width: "100px", height: "90px", objectFit: "cover" }}
                                                    />
                                                </Link>
                                            ) : (
                                                <div
                                                    className="flex items-center justify-center avatar-img"
                                                    style={{
                                                        backgroundColor: "#002058",
                                                        borderRadius: "10%",
                                                        color: "#ffffff",
                                                        fontWeight: "bold",
                                                        fontSize: "20px",
                                                        display: "flex",
                                                        padding: "30px"
                                                    }}
                                                >
                                                    {getInitials(listing?.user?.name)}

                                                </div>
                                            )}


                                            <h4 className="mt-3 mb-2">
                                                <Link to="#">{listing?.user?.name}</Link>
                                            </h4>
                                            <p className={className + " d-flex align-items-center gap-2"}>
                                                <span className="d-flex align-items-center">
                                                    {icon}
                                                    <span className="ms-1">{label}</span>
                                                </span>
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Breadcrumb */}
                        {/* Course Content */}
                        <section className="course-sec">
                            <div className="pagepadding">
                                <div className="row">
                                    <div className="col-lg-9">
                                        {/* Overview */}
                                        <div className="">
                                            <div className="settings-widget card-details">
                                                <div className="settings-menu p-0">
                                                    <div className="profile-heading d-flex justify-content-between align-items-center">
                                                        <h3>Dashboard</h3>
                                                        <button className="btn btn-secondary" onClick={() => window.history.back()}>
                                                            Back
                                                        </button>
                                                    </div>

                                                    <div className="checkout-form pb-0" style={{ zIndex: 0 }}>
                                                        <div className="row">
                                                            <div className="col-xl-3 col-sm-6 mb-2" style={{ zIndex: 0 }}>
                                                                <div className="card  flex-fill" >
                                                                    <div className="card-body refer-card refer-card-7">
                                                                        <h5> Today Income</h5>
                                                                        <h2>
                                                                            <LiaRupeeSignSolid size={28} />
                                                                            {
                                                                                (Course?.referred_user_pay || 0)
                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-6 mb-2">
                                                                <div className="card  flex-fill" >
                                                                    <div className="card-body refer-card refer-card-5">
                                                                        <h5>Today Payout</h5>
                                                                        <h2> <LiaRupeeSignSolid size={28} />
                                                                            {datapayment}
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-6 mb-2">
                                                                <div className="card  flex-fill">
                                                                    <div className="card-body refer-card refer-card-4">
                                                                        <h5>This Week Income</h5>
                                                                        <h2>    <LiaRupeeSignSolid size={28} />
                                                                            {
                                                                                (Course?.referred_user_pay_weekly || 0) + (Course?.referred_user_pay || 0) - (listing?.totalweekPaymentWithdrawal || 0)
                                                                                - (listing?.totalweekPayoutPayment || 0)
                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-xl-3 col-sm-6 mb-2">
                                                                <div className="card flex-fill">
                                                                    <div className="card-body refer-card refer-card-3">
                                                                        <h5>This Month Income</h5>
                                                                        <h2> <LiaRupeeSignSolid size={28} />
                                                                            {(Course?.referred_user_pay_overall)
                                                                                - (Course?.totalWidthrawal)
                                                                                + (Course?.referred_user_pay || 0)
                                                                                - (Course?.UnPaidAmounts || 0)
                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">

                                                            <div className="col-xl-3 col-sm-6 mt-2">
                                                                <div className="card  flex-fill">
                                                                    <div className="card-body refer-card refer-card-2">
                                                                        <h5>This Month Passive Income</h5>
                                                                        <h2>   <LiaRupeeSignSolid size={28} />
                                                                            {(Course?.first_user_pay || 0) + (Course?.second_user_pay || 0)

                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-6 mt-2">
                                                                <div className="card  flex-fill refer-card refer-card-6">
                                                                    <div className="card-body">
                                                                        <h5>Pervious Month Passive Income </h5>
                                                                        <h2>
                                                                            <LiaRupeeSignSolid size={28} />
                                                                            {Course?.pervious_passive_income_month || 0}
                                                                        </h2>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-6 mt-2">
                                                                <div className="card  flex-fill">
                                                                    <div className="card-body refer-card refer-card-1">
                                                                        <h5>OverAll Income</h5>
                                                                        <h2> <LiaRupeeSignSolid size={28} className="font-bold" />
                                                                            {
                                                                                (Course?.referred_user_pay_overall || 0) + (Course?.referred_user_pay || 0)
                                                                                - (Course?.totalWidthrawal)
                                                                                - (Course?.UnPaidAmounts)
                                                                            }
                                                                        </h2>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-3 col-sm-6 mt-2">
                                                                <div className="card  flex-fill refer-card refer-card-6">
                                                                    <div className="card-body">
                                                                        <h5>No. Of Refral </h5>
                                                                        <h2>
                                                                            {RefralDataManeg || "0"}
                                                                        </h2>

                                                                    </div>
                                                                </div>
                                                            </div>


                                                        </div>
                                                        <div className="row">
                                                            <div className="col-xl-6 d-flex mt-2">
                                                                <div className="card link-box flex-fill">
                                                                    <div className="card-body">
                                                                        <h5>Your Referral Link</h5>
                                                                        <p>
                                                                            You can earn easily money by copy and share the
                                                                            below link to your friends
                                                                        </p>
                                                                        <div className="input-block">
                                                                            {/* Referral Link Input */}
                                                                            <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                ref={inputRef}
                                                                                value={`https://www.stackearn.com/register?ref=${referral || ""}`}
                                                                                readOnly
                                                                            />

                                                                            {/* Copy Link Button */}
                                                                            <Link to="#" onClick={copyToClipboard} className="btn btn-primary mt-2">
                                                                                Copy Link
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-xl-6 d-flex mt-2">
                                                                <div className="card link-box flex-fill"
                                                                >
                                                                    <div className="card-body">
                                                                        <h5>Current Amount</h5>
                                                                        <p>
                                                                            <>Earn easily by sharing the link. Invite friends to grow earnings!</>
                                                                        </p>

                                                                        <h6 className=" " style={{ fontSize: '25px' }}>
                                                                            <LiaRupeeSignSolid size={25} />

                                                                            {datapayment}

                                                                        </h6>
                                                                        {/* <Link to="#">Withdraw Money</Link> */}
                                                                        <div
                                                                            className="gap-3 mt-4"
                                                                            style={{
                                                                                display: 'flex',
                                                                                flexWrap: 'wrap',
                                                                                justifyContent: 'space-between'
                                                                            }}
                                                                        >
                                                                            <PaymentData
                                                                                Id={id}
                                                                                fetchMarketLists={ProfileData}
                                                                                step={1}
                                                                                first_user_pay={listing?.user?.first_user_pay}
                                                                                referred_user_pay={listing?.user?.referred_user_pay}
                                                                                lastTodayIncome={datapayment}
                                                                                second_user_pay={listing?.user?.second_user_pay}
                                                                                payment_data={listing?.user?.payment_data}
                                                                            />

                                                                            <PaymentOut
                                                                                Id={id}
                                                                                fetchMarketLists={ProfileData}
                                                                                step={2}
                                                                                first_user_pay={listing?.user?.first_user_pay}
                                                                                referred_user_pay={listing?.user?.referred_user_pay}
                                                                                lastTodayIncome={datapayment}
                                                                                second_user_pay={listing?.user?.second_user_pay}
                                                                                payment_data={listing?.user?.payment_data}
                                                                            />

                                                                            <PaymentData
                                                                                Id={id}
                                                                                fetchMarketLists={ProfileData}
                                                                                step={2}
                                                                                first_user_pay={listing?.user?.first_user_pay}
                                                                                referred_user_pay={listing?.user?.referred_user_pay}
                                                                                lastTodayIncome={datapayment}
                                                                                second_user_pay={listing?.user?.second_user_pay}
                                                                                payment_data={listing?.user?.payment_data}
                                                                            />
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="settings-widget card-details data-maanage">
                                                <div className="settings-menu p-0 data-maanage">
                                                    {/* Tabs navigation */}
                                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <a
                                                                className={`nav-link ${activeTab === "referredUsers" ? "active" : ""}`}
                                                                id="referred-users-tab"
                                                                data-bs-toggle="tab"
                                                                href="#referred-users"
                                                                role="tab"
                                                                aria-controls="referred-users"
                                                                onClick={() => setActiveTab("referredUsers")}
                                                            >
                                                                Referred Users
                                                            </a>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <a
                                                                className={`nav-link ${activeTab === "payoutData" ? "active" : ""}`}
                                                                id="payout-tab"
                                                                data-bs-toggle="tab"
                                                                href="#payout-data"
                                                                role="tab"
                                                                aria-controls="payout-data"
                                                                onClick={() => setActiveTab("payoutData")}
                                                            >
                                                                Payout Data
                                                            </a>
                                                        </li>
                                                    </ul>

                                                    {/* Tab content */}
                                                    <div className="tab-content" id="myTabContent">
                                                        {/* Referred Users Tab */}
                                                        <div
                                                            className={`tab-pane fade ${activeTab === "referredUsers" ? "show active" : ""}`}
                                                            id="referred-users"
                                                            role="tabpanel"
                                                            aria-labelledby="referred-users-tab"
                                                        >
                                                            <Refral PayData={id} />
                                                        </div>

                                                        {/* Payout Data Tab */}
                                                        <div
                                                            className={`tab-pane fade ${activeTab === "payoutData" ? "show active" : ""}`}
                                                            id="payout-data"
                                                            role="tabpanel"
                                                            aria-labelledby="payout-tab"
                                                        >
                                                            <AdminPaymentOut />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-3">

                                        {/* Right Sidebar Tags Label */}
                                        <div className="card overview-sec data-maanage ">
                                            <div className="card-body">
                                                <h5 className="subs-title">Contact Details</h5>
                                                <div className="contact-info-list">
                                                    <div className="edu-wrap">
                                                        <div className="edu-name">
                                                            <span>
                                                                <img src={EmailIcon} alt="Address" />
                                                            </span>
                                                        </div>
                                                        <div className="edu-detail">
                                                            <h6>Email</h6>
                                                            <p>
                                                                <Link to="#">{listing?.user?.email}</Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="edu-wrap">
                                                        <div className="edu-name">
                                                            <span>
                                                                <img src={AddressIcon} alt="Address" />
                                                            </span>
                                                        </div>
                                                        <div className="edu-detail">
                                                            <h6>Address</h6>
                                                            <p>{listing?.profile?.address}</p>
                                                        </div>
                                                    </div>
                                                    <div className="edu-wrap">
                                                        <div className="edu-name">
                                                            <span>
                                                                <img src={PhoneIcon} alt="Address" />
                                                            </span>
                                                        </div>
                                                        <div className="edu-detail">
                                                            <h6>Phone</h6>
                                                            <p>
                                                                {" "}
                                                                <Link to="#">{listing?.user?.phone_code} {listing?.user?.phone_number}</Link>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="edu-wrap">
                                                        <div className="edu-name">
                                                            <span>
                                                                <img src={PhoneIcon} alt="Address" />
                                                            </span>
                                                        </div>
                                                        <div className="edu-detail">
                                                            <h6>WhatApps Number</h6>
                                                            <p>
                                                                <Link to="#">{listing?.user?.phone_code} {listing?.profile?.phone_number}</Link>
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="edu-wrap">
                                                        <div className="edu-name">
                                                            <span>
                                                                <img src={PhoneIcon} alt="Address" />
                                                            </span>
                                                        </div>
                                                        <div className="edu-detail">
                                                            <h6>About Me</h6>
                                                            <p>
                                                                {" "}
                                                                <Link to="#">{listing?.profile?.bio} { }</Link>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {listing?.BankData ? (
                                            <div className="card overview-sec mt-2">
                                                <div className="card-body">
                                                    <h5 className="subs-title">Bank  Details</h5>
                                                    <div className="contact-info-list">
                                                        <div className="edu-wrap">
                                                            <div className="edu-name">
                                                                <span>
                                                                    <img src={EmailIcon} alt="Address" />
                                                                </span>
                                                            </div>
                                                            <div className="edu-detail">
                                                                <h6>Account Holder Name </h6>
                                                                <p>
                                                                    <Link to="#">{listing?.BankData?.BankName
                                                                    }</Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="edu-wrap">
                                                            <div className="edu-name">
                                                                <span>
                                                                    <img src={AddressIcon} alt="Address" />
                                                                </span>
                                                            </div>
                                                            <div className="edu-detail">
                                                                <h6>Account Number</h6>
                                                                <p>{listing?.BankData?.BankNumber}</p>
                                                            </div>
                                                        </div>

                                                        <div className="edu-wrap">
                                                            <div className="edu-name">
                                                                <span>
                                                                    <img src={AddressIcon} alt="Address" />
                                                                </span>
                                                            </div>
                                                            <div className="edu-detail">
                                                                <h6>IFSC Code </h6>
                                                                <p>{listing?.BankData?.IFSC}</p>
                                                            </div>
                                                        </div>
                                                        <div className="edu-wrap">
                                                            <div className="edu-name">
                                                                <span>
                                                                    <img src={PhoneIcon} alt="Address" />
                                                                </span>
                                                            </div>
                                                            <div className="edu-detail">
                                                                <h6>Bank Name</h6>
                                                                <p>
                                                                    {" "}
                                                                    <Link to="#">{listing?.BankData?.BranchName} </Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (<>
                                        </>
                                        )}

                                        {/* Right Sidebar Tags Label */}

                                        {/* Right Sidebar Profile Overview */}
                                        <div className="card overview-sec mt-2">
                                            <div className="card-body">
                                                <h5 className="subs-title">Course Overview</h5>
                                                <div className="rating-grp">
                                                    <div className="rating">
                                                        {Array.from({ length: 5 }, (_, index) => (
                                                            <i
                                                                key={index}
                                                                className={`fas fa-star ${index < (listing?.review?.length || 0) ? "filled" : ""}`}
                                                            ></i>
                                                        ))}
                                                        <span className="d-inline-block average-rating">
                                                            <span>{listing?.review?.length || 0}</span> ({Course?.sale || 0})
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="profile-overview-list">
                                                    <div className="list-grp-blk d-flex">
                                                        <div className="flex-shrink-0">
                                                            <img src={CoursesIcon} alt="Courses" />
                                                        </div>
                                                        <div className="list-content-blk flex-grow-1 ms-3">
                                                            <h5>{Course?.CourseId?.title}</h5>
                                                            <p>Courses Name</p>
                                                        </div>
                                                    </div>
                                                    <div className="list-grp-blk d-flex">
                                                        <div className="flex-shrink-0">
                                                            {/* <img src={TtlStudIcon} alt="Total Students" /> */}
                                                            <FaRupeeSign size={32} />
                                                        </div>
                                                        <div className="list-content-blk flex-grow-1 ms-3">
                                                            <h5>{Course?.CourseId?.discountPrice}</h5>
                                                            <p>Paid Course Amount</p>
                                                        </div>
                                                    </div>
                                                    <div className="list-grp-blk d-flex">
                                                        <div className="flex-shrink-0">
                                                            <img src={ReviewIcon} alt="Reviews" />
                                                        </div>
                                                        <div className="list-content-blk flex-grow-1 ms-3">
                                                            <h5>{listing?.review?.length}</h5>
                                                            <p>Reviews</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Right Sidebar Profile Overview */}
                                        <div className="card overview-sec mt-2">
                                            <div className="card-body">
                                                <h5 className="subs-title">Social Details</h5>
                                                <div className=" mb-6">
                                                    <div className="d-flex flex-wrap align-items-center justify-content-start gap-4">
                                                        <a
                                                            href={listing?.social?.youtube || "https://www.youtube.com/username"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="d-flex align-items-center text-decoration-none text-dark"
                                                        >
                                                            <div
                                                                className="icon-wrapper d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                                                                style={{ width: "40px", height: "40px" }}
                                                            >
                                                                <FaYoutube size={20} />
                                                            </div>
                                                            <div style={{
                                                                "marginLeft": "4px"
                                                            }}>
                                                                <h6 className="mb-1">YouTube</h6>
                                                                <div className="youtube-link">
                                                                    {listing?.social?.youtube || "youtube.com/username"}
                                                                </div>

                                                            </div>
                                                        </a>

                                                        <a
                                                            href={listing?.social?.twitter || "https://twitter.com/username"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="d-flex align-items-center text-decoration-none text-dark"
                                                        >
                                                            <div
                                                                className="icon-wrapper d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                                                                style={{ width: "40px", height: "40px" }}
                                                            >
                                                                <FaTwitter size={20} />
                                                            </div>
                                                            <div style={{
                                                                "marginLeft": "4px"
                                                            }}>
                                                                <h6 className="mb-1">Twitter</h6>
                                                                <div className="youtube-link">
                                                                    {listing?.social?.twitter || "twitter.com/username"}
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a
                                                            href={listing?.social?.facebook || "https://facebook.com/username"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="d-flex align-items-center text-decoration-none text-dark"
                                                        >
                                                            <div
                                                                className="icon-wrapper d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                                                                style={{ width: "40px", height: "40px" }}
                                                            >
                                                                <FaFacebook size={20} />
                                                            </div>
                                                            <div style={{
                                                                "marginLeft": "4px"
                                                            }}>
                                                                <h6 className="mb-1">Facebook</h6>
                                                                <div className="youtube-link">
                                                                    {listing?.social?.facebook || "facebook.com/username"}
                                                                </div>
                                                            </div>
                                                        </a>

                                                        <a
                                                            href={listing?.social?.instragram || "https://instagram.com/username"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="d-flex align-items-center text-decoration-none text-dark"
                                                        >
                                                            <div
                                                                className="icon-wrapper d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                                                                style={{ width: "40px", height: "40px" }}
                                                            >
                                                                <FaInstagram size={20} />
                                                            </div>
                                                            <div style={{
                                                                "marginLeft": "4px"
                                                            }}>
                                                                <h6 className="mb-1">Instagram</h6>
                                                                <div className="youtube-link">
                                                                    {listing?.social?.instragram || "instagram.com/username"}
                                                                </div>
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        {/* Right Contact Details */}

                                        {/* Right Contact Details */}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </>
    );
}
