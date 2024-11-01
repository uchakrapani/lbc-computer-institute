const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    banner_url: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    date_created: { type: Date, default: Date.now },
    date_updated: { type: Date, default: Date.now },
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
});

module.exports = mongoose.model('Banner', bannerSchema);
