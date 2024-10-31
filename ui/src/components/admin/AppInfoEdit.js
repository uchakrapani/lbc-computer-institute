import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams for getting the ID from URL

import { API_URLS } from '../../constants/apiConstants';

const AppInfoEdit = () => {
    const { id } = useParams(); // Get the app info ID from the URL parameters
    const [appInfo, setAppInfo] = useState({
        app_name: '',
        logo: '',
        description: '',
        favicon: '',
        social_network: [
            { platform: '', url: '' },
            { platform: '', url: '' },
            { platform: '', url: '' },
        ],
        status: 'active', // Default status
        admin_id: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppInfo = async () => {
            try {
                const response = await axios.get(`${API_URLS.APP_INFO_LIST}/${id}`); // Fetch existing app info by ID
                setAppInfo(response.data);
            } catch (err) {
                setError('Failed to fetch AppInfo');
            }
        };

        fetchAppInfo();
        
        // Set admin_id from session storage
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setAppInfo((prev) => ({ ...prev, admin_id: user._id }));
        }
    }, [id]); // Fetch data only when the ID changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('social_network')) {
            const index = parseInt(name.split('[')[1].split(']')[0]);
            const field = name.split('.')[1];
            const newSocialNetwork = [...appInfo.social_network];
            newSocialNetwork[index][field] = value;
            setAppInfo({ ...appInfo, social_network: newSocialNetwork });
        } else {
            setAppInfo({ ...appInfo, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`{APP_INFO_LIST}/${id}`, appInfo); // Send PUT request to update app info
            setMessage('AppInfo updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/appinfo'); // Redirect to app info list after successful update
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error updating AppInfo');
            setMessage('');
        }
    };

    return (
        <div className="container">
            <h2>Edit AppInfo</h2>
            <p className="text-muted">Update the details for the AppInfo record.</p>
            <hr />

            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">App Name</label>
                        <input
                            type="text"
                            name="app_name"
                            className="form-control"
                            value={appInfo.app_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col">
                        <label className="form-label">Logo URL</label>
                        <input
                            type="url"
                            name="logo"
                            className="form-control"
                            value={appInfo.logo}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={appInfo.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <label className="form-label">Favicon URL</label>
                        <input
                            type="url"
                            name="favicon"
                            className="form-control"
                            value={appInfo.favicon}
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
                            value={appInfo.admin_id} // Admin ID set from session storage
                            readOnly // Make it read-only
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={appInfo.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <h5>Social Networks</h5>
                {appInfo.social_network.map((social, index) => (
                    <div key={index} className="mb-3">
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Platform</label>
                                <input
                                    type="text"
                                    name={`social_network[${index}].platform`}
                                    className="form-control"
                                    value={social.platform}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col">
                                <label className="form-label">URL</label>
                                <input
                                    type="url"
                                    name={`social_network[${index}].url`}
                                    className="form-control"
                                    value={social.url}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">Update AppInfo</button>
                    <a href="/admin/appinfo" className="btn btn-secondary btn-sm">Back to AppInfo List</a>
                </div>
            </form>
        </div>
    );
};

export default AppInfoEdit;
