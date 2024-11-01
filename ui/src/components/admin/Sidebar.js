import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faTachometerAlt,
  faUsers,
  faInfoCircle,
  faBuilding,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons"; // Added faDatabase

const Sidebar = ({ toggleSidebar }) => {
  return (
    <aside
      style={{
        width: "250px",
        backgroundColor: "#F8FAFC",
        height: "100vh",
        padding: "16px",
        position: "relative",
      }}
    >
      {/* Brand Info */}
      <div style={{ marginBottom: "24px", textAlign: "center" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <FontAwesomeIcon
            icon={faMoneyBill}
            size="lg"
            style={{ color: "#4B5563" }}
          />
          LastBenchCoder
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>
          Your Education partner
        </p>
      </div>
      {/* Navigation Links */}
      <nav>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            <Link
              to="/admin/dashboard"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon
                icon={faTachometerAlt}
                style={{ marginRight: "8px" }}
              />
              Dashboard
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/admin/admin-list"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "8px" }} />
              Administrators
            </Link>
          </li>
          <li>
            <Link
              to="/admin/appinfo"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon
                icon={faInfoCircle}
                style={{ marginRight: "8px" }}
              />
              App Info
            </Link>
          </li>
          <li>
            <Link
              to="/admin/branches-list"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon
                icon={faBuilding}
                style={{ marginRight: "8px" }}
              />
              Branches
            </Link>
          </li>
          <li>
            <Link
              to="/admin/banners-list"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon
                icon={faBuilding}
                style={{ marginRight: "8px" }}
              />
              Banners
            </Link>
          </li>
          <hr />
          <li>
            <Link
              to="/admin/backup-db"
              style={{
                textDecoration: "none",
                color: "#4B5563",
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <FontAwesomeIcon
                icon={faDatabase}
                style={{ marginRight: "8px" }}
              />
              Database Backup
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
