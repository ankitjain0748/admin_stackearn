import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import  course28  from "../../assert/course-02.jpg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import Pagination from "../components/Pagination";
import DashboardLayout from "../common/DashboardLayout";
import Image from "../components/Image";

const BestSelllingCourse = () => {

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const PaymentLisitng = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.PaymentCourseData();
            setListing(response?.data?.BestSellingCourses);
            setTotalPages(response?.data.totalPages);
            setCurrentPage(response?.data.currentPage);
            setTotalItems(response.data.totalItems);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        PaymentLisitng(currentPage, 15);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        PaymentLisitng(page, 15);
    };
    const totalAmount = listing?.reduce((acc, item) => {
        return acc + (item?.purchaseCount || 0) * (item?.discountPrice || 0);
    }, 0);


    return (
        <DashboardLayout>
            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading d-flex flex-wrap justify-content-between align-items-center">
                        <h3 className="mb-0">Best Selling Course</h3>
                        <h5 className="mb-0 d-flex align-items-center gap-1">
                            Total Amount: <LiaRupeeSignSolid size={16} /> {totalAmount}
                        </h5>
                    </div>


                    <div className="checkout-form">
                        {/* Tab Content */}
                        <div className="tab-content">
                            {/* Today */}
                            <div className="tab-pane show active" id="today">

                                <div className="table-responsive custom-table">
                                    <table className="table table-nowrap mb-0">
                                        <thead>
                                            <tr>
                                                <th>Courses</th>
                                                <th>Prices</th>
                                                <th>Sales</th>
                                                <th>amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-4">
                                                        Loading...
                                                    </td>
                                                </tr>
                                            ) : listing && listing.length > 0 ? (
                                                listing.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <div className="sell-table-group d-flex align-items-center">
                                                                <div className="sell-group-img">
                                                                    <Link to="/course-details">
                                                                        <Image
                                                                            src={item?.courseImage || course28}
                                                                            classes="img-fluid"
                                                                            alt="Img"
                                                                            style={{ width: "118px", height: "77px" }}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div className="sell-tabel-info">
                                                                    <p className="mb-1">
                                                                        <Link to="/course-details" className="course-title">
                                                                            {item?.title}
                                                                        </Link>
                                                                    </p>
                                                                    <p className="instructor-name text-muted mb-0">
                                                                        {item?.InstrutorId?.firstName} {item?.InstrutorId?.lastName}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <LiaRupeeSignSolid size={20} /> {item?.discountPrice}
                                                        </td>
                                                        <td>{item?.purchaseCount}</td>
                                                        <td>
                                                            <LiaRupeeSignSolid size={20} />
                                                            {item?.purchaseCount * item?.discountPrice}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center py-4">
                                                        <h5>No Data Available</h5>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>


                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* /Tab Content */}
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </DashboardLayout>

    );
};

export default BestSelllingCourse;
