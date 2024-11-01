import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,       // Dashboard icon
  faUsers,          // Users icon
  faInfoCircle,     // Info icon
  faBuilding,       // Building icon for branches
  faImage,          // Image icon for banners
  faDatabase,       // Database icon for backup
} from "@fortawesome/free-solid-svg-icons";

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
          <FontAwesomeIcon icon={faChartPie} size="lg" style={{ color: "#4B5563" }} />
          LastBenchCoder
        </h2>
        <p style={{ fontSize: "14px", color: "#6B7280" }}>Your Education Partner</p>
      </div>

      {/* Navigation Links */}
      <nav>
        <ul style={{ listStyleType: "none", padding: "0" }}>
          <li>
            <Link to="/admin/dashboard" style={linkStyle}>
              <FontAwesomeIcon icon={faChartPie} style={{ marginRight: "8px" }} />
              Dashboard
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/admin/admin-list" style={linkStyle}>
              <FontAwesomeIcon icon={faUsers} style={{ marginRight: "8px" }} />
              Administrators
            </Link>
          </li>
          <li>
            <Link to="/admin/appinfo" style={linkStyle}>
              <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: "8px" }} />
              App Info
            </Link>
          </li>
          <li>
            <Link to="/admin/branches-list" style={linkStyle}>
              <FontAwesomeIcon icon={faBuilding} style={{ marginRight: "8px" }} />
              Branches
            </Link>
          </li>
          <li>
            <Link to="/admin/banners-list" style={linkStyle}>
              <FontAwesomeIcon icon={faImage} style={{ marginRight: "8px" }} />
              Banners
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/admin/backup-db" style={linkStyle}>
              <FontAwesomeIcon icon={faDatabase} style={{ marginRight: "8px" }} />
              Database Backup
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "#4B5563",
  display: "flex",
  alignItems: "center",
  padding: "8px 16px",
};

export default Sidebar;
