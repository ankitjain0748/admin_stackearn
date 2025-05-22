import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Play from "../../assert/play.svg"
import Icon1 from "../../assert/icon-01.svg";
import Icon2 from "../../assert/icon-2.svg";
import Chapter from "../../assert/chapter.svg";
import Chart from "../../assert/chart.svg";
import Cloud from "../../assert/cloud.svg";
import User1 from "../../assert/user1.jpg";
import People from "../../assert/people.svg";
import Teacher from "../../assert/teacher.svg";
import Timer2 from "../../assert/timer.svg";
import Video2 from "../../assert/video.svg";
import Import from "../../assert/import.svg";
import Key from "../../assert/key.svg";
import Mobile from "../../assert/mobile.svg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import moment from "moment";
import LoadingPage from "../components/LoadingPage";
import VideoModal from "../common/VideoModal";
import Listing from "../Api/Listing";
import Image from "../common/Image";
import CourseContent from "./CourseContent";

const CourseDetails = () => {
    const { Id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [courseDetails, setCourseDetails] = useState("")
    const fetchCourseData = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.CourseGetId(Id);
            if (response?.data?.data) {
                setCourseDetails(response.data.data);
            } else {
                toast.error("Failed to fetch course details.");
            }
        } catch (error) {
            console.error("Error fetching course data:", error);
            toast.error("Unable to load course data.");
        } finally {
            setLoading(false);
        }
    };

    const [user, setUser] = useState({
        amount: courseDetails?.discountPrice,
        currency: "INR",
        receipt: `${courseDetails?.discountPrice}INR`
    });

    useEffect(() => {
        if (courseDetails?.discountPrice) {
            setUser((prevState) => ({
                ...prevState,
                amount: courseDetails?.discountPrice,
                receipt: `${courseDetails?.discountPrice}INR`
            }));
        }
    }, [courseDetails]);





    const [totalItems, setTotalItems] = useState(0);

    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Set the initial page
    const [totalPages, setTotalPages] = useState(1); // Assuming you'll get the total pages from the API response



    const [profile, setProfile] = useState("");
    const fetchMarketLists = async (page, limit) => {
        setLoading(true);
        try {
            const main = new Listing();
            const res = await main.ReviewCourse({ CourseId: Id, page, limit });
            if (res?.data?.status) {
                setProfile(res?.data?.data?.profile);
                setContent(res?.data?.data);
                setTotalPages(res?.data.data.totalPages);
                setCurrentPage(res?.data.data.currentPage);
                setTotalItems(res.data.data.totalReviews);
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (Id) fetchCourseData();
        fetchMarketLists(currentPage, 5); // Fetch data on component mount
    }, [Id, currentPage]);


    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle open state for the clicked index
    };

    const [listing, setListing] = useState("");
    const ProfileData = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.userprfileId();
            setListing(response?.data?.user || {});
        } catch (error) {
            console.error("ProfileData error:", error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        ProfileData();
    }, []);



    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        const firstInitial = names[0]?.[0]?.toUpperCase() || "";
        const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded(!isExpanded);
    return (
        <>
            <div className="main-wrapper">

                <div
                    className="inner-banner mt-5 mb-5"
                    style={{
                        padding: "45px 0",
                        backgroundImage: `url(${courseDetails?.courseImage})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        position: "relative",
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="instructor-wrap border-bottom-0 m-0">
                                    <div className="about-instructor align-courseDetailss-center">
                                        <div className="abt-instructor-img">
                                            <Link to="/instructor/instructor-profile">
                                                {courseDetails?.InstrutorId?.profileImage ? (

                                                    <Image
                                                        src={courseDetails?.InstrutorId?.profileImage || User1}
                                                        alt="img"
                                                        classes="img-fluid"
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                ) : (

                                                    <div
                                                        className="flex items-center justify-center avatar-img"
                                                        style={{
                                                            backgroundColor: "#002058",
                                                            borderRadius: "50%",
                                                            color: "#ffffff",
                                                            fontWeight: "normal",
                                                            fontSize: "1.2em",
                                                            width: '50px',
                                                            height: '50px',
                                                            display: "flex",
                                                            padding: "12px"
                                                        }}
                                                    >
                                                        {getInitials(`${courseDetails?.InstrutorId?.firstName || "User"} ${courseDetails?.InstrutorId?.lastName || "name"}`)}

                                                    </div>
                                                )}
                                            </Link>
                                        </div>
                                        <div className="instructor-detail ">
                                            <h5>
                                                <Link to="/instructor/instructor-profile">{courseDetails?.InstrutorId?.firstName || "User"} {courseDetails?.InstrutorId?.lastName || "Name"}</Link>
                                            </h5>
                                            <p>{courseDetails?.InstrutorId?.designation}</p>
                                        </div>
                                        <div className="rating">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <i
                                                    key={index}
                                                    className={`fas fa-star ${index < courseDetails?.InstrutorId?.rating ? "filled" : ""}`}
                                                ></i>
                                            ))}
                                        </div>
                                    </div>
                                    <span className="web-badge mb-3" style={{ textTransform: "capitalize" }}>{courseDetails?.category || "category"}</span>
                                </div>
                                <h2 className="!text-white">{courseDetails?.title || "title"}</h2>
                                <p className="data-limit">
                                    {courseDetails?.sub_content || "description"}
                                </p>
                                <div className="course-info d-flex align-courseDetailss-center border-bottom-0 m-0 p-0">
                                    <div className="cou-info d-flex align-items-center text-white" style={{ gap: "8px" }}>
                                        <img src={Icon1} alt="" />
                                        {courseDetails?.InstrutorId?.lessions || "5"}+ Lesson
                                    </div>

                                    <div className="cou-info d-flex align-items-center text-white" style={{ gap: "8px" }}>
                                        <img src={People} alt="" />
                                        {courseDetails?.InstrutorId?.students || "5"}+ Students Enrolled
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="page-content course-sec">

                    <div className="container">
                        <div className="row">
                            {loading ? (
                                <LoadingPage />
                            ) : (
                                <div className="col-lg-8">
                                    {/* Overview */}
                                    <div className="card overview-sec">
                                        <div className="card-body">

                                            <div
                                                onClick={() => navigate(-1)}
                                                className="d-flex justify-content-between items-center w-full cursor-pointer"
                                            >
                                                <h4 className="text-orange font-medium">
                                                    ← Course Overview
                                                </h4>
                                            </div>



                                            <div
                                                className="blog-details"
                                                style={{
                                                    maxHeight: isExpanded ? "none" : "300px", // Adjust height as needed
                                                    overflow: "hidden",
                                                    position: "relative",
                                                }}
                                            >
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: courseDetails?.description }}
                                                />
                                            </div>

                                            {courseDetails?.description && courseDetails.description.length > 0 && (
                                                <div className="flex justify-content-end">
                                                    <button
                                                        className="login-head button text-right"
                                                        onClick={toggleExpanded}
                                                    >
                                                        {isExpanded ? "Show Less" : "Show More"}
                                                    </button>
                                                </div>
                                            )}



                                        </div>
                                    </div>
                                    {/* /Overview */}
                                    {/* Course Content */}
                                    <CourseContent courseDetails={courseDetails} />

                                    {/* /Course Content */}
                                    {/* Instructor */}
                                    <div className="card instructor-sec mt-3 mb-2">
                                        <div className="card-body">
                                            <h5 className="subs-title">About the instructor</h5>
                                            <div className="instructor-wrap">
                                                <div className="about-instructor">
                                                    <div className="abt-instructor-img">
                                                        <Link to="/instructor/instructor-profile">
                                                            {courseDetails?.InstrutorId?.profileImage ? (

                                                                <Image
                                                                    src={courseDetails?.InstrutorId?.profileImage || User1}
                                                                    alt="img"
                                                                    classes="img-fluid"
                                                                    style={{ marginRight: '10px' }}
                                                                />
                                                            ) : (

                                                                <div
                                                                    className="flex items-center justify-center avatar-img"
                                                                    style={{
                                                                        backgroundColor: "#002058",
                                                                        borderRadius: "50%",
                                                                        color: "#ffffff",
                                                                        fontWeight: "normal",
                                                                        fontSize: "1.2em",
                                                                        width: '50px',
                                                                        height: '50px',
                                                                        display: "flex",
                                                                        padding: "12px"
                                                                    }}
                                                                >
                                                                    {getInitials(`${courseDetails?.InstrutorId?.firstName} ${courseDetails?.InstrutorId?.lastName}`)}

                                                                </div>
                                                            )}

                                                        </Link>
                                                    </div>
                                                    <div className="instructor-detail">
                                                        <h5>
                                                            <Link to="/instructor/instructor-profile">{courseDetails?.InstrutorId?.firstName} {courseDetails?.InstrutorId?.lastName}</Link>
                                                        </h5>
                                                        <p>{courseDetails?.InstrutorId?.designation}</p>
                                                    </div>
                                                </div>
                                                <div className="rating">
                                                    {Array.from({ length: 5 }).map((_, index) => (
                                                        <i
                                                            key={index}
                                                            className={`fas fa-star ${index < courseDetails?.InstrutorId?.rating ? "filled" : ""}`}
                                                        ></i>
                                                    ))}
                                                    {/* <span className="d-inline-block average-rating">
                           <span>{courseDetails?.InstrutorId?.rating} </span>
                         </span> */}
                                                </div>
                                            </div>
                                            <div className="course-info d-flex align-items-center">
                                                <div className="cou-info" style={{ gap: "8px" }}>
                                                    <img src={Play} alt="" className=" mr-4" />
                                                    5+ Courses
                                                </div>
                                                <div className="cou-info d-flex align-items-center" style={{ gap: "8px" }}>
                                                    <img src={Icon1} alt="" className=" mr-4" />
                                                    {courseDetails?.InstrutorId?.lessions}+ Lesson
                                                </div>

                                                <div className="cou-info" style={{ gap: "8px" }}>
                                                    <img src={Icon2} alt="" className=" mr-4" />
                                                    9hr 30min
                                                </div>
                                                <div className="cou-info" style={{ gap: "8px" }}>
                                                    <img src={People} alt="" />
                                                    {courseDetails?.InstrutorId?.students}+ Students Enrolled
                                                </div>
                                            </div>
                                            {courseDetails?.InstrutorId?.bio}
                                        </div>
                                    </div>
                                    {/* /Instructor */}
                                    {/* Reviews */}

                                    {content?.reviews?.length > 0 && (
                                        <div className="card review-sec mt-3 mb-2">
                                            <h5 className="subs-title mt-2 p-3">Reviews</h5>
                                            <div className="checkout-form">
                                                {/* Review */}
                                                {content?.reviews?.map((item, index) => (
                                                    <div className="review-wrap" key={index}
                                                    >
                                                        <div className="review-user-info">
                                                            <div className="reviewer">
                                                                <div className="review-img">
                                                                    <Link to="#">
                                                                        {item?.userId?.profileImage ? (
                                                                            <Image
                                                                                src={item?.userId?.profileImage || User1}
                                                                                alt="img"
                                                                                classes="img-fluid"
                                                                                style={{
                                                                                    marginRight: '10px',
                                                                                    width: '50px',
                                                                                    height: '50px'
                                                                                }}
                                                                            />
                                                                        ) : (
                                                                            <div
                                                                                className="flex items-center justify-center avatar-img"
                                                                                style={{
                                                                                    backgroundColor: "#002058",
                                                                                    borderRadius: "50%",
                                                                                    color: "#ffffff",
                                                                                    fontWeight: "normal",
                                                                                    fontSize: "1em",
                                                                                    width: '50px',
                                                                                    height: '50px',
                                                                                    display: "flex",
                                                                                    padding: "13px"
                                                                                }}
                                                                            >
                                                                                {getInitials(`${item?.userId?.name}`)}

                                                                            </div>
                                                                        )}
                                                                    </Link>
                                                                </div>
                                                                <div className="reviewer-info">
                                                                    <h6 className="text-black">
                                                                        <Link to="#"> {item?.userId?.name} </Link>
                                                                    </h6>
                                                                    <p>
                                                                        {(() => {
                                                                            const now = moment();
                                                                            const created = moment(item?.created_at);
                                                                            const diffInSeconds = now.diff(created, 'seconds');

                                                                            if (diffInSeconds === 0) {
                                                                                return "Just now";
                                                                            }
                                                                            if (diffInSeconds < 60) {
                                                                                return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
                                                                            }

                                                                            const diffInMinutes = now.diff(created, 'minutes');
                                                                            if (diffInMinutes < 60) {
                                                                                return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
                                                                            }

                                                                            const diffInHours = now.diff(created, 'hours');
                                                                            if (diffInHours < 24) {
                                                                                return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
                                                                            }

                                                                            const diffInDays = now.diff(created, 'days');
                                                                            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
                                                                        })()}
                                                                    </p>

                                                                </div>
                                                            </div>
                                                            <div className="reviewer-rating">
                                                                {Array.from({ length: 5 }, (_, index) => (
                                                                    <i
                                                                        key={index}
                                                                        className={`fa-solid fa-star ${index < item?.rating ? "filled" : ""}`}
                                                                        style={{ color: index < item?.rating ? "#FFD700" : "#ccc" }}
                                                                    />
                                                                ))}

                                                            </div>
                                                        </div>
                                                        <div className="review-content">
                                                            <p>
                                                                {item?.message}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="col-lg-4">
                                <div className="sidebar-sec">
                                    {/* Video */}
                                    <div className="video-sec vid-bg">
                                        <div className="card">
                                            <div className="">
                                                <VideoModal videoLink={courseDetails?.courseVideo} thumbnail={courseDetails?.thumbnail} />
                                                <div className="video-details p-3">
                                                    <div className="course-fee flex justify-between items-center">
                                                        <span className="discount-price flex items-center gap-3">
                                                            <LiaRupeeSignSolid size={20} />
                                                            {courseDetails.discountPrice}
                                                            <span className="original-price text-danger line-through ml-3">
                                                                <LiaRupeeSignSolid size={20} />
                                                                {courseDetails.price || "0"}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    {/* /Video */}
                                    {/* Include */}
                                    <div className="card feature-sec mt-3">
                                        <div className="card-body">
                                            <div className="cat-title">
                                                <h4>Includes</h4>
                                            </div>
                                            <ul>
                                                <li>
                                                    <img
                                                        src={People}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Enrolled: <span>{courseDetails?.InstrutorId?.students}+ Students</span>
                                                </li>
                                                <li>
                                                    <img
                                                        src={Timer2}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Duration: <span>20 hours</span>
                                                </li>
                                                <li>
                                                    <img
                                                        src={Chapter}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Chapters: <span>{courseDetails?.lectureFiles?.length}</span>
                                                </li>
                                                <li>
                                                    <img src={Video2} className="me-2" alt="" />
                                                    Video:
                                                    <span>

                                                        {courseDetails?.lectureFiles?.reduce(
                                                            (total, file) => total + (file.subtitles?.length || 0),
                                                            0
                                                        )}
                                                    </span>
                                                </li>

                                                <li>
                                                    <img
                                                        src={Chart}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Level: <span>{courseDetails?.level}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="card include-sec mt-3">
                                        <div className="card-body">
                                            <div className="cat-title">
                                                <h4>Why Choose This Course?</h4>
                                            </div>
                                            <ul>
                                                <li>
                                                    <img
                                                        src={Import}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    On-demand recorded Videos
                                                </li>
                                                <li>
                                                    <img
                                                        src={Play}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    24*7 Technical  Supports
                                                </li>
                                                <li>
                                                    <img
                                                        src={Key}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Life time access
                                                </li>
                                                <li>
                                                    <img
                                                        src={Mobile}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Access on mobile and TV
                                                </li>
                                                <li>
                                                    <img
                                                        src={Cloud}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Assignments
                                                </li>
                                                <li>
                                                    <img
                                                        src={Teacher}
                                                        className="me-2"
                                                        alt=""
                                                    />{" "}
                                                    Certificate of Completion
                                                </li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>

        </>
    );
};


export default CourseDetails;