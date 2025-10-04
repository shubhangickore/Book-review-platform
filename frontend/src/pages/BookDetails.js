import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import '../styles/books.css';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [editingReview, setEditingReview] = useState(null);

  const fetchBook = async () => {
    const res = await API.get(`/books/${id}`);
    setBook(res.data);
  };

  const fetchReviews = async () => {
    const res = await API.get(`/reviews/book/${id}`);
    setReviews(res.data);
  };

  const addReview = async () => {
    if (!reviewText) return alert("Review cannot be empty");
    if (editingReview) {
      await API.put(`/reviews/${editingReview._id}`, { rating, reviewText });
      setEditingReview(null);
    } else {
      await API.post(`/reviews/${id}`, { rating, reviewText });
    }
    setReviewText("");
    setRating(5);
    fetchReviews();
  };

  const editReview = (review) => {
    setEditingReview(review);
    setReviewText(review.reviewText);
    setRating(review.rating);
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    await API.delete(`/reviews/${reviewId}`);
    fetchReviews();
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-600">{book.author}</p>
      <p className="mt-2">{book.description}</p>
      <p className="mt-2 font-medium">Avg Rating: {book.averageRating || 0}</p>

      {user && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-semibold">{editingReview ? "Edit Review" : "Add a Review"}</h3>
          <div className="flex space-x-2 mt-2">
            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="border p-1 rounded"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <input
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review..."
              className="border p-1 rounded flex-1"
            />
            <button onClick={addReview} className="bg-blue-600 text-white px-3 rounded">
              {editingReview ? "Update" : "Submit"}
            </button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        {reviews.length === 0 && <p>No reviews yet</p>}
        {reviews.map((r) => (
          <div key={r._id} className="border p-2 mt-2 rounded flex justify-between items-start">
            <div>
              <p className="font-medium">{r.user.name} - Rating: {r.rating}</p>
              <p>{r.reviewText}</p>
            </div>
            {user && r.user._id === user._id && (
              <div className="flex space-x-2">
                <button onClick={() => editReview(r)} className="text-green-600 hover:underline">Edit</button>
                <button onClick={() => deleteReview(r._id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
