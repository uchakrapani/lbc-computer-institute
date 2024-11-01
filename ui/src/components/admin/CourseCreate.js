import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URLS } from '../../constants/apiConstants';
import { Card, Form, Button, Alert } from 'react-bootstrap';

const CourseCreate = () => {
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

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        if (user) {
            setCourseData((prev) => ({ ...prev, admin_id: user._id }));
        }
    }, []);

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
        const { course_name, level, price, image } = courseData;

        // Validate required fields
        if (!course_name || !level || price === '') {
            setError('Course name, level, and price are required.');
            return;
        }

        const formData = new FormData();
        for (const key in courseData) {
            if (key === 'image' && image) {
                formData.append('banner', image);
            } else {
                formData.append(key, courseData[key]);
            }
        }

        try {
            await axios.post(API_URLS.COURSES, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Course created successfully!');
            setError('');
            setTimeout(() => {
                navigate('/admin/courses-list');
            }, 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error creating course');
            setMessage('');
        }
    };

    return (
        <div className="container">
            <Card className="shadow">
                <Card.Body>
                    <Card.Title>Create New Course</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Fill in the details to create a new course.
                    </Card.Subtitle>
                    <hr />
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Course Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="course_name"
                                value={courseData.course_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={courseData.description}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Duration</Form.Label>
                            <Form.Control
                                type="text"
                                name="duration"
                                value={courseData.duration}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control
                                type="file"
                                name="image"
                                accept="image/*"
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
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Level</Form.Label>
                            <Form.Control
                                type="text"
                                name="level"
                                value={courseData.level}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                value={courseData.price}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={courseData.status}
                                onChange={handleChange}
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </Form.Select>
                        </Form.Group>

                        <div className="d-flex justify-content-between mt-3">
                            <Button type="submit" variant="primary">Create Course</Button>
                            <Button variant="secondary" onClick={() => navigate('/admin/courses-list')}>Back to Course List</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CourseCreate;
