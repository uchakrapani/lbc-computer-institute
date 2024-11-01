const express = require('express');
const multer = require('multer');
const path = require('path');
const Branch = require('../models/Branch');
const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images'); // Save files to 'images' directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filename
    },
});

// Initialize multer
const upload = multer({ storage });

// Create a new Branch with file upload
router.post('/', upload.single('banner'), async (req, res) => {
    try {
        const branchData = req.body;

        // If a file was uploaded, save the URL to the banner_url field
        if (req.file) {
            branchData.banner_url = req.file.path; // Save the file path
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
            branchData.banner_url = req.file.path; // Save the new file path
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
