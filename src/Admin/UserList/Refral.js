import { useEffect, useState } from "react";
import Listing from "../Api/Listing";
import { Search } from "react-feather";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import  User2  from "../../assert/course-02.jpg";
import { LiaRupeeSignSolid } from "react-icons/lia";
import DateFormate from "../components/DateFormate";


function Refral() {
    const { id } = useParams();
    const [dataRefral, setDataRefral] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const [searchname, setSearchName] = useState("");
    const ContactList = async (id = "", searchname = "", paymentDate = "", page = 1, limit = 10) => {
        try {
            const main = new Listing();
            const response = await main.RefralGetCode(id, searchname, paymentDate, page, limit);
            setDataRefral(response?.data?.data);
            setTotalItems(response?.data?.totalReferrals);
            localStorage && localStorage.setItem("Refral", response?.data?.totalReferrals || 0)
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        ContactList(id, searchname, searchDate, currentPage, 10);
    }, [id, searchname, searchDate, currentPage]);



    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    return (<>
        <div className="p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2">
            <h3>Referral</h3>

            <div className="d-flex flex-column flex-sm-row gap-2">
                <div className="position-relative">
                    <Search
                        size={16}
                        className="position-absolute top-50 start-0 translate-middle-y ms-2 text-danger"
                    />
                    <input
                        type="text"
                        className="form-control ps-4"
                        style={{ minWidth: "150px" }}
                        value={searchname}
                        placeholder="Student name"
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>

                <div className="position-relative">

                    <p className="d-block d-md-none">Search By Date</p>

                    <input
                        type="date"
                        className="form-control"
                        style={{ minWidth: "150px" }}
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                </div>
            </div>
        </div>



        <div className="checkout-form">
            <div className="table-responsive custom-table">
                <table className="table table-nowrap mb-0">
                    <thead>
                        <tr>
                            <th>Referred ID</th>
                            <th>Referrals</th>
                            <th>Course Name</th>
                            <th>Income Status</th>
                            <th>Earnings</th>
                            <th>Paid Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRefral && dataRefral.length > 0 ? (
                            dataRefral.map((item, index) => (
                                <tr key={index}>
                                    <td># {item?.referral_code}</td>
                                    <td>
                                        <h2 className="table-avatar d-flex align-items-center">
                                            <Link to="/student/student-profile" className="avatar">
                                                <img className="avatar-img" src={item?.profileImage || User2} alt="User Image" />
                                            </Link>
                                            <div className="student-info">
                                                <Link to="/student/student-profile">{item?.name}</Link>
                                                <div className="student-phone">
                                                    {item?.phone_code} {item?.phone_number}
                                                </div>
                                            </div>
                                        </h2>
                                    </td>
                                    <td>
                                        <h2 className="table-avatar d-flex align-items-center">
                                            <div className="student-info">
                                                <Link to="/student/student-profile">{item?.CourseId?.title || "No Course Purchase"}</Link>
                                                <div className="student-phone">
                                                    {item?.paymentDetails && item.paymentDetails.length > 0 && (
                                                        item.paymentDetails.map((payment, payIndex) => (
                                                            <span key={payIndex}>
                                                                <DateFormate data={payment?.payment_date} />
                                                            </span>
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </h2>
                                    </td>
                                    <td>
                                        {item?.paymentDetails && item.paymentDetails.length > 0 && (
                                            item.paymentDetails.map((payment, payIndex) => {
                                                let matchedAmount = "";

                                                if (payment?.referredData1?.userId === id) {
                                                    matchedAmount = payment.referredData1.userType;
                                                } else if (payment?.referredData2?.userId === id) {
                                                    matchedAmount = payment.referredData2.userType;
                                                } else if (payment?.referredData3?.userId === id) {
                                                    matchedAmount = payment.referredData3.userType;
                                                }

                                                const userTypeLabels = {
                                                    directuser: "DIRECT INCOME",
                                                    firstuser: "PASSIVE INCOME",
                                                    seconduser: "PASSIVE INCOME",
                                                };

                                                return matchedAmount ? (
                                                    <div key={payIndex} className="uppercase">
                                                        {userTypeLabels[matchedAmount] || matchedAmount}
                                                    </div>
                                                ) : null;
                                            })
                                        )}
                                    </td>


                                    <td>
                                        {item?.paymentDetails && item.paymentDetails.length > 0 && (
                                            item.paymentDetails.map((payment, payIndex) => {
                                                let matchedAmount = 0;

                                                if (payment?.referredData1?.userId === id) {
                                                    matchedAmount = payment.referredData1.payAmount;
                                                } else if (payment?.referredData2?.userId === id) {
                                                    matchedAmount = payment.referredData2.payAmount;
                                                } else if (payment?.referredData3?.userId === id) {
                                                    matchedAmount = payment.referredData3.payAmount;
                                                }

                                                return matchedAmount > 0 ? (
                                                    <div key={payIndex}>
                                                        <LiaRupeeSignSolid size={20} /> {matchedAmount}
                                                    </div>
                                                ) : null;
                                            })
                                        )}
                                    </td>

                                    <td>
                                        <span className="text-wrap">
                                            <>
                                                <LiaRupeeSignSolid size={20} />
                                                {item?.CourseId?.discountPrice || 0}
                                            </>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No data available</td>
                            </tr>
                        )}

                    </tbody>

                </table>
            </div>
        </div>


        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
        />
    </>);
}

export default Refral;