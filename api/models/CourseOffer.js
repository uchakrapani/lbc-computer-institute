const mongoose = require("mongoose");

const courseOfferSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  discount_percentage: { type: Number, required: true },
  offer_start_date: { type: Date, required: true },
  offer_end_date: { type: Date, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  date_created: { type: Date, default: Date.now },
  date_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CourseOffer", courseOfferSchema);
