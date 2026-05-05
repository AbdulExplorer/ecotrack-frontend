import './Navbar.css';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../../assets/etLogo-w.png";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);

  // USER UPDATE (IMPORTANT FIX)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, [location.pathname]);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`fluid-container ${scrolled ? "scrolled" : ""}`} id="navScroll">

      {/* Logo */}
      <Link to="/" className="logo">
        <img id="logo" src={logo} alt="logo" />
      </Link>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? "✕" : "☰"}
      </div>

      {/* Navigation */}
      <div className={`navSections ${menuOpen ? "active" : ""}`}>

        <Link className="s" to="/" onClick={() => setMenuOpen(false)}>
          Dashboard <i className="bi bi-chevron-up"></i>
        </Link>

        <Link className="s" to="/add-activity" onClick={() => setMenuOpen(false)}>
          Add Activity <i className="bi bi-chevron-up"></i>
        </Link>

        <Link className="s" to="/reports" onClick={() => setMenuOpen(false)}>
          Reports <i className="bi bi-chevron-up"></i>
        </Link>

        {/* Mobile Extras */}
        <div className="mobileExtras">

          <div
            className={`toggle ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="circle"></div>
          </div>

          {/* Login/Register */}
          {!user && (
            <div className="logSign">
              <Link className="reg" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              <Link className="log" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </div>
          )}

          {/* Logout */}
          {user && (
            <div className="logou">
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
          )}

        </div>
      </div>

      {/* Desktop Toggle */}
      <div
        className={`toggle desktopOnly ${darkMode ? "active" : ""}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        <div className="circle"></div>
      </div>

      {/* Desktop Auth */}

      {/* Login/Register */}
      {!user && (
        <div className="logSign desktopOnly">
          <Link className="reg" to="/register">Register</Link>
          <Link className="log" to="/login">Login</Link>
        </div>
      )}

      {/* Logout */}
      {user && (
        <div className="logou desktopOnly">
          <button className="logout" onClick={handleLogout}>Logout</button>
        </div>
      )}

    </div>
  );
}

export default Navbar;