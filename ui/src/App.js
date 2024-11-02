// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/admin/AdminDashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from './components/ProtectedRoute';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/home/*" element={<LandingPage />} /> {/* Handle nested routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/" element={<LandingPage />} /> {/* Redirect to LandingPage */}
            </Routes>
        </Router>
    );
};

export default App;
