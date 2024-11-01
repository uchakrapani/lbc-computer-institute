const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    branch_name: { type: String, required: true },
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    banner_url: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Branch', branchSchema);
