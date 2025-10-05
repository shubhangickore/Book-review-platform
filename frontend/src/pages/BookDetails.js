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
  const [text, setText] = useState("");
  const [editingReview, setEditingReview] = useState(null);

  // Fetch book details
  const fetchBook = async () => {
    try {
      const res = await API.get(`/books/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch reviews and avg rating
  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/book/${id}`);
      setReviews(res.data.reviews);
      if (book) setBook({ ...book, averageRating: res.data.avgRating });
    } catch (err) {
      console.error(err);
    }
  };

  const addReview = async () => {
    if (!text.trim()) return alert("Review cannot be empty");

    try {
      if (editingReview) {
        await API.put(`/reviews/${editingReview._id}`, { rating, text });
        setEditingReview(null);
      } else {
        await API.post(`/reviews/${id}`, { rating, text });
      }
      setText("");
      setRating(5);
      fetchReviews(); // refresh reviews and avg rating
    } catch (err) {
      console.error(err);
    }
  };

  const editReview = (review) => {
    setEditingReview(review);
    setText(review.text);
    setRating(review.rating);
  };

  const deleteReview = async (reviewId) => {
    if (!window.confirm("Delete this review?")) return;
    try {
      await API.delete(`/reviews/${reviewId}`);
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBook();
    fetchReviews();
    // eslint-disable-next-line
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
              onChange={(e) => setRating(Number(e.target.value))}
              className="border p-1 rounded"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
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
              <p className="font-medium">{r.userId.name} - Rating: {r.rating}</p>
              <p>{r.text}</p>
            </div>
            {user && r.userId._id === user._id && (
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
