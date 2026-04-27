import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import bgVideo from "../../assets/gbg2.mp4";
import "./auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 🔥 FINAL LOGIN FUNCTION
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("All fields are required ❌");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      // ✅ Save user
      localStorage.setItem("user", JSON.stringify(data));

      setSuccess("Login successful ✅");
      setError("");

      // ✅ Redirect
      window.location.href = "/dashboard"; //reload

    } catch (err) {
      setError("Wrong email or password");
      setSuccess("");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="auth-container">
        <video autoPlay loop muted playsInline className="auth-video">
          <source src={bgVideo} type="video/mp4" />
        </video>

        <div className="overlayA"></div>

        <div className="auth-box">
          <h1>Welcome Back</h1>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />

              <span
                className="eye"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit">Login</button>

          </form>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;