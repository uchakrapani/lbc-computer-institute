const express = require('express');
const ContactUs = require('../models/ContactUs');
const router = express.Router();

// Create a new ContactUs entry
router.post('/', async (req, res) => {
    try {
        const contactUs = new ContactUs(req.body);
        await contactUs.save();
        res.status(201).json(contactUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all ContactUs entries
router.get('/', async (req, res) => {
    try {
        const contactUsEntries = await ContactUs.find();
        res.json(contactUsEntries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update ContactUs entry
router.put('/:id', async (req, res) => {
    try {
        const contactUs = await ContactUs.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!contactUs) return res.status(404).send('ContactUs entry not found');
        res.json(contactUs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete ContactUs entry
router.delete('/:id', async (req, res) => {
    try {
        const contactUs = await ContactUs.findByIdAndDelete(req.params.id);
        if (!contactUs) return res.status(404).send('ContactUs entry not found');
        res.json({ message: 'ContactUs entry deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
