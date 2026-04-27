import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./AddActivity.css";
import bgVideo from "../../assets/gbg2.mp4";


function AddActivity() {
  const [showPopup, setShowPopup] = useState(false);
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    subType: "",
    value: "",
    date: new Date().toISOString().split("T")[0],
    note: "",
  });

  const [result, setResult] = useState(null);

  const categories = [
    { name: "Transport", value: "Transport" },
    { name: "Food", value: "Food" },
    { name: "Electricity", value: "Electricity" },
    { name: "Waste", value: "Waste" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && { subType: "" }),
    }));
  };

  // Status (same)
  const getStatus = (co2) => {
    if (co2 <= 3) return { label: "Good ", tip: "Great! Keep it up " };
    if (co2 <= 6)
      return { label: "Average ", tip: "Try reducing daily impact" };
    return { label: "High", tip: "Reduce travel / energy usage!" };
  };

  //FINAL HANDLE SUBMIT (BACKEND CALCULATION)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/activity/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user.email,
          category: formData.category,
          subType: formData.subType,
          value: parseFloat(formData.value),
          date: formData.date,
          note: formData.note
        })
      });

      const data = await res.json();

      console.log("Backend Response", data);

      const status = getStatus(data.co2);

      setResult({
        co2: data.co2,
        status: status.label,
        tip: status.tip,
      });
      setShowPopup(true); // 🔥 open popup

    } catch (err) {
      console.error(err);
      alert("Error saving activity");
    }

  };

  return (
    <div>
      <Navbar />

      <video autoPlay loop muted playsInline className="auth-video">
        <source src={bgVideo} type="video/mp4" />
      </video>
      <div className="overlayA"></div>

      <div className="container">
        <div className="form-wrapper">

          <h1>Add Activity</h1>

          <div className="category-bar">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`cat-btn ${formData.category === cat.value ? "active" : ""
                  }`}
                onClick={() => {
                  setFormData((prev) => ({
                    ...prev,
                    category: cat.value,
                    subType: "",
                  }));
                }}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="form-box">

            {!formData.category && (
              <p className="placeholder">
                Select a category above
              </p>
            )}

            {formData.category && (
              <form onSubmit={handleSubmit}>

                <label>Type</label>
                <select
                  name="subType"
                  value={formData.subType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>

                  {formData.category === "Transport" && (
                    <>
                      <option>Car</option>
                      <option>Bike/Scooter</option>
                      <option>Bus</option>
                    </>
                  )}

                  {formData.category === "Food" && (
                    <>
                      <option>Veg Meal</option>
                      <option>Non-Veg Meal</option>
                    </>
                  )}

                  {formData.category === "Electricity" && (
                    <option>Units (kWh)</option>
                  )}

                  {formData.category === "Waste" && (
                    <option>Kg of Waste</option>
                  )}
                </select>

                <label>Value</label>
                <input
                  type="number"
                  placeholder="0"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  required
                />

                <small>
                  {formData.category === "Transport" && "(in kilometers)"}
                  {formData.category === "Food" && "(number of meals)"}
                  {formData.category === "Electricity" && "(kWh)"}
                  {formData.category === "Waste" && "(kg)"}
                </small>

                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                />

                <label>Note</label>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                />

                <button type="submit">Calculate</button>

              </form>
            )}

          </div>

          {/* {result && (
            <div className="result-box">
              <h2> Result</h2>
              <p><strong>CO2:</strong> {result.co2} kg</p>
              <p><strong>Status:</strong> {result.status}</p>
              <p><strong>Tip:</strong> {result.tip}</p>
            </div>
          )} */}

          {showPopup && result && (
            <div className="popup-overlay">
              <div className="popup-box">

                <h2>
                  <i className="bi bi-globe-americas"></i> Your Impact
                </h2>

                <p><strong>CO2:</strong> {result.co2} kg</p>
                <p><strong>Status:</strong> {result.status}</p>
                <p><strong>Tip:</strong> {result.tip}</p>

              <div className="popBtn">
                {/* View Reports Button */}
                <button className="cat-btn" onClick={() => navigate("/reports")}>
                  View Reports
                </button>

                {/* Close Button */}
                <button className="cat-btn" onClick={() => setShowPopup(false)}>
                  Add More
                </button>
              </div>
                

              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AddActivity;