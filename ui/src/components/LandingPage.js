// src/components/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login'); // Use navigate instead of history.push
    };

    return (
        <div className="container text-center mt-5">
            <h1>Welcome to the Admin Portal</h1>
            <button className="btn btn-primary mt-3" onClick={handleLoginClick}>
                Login
            </button>
        </div>
    );
};

export default LandingPage;
