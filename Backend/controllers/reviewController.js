const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  try {
    const { rating, reviewText } = req.body;
    const review = new Review({
      bookId: req.params.bookId,
      userId: req.user._id,
      rating,
      reviewText
    });
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({ _id: req.params.id, userId: req.user._id });
    if (!review) return res.status(403).json({ message: "Not allowed" });

    Object.assign(review, req.body);
    await review.save();
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!review) return res.status(403).json({ message: "Not allowed" });
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
