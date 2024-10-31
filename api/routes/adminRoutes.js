// src/routes/admin.js
const express = require('express');
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const router = express.Router();

// Create a new Admin
router.post('/', async (req, res) => {
    try {
        const admin = new Admin(req.body);
        await admin.save();
        res.status(201).json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all Admins
router.get('/', async (req, res) => {
    try {
        const admins = await Admin.find();
        res.json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Admin by ID
router.get('/:id', async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');
        res.json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Admin
router.put('/:id', async (req, res) => {
    try {
        const updates = { ...req.body };

        // Check if password is being updated
        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            updates.password = await bcrypt.hash(updates.password, salt);
        }

        const admin = await Admin.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!admin) return res.status(404).send('Admin not found');
        res.json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete Admin
router.delete('/:id', async (req, res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if (!admin) return res.status(404).send('Admin not found');
        res.json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Admin login
router.post('/login', async (req, res) => {
    const { login_id, password } = req.body;
    try {
        const admin = await Admin.findOne({ login_id });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }
        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid login credentials' });
        }
        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Password Endpoint
router.put('/:id/password', async (req, res) => {
    const { password } = req.body;
    if (!password) {
        return res.status(400).json({ message: 'Password is required' });
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = await Admin.findByIdAndUpdate(req.params.id, { password: hashedPassword }, { new: true });
        if (!admin) return res.status(404).send('Admin not found');

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
