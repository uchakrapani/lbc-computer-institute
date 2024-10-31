const express = require('express');
const router = express.Router();
const ErrorLog = require('../models/ErrorLog');

// Get all error logs (sorted by date in descending order)
router.get('/', async (req, res, next) => {
    try {
        const logs = await ErrorLog.find().sort({ date: -1 });
        res.json(logs);
    } catch (err) {
        next(err);
    }
});

// Get a single error log by ID
router.get('/:id', async (req, res, next) => {
    try {
        const log = await ErrorLog.findById(req.params.id);
        if (!log) return res.status(404).json({ message: 'Error log not found' });
        res.json(log);
    } catch (err) {
        next(err);
    }
});

// Delete an error log by ID
router.delete('/:id', async (req, res, next) => {
    try {
        const log = await ErrorLog.findByIdAndDelete(req.params.id);
        if (!log) return res.status(404).json({ message: 'Error log not found' });
        res.json({ message: 'Error log deleted' });
    } catch (err) {
        next(err);
    }
});

module.exports = router;