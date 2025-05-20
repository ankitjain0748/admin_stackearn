import React, { useEffect, useState } from 'react';
import Header from '../header';
import { Footer4 } from '../footer4';
import Listing from '../Api/Listing';
import moment from "moment";
import VideoModal from '../student/studentCourses/VideoModal';
import EventModal from './EventModal';
import HeadingPage from '../CommonCompontes/HeadingPage';
import { ComeSoon } from '../imagepath';

const EventsSection = () => {
    const [seconds, setSeconds] = useState(2);
    const [minutes, setMinutes] = useState(2);
    const [hours, setHours] = useState(2);
    const [days, setDays] = useState(4);
    const [timeDone, setDone] = useState(false);
    const [proessing, setProeesing] = useState(false);

    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState([]);
    const [videoLink, setVideoLink] = useState("");
    const [thumbnail, setThumbnail] = useState("")

    useEffect(() => {
        const timer = setInterval(() => {
            if (seconds > 0) setSeconds(seconds - 1);
            else {
                setSeconds(59);
                if (minutes > 0) setMinutes(minutes - 1);
                else {
                    setMinutes(59);
                    if (hours > 0) setHours(hours - 1);
                    else {
                        setHours(23);
                        if (days > 0) setDays(days - 1);
                        else setDone(true);
                    }
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [seconds, minutes, hours, days]);

    const fechwebniar = async () => {
        setLoading(true);
        try {
            const main = new Listing();
            const response = await main.webniardata();
            const fetchedListing = response?.data?.data?.Courseget || [];
            setListing(fetchedListing);
            if (fetchedListing.length > 0) setVideoLink(fetchedListing[0].video);
            if (fetchedListing.length > 0) setThumbnail(fetchedListing[0].thumbnail);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };



    const handleVideoClick = (event) => {
        setVideoLink(event);
    };

    const handleEventClick = (event) => {
        setThumbnail(event);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleString('default', { month: 'short' }),
            year: date.getFullYear(),
        };
    };

useEffect(() => {
    if(proessing === false){
        fechwebniar();
        setProeesing(true);
    }
    }, [proessing]);

    return (
        <div className="main-wrapper">
            <Header activeMenu="Support" />
            {listing.length === 0 ? (
                <div className='data-manage'>
                    <div className="error-box mt-5 text-center">
                        <h4 className="text-primary fw-bold">WE ARE COMING SOON!!</h4>
                        <h6>Stay tuned for something amazing</h6>
                        <div className="d-flex flex-wrap gap-3 mt-3 justify-content-center">
                            {[{ label: 'Days', value: days }, { label: 'Hrs', value: hours }, { label: 'Mins', value: minutes }, { label: 'Secs', value: seconds }].map((item, index) => (
                                <div className="countdown-el" key={index}>
                                    <p className="big-text">{item.value}</p>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <img src={ComeSoon} alt="Coming Soon" className="img-fluid my-4" />
                    </div>
                </div>

            ) : (
                <div className="page-content">
                    <HeadingPage title="Join our Upcoming Events" />
                    <section className="events section-padding  mb-5">
                        <div className="container ">
                            <div className="row g-4">
                                <div className="col-12 col-lg-8 mt-4 mb-3">
                                    <div className="event-list">
                                        {listing.map((event, index) => {
                                            const { day, month, year } = formatDate(event.webnair_date || event.createdAt);
                                            return (
                                                <div className="event-item mb-5" key={index} onClick={() => handleVideoClick(event?.video)}>
                                                    <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between p-3 bg-white border rounded gap-3" onClick={() => handleEventClick(event?.thumbnail)}>
                                                        <div className="d-flex flex-column align-items-center border-end pe-2">
                                                            <div className="date evlb border border-dashed border-primary p-3 rounded-circle">
                                                                <div className="day text-primary p-1 fw-bold fs-4">{day}</div>
                                                            </div>
                                                            <div className="myear text-primary-custom fs-4 text-uppercase mt-2">
                                                                <span style={{ fontSize: "11px" }}>{month} - {year}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ev-content flex-grow-1 border-end pe-4">
                                                            <h4 className="fs-5 fw-semibold text-center data-color line-clamp-2">
                                                                <a href={event.link} className="text-decoration-none data-color hover-text-primary text-break">
                                                                    {event.title}
                                                                </a>
                                                            </h4>
                                                            <div className="evtime-loc d-flex flex-column flex-md-row justify-content-center align-items-center gap-2 mt-2 text-muted">
                                                                <span className="d-flex align-items-center">
                                                                    <i className="fa-regular fa-clock me-2 text-primary"></i>
                                                                    {event.webnair_time ? moment(event.webnair_time, "HH:mm").format("hh:mm A") : "Invalid Time"} -
                                                                    {event.webniar_end_time ? moment(event.webniar_end_time, "HH:mm").format("hh:mm A") : "Invalid Time"}
                                                                </span>
                                                                <span className="d-flex align-items-center">
                                                                    <i className="fa-solid fa-map-location-dot me-2 text-primary"></i>
                                                                    {event.place}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="text-end">
                                                            <EventModal Id={event?._id} />
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="col-12 col-lg-4">
                                    <VideoModal videoLink={videoLink} thumbnail={thumbnail} />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}
            <Footer4 />
        </div>
    );
};

export default EventsSection;
