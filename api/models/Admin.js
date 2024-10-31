const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    login_id: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['read', 'read_write'], required: true },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
});

// Hash password before saving
adminSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare password for login
adminSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
