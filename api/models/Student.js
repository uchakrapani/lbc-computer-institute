const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    full_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    date_of_birth: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Student', studentSchema);
