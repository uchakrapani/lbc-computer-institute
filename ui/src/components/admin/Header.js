import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCaretDown } from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook for programmatic navigation
  const dropdownRef = useRef(null); // Ref for the dropdown

  // Retrieve user info from session storage
  const user = JSON.parse(sessionStorage.getItem("user"));
  const userName = user ? user.full_name : "User"; // Default to 'User' if not found

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to login page
    navigate("/login"); // Change '/login' to your actual login route if different
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "64px",
          padding: "0 16px",
          borderBottom: "1px solid #E5E7EB",
        }}
      >
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
            height="1em"
            width="1em"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </button>

        {/* User Profile Dropdown with Welcome Message */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            Welcome, {userName}!
          </div>
          <div
            onClick={toggleDropdown}
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              gap: "8px",
            }}
          >
            {/* Rounded User Icon */}
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faUser}
                size="lg"
                style={{ color: "#4B5563" }}
              />
            </div>
            <FontAwesomeIcon
              icon={faCaretDown}
              size="lg"
              style={{ color: "#4B5563" }}
            />
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef} // Set ref to the dropdown
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "4px",
                zIndex: 100,
                transition: "opacity 0.3s ease",
              }}
            >
              <ul
                style={{ listStyleType: "none", padding: "8px 0", margin: "0" }}
              >
                <li>
                  <Link
                    to="/admin/password-update"
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      textDecoration: "none",
                      color: "#4B5563",
                    }}
                  >
                    Update Password
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/admin/profile/${user._id}`}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      textDecoration: "none",
                      color: "#4B5563",
                    }}
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "block",
                      padding: "8px 16px",
                      background: "none",
                      border: "none",
                      color: "#4B5563",
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      font: "inherit",
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
