import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";

import { Link } from "react-router-dom";  // For the "Link" component
import  play  from "../../assert/play.svg";

const CourseContent = ({ courseDetails }) => {
  const [openIndex, setOpenIndex] = useState(null);

  // Function to handle the toggle behavior for each lecture
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {courseDetails?.lectureFiles?.length === 0 ? (<> </>) : (
        <div className="card content-sec mt-3">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-6">
                <h5 className="subs-title">Course Content</h5>
              </div>
              <div className="col-sm-6 text-sm-end">
                <h6>{courseDetails?.lectureFiles?.length} Lectures</h6>
              </div>
            </div>

            <Accordion>
              {courseDetails?.lectureFiles?.map((lecture, index) => (
                <Accordion.Item eventKey={index.toString()} key={index}>
                  <Accordion.Header>
                    <h6 className="">
                      <Link
                        className="collapsed"
                        data-bs-toggle="collapse"
                        to="#"
                        onClick={() => handleToggle(index)}
                        aria-expanded={openIndex === index}
                        aria-controls={`collapse-${index}`}
                      >
                        {lecture?.title}
                      </Link>
                    </h6>
                  </Accordion.Header>
                  <Accordion.Body>
                    {/* Subtitles for the clicked lecture */}
                    <ul>
                      {lecture?.subtitles?.map((subtitle, subIndex) => (
                        <li key={subIndex}>
                          <p>
                            <img src={play} alt="" className="me-2" />
                            {subtitle?.subtitle}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      )}</>

  );
};

export default CourseContent;
