const Book = require("../models/Book");
const Review = require("../models/Review");

exports.addBook = async (req, res) => {
  try {
    const book = new Book({ ...req.body, addedBy: req.user._id });
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
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
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("addedBy", "name");
    const reviews = await Review.find({ bookId: req.params.id }).populate("userId", "name");
    const avgRating = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;
    res.json({ ...book.toObject(), reviews, avgRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, addedBy: req.user._id });
    if (!book) return res.status(403).json({ message: "Not allowed" });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, addedBy: req.user._id });
    if (!book) return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
