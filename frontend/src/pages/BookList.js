import { useEffect, useState } from "react";
import axios from "axios";

function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      const booksArray = Array.isArray(res.data) ? res.data : res.data.books;
      setBooks(booksArray || []);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    }
  };

  return (
    <div className="book-list">
      <h2>All Books</h2>
      {books.length === 0 ? (
        <p>No books yet. Add one!</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
