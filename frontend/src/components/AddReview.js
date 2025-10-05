import { useState } from "react";
import axios from "axios";

function AddReview({ bookId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/reviews/${bookId}`,
        { rating, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRating(5);
      setText("");
      onReviewAdded(); // refresh reviews
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ⭐</option>)}
      </select>
      <textarea
        placeholder="Write your review"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default AddReview;
