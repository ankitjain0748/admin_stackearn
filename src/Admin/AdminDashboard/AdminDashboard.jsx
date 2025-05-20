import React, { useEffect, useState } from 'react'
import DashboardLayout from '../common/DashboardLayout'
import Listing from '../Api/Listing'
import User16 from "../../assert/user16.jpg";
import { useNavigate } from 'react-router-dom'
import Image from "../components/PhoneImage";
import { FaRupeeSign } from 'react-icons/fa'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [profile, setProfile] = useState(null);
    const [dashboard, setdashboard] = useState("");
    const AdminDashboardApi = async () => {
        try {
            const main = new Listing();
            const response = await main.AdminDashboard();
            setdashboard(response?.data)
            setListing(response?.data?.user);
            setProfile(response?.data?.profileData);
        } catch (error) {
            console.log("error", error)
        }
    };


    useEffect(() => {
        AdminDashboardApi();
    }, [])



    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        const firstInitial = names[0]?.[0]?.toUpperCase() || "";
        const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };
    const lastTodayIncome = (dashboard?.totaluserIncome?.lastTodayIncome || 0) + (dashboard?.todayData?.totalPayout || 0) - (dashboard?.totaluserIncome?.UnPaidAmounts || 0) - (dashboard?.totaluserIncome?.TodayPayment || 0) || 0;
    const paidAmount = Number(dashboard?.todayData?.totalPayout || 0) || 0;
    const unpaidAmount = (lastTodayIncome - paidAmount || 0);


    console.log("dashboard", dashboard)
    return (
        <>
            <DashboardLayout>
                <div className="bg-white border  border-[0.5px] d-block d-md-none  mb-3 rounded p-3">
                    <div className=" d-flex gap-2">
                        {/* Profile Image */}
                        {profile?.profileImage ? (

                            <Image
                                src={profile?.profileImage ? profile?.profileImage : User16}
                                alt="User"
                                classes="rounded-circle border border-2"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
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
                                {getInitials(`${listing?.name}`)}

                            </div>
                        )}

                        {/* User Info */}
                        <div className="d-flex flex-column">
                            {/* Name */}
                            <span className="fs-6 fw-semibold text-dark text-capitalize">
                                {profile?.firstname && profile?.lastname
                                    ? `${profile?.firstname} ${profile.lastname}`
                                    : listing?.name}
                            </span>

                            {/* Email */}
                            <span className="text-muted text-captalize text-black">{listing?.email}</span>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">

                    <h2 className="admindasheading">Today Income</h2>
                    <div className="row justify-content-start">
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Today Receive Amount</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{(dashboard?.todayIncome || 0)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>GST Amount</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{Number(dashboard?.totalGSTAmount) || 0}</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Today Net Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>
                                            {(Number(dashboard?.todayIncome || 0))}
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #FF9A9E 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Today Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>
                                            {
                                                (dashboard?.todayIncome || 0) -
                                                (dashboard?.totalGSTAmount || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay_daily || 0) -
                                                (dashboard?.totalSum || 0) +
                                                (dashboard?.todayData?.totalWithdrawal || 0)
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Next Payout</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.totaluserIncome?.referred_user_pay || 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="admindasheading">Payout </h2>
                    <div className="row justify-content-start">

                        {/* Total Income Card */}
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div
                                className="card flex-fill"
                                style={{
                                    background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
                                    color: "#fff",
                                }}
                            >
                                <div className="card-body">
                                    <h5>Total Payout</h5>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <FaRupeeSign size={20} style={{ marginRight: "8px" }} />
                                        <h2>{lastTodayIncome}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Paid Amount Card */}
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div
                                className="card flex-fill"
                                style={{
                                    background: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
                                    color: "#fff",
                                }}
                            >
                                <div className="card-body">
                                    <h5>Paid Amount</h5>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <FaRupeeSign size={20} style={{ marginRight: "8px" }} />
                                        <h2>{paidAmount}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Unpaid Amount Card */}
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div
                                className="card flex-fill"
                                style={{
                                    background: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)",
                                    color: "#fff",
                                }}
                            >
                                <div className="card-body">
                                    <h5>Unpaid Amount</h5>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <FaRupeeSign size={20} style={{ marginRight: "8px" }} />
                                        <h2>{(unpaidAmount || 0)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 30%, #fad0c4 80%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5> Add Money</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.todayData?.totalAdd || 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5> widthrawal Money</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.todayData?.totalWithdrawal || 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 100%, #fad0c4 0%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5> OverAll Add Money</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.overallData?.totalAdd || 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Overall Widthrawal Money</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.overallData?.totalWithdrawal || 0}</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #84fab0 100%, #8fd3f4 0%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5> OverAll Payout</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{dashboard?.overallData?.totalPayout || 0}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="admindasheading ">Monthly Passive Income</h2>
                    <div className="row justify-content-start">
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>First User Passive Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{(dashboard?.overallPassiveIncome?.first_user_pay || 0)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Second User Month Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{(dashboard?.overallPassiveIncome?.second_user_pay || 0)}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #c6ffdd 0%, #fbd786 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Overall Passive Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>{(dashboard?.overallPassiveIncome?.second_user_pay || 0) + (dashboard?.overallPassiveIncome?.first_user_pay || 0)}</h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="admindasheading ">OverAll Income Management</h2>
                    <div className="row justify-content-start">
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>This Week Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>

                                            {(dashboard?.thisWeekIncome || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay_weekly || 0) -
                                                (dashboard?.totalUnpaid || 0) +
                                                (dashboard?.totalAmount?.InActivePercentageamount || 0) -
                                                (dashboard?.totalGSTAmount || 0) -
                                                (dashboard?.totalSumWeekly || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay || 0) +
                                                (dashboard?.weekData?.totalWithdrawal || 0)
                                            }
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>This Month Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>
                                            {
                                                (dashboard?.thisMonthIncome || 0) +
                                                (dashboard?.totalMonthUnpaid || 0) +
                                                (dashboard?.totalAmount?.InActivePercentageamount || 0) -
                                                (dashboard?.totalGSTAmount || 0) -
                                                (dashboard?.totalSumMonthpassive || 0) -
                                                (dashboard?.totalMonthrefral || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay || 0) +
                                                (dashboard?.monthData?.totalWithdrawal || 0)

                                            }</h2>


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #c6ffdd 0%, #fbd786 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Overall Income</h5>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaRupeeSign size={20} style={{ marginRight: '8px' }} />
                                        <h2>
                                            {(dashboard?.overallIncome || 0) +
                                                (dashboard?.totaluserIncome?.UnPaidAmounts || 0) +
                                                (dashboard?.totalAmount?.InActivePercentageamount || 0) -
                                                (dashboard?.totalGSTAmount || 0) -
                                                (dashboard?.overallPassiveIncome?.second_user_pay || 0) -
                                                (dashboard?.overallPassiveIncome?.first_user_pay || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay || 0) +
                                                (dashboard?.overallData?.totalWithdrawal || 0) -
                                                (dashboard?.totaluserIncome?.referred_user_pay_overall || 0)
                                            }
                                        </h2>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="admindasheading ">User Management</h2>
                    <div className="row justify-content-start">

                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Active User</h5>
                                    <h2>{dashboard?.active || 0}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Inactive User</h5>
                                    <h2>{dashboard?.inactive || 0}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Registered User</h5>
                                    <h2>{dashboard?.registered || 0}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Enrolled User</h5>
                                    <h2>{dashboard?.enrolled || 0}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 d-flex mb-2">
                            <div className="card flex-fill" style={{ background: "linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)", color: "#fff" }}>
                                <div className="card-body">
                                    <h5>Total User</h5>
                                    <h2>{dashboard?.totalusercount - 1 || 0}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>

    )
}

export default AdminDashboard
