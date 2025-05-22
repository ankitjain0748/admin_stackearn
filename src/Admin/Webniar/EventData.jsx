import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import DateFormate from "../common/DateFormate";
import  User2  from "../../assert/course-02.jpg";
import DeleteTable from "../common/DeleteTable";
import ViewIcon from "../components/ViewIcon";
import EditData from "../common/EditData";
import DashboardLayout from "../common/DashboardLayout";

const EventData = () => {

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);

    const fetchMarketLists = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.userList();
            setListing(response?.data?.data?.users
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMarketLists();
    }, []);
    return (
        <DashboardLayout>
            <div className="settings-widget card-details">
                <div className="settings-menu p-0">
                    <div className="profile-heading">
                        <h3>Web History</h3>
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
                                                <th>S. No.</th>
                                                <th> Name</th>
                                                <th>Join  Date</th>
                                                <th>Email</th>
                                                <th>Course Name</th>

                                                <th>Status</th>
                                                <th>View</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listing && listing?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center">
                                                            <h2 className="table-avatar d-flex align-items-center">
                                                                <Link to={`/admin/user-profile-Id/${item?._id}`} className="avatar">
                                                                    <img
                                                                        className="avatar-img"
                                                                        src={item?.ProfileDetails?.profileImage || User2}
                                                                        alt="User Image"
                                                                        style={{
                                                                            objectFit: "cover", // Adjust the fit as needed (cover, contain, fill, etc.)
                                                                        }}
                                                                    />
                                                                </Link>
                                                                <div className="ms-3"> {/* Added margin start to add spacing between avatar and text */}
                                                                    <Link to={`/admin/user-profile-Id/${item?._id}`} className="d-block">
                                                                        {item?.name}
                                                                    </Link>
                                                                    <Link to={`/admin/user-profile-Id/${item?._id}`} className="d-block text-muted">
                                                                        {item?.phone_number}
                                                                    </Link>
                                                                </div>
                                                            </h2>
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <DateFormate data={item?.created_at} />
                                                    </td>


                                                    <td>{item?.email}</td>
                                                    <td>{item?.CourseId?.title}</td>

                                                    <td className="">
                                                        <span
                                                            style={{ fontSize: "14px" }}
                                                            className={`badge rounded px-3 py-2 text-capitalize ${item?.user_status === "active" ? "completed-status" : "cancelled-status"}`}
                                                        >
                                                            {item?.user_status}
                                                        </span>
                                                    </td>

                                                    <td className=" ">
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                            {/* View Action */}


                                                            <ViewIcon link={`/admin/user-profile-Id/${item?._id}`} />

                                                            <EditData link={`/admin/user-profile-Id/${item?._id}`} />

                                                            {/* Edit Action */}




                                                            {/* Delete Action */}
                                                            <DeleteTable
                                                                step={1} Id={item?._id} fetchMarketLists={fetchMarketLists}
                                                            />
                                                        </div>
                                                    </td>



                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/* /Tab Content */}
                    </div>
                </div>
            </div>
            <div className="dash-pagination">
                <div className="row align-items-center">
                    <div className="col-6">
                        <p>Page 1 of 2</p>
                    </div>
                    <div className="col-6">
                        <ul className="pagination">
                            <li className="active">
                                <Link to="#">1</Link>
                            </li>
                            <li>
                                <Link to="#">2</Link>
                            </li>
                            <li>
                                <Link to="#">
                                    <i className="bx bx-chevron-right" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default EventData;
