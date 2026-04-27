import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Reports.css";

function Reports() {

  const [activities, setActivities] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  // fetch data
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8080/api/activity/user?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setFiltered(data);
      });
  }, []);

  // total CO2
  const totalCO2 = filtered.reduce((sum, a) => sum + Number(a.co2), 0);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "40px" }}>

        <h1>Reports</h1>

        {/* ✅ SIMPLE TOTAL */}
        <h3>Total CO2: {totalCO2.toFixed(2)} kg</h3>

        {/* ✅ SIMPLE TABLE */}
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Category</th>
              <th>Type</th>
              <th>Value</th>
              <th>Date</th>
              <th>CO2</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((a, i) => (
              <tr key={i}>
                <td>{a.category}</td>
                <td>{a.subtype}</td>
                <td>{a.value}</td>
                <td>{a.date}</td>
                <td>{a.co2}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Reports;