const express = require('express');
const Banner = require('../models/Banner');
const router = express.Router();

// Create a new Banner
router.post('/', async (req, res) => {
    try {
        const banner = new Banner(req.body);
        await banner.save();
        res.status(201).json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Banners
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Banner
router.put('/:id', async (req, res) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!banner) return res.status(404).send('Banner not found');
        res.json(banner);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) return res.status(404).send('Banner not found');
        res.json({ message: 'Banner deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
