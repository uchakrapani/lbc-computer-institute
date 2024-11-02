const express = require('express');
const CourseOffer = require('../models/CourseOffer');
const router = express.Router();

// Create a new Course Offer
router.post('/', async (req, res) => {
    try {
        const courseOffer = new CourseOffer(req.body);
        await courseOffer.save();
        res.status(201).json(courseOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Course Offers with populated Course data
router.get('/', async (req, res) => {
    try {
        const courseOffers = await CourseOffer.find().populate('course_id');
        res.json(courseOffers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Course Offer
router.put('/:id', async (req, res) => {
    try {
        const courseOffer = await CourseOffer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!courseOffer) return res.status(404).send('Course Offer not found');
        res.json(courseOffer);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Course Offer
router.delete('/:id', async (req, res) => {
    try {
        const courseOffer = await CourseOffer.findByIdAndDelete(req.params.id);
        if (!courseOffer) return res.status(404).send('Course Offer not found');
        res.json({ message: 'Course Offer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
