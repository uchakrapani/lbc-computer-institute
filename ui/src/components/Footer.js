import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { API_URLS } from '../constants/apiConstants';

const Footer = () => {
  const [appInfo, setAppInfo] = useState(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      try {
        const response = await fetch(
         `${API_URLS.APP_INFO_LIST}/active`
        );
        const data = await response.json();
        // Assuming the API returns an array and we want the first item
        if (data.length > 0) {
          setAppInfo(data[0]);
        }
      } catch (error) {
        console.error("Error fetching app info:", error);
      }
    };

    fetchAppInfo();
  }, []);

  const footerStyle = {
    backgroundColor: "#282c34",
    color: "#ffffff",
    padding: "20px 0",
    borderTop: "2px solid #007bff", // Distinct border
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
  };

  const headingStyle = {
    marginBottom: "15px",
    fontWeight: "bold",
  };

  const quickLinksStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const quickLinkItemStyle = {
    margin: "10px 0",
  };

  const quickLinkStyle = {
    color: "#ffffff",
    textDecoration: "none",
  };

  const socialLinksStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  };

  const socialLinkStyle = {
    color: "#ffffff",
    fontSize: "20px",
  };

  // Map social platforms to their corresponding icon components
  const platformIcons = {
    facebook: <FaFacebookF />,
    twitter: <FaTwitter />,
    instagram: <FaInstagram />,
    linkedin: <FaLinkedinIn />,
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <Row style={{ paddingTop: "20px" }}>
          <Col md={4} className="text-center">
            {appInfo && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={appInfo.logo_url}
                  alt={appInfo.app_name}
                  style={{
                    width: "50px",
                    height: "50px",
                    marginBottom: "10px",
                  }} // Logo size
                />
                <h5 style={headingStyle}>{appInfo.app_name}</h5>
                <p style={{ textAlign: "center" }}>{appInfo.description}</p>
              </div>
            )}
          </Col>

          <Col md={4} className="text-center">
            <h5 style={headingStyle}>Quick Links</h5>
            <ul style={quickLinksStyle}>
              <li style={quickLinkItemStyle}>
                <Link to="/about" style={quickLinkStyle}>
                  About Us
                </Link>
              </li>
              <li style={quickLinkItemStyle}>
                <Link to="/courses" style={quickLinkStyle}>
                  Courses
                </Link>
              </li>
              <li style={quickLinkItemStyle}>
                <Link to="/contact" style={quickLinkStyle}>
                  Contact
                </Link>
              </li>
              <li style={quickLinkItemStyle}>
                <Link to="/faq" style={quickLinkStyle}>
                  FAQ
                </Link>
              </li>
              <li style={quickLinkItemStyle}>
                <Link to="/home/login" style={quickLinkStyle}>
                  Login
                </Link>
              </li>
            </ul>
          </Col>
          <Col md={4} className="text-center">
            <h5 style={headingStyle}>Follow Us</h5>
            <div style={socialLinksStyle}>
              {appInfo &&
                appInfo.social_network &&
                appInfo.social_network.map((social) => {
                  const parsedSocial = JSON.parse(social);
                  return parsedSocial.map((platform) =>
                    platformIcons[platform.platform] ? (
                      <a
                        key={platform.platform}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={socialLinkStyle}
                      >
                        {platformIcons[platform.platform]}
                      </a>
                    ) : null
                  );
                })}
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
