import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

function Navbar({ darkMode, setDarkMode }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="nav-left">
        <h2 className="logo">📚 Book Management</h2>
        <Link to="/">Home</Link>
        {user && <Link to="/add-book">Add Book</Link>}
      </div>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        )}

        {/* Dark/Light mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="theme-toggle"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
