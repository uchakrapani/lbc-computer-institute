import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';

const BranchCreate = () => {
    const [branch, setBranch] = useState({
        branch_name: '',
        address: '',
        phone: '',
        email: '',
        status: 'active',
        admin_id: '', // Admin ID will be set from session storage
        banner: null, // For storing the selected file
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [preview, setPreview] = useState(''); // For image preview
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setBranch((prev) => ({ ...prev, admin_id: user._id }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBranch({ ...branch, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBranch({ ...branch, banner: file });
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Append all branch data to formData
        for (const key in branch) {
            formData.append(key, branch[key]);
        }

        try {
            const response = await axios.post(`${API_URLS.BRANCHES}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Branch created successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/branches-list');
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error creating Branch');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Create Branch</h2>
            <p className="text-muted">Fill in the details to create a new branch.</p>
            <hr /> {/* Divider */}

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
                        <label className="form-label">Admin ID</label>
                        <input
                            type="text"
                            name="admin_id"
                            className="form-control"
                            value={branch.admin_id} // Admin ID set from session storage
                            readOnly // Make it read-only
                        />
                    </div>
                </div>

                {/* Banner Image Upload */}
                <div className="mb-3">
                    <label className="form-label">Banner Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {preview && (
                        <div className="mt-3">
                            <img src={preview} alt="Banner Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                        </div>
                    )}
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">Create Branch</button>
                    <a href="/admin/branches-list" className="btn btn-secondary btn-sm">Back to Branch List</a>
                </div>
            </form>
        </div>
    );
};

export default BranchCreate;
