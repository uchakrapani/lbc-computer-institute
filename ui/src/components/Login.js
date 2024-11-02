import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../constants/apiConstants'; // Import API constants

const Login = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(API_URLS.LOGIN, {
                login_id: loginId,
                password,
            });

            sessionStorage.setItem('user', JSON.stringify(response.data.admin));
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed! Please check your credentials.');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginTop: '50px' }}>
            <div style={{ flex: 1, padding: '20px' }}>
                <img 
                    src="/login.jpg" // Correctly referencing the image in the public folder
                    alt="Login Illustration"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px' }}
                />
            </div>
            <div style={{ flex: 1, padding: '20px' }}>
                <h2>Login to Your Account</h2>
                <p style={{ color: '#666' }}>
                    Please enter your credentials to access the admin dashboard.
                </p>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="card" style={{ padding: '20px' }}>
                    <form onSubmit={handleLogin}>
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
                        <button type="submit" className="btn btn-primary btn-sm w-100">
                            Login
                        </button>
                        <div className="mt-2 text-center">
                            <a href="/forgot-password" style={{ textDecoration: 'none', color: '#007bff' }}>
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
