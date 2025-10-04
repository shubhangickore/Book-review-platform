import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<BookList />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/add-book" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
            <Route path="/edit-book/:id" element={<ProtectedRoute><AddEditBook /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
