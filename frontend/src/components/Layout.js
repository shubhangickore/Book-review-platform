import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Layout.css";

function Layout({ children }) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="layout">
      {/* Header */}
      <header className="header">
        <h1 className="logo">📚 Book Review Platform</h1>
        <nav>
          <Link to="/">Home</Link>
          {user && <Link to="/add-book">Add Book</Link>}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={logout}>Logout</button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main">{children}</main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Book Review Platform | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Layout;
