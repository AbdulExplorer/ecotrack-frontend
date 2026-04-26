import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import bgVideo from "../../assets/gbg2.mp4";
import { State, City } from "country-state-city";
import "./auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    state: "",
    city: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const states = State.getStatesOfCountry("IN");

  const cities = formData.state
    ? City.getCitiesOfState("IN", formData.state)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "state" && { city: "" })
    }));
  };

  // 🔥 FINAL SUBMIT (CONNECTED TO BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match ❌");
      setSuccess("");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          state: formData.state,
          city: formData.city,
          password: formData.password
        })
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      setSuccess("Registration successful ✅");
      setError("");

      // 🔥 redirect after signup
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError("Signup failed ❌");
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

        <div className="auth-box" id="auth-box-reg">

          <h1>Create Account</h1>

          <form onSubmit={handleSubmit}>

            <input name="name" placeholder="Full Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />

            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            <select name="city" value={formData.city} onChange={handleChange}>
              <option value="">Select City</option>
              {cities.map((city, i) => (
                <option key={i}>{city.name}</option>
              ))}
            </select>

            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} />

            <button type="submit">Register</button>

          </form>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;