import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faTag,
  faCalendarAlt,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";

const WhyChooseUs = () => {
  return (
    <div className="container my-5">
      <div className="row mb-4">
        <div className="col text-center">
          <h2 className="font-weight-bold">WHY CHOOSE US</h2>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-sm-12 mb-4">
          <div className="main-card">
            <div className="sub-card text-center">
              <img
                src="/why.jpg" // Ensure this image is in the public folder
                alt="Why Choose Us"
                style={{
                  width: "100%",
                  maxHeight: "400px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)", // Added shadow for depth
                }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <div className="main-card p-4" style={{ border: '1px solid #e3e3e3', borderRadius: '8px' }}>
            <div className="content">
              <ol className="list-unstyled">
                <li className="mb-4">
                  <h3>
                    <FontAwesomeIcon icon={faBookOpen} className="mr-2" /> 
                    VARIETY COURSES
                  </h3>
                  <p>
                    We offer a diverse range of courses tailored to meet your educational needs.
                  </p>
                </li>
                <li className="mb-4">
                  <h3>
                    <FontAwesomeIcon icon={faTag} className="mr-2" /> 
                    ATTRACTIVE PRICES
                  </h3>
                  <p>
                    Our pricing is competitive and provides great value for quality education.
                  </p>
                </li>
                <li className="mb-4">
                  <h3>
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> 
                    EVENTS
                  </h3>
                  <p>
                    Join us for engaging events that enhance your learning experience.
                  </p>
                </li>
                <li className="mb-4">
                  <h3>
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" /> 
                    TALENTED TEACHERS
                  </h3>
                  <p>
                    Our educators are highly skilled and dedicated to your success.
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
