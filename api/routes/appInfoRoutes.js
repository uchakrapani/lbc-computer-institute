const express = require('express');
const AppInfo = require('../models/AppInfo');
const router = express.Router();

// Create new AppInfo
router.post('/', async (req, res) => {
    try {
        const { status } = req.body;

        // If status is active, set all existing app info entries to inactive
        if (status === 'active') {
            await AppInfo.updateMany({}, { status: 'inactive' });
        }

        const appInfo = new AppInfo(req.body);
        await appInfo.save();
        res.status(201).json(appInfo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all AppInfo
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

// Update AppInfo
router.put('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        // If status is active, set all existing app info entries to inactive
        if (status === 'active') {
            await AppInfo.updateMany({}, { status: 'inactive' });
        }

        const appInfo = await AppInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
