import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AddEditBook.css";

function AddEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        const res = await axios.get(`http://localhost:5000/api/books/${id}`);
        const book = res.data.book;
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setGenre(book.genre);
        setYear(book.year);
        setCoverImage(book.coverImage || "");
      };
      fetchBook();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/books/${id}`,
          { title, author, description, genre, year, coverImage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/books",
          { title, author, description, genre, year, coverImage },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>{id ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} />
        <input type="number" placeholder="Published Year" value={year} onChange={e => setYear(e.target.value)} />
        <input type="text" placeholder="Cover Image URL" value={coverImage} onChange={e => setCoverImage(e.target.value)} />
        <button type="submit" disabled={loading}>{loading ? "Saving..." : id ? "Update" : "Add"}</button>
      </form>
    </div>
  );
}

export default AddEditBook;
