import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card } from 'react-bootstrap';

const AdminCreate = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        phone: '',
        login_id: '',
        password: '',
        role: 'read',
        status: 'inactive',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message

        try {
            await axios.post(API_URLS.ADMIN_LIST, {
                ...formData,
                login_id: formData.email, // Set login_id to be the email
            });
            setSuccessMessage('Admin created successfully!');
            setTimeout(() => {
                navigate('/admin/admin-list'); // Redirect after displaying success message
            }, 2000); // Redirect after 2 seconds to allow user to see the message
        } catch (err) {
            setError('Failed to create admin. Please try again.');
            console.error('Error creating admin:', err);
        }
    };

    return (
        <div className="container">
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="mb-4">Create New Admin</h2>
                    <p className="mb-4 text-muted">
                        Fill out the form below to create a new administrator. Ensure that all details are correct before submitting.
                    </p>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit} className="row g-4">
                        <div className="col-md-6">
                            <label htmlFor="full_name" className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                className="form-select"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="read">Read</option>
                                <option value="read_write">Read & Write</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                className="form-select"
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary btn-sm">Create Admin</button>
                            <a href="/admin/admin-list" className="btn btn-secondary btn-sm">Back to Admin List</a>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminCreate;
