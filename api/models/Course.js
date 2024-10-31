const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    description: { type: String },
    duration: { type: String },
    level: { type: String },
    price: { type: Number },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('Course', courseSchema);
