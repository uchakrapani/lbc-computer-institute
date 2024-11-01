import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card } from 'react-bootstrap';

const AdminEdit = () => {
    const { id } = useParams(); // Get the admin ID from the URL
    const navigate = useNavigate(); // For navigation after update
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

    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await axios.get(`${API_URLS.ADMIN_LIST}/${id}`);
                setFormData({
                    ...response.data,
                    login_id: response.data.email // Set login_id to be the email
                });
            } catch (error) {
                console.error('Error fetching admin data:', error);
                setError('Error fetching admin data.');
            }
        };

        fetchAdmin();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message

        try {
            await axios.put(`${API_URLS.ADMIN_LIST}/${id}`, formData);
            setSuccessMessage('Admin updated successfully.');
            setTimeout(() => {
                navigate('/admin/admin-list'); // Redirect to the admin list page after successful update
            }, 2000);
        } catch (err) {
            setError('Failed to update admin. Please try again.');
            console.error('Error updating admin:', err);
        }
    };

    return (
        <div className="container">
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="mb-4">Edit Admin</h2>
                    <p className="mb-4 text-muted">
                        Update the information for the administrator below. Ensure that all details are accurate before submitting.
                    </p>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
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
                            <button type="submit" className="btn btn-primary btn-sm">Update Admin</button>
                            <Link to="/admin/admin-list" className="btn btn-secondary btn-sm">Back to Admin List</Link>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdminEdit;
