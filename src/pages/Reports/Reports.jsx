import Navbar from "../../components/Navbar/Navbar";
import bgVideo from "../../assets/gbg2.mp4";
import Footer from "../../components/Footer/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Reports.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { div } from "framer-motion/client";
import { correctBorderRadius } from "framer-motion";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

function Report() {
  const [data, setData] = useState([]);
  const [totalCO2, setTotalCO2] = useState(0);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

 const options = {
  responsive: true,
  maintainAspectRatio: false, // ⭐ MOST IMPORTANT

  plugins: {
    legend: {
      labels: {
        color: "#fff"
      }
    }
  },

  scales: {
    x: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" }
    },
    y: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" }
    }
  }
};

  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
const email = user?.email;

      if (!email) {
        alert("Please login first");
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/api/report/user/${email}`
      );

      setData(res.data);
      calculateSummary(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const calculateSummary = (data) => {
    const total = data.reduce((sum, item) => sum + Number(item.co2), 0);
    setTotalCO2(total);

    if (total > 150) {
      setSuggestion("🚨 High emissions! Reduce transport & electricity usage.");
    } else if (total > 80) {
      setSuggestion("⚠️ Moderate emissions. Try improving habits.");
    } else {
      setSuggestion("✅ Great! You're eco-friendly ");
    }
  };

  // Chart Data
  const lineData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
         label: "CO2 Emission",
  data: data.map((item) => item.co2),
  borderColor: "#8b5cf6",
  backgroundColor: "rgba(139,92,246,0.2)",
  tension: 0.4,
  fill: true,
      },
    ],
  };

  const pieData = {
    labels: ["Transport", "Food", "Electricity", "Waste"],
    datasets: [
      {
        data: [
          data.filter((d) => d.category === "Transport").length,
          data.filter((d) => d.category === "Food").length,
          data.filter((d) => d.category === "Electricity").length,
          data.filter((d) => d.category === "Waste").length,
        ],
        backgroundColor: ["#4CAF50", "#FF9800", "#2196F3", "#9C27B0"],
      },
    ],
  };

  const barData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Daily CO2",
        data: data.map((item) => item.co2),
        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div>
      <Navbar/>
    <video autoPlay loop muted playsInline className="auth-video">
              <source src={bgVideo} type="video/mp4" />
            </video>
            <div className="overlayA"></div>


    <div className="report-container">

      

  <h1 className="report-title"><i class="bi bi-bar-chart-fill"></i> EcoTrack Report</h1>

  {/* Summary */}
  <div className="summary">
    <div className="cardt"> <i className="bi bi-globe-americas"></i> {totalCO2.toFixed(2)} kg CO2</div>
    <div className="cardt"><i class="bi bi-clipboard2-data-fill"></i> {data.length} Activities</div>
  </div>

  {/* Suggestion */}
  <div className="suggestion">
    {suggestion}
  </div>

  {/* Charts */}
 <div className="charts">
  <div className="subCharts">

    <div className="chart-box" id="cCo">
    <h2>CO2 Trend</h2>
    {data.length > 0 ? <Line data={lineData} options={options} /> : <p>No data</p>}
  </div>

  <div className="chart-box">
    <h2>Distribution</h2>
    {data.length > 0 ? <Pie data={pieData} options={options} /> : <p>No data</p>}
  </div>

  </div>

  <div className="chart-box" id="cD">
    <h2>Daily</h2>
    {data.length > 0 ? <Bar data={barData} options={options} /> : <p>No data</p>}
  </div>
  

  

  
</div>

  {/* Table */}
  <div className="table-container">
    <h2>Activity History</h2>

    {data.length === 0 ? (
      <p>No activities found</p>
    ) : (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Subtype</th>
            <th>Value</th>
            <th>CO2</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.category}</td>
              <td>{item.subtype}</td>
              <td>{item.value}</td>
              <td>{item.co2} kg</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>

</div>
      <Footer />
</div>
  );
}

export default Report;