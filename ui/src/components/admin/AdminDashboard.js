// AdminDashboard.js
import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
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

const AdminDashboard = () => {
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
            <div style={{ flex: 1 }}>
                <Header toggleSidebar={toggleSidebar} />
                <main style={{ padding: '16px' }}>
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
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default AdminDashboard;
