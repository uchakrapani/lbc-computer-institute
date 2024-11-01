import React from 'react';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from './Header';
import Footer from './Footer';
import DashboardContent from './DashboardContent';
import UpdatePassword from './UpdatePassword';
import AdminList from './AdminList';
import AdminCreate from './AdminCreate';
import AdminEdit from './AdminEdit';
import AppInfo from './AppInfo';
import AppInfoCreate from './AppInfoCreate';
import ProfileInfo from './ProfileInfo';
import AppInfoEdit from './AppInfoEdit';
import BranchesList from './BranchesList';
import BranchCreate from './BranchCreate';
import BranchEdit from './BranchEdit';
import DatabaseBackup from './DatabaseBackup';
import BannerCreate from './BannerCreate';
import BannersList from './BannersList';
import BannerEdit from './BannerEdit';
import CourseCreate from './CourseCreate';
import CourseList from './CourseList';
import CourseEdit from './CourseEdit';
import { faTachometerAlt, faUsers, faInfoCircle, faBuilding, faImage, faBookOpen, faDatabase } from "@fortawesome/free-solid-svg-icons";

const menuItems = [
    { to: "/admin/dashboard", icon: faTachometerAlt, label: "Dashboard" },
    { to: "/admin/admin-list", icon: faUsers, label: "Administrators" },
    { to: "/admin/appinfo", icon: faInfoCircle, label: "App Info" },
    { to: "/admin/branches-list", icon: faBuilding, label: "Branches" },
    { to: "/admin/banners-list", icon: faImage, label: "Banners" },
    { to: "/admin/courses-list", icon: faBookOpen, label: "Courses" },
    { to: "/admin/backup-db", icon: faDatabase, label: "Database Backup" },
];

const AdminDashboard = () => {
    const location = useLocation();

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <Header />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px', marginTop: '4rem' }}>
                {/* Main Content and Sidebar Wrapper */}
                <div style={{
                    display: 'flex',
                    flexDirection: window.innerWidth < 768 ? 'column' : 'row',  // Column layout for small screens
                    gap: '16px'
                }}>
                    {/* Left Content Section */}
                    <div style={{
                        flex: 5,  // Equivalent to md-10
                        padding: '16px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '8px',
                        height: '100%'
                    }}>
                        <main>
                            <Routes location={location}>
                                <Route path="/dashboard" element={<DashboardContent />} />
                                <Route path="/password-update" element={<UpdatePassword />} />
                                <Route path="/admin-list" element={<AdminList />} />
                                <Route path="/admin-create" element={<AdminCreate />} />
                                <Route path="/admin-edit/:id" element={<AdminEdit />} />
                                <Route path="/appinfo" element={<AppInfo />} />
                                <Route path="/appinfo-create" element={<AppInfoCreate />} />
                                <Route path="/profile/:id" element={<ProfileInfo />} />
                                <Route path="/appinfo-edit/:id" element={<AppInfoEdit />} />
                                <Route path="/branches-list" element={<BranchesList />} />
                                <Route path="/branches-create" element={<BranchCreate />} />
                                <Route path="/branches-edit/:id" element={<BranchEdit />} />
                                <Route path="/backup-db" element={<DatabaseBackup />} />
                                <Route path="/banners-list" element={<BannersList />} />
                                <Route path="/banners-create" element={<BannerCreate />} />
                                <Route path="/banners-edit/:id" element={<BannerEdit />} />
                                <Route path="/courses-list" element={<CourseList />} />
                                <Route path="/courses-create" element={<CourseCreate />} />
                                <Route path="/courses-edit/:id" element={<CourseEdit />} />
                            </Routes>
                        </main>
                    </div>

                    {/* Right Sidebar Section */}
                    <div style={{
                        flex: 1,  // Equivalent to md-2
                        backgroundColor: '#f1f5f9',
                        borderRadius: '8px',
                        padding: '16px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        display: 'flex',
                        flexDirection: 'column',
                        marginTop: window.innerWidth < 768 ? '16px' : '0'  // Spacing for smaller screens
                    }}>
                        <h5 style={{ marginBottom: '16px', color: '#3B82F6' }}>Quick Links</h5>
                        <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                            {menuItems.map((item, index) => (
                                <li key={index} style={{ marginBottom: '12px' }}>
                                    <Link to={item.to} style={{
                                        textDecoration: 'none',
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        transition: 'background-color 0.2s',
                                        fontSize: '16px'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e0e7ff'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                        <FontAwesomeIcon icon={item.icon} style={{ marginRight: '8px' }} />
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdminDashboard;
