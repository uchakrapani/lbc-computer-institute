const express = require('express');
const Complaint = require('../models/Complaint');
const router = express.Router();

// Create a new Complaint
router.post('/', async (req, res) => {
    try {
        const complaint = new Complaint(req.body);
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Complaints
router.get('/', async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Complaint
router.put('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!complaint) return res.status(404).send('Complaint not found');
        res.json(complaint);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Complaint
router.delete('/:id', async (req, res) => {
    try {
        const complaint = await Complaint.findByIdAndDelete(req.params.id);
        if (!complaint) return res.status(404).send('Complaint not found');
        res.json({ message: 'Complaint deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
