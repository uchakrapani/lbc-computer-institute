import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';

const CourseEdit = () => {
    const [courseData, setCourseData] = useState({
        course_name: '',
        description: '',
        duration: '',
        banner_url: '',
        level: '',
        price: '',
        status: 'active',
        admin_id: '',
        image: null,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();
    const { id } = useParams(); // Get the course ID from the URL

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get(`${API_URLS.COURSES}/${id}`);
                setCourseData(response.data);
                setImagePreview(response.data.banner_url); // Set preview from existing banner_url
            } catch (error) {
                console.error('Error fetching course data:', error);
                setError('Failed to load course data.');
            }
        };

        fetchCourseData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCourseData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file)); // Set image preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { course_name, level, price } = courseData;

        // Validate required fields
        if (!course_name || !level || price === '') {
            setError('Course name, level, and price are required.');
            return;
        }

        const formData = new FormData();
        for (const key in courseData) {
            if (key === 'image' && courseData.image) {
                formData.append('banner', courseData.image);
            } else {
                formData.append(key, courseData[key]);
            }
        }

        try {
            await axios.put(`${API_URLS.COURSES}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Course updated successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/courses-list');
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error updating course');
            setMessage('');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Edit Course</h2>
            <p className="text-muted">Update the details of the course.</p>
            <hr />
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Course Name</label>
                    <input
                        type="text"
                        name="course_name"
                        className="form-control"
                        value={courseData.course_name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        name="description"
                        className="form-control"
                        value={courseData.description}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Duration</label>
                    <input
                        type="text"
                        name="duration"
                        className="form-control"
                        value={courseData.duration}
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
                    <label className="form-label">Level</label>
                    <input
                        type="text"
                        name="level"
                        className="form-control"
                        value={courseData.level}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={courseData.price}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                        name="status"
                        className="form-select"
                        value={courseData.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="col-12 d-flex justify-content-between mt-3">
                    <button type="submit" className="btn btn-primary btn-sm">Update Course</button>
                    <a href="/admin/courses-list" className="btn btn-secondary btn-sm">Back to Course List</a>
                </div>
            </form>
        </div>
    );
};

export default CourseEdit;