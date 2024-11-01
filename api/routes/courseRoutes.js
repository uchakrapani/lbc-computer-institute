const express = require('express');
const multer = require('multer');
const axios = require('axios');
const Course = require('../models/Course');
const router = express.Router();

// Initialize multer for image uploads using memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Function to upload image to Imgur with retry logic
const uploadToImgur = async (imageBuffer, retries = 3) => {
    const url = 'https://api.imgur.com/3/image';
    const headers = {
        Authorization: `Client-ID 8df89b88143b303`, // Replace with your Imgur Client ID
        'Content-Type': 'application/json',
    };

    const formData = {
        image: imageBuffer.toString('base64'), // Convert buffer to base64
    };

    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.post(url, formData, { headers });
            return response.data.data.link; // Return the URL of the uploaded image
        } catch (error) {
            if (error.response && error.response.status !== 503) {
                throw new Error('Error uploading to Imgur: ' + error.message);
            }
            console.log(`Retrying... (${i + 1}/${retries})`);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait before retrying
        }
    }
    throw new Error('Failed to upload image after multiple retries.');
};

// Create a new Course with optional image upload to Imgur
router.post('/', upload.single('banner'), async (req, res) => {
    try {
        const courseData = req.body;

        // If a file was uploaded, upload to Imgur
        if (req.file) {
            const imgurUrl = await uploadToImgur(req.file.buffer); // Upload image and get URL
            courseData.banner_url = imgurUrl; // Save the Imgur URL
        }

        const course = new Course(courseData);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Course by ID
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Course
router.put('/:id', upload.single('banner'), async (req, res) => {
    try {
        const courseData = req.body;

        // If a new file was uploaded, update the image field
        if (req.file) {
            const imgurUrl = await uploadToImgur(req.file.buffer); // Upload image and get URL
            courseData.banner_url = imgurUrl; // Save the new Imgur URL
        }

        const course = await Course.findByIdAndUpdate(req.params.id, courseData, { new: true });
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Course
router.delete('/:id', async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        res.json({ message: 'Course deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
