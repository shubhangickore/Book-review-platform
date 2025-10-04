import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- state for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // go to BookList after login
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>} {/* show error */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Signup</a>
      </p>
    </div>
  );
}

export default Login;
