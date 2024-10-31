import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_URLS } from '../constants/apiConstants'; // Import API constants

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message before each login attempt

        try {
            const response = await axios.post(API_URLS.LOGIN, {
                login_id: loginId,
                password,
            });

            // Store user data in session storage
            sessionStorage.setItem('user', JSON.stringify(response.data.admin)); // Save only the admin data

            // Redirect to admin dashboard
            navigate('/admin/dashboard'); // Adjust path as needed
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed! Please check your credentials.'); // Set error message
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Login to Your Account</h2>
            <p className="text-muted mb-4 text-center">
                Please enter your credentials to access the admin dashboard.
            </p>
            {error && <div className="alert alert-danger text-center">{error}</div>} {/* Display error message */}
            <form onSubmit={handleLogin} className="w-50 mx-auto">
                <div className="mb-3">
                    <label className="form-label">Login ID</label>
                    <input
                        type="text"
                        className="form-control"
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
