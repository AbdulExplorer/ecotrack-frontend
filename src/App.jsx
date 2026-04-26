import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity/AddActivity";
import Reports from "./pages/Reports/Reports";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-activity" element={<AddActivity />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />   
    </Routes>
  );
}

export default App;