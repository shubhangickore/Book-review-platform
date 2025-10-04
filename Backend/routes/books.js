const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const auth = require("../middleware/auth");

// Add book (protected)
router.post("/", auth, async (req, res) => {
  try {
    const book = await Book.create({ ...req.body, addedBy: req.userId });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all books with pagination
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const books = await Book.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("addedBy", "name");
    res.json({ books });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get book details
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "name");
    res.json({book});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update book (only creator)
router.put("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, addedBy: req.userId });
    if (!book) return res.status(403).json({ message: "Not allowed" });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete book (only creator)
router.delete("/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, addedBy: req.userId });
    if (!book) return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
