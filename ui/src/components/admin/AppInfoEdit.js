import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card } from 'react-bootstrap';

const AppInfoEdit = () => {
    const { id } = useParams();
    const [appInfo, setAppInfo] = useState({
        app_name: '',
        description: '',
        logo_url: null,
        favicon_url: null,
        social_network: [
            { platform: '', url: '' },
        ],
        status: 'active',
        admin_id: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
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
            setSuccessMessage('AppInfo updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/appinfo');
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error updating AppInfo');
            setSuccessMessage('');
        }
    };

    return (
        <div className="container">
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="mb-4">Edit AppInfo</h2>
                    <p className="mb-4 text-muted">Update the details for the AppInfo record.</p>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit} className="row g-4">
                        <div className="col-md-6">
                            <label htmlFor="app_name" className="form-label">App Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="app_name"
                                name="app_name"
                                value={appInfo.app_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={appInfo.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="logo_url" className="form-label">Logo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="logo_url"
                                name="logo_url"
                                accept="image/*"
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
                        <div className="col-md-6">
                            <label htmlFor="favicon_url" className="form-label">Favicon</label>
                            <input
                                type="file"
                                className="form-control"
                                id="favicon_url"
                                name="favicon_url"
                                accept="image/*"
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
                        <div className="col-md-6">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                id="status"
                                name="status"
                                className="form-select"
                                value={appInfo.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                        <h5 className="mt-4">Social Networks</h5>
                        <div className="col-12">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Platform</th>
                                        <th>URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {appInfo.social_network.map((social, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name={`social_network[${index}].platform`}
                                                    value={social.platform}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="url"
                                                    className="form-control"
                                                    name={`social_network[${index}].url`}
                                                    value={social.url}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-12 d-flex justify-content-between mt-3">
                            <button type="submit" className="btn btn-primary btn-sm">Update AppInfo</button>
                            <a href="/admin/appinfo" className="btn btn-secondary btn-sm">Back to AppInfo List</a>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AppInfoEdit;
