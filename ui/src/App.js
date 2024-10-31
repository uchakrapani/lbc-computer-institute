// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import AdminDashboard from './components/admin/AdminDashboard';
import "bootstrap/dist/css/bootstrap.min.css";
import ProtectedRoute from './components/ProtectedRoute';
import 'font-awesome/css/font-awesome.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin/*" // Allow nested routes
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
