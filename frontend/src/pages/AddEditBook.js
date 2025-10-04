// src/pages/AddEditBook.js
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddEditBook.css";

function AddEditBook({ books, setBooks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/books/${id}`);
          const book = res.data.book || res.data; 
          setTitle(book.title);
          setAuthor(book.author);
          setCoverImage(book.coverImage || "");
        } catch (err) {
          console.error("Error fetching book:", err);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (id) {
        // Edit book
        const res = await axios.put(
          `http://localhost:5000/api/books/${id}`,
          { title, author, coverImage },
          config
        );
        // Update book in books array
        setBooks(
          books.map((b) => (b._id === id ? res.data : b))
        );
      } else {
        // Add new book
        const res = await axios.post(
          "http://localhost:5000/api/books",
          { title, author, coverImage },
          config
        );
        // Add book to state
        setBooks([res.data, ...books]);
      }
      navigate("/"); // go back to home
    } catch (err) {
      console.error("Error saving book:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Book" : "Add New Book"}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            placeholder="Enter author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Cover Image URL</label>
          <input
            type="text"
            placeholder="Enter cover image link"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>

        {coverImage && (
          <div className="preview">
            <p>Preview:</p>
            <img src={coverImage} alt="Preview" />
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : id ? "Update Book" : "Add Book"}
        </button>
      </form>
    </div>
  );
}

export default AddEditBook;
