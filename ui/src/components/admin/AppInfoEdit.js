import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';

const AppInfoEdit = () => {
    const { id } = useParams();
    const [appInfo, setAppInfo] = useState({
        app_name: '',
        logo_url: '', // Adjusted for the API response
        description: '',
        favicon_url: '', // Adjusted for the API response
        social_network: [
            { platform: '', url: '' },
        ],
        status: 'active',
        admin_id: '',
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [logoPreview, setLogoPreview] = useState('');
    const [faviconPreview, setFaviconPreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppInfo = async () => {
            try {
                const response = await axios.get(`${API_URLS.APP_INFO_LIST}/${id}`);
                const data = response.data;

                // Parse the social_network string into an array
                const socialNetworks = JSON.parse(data.social_network[0]);

                // Set the app info with parsed social networks
                setAppInfo({
                    ...data,
                    social_network: socialNetworks,
                });

                // Set previews for logo and favicon
                setLogoPreview(data.logo_url);
                setFaviconPreview(data.favicon_url);
            } catch (err) {
                setError('Failed to fetch AppInfo');
            }
        };

        fetchAppInfo();

        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setAppInfo((prev) => ({ ...prev, admin_id: user._id }));
        }
    }, [id]);

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

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (name === 'logo_url') {
            setAppInfo({ ...appInfo, logo_url: file });
            setLogoPreview(URL.createObjectURL(file));
        } else if (name === 'favicon_url') {
            setAppInfo({ ...appInfo, favicon_url: file });
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (const key in appInfo) {
            if (Array.isArray(appInfo[key])) {
                formData.append(key, JSON.stringify(appInfo[key]));
            } else {
                formData.append(key, appInfo[key]);
            }
        }

        try {
            await axios.put(`${API_URLS.APP_INFO_LIST}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('AppInfo updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/appinfo');
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

                {/* Logo Upload */}
                <div className="mb-3">
                    <label className="form-label">Logo</label>
                    <input
                        type="file"
                        name="logo_url"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {logoPreview && (
                        <div className="mt-3">
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>

                {/* Favicon Upload */}
                <div className="mb-3">
                    <label className="form-label">Favicon</label>
                    <input
                        type="file"
                        name="favicon_url"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {faviconPreview && (
                        <div className="mt-3">
                            <img
                                src={faviconPreview}
                                alt="Favicon Preview"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
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
