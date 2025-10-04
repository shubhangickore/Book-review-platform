const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Book = require("../models/Book");
const auth = require("../middleware/auth");

// Helper to update book avg rating
async function updateBookRating(bookId) {
  const reviews = await Review.find({ book: bookId });
  const avg = reviews.length ? reviews.reduce((a,r)=>a+r.rating,0)/reviews.length : 0;
  await Book.findByIdAndUpdate(bookId, { averageRating: avg });
}

// Add review
router.post("/:bookId", auth, async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const book = await Book.findById(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    const existing = await Review.findOne({ book: book._id, user: req.userId });
    if (existing) return res.status(400).json({ message: "You already reviewed this book" });

    const review = await Review.create({ book: book._id, user: req.userId, rating, reviewText });
    await updateBookRating(book._id);
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit review
router.put("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });

    Object.assign(review, req.body);
    await review.save();
    await updateBookRating(review.book);
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete review
router.delete("/:id", auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    if (review.user.toString() !== req.userId) return res.status(403).json({ message: "Not allowed" });

    await review.remove();
    await updateBookRating(review.book);
    res.json({ message: "Review removed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
