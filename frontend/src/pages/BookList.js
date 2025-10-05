import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch books from backend
  const fetchBooks = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5000/api/books?page=${pageNumber}`);
      setBooks(res.data.books);
      setFilteredBooks(res.data.books);
      setPage(res.data.page);
      setPages(res.data.pages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete a book (only if creator)
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(books.filter((b) => b._id !== id));
      setFilteredBooks(filteredBooks.filter((b) => b._id !== id));
    } catch (err) {
      alert("Cannot delete book. Only the creator can delete it.");
      console.error(err);
    }
  };

  // Handle search (filters locally)
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        b.author.toLowerCase().includes(query) ||
        (b.genre && b.genre.toLowerCase().includes(query))
    );
    setFilteredBooks(filtered);
  };

  if (loading) return <p>Loading books...</p>;
  if (filteredBooks.length === 0)
    return (
      <div className="book-list-container">
        <div className="search-bar-container">
          <input
            type="text"
            placeholder="🔍 Search books by title, author, or genre..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
        </div>
        <p>No books available.</p>
      </div>
    );

  return (
    <div className="book-list-container">
      <h1>All Books</h1>

      {/* 🔍 Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="🔍 Search books by title, author, or genre..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {/* 📚 Book Grid */}
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <div className="book-card" key={book._id}>
            <img
              src={book.coverImage || "https://via.placeholder.com/150"}
              alt={book.title}
              className="book-cover"
            />
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p>{book.description}</p>
            {book.genre && <p><strong>Genre:</strong> {book.genre}</p>}

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

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i + 1}
            className={page === i + 1 ? "active" : ""}
            onClick={() => fetchBooks(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default BookList;
