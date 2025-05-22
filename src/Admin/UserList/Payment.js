import { useEffect, useState } from "react";
import Listing from "../Api/Listing";
import { Link, useParams } from "react-router-dom";
import Pagination from "../components/Pagination";
import { LiaRupeeSignSolid } from "react-icons/lia";
import PaymentStatus from "../components/PaymentStatus";
import DateFormate from "../common/DateFormate";


function Payment() {
    const { id } = useParams();
    const [record, setRecord] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [searchDate, setSearchDate] = useState("");
    const PaymentList = async (id = "", paymentDate = "", page = 1, limit = 10) => {
        try {
            const main = new Listing();
            const response = await main.UserAdminPay(id, paymentDate, page, limit);
            setRecord(response?.data?.AdminPayments);
            setTotalItems(response?.data?.totalPayments);
            setTotalPages(response?.data?.totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        PaymentList(id, searchDate, currentPage, 10);
    }, [id, searchDate, currentPage]);


    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };


    return (<>

        <div className="profile-heading d-flex align-items-center justify-content-between">
            <h3>Payment </h3>
            <div className="position-relative">
            <p className="d-block d-md-none">Search By Date</p>
                <input
                    type="date"
                    className="form-control "
                    style={{ minWidth: "150px" }}
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
            </div>

        </div>
        <div className="checkout-form">
            <div className="table-responsive custom-table">
                <table className="table table-nowrap mb-0">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Transaction Id</th>
                            <th>Payment method</th>
                            <th>Payment Reason</th>
                            <th>Status</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record && record?.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <DateFormate data={item.payment_date}/>
                                </td>
                                <td>
                                    {item?.transactionId || item?._id}
                                </td>
                                <td>{item?.paymentMethod || item?.payment_type}</td>
                                <td>
                                    {item?.withdrawal_reason || item?.success_reasons}
                                </td>
                                <td>
                                    <PaymentStatus status={item.page} />
                                </td>
                                <td>
                                    <LiaRupeeSignSolid size={20} />
                                    {item?.payment_key || item?.payment_Add
                                    }
                                </td>

                            </tr>
                        ))}
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

export default Payment;