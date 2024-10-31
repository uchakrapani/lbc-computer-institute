import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';

const BranchEdit = () => {
    const { id } = useParams(); // Get branch ID from URL params
    const [branch, setBranch] = useState({
        branch_name: '',
        address: '',
        phone: '',
        email: '',
        status: 'active',
        admin_id: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch branch data by ID when component mounts
    useEffect(() => {
        const fetchBranchData = async () => {
            try {
                const response = await axios.get(`${API_URLS.BRANCHES}/${id}`);
                setBranch(response.data);
            } catch (error) {
                setError('Failed to load branch data');
            }
        };
        fetchBranchData();
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBranch({ ...branch, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URLS.BRANCHES}/${id}`, branch);
            setMessage('Branch updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/branches-list');
            }, 2000);
        } catch (error) {
            setError('Error updating branch');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Branch</h2>
            <p className="text-muted">Update the details of this branch.</p>
            <hr />

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Branch Name</label>
                        <input
                            type="text"
                            name="branch_name"
                            className="form-control"
                            value={branch.branch_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Contact Number</label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            value={branch.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Address</label>
                    <textarea
                        name="address"
                        className="form-control"
                        value={branch.address}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={branch.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Status</label>
                        <select
                            name="status"
                            className="form-control"
                            value={branch.status}
                            onChange={handleChange}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">Update Branch</button>
                    <a href="/admin/branches-list" className="btn btn-secondary btn-sm">Back to Branch List</a>
                </div>
            </form>
        </div>
    );
};

export default BranchEdit;
