const express = require('express');
const StudentPayment = require('../models/StudentPayment');
const router = express.Router();

// Create a new Student Payment
router.post('/', async (req, res) => {
    try {
        const studentPayment = new StudentPayment(req.body);
        await studentPayment.save();
        res.status(201).json(studentPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Student Payments
router.get('/', async (req, res) => {
    try {
        const studentPayments = await StudentPayment.find();
        res.json(studentPayments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Student Payment
router.put('/:id', async (req, res) => {
    try {
        const studentPayment = await StudentPayment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!studentPayment) return res.status(404).send('Student Payment not found');
        res.json(studentPayment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Student Payment
router.delete('/:id', async (req, res) => {
    try {
        const studentPayment = await StudentPayment.findByIdAndDelete(req.params.id);
        if (!studentPayment) return res.status(404).send('Student Payment not found');
        res.json({ message: 'Student Payment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
