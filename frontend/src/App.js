import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";
import "./App.css";

function App() {
  // Global dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Apply dark/light mode to <body> and remember preference
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        {/* Navbar with dark mode toggle */}
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main content area */}
        <div className="p-4 min-h-screen">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route
              path="/add-book"
              element={
                <ProtectedRoute>
                  <AddEditBook />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-book/:id"
              element={
                <ProtectedRoute>
                  <AddEditBook />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* Footer always visible */}
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
