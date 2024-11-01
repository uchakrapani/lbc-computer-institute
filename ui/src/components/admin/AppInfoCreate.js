import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card } from 'react-bootstrap';

const AppInfoCreate = () => {
    const [formData, setFormData] = useState({
        app_name: '',
        description: '',
        logo_url: null,
        favicon_url: null,
        social_network: [
            { platform: '', url: '' },
            { platform: '', url: '' },
            { platform: '', url: '' },
            { platform: '', url: '' },
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
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setFormData((prev) => ({ ...prev, admin_id: user._id }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name.startsWith('social_network')) {
            const index = parseInt(name.split('[')[1].split(']')[0]);
            const field = name.split('.')[1];
            const newSocialNetwork = [...formData.social_network];
            newSocialNetwork[index][field] = value;
            setFormData({ ...formData, social_network: newSocialNetwork });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (name === 'logo_url') {
            setFormData({ ...formData, logo_url: file });
            setLogoPreview(URL.createObjectURL(file));
        } else if (name === 'favicon_url') {
            setFormData({ ...formData, favicon_url: file });
            setFaviconPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccessMessage(''); // Reset success message

        const formDataToSend = new FormData();

        for (const key in formData) {
            if (Array.isArray(formData[key])) {
                formDataToSend.append(key, JSON.stringify(formData[key]));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }

        try {
            await axios.post(API_URLS.APP_INFO_LIST, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccessMessage('AppInfo created successfully!');
            setTimeout(() => {
                navigate('/admin/appinfo'); // Redirect after displaying success message
            }, 2000); // Redirect after 2 seconds to allow user to see the message
        } catch (err) {
            setError('Failed to create AppInfo. Please try again.');
            console.error('Error creating AppInfo:', err);
        }
    };

    return (
        <div className="container">
            <Card className="mb-4">
                <Card.Body>
                    <h2 className="mb-4">Create New AppInfo</h2>
                    <p className="mb-4 text-muted">
                        Fill out the form below to create a new application information entry. Ensure that all details are correct before submitting.
                    </p>
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
                                value={formData.app_name}
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
                                value={formData.description}
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
                                    {formData.social_network.map((social, index) => (
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
                            <button type="submit" className="btn btn-primary btn-sm">Create AppInfo</button>
                            <a href="/admin/appinfo" className="btn btn-secondary btn-sm">Back to AppInfo List</a>
                        </div>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AppInfoCreate;
