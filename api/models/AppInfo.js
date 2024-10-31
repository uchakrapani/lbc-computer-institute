const mongoose = require('mongoose');

const appInfoSchema = new mongoose.Schema({
    app_name: { type: String, required: true },
    logo: { type: String },
    description: { type: String },
    favicon: { type: String },
    social_network: { type: [Object] },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('AppInfo', appInfoSchema);
