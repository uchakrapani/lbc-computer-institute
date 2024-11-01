import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faInfoCircle, faBuilding, faImage, faBookOpen, faDatabase } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { to: "/admin/dashboard", icon: faTachometerAlt, label: "Dashboard" },
        { to: "/admin/admin-list", icon: faUsers, label: "Administrators" },
        { to: "/admin/appinfo", icon: faInfoCircle, label: "App Info" },
        { to: "/admin/branches-list", icon: faBuilding, label: "Branches" },
        { to: "/admin/banners-list", icon: faImage, label: "Banners" },
        { to: "/admin/courses-list", icon: faBookOpen, label: "Courses" },
        { to: "/admin/backup-db", icon: faDatabase, label: "Database Backup" },
    ];

    const sidebarStyle = {
        display: isOpen ? 'block' : 'none',
        width: '100%',
        backgroundColor: '#343a40',
        color: '#ffffff',
        padding: '16px',
        transition: 'max-height 0.3s ease',
        maxHeight: isOpen ? '500px' : '0',
        overflow: isOpen ? 'visible' : 'hidden'
    };

    return (
        <aside style={sidebarStyle}>
            {menuItems.map((item) => (
                <Link
                    key={item.label}
                    to={item.to}
                    style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 15px',
                        borderRadius: '4px',
                        margin: '5px 0'
                    }}
                >
                    <FontAwesomeIcon icon={item.icon} style={{ marginRight: '10px' }} />
                    {item.label}
                </Link>
            ))}
        </aside>
    );
};

export default Sidebar;
