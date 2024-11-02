const express = require('express');
const multer = require('multer');
const axios = require('axios');
const AppInfo = require('../models/AppInfo'); // Make sure this path is correct
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

// Create new AppInfo with logo and favicon uploads
router.post('/', upload.fields([{ name: 'logo_url' }, { name: 'favicon_url' }]), async (req, res) => {
    try {
        const appInfoData = req.body;

        // Upload logo if provided
        if (req.files.logo_url) {
            const logoUrl = await uploadToImgur(req.files.logo_url[0].buffer);
            appInfoData.logo_url = logoUrl; // Save the Imgur URL
        }

        // Upload favicon if provided
        if (req.files.favicon_url) {
            const faviconUrl = await uploadToImgur(req.files.favicon_url[0].buffer);
            appInfoData.favicon_url = faviconUrl; // Save the Imgur URL
        }

        const appInfo = new AppInfo(appInfoData);
        await appInfo.save();
        res.status(201).json(appInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all active AppInfo records
router.get('/active', async (req, res) => {
    try {
        const activeAppInfoList = await AppInfo.find({ status: 'active' }); // Filter by active status
        res.json(activeAppInfoList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all AppInfo records
router.get('/', async (req, res) => {
    try {
        const appInfoList = await AppInfo.find();
        res.json(appInfoList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get AppInfo by ID
router.get('/:id', async (req, res) => {
    try {
        const appInfo = await AppInfo.findById(req.params.id);
        if (!appInfo) return res.status(404).send('AppInfo not found');
        res.json(appInfo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update AppInfo with logo and favicon uploads
router.put('/:id', upload.fields([{ name: 'logo' }, { name: 'favicon' }]), async (req, res) => {
    try {
        const appInfoData = req.body;

        // Upload logo if a new file was uploaded
        if (req.files.logo) {
            const logoUrl = await uploadToImgur(req.files.logo[0].buffer);
            appInfoData.logo_url = logoUrl; // Update logo URL
        }

        // Upload favicon if a new file was uploaded
        if (req.files.favicon) {
            const faviconUrl = await uploadToImgur(req.files.favicon[0].buffer);
            appInfoData.favicon_url = faviconUrl; // Update favicon URL
        }

        const appInfo = await AppInfo.findByIdAndUpdate(req.params.id, appInfoData, { new: true });
        if (!appInfo) return res.status(404).send('AppInfo not found');
        res.json(appInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete AppInfo
router.delete('/:id', async (req, res) => {
    try {
        const appInfo = await AppInfo.findByIdAndDelete(req.params.id);
        if (!appInfo) return res.status(404).send('AppInfo not found');
        res.json({ message: 'AppInfo deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
