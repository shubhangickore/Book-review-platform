// src/pages/BookList.js
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from backend
  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      const booksArray = Array.isArray(res.data) ? res.data : res.data.books;
      setBooks(booksArray || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${bookId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove deleted book from state
      setBooks(books.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Failed to delete book:", err);
      alert("Failed to delete book. Make sure you are the creator.");
    }
  };

  if (loading) return <p>Loading books...</p>;
  if (error) return <p>{error}</p>;
  if (books.length === 0) return <p>No books available. Add one!</p>;

  return (
    <div className="book-list-container">
      <h1>All Books</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <div className="card-buttons">
              <Link to={`/edit-book/${book._id}`} className="edit-btn">
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
