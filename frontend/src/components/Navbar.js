import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">BookApp</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/">Home</Link>
            <Link to="/add-book">Add Book</Link>
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/signup" className="btn">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
