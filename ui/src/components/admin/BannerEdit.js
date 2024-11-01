import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';

const BannerEdit = () => {
    const { id } = useParams(); // Get the banner ID from the URL
    const [bannerData, setBannerData] = useState({
        image: null,
        title: '',
        description: '',
        banner_url: '',
        status: 'active',
        admin_id: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setBannerData((prev) => ({ ...prev, admin_id: user._id }));
        }

        // Fetch the current banner data
        const fetchBannerData = async () => {
            try {
                const response = await axios.get(`${API_URLS.BANNERS}/${id}`);
                setBannerData(response.data);
                setImagePreview(response.data.image); // Assuming image URL is returned
            } catch (error) {
                setError(error.response ? error.response.data.message : 'Error fetching banner data');
            }
        };

        fetchBannerData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBannerData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { title } = bannerData;

        // Validate required fields
        if (!title) {
            setError('Title is required.');
            return;
        }

        const formData = new FormData();
        for (const key in bannerData) {
            formData.append(key, bannerData[key]);
        }

        try {
            await axios.put(`${API_URLS.BANNERS}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Banner updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/banners-list'); // Redirect to banners list
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error updating banner');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Banner</h2>
            <p className="text-muted">Update the details of the banner.</p>
            <hr />
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        value={bannerData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={bannerData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Banner Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="form-control"
                        onChange={handleFileChange}
                    />
                    {imagePreview && (
                        <div className="mt-3">
                            <img
                                src={imagePreview}
                                alt="Banner Preview"
                                style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Banner URL</label>
                    <input
                        type="url"
                        name="banner_url"
                        className="form-control"
                        value={bannerData.banner_url}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={bannerData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">Update Banner</button>
                    <a href="/admin/banners-list" className="btn btn-secondary btn-sm">Back to Banner List</a>
                </div>
            </form>
        </div>
    );
};

export default BannerEdit;
