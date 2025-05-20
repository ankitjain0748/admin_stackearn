import Header from "../header";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import {
    Avatar1,
    Avatar2,
    Category1,
    Category2,
    Category3,
    Category4,
    Category5,
    Category6,
    Category7,
    Category8,
    Avatar3,
    Slider01, Slider02,
    Avatar4,
    BannerVector,
} from "../imagepath";
import {
    AwardNew,
    Education,
    JoingusSkill,
} from "../imagepath";
import Select from "react-select";
import LeadingCompanies4 from "../home4/slider/leadingCompanies";
import CountUp from "react-countup";
import Contact from "./Contact";
import { Footer4 } from "../footer4";

function School() {
    const mobileSidebar = useSelector(
        (state) => state.sidebarSlice.expandMenu
    );
    const [setValue] = useState(null);
    const options = [
        { label: "Category", value: "Category" },
        { label: "Angular", value: "Angular" },
        { label: "Node Js", value: "Node Js" },
        { label: "React", value: "React" },
        { label: "Python", value: "Python" },
    ];

    const style = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: mobileSidebar === 'disabled' ? "#FFD600" : "#2b2838",
            width: "100%",
            height: "55px",
            minHeight: "55px",
            border: state.isFocused ? 0 : 0,
            paddingLeft: "5px",
            // This line disable the blue border
            boxShadow: state.isFocused ? 0 : 0,
            borderRadius: state.isSelected ? "0" : "50px",
            fontSize: "16px",
            fontWeight: "500",
            color: "black",
            "&:hover": {
                border: state.isFocused ? 0 : 0,
                color: "black",
            },
            outline: "none",
        }),
        menu: (base) => ({
            ...base,
            marginTop: "0px",
            borderRadius: "50px",
            hyphens: "auto",
            width: "max-content",
            minWidth: "100%",
        }),
        menuList: (base) => ({ ...base, padding: "0" }),
        option: (provided) => ({
            ...provided,
            backgroundColor: mobileSidebar === 'disabled' ? "#fff" : "#000",
            color: mobileSidebar === 'disabled' ? '#000' : '#fff',
            fontSize: "14px",
            "&:hover": {
                backgroundColor: mobileSidebar === 'disabled' ? "#FFD600" : "#2b2838",
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            // padding: "0 15px",
        }),
        indicatorSeparator: (base) => ({
            ...base,
            display: "none",
        }),
        dropdownIndicator: (base, state) => ({
            ...base,
            transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
            transition: "250ms",
            color: "black",
        }),
    };

    useEffect(() => {
        document.body.className = "home-five";

        return () => {
            document.body.className = "";
        };
    }, []);

    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);




    return (<>
        <div className="main-wrapper">
            <Header />

            <section className="home-slide-five bg-![#071136]">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12">
                            <div className="home-slide-five-face" data-aos="fade-down">
                                <div className="home-slide-five-text">
                                    <h5>The Leader in Online Learning</h5>
                                    <h1>Engaging & Accessible Online Courses For All</h1>
                                    <p>Trusted by over 15K Users worldwide since 2024</p>
                                </div>
                                <div className="review-five-group">
                                    <div className="review-user-five  d-flex align-items-center">
                                        <ul className="review-users-list">
                                            <li>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title=""
                                                    data-bs-original-title="leader 1"
                                                >
                                                    <img src={Avatar1} alt="img" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title=""
                                                    data-bs-original-title="leader 2"
                                                >
                                                    <img src={Avatar2} alt="img" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title=""
                                                    data-bs-original-title="leader 3"
                                                >
                                                    <img src={Avatar3} alt="img" />
                                                </Link>
                                            </li>
                                            <li>
                                                <Link
                                                    to="#"
                                                    data-bs-toggle="tooltip"
                                                    data-bs-placement="top"
                                                    title=""
                                                    data-bs-original-title="leader 3"
                                                >
                                                    <img src={Avatar4} alt="img" />
                                                </Link>
                                            </li>
                                        </ul>
                                        <div className="review-rating-five">
                                            <div className="rating-star">
                                                <p>5.5</p>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                                <i className="fas fa-star filled"></i>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Experience */}
                                    <div className="rate-head-five d-flex align-items-center course-count">
                                        <h2>
                                            <span className="counterUp">10</span>+
                                        </h2>
                                        <p>Years of experience tutors</p>
                                    </div>
                                </div>
                                {/* Review and Experience */}
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="banner-slider-img">
                                <div className="row">
                                    <div className="col-lg-6 align-self-end">
                                        <div className="slider-five-one" data-aos="fade-down">
                                            <img src={Slider01} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="slider-five-two aos" data-aos="fade-down">
                                            <img src={Slider02} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vector-shapes-five">
                        <img src={BannerVector} alt="" />
                    </div>
                </div>
            </section>
            
            <section className="leading-section-five">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-6" data-aos="fade-down">
                            <div className="leading-five-content course-count">
                                <h2>
                                    Trusted By <span className="counterUp">500</span>+
                                </h2>
                                <p>Leading Universities And Companies</p>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-6" data-aos="fade-down">
                            <div className="lead-group-five">
                                <LeadingCompanies4 />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="home-two">
                <section className="topcategory-sec">
                    <div className="container">
                        <div className="header-two-title text-center" data-aos="fade-up">
                            <h2>Top Category</h2>
                            <div className="header-two-text">
                                <p className="mb-0">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                                    aenean accumsan bibendum gravida maecenas augue elementum et
                                    neque. Suspendisse imperdiet.
                                </p>
                            </div>
                        </div>
                        <div className="top-category-group">
                            <div className="row">
                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category1} alt="Angular Development" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Angular Development</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category2} alt="Python Development" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Python Development</h3>
                                            <p>20 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item flex-fill">
                                        <div className="categories-icon">
                                            <img
                                                className="category3"
                                                src={Category3}
                                                alt="Node Js Development"
                                            />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Node Js Development</h3>
                                            <p>120 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category4} alt="PHP Development" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>PHP Development</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category5} alt="Docker Development" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Docker Development</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item  flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category6} alt="Swift Development" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Swift Development</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex"
                                    data-aos="fade-down"
                                >
                                    <div className="categories-item  flex-fill">
                                        <div className="categories-icon">
                                            <img src={Category7} alt="Photography" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Photography</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 d-flex">
                                    <div
                                        className="categories-item  flex-fill"
                                        data-aos="fade-up"
                                    >
                                        <div className="categories-icon">
                                            <img src={Category8} alt="Business" />
                                        </div>
                                        <div className="categories-content">
                                            <h3>Business</h3>
                                            <p>40 Instructors</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="share-knowledge-five">
                <div className="container">
                    <div className="row align-items-center share-knowledge-row">
                        <div className="col-lg-6 col-md-6 col-sm-12" >
                            <div className="section-five-sub">
                                <div className="header-five-title">
                                    <h2>Want to share your knowledge? Join us a Mentor</h2>
                                </div>
                                <div className="career-five-content">
                                    <p>
                                        High-definition video is video of higher resolution and
                                        quality than standard-definition. While there is no
                                        standardized meaning for high-definition, generally any
                                        video.While there is no standardized meaning for
                                        high-definition, generally any video.
                                    </p>
                                </div>
                                <div className="knowledge-list-five">
                                    <ul>
                                        <li>
                                            <div className="knowledge-list-group ">
                                                <img src={AwardNew} alt="" />
                                                <p>Best Courses</p>
                                            </div>
                                        </li>
                                        <li className="mb-0">
                                            <div className="knowledge-list-group ">
                                                <img src={AwardNew} alt="" />
                                                <p>Best Courses</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <Link to="/course-list" className="learn-more-five">
                                    Start Teaching Today
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12" >
                            <div className="joing-count-five schoolimg text-center">
                            <img src={JoingusSkill} alt="" className="phone-img img-fluid" />

                                <div className="joing-count-five-one course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">5,5</span>K<span>+</span>
                                    </h3>
                                    <p className="joing-count-text">Courses</p>
                                </div>
                                <div className="joing-count-five-two course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">50</span>K
                                    </h3>
                                    <p className="joing-count-text">Appreciations</p>
                                </div>
                                <div className="joing-count-five-three course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">100</span>
                                    </h3>
                                    <p className="joing-count-text">Countries</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Share your knowledge */}
            {/* Achieve your goals */}
            <section className="goals-section-five">
                <div className="container">
                    <div className="row align-items-center">
                        <div
                            className="col-x-4 col-lg-3 col-md-12 col-sm-12"
                            data-aos="fade-down"
                        >
                            <div className="header-five-title mb-0">
                                <h2 className="mb-0">Achieve your Goals with DreamsLMS</h2>
                            </div>
                        </div>
                        <div className="col-x-8 col-lg-9 col-md-12 col-sm-12">
                            <div className="row text-center align-items-center">
                                <div className="col-lg-3 col-sm-3" data-aos="fade-down">
                                    <div className="goals-count-five goals-five-one">
                                        <div className="goals-content-five course-count ms-0">
                                            <h4>
                                                <span className="counterUp">145</span>
                                            </h4>
                                            <p className="mb-0">Expert Tutors</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3" data-aos="fade-down">
                                    <div className="goals-count-five goals-five-two">
                                        <div className="goals-content-five course-count ms-0">
                                            <h4>
                                                <span className="counterUp">23495</span>
                                            </h4>
                                            <p className="mb-0">Cetified Courses</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3" data-aos="fade-down">
                                    <div className="goals-count-five goals-five-three">
                                        <div className="goals-content-five course-count ms-0">
                                            <h4>
                                                <CountUp start={0} end={20} delay={1} duration={3} />+
                                            </h4>
                                            <p className="mb-0">Online students</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-3" data-aos="fade-down">
                                    <div className="goals-count-five goals-five-four goals-five-last">
                                        <div className="goals-content-five course-count ms-0">
                                            <h4>
                                                <span className="counterUp">58370</span>
                                            </h4>
                                            <p className="mb-0">Online Courses</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Achieve your goals */}

            {/* Transform Section */}
            {/* <section className="transform-section-five">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-12" data-aos="fade-down">
                            <div className="joing-count-five">
                                <img src={Education} alt="" />
                                <div className="transform-count-five-one course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">100</span>
                                    </h3>
                                    <p className="joing-count-text">Countries</p>
                                </div>
                                <div className="transform-count-five-two course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">5,5</span>K<span>+</span>
                                    </h3>
                                    <p className="joing-count-text">Courses</p>
                                </div>
                                <div className="transform-count-five-three course-count">
                                    <h3 className="joing-count-number">
                                        <span className="counterUp">50</span>K<span>+</span>
                                    </h3>
                                    <p className="joing-count-text">Appreciations</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12" data-aos="fade-down">
                            <div className="transform-access-content">
                                <div className="header-five-title">
                                    <h2>Transform Access To Education</h2>
                                </div>
                                <div className="career-five-content">
                                    <p className="mb-0">
                                        Create an account to receive our newsletter, course
                                        recommendations and promotions. Create an account to receive
                                        our newsletter, course recommendations and promotions.
                                        Create an account to receive our newsletter, course
                                        recommendations and promotions.
                                    </p>
                                </div>
                                <div className="knowledge-list-five">
                                    <ul>
                                        <li>
                                            <div className="knowledge-list-group">
                                                <img src={AwardNew} alt="" />
                                                <p>Award Winning Course Management</p>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="knowledge-list-group">
                                                <img src={AwardNew} alt="" />
                                                <p>Learn anything from anywhere anytime</p>
                                            </div>
                                        </li>
                                        <li className="mb-0">
                                            <div className="knowledge-list-group">
                                                <img src={AwardNew} alt="" />
                                                <p>
                                                    Certification for solid development of your Carrer
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <Link to="/instructor/instructor-course" className="learn-more-five">
                                    Start Teaching Today
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
            <div className="p-7">
                <Contact datarole={"school"} />
            </div>
            <div className="mt-5">
                <Footer4 />
            </div>
        </div>

    </>);
}

export default School;