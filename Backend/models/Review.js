const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, min: 1, max: 5 },
  reviewText: String
});

reviewSchema.index({ book: 1, user: 1 }, { unique: true }); // ⭐ ensures one review per user per book

module.exports = mongoose.model("Review", reviewSchema);
