const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const auth = require("../middleware/auth");

// Add a review
router.post("/:bookId", auth, async (req, res) => {
  try {
    const review = new Review({
      bookId: req.params.bookId,
      userId: req.user._id,
      rating: req.body.rating,
      text: req.body.text,
    });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit review (only owner)
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, userId: req.user._id });
    if (!review) return res.status(403).json({ message: "Not allowed" });

    review.rating = req.body.rating;
    review.text = req.body.text;
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete review (only owner)
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!review) return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all reviews for a book
router.get("/book/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).populate("userId", "name");
    const avgRating = reviews.length
      ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
      : null;
    res.json({ reviews, avgRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
