// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem('user'); // Check if user data exists in session storage

    return user ? children : <Navigate to="/login" />; // Redirect to login if not logged in
};

export default ProtectedRoute;
