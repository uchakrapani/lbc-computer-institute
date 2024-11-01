import React, { useState, useEffect, useRef } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const userName = user ? user.full_name : "User";

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // Styles for the brand and header layout
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 30px", // Increased padding for more height
    background: "linear-gradient(90deg, #007bff, #00aaff)", // Gradient blue background
    color: "#ffffff", // White text for contrast
    position: "fixed", // Fixed position to stick at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    display: "flex",
    alignItems: "center",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "10px",
    color: "#f8f9fa", // Lighter text for brand title
  };

  const subtitleStyle = {
    margin: 0,
    fontSize: "16px",
    color: "#adb5bd", // Subtitle color
  };

  const welcomeStyle = {
    display: "flex",
    alignItems: "center",
  };

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>
        <FontAwesomeIcon icon={faBookOpen} size="2x" color="#f8f9fa" /> {/* Icon color matching the title */}
        <h2 style={titleStyle}>LastBenchCoder</h2>
      </div>
      <div style={welcomeStyle}>
        <span>Welcome, {userName}!</span>
        <div onClick={toggleDropdown} style={{ cursor: "pointer", marginLeft: "10px", color: "#f8f9fa" }}>
          <FontAwesomeIcon icon={faUser} size="lg" />
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        {dropdownOpen && (
          <div ref={dropdownRef} style={{
            position: "absolute", top: "80px", right: "30px", backgroundColor: "#ffffff",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", borderRadius: "4px", zIndex: 100
          }}>
            <ul style={{ listStyle: "none", margin: 0, padding: "8px 0" }}>
              <li>
                <Link to="/admin/password-update" style={dropdownItemStyle}>Update Password</Link>
              </li>
              <li>
                <Link to={`/admin/profile/${user ? user._id : ""}`} style={dropdownItemStyle}>Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} style={dropdownItemStyle}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

const dropdownItemStyle = {
  display: "block", padding: "8px 16px", textDecoration: "none", color: "#4B5563",
  backgroundColor: "#ffffff", // Background for dropdown items
  borderRadius: "4px", // Rounded corners
};

export default Header;
