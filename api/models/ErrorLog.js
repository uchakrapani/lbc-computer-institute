const mongoose = require('mongoose');

const errorLogSchema = new mongoose.Schema({
    message: String,
    stack: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ErrorLog', errorLogSchema);