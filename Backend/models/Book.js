const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  genre: String,
  year: Number,
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  averageRating: { type: Number, default: 0 }  // ⭐ keeps avg rating
});

module.exports = mongoose.model("Book", bookSchema);
