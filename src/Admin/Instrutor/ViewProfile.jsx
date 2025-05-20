import React, { useEffect, useState } from 'react'
import Listing from '../Api/Listing'
import { useParams } from 'react-router-dom'
import DashboardLayout from '../common/DashboardLayout'
import  User1 from '../../assert/user16.jpg'

const ViewProfile = () => {
    const { Id } = useParams();
    const [listing, setListing] = useState("");
    const [loading, setLoading] = useState(false);


    const ProfileData = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.InstrutorGetId(Id);
            setListing(response?.data?.data);
        } catch (error) {
            console.error("ProfileData error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (Id) {
            ProfileData(Id);
        }
    }, [Id]);

    const getInitials = (name) => {
        if (!name) return "?";
        const names = name.split(" ");
        const firstInitial = names[0]?.[0]?.toUpperCase() || "";
        const lastInitial = names[names.length - 1]?.[0]?.toUpperCase() || "";
        return `${firstInitial}${lastInitial}`;
    };
    return (
        <DashboardLayout>
            <div className="settings-widget card-details mb-0">
                <div className="settings-menu p-0">
                    <div className="profile-heading">
                        <h3>Instructor Profile</h3>
                    </div>
                    <div className="checkout-form personal-address">
                        <div className="row">
                            <div className='col-sm-3'>
                                {listing?.profileImage ? (
                                    <img
                                        src={listing?.profileImage || User1}
                                        alt="Instructor"
                                        className="img-fluid"
                                    />

                                ) : (

                                    <div
                                        className="flex items-center justify-center avatar-img"
                                        style={{
                                            backgroundColor: "#002058",
                                            borderRadius: "10%",
                                            color: "#ffffff",
                                            fontWeight: "bold",
                                            fontSize: "22px",
                                            width: '100px',
                                            height: '100px',
                                            display: "flex",
                                            marginBottom:"10px",
                                            padding: "34px"
                                        }}
                                    >
                                        {getInitials(listing?.firstName)}
                                    </div>
                                )}
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>First Name</h6>
                                    <p>{listing?.firstName}</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Last Name</h6>
                                    <p>{listing?.lastName}</p>

                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Phone Number</h6>
                                    <p>+91 {listing?.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="contact-info">
                                    <h6>Email</h6>
                                    <p>{listing?.email}</p>
                                </div>
                            </div>
                            
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Rating</h6>
                                    <p>{listing?.rating} </p>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Sales</h6>
                                    <p>{listing?.sales}</p>
                                </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Total Student</h6>
                                    <p>{listing?.students
                                    }</p>

                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6>Gender</h6>
                                    <p>{listing?.gender}</p>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6> Designation</h6>
                                    <p>{listing?.designation}</p>

                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="contact-info">
                                    <h6> Lessions
                                    </h6>
                                    <p>{listing?.lessions}</p>

                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="contact-info">
                                    <h6>Address</h6>
                                    <p>{listing?.address}</p>

                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="contact-info mb-0">
                                    <h6>Bio</h6>
                                    <p>
                                        {listing?.bio}
                                    </p>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="contact-info mb-0">
                                    <h6>Skill</h6>
                                    <p>
                                        {listing?.Skill}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>




    )
}

export default ViewProfile
