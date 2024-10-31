const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    description: { type: String, required: true },
    date_created: { type: Date, default: Date.now },
    status: { type: String, enum: ['pending', 'resolved', 'closed'], default: 'pending' },
});

module.exports = mongoose.model('Complaint', complaintSchema);
