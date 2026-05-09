import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css"
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity/AddActivity";
import Reports from "./pages/Reports/Reports";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-activity" element={<AddActivity />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;