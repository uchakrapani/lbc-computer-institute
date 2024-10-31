const mongoose = require('mongoose');

const studentPaymentSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    payment_date: { type: Date, default: Date.now },
    payment_method: { type: String },
    status: { type: String, enum: ['completed', 'pending', 'failed'], default: 'completed' },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('StudentPayment', studentPaymentSchema);
