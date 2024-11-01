const express = require('express');
const multer = require('multer');
const axios = require('axios');
const Branch = require('../models/Branch');
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

// Create a new Branch with file upload to Imgur
router.post('/', upload.single('banner'), async (req, res) => {
    try {
        const branchData = req.body;

        // If a file was uploaded, upload to Imgur
        if (req.file) {
            const imgurUrl = await uploadToImgur(req.file.buffer); // Upload image and get URL
            branchData.banner_url = imgurUrl; // Save the Imgur URL
        }

        const branch = new Branch(branchData);
        await branch.save();
        res.status(201).json(branch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Branches
router.get('/', async (req, res) => {
    try {
        const branches = await Branch.find();
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Branch by ID
router.get('/:id', async (req, res) => {
    try {
        const branch = await Branch.findById(req.params.id);
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Branch
router.put('/:id', upload.single('banner'), async (req, res) => {
    try {
        const branchData = req.body;

        // If a new file was uploaded, update the banner_url field
        if (req.file) {
            const imgurUrl = await uploadToImgur(req.file.buffer); // Upload image and get URL
            branchData.banner_url = imgurUrl; // Save the new Imgur URL
        }

        const branch = await Branch.findByIdAndUpdate(req.params.id, branchData, { new: true });
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json(branch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Branch
router.delete('/:id', async (req, res) => {
    try {
        const branch = await Branch.findByIdAndDelete(req.params.id);
        if (!branch) return res.status(404).json({ message: 'Branch not found' });
        res.json({ message: 'Branch deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
