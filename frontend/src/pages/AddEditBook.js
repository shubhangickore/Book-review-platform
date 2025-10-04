import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddEditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/books",
        { title, author, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // ✅ After success → navigate to BookList
      navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Add New Book</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  );
}

export default AddEditBook;
