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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(JSON.parse(storedUser));
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── TOP NAVBAR ── */}
      <div className={`fluid-container ${scrolled ? "scrolled" : ""}`} id="navScroll">

        {/* Logo */}
        <Link to="/" className="logo">
          <img id="logo" src={logo} alt="logo" />
        </Link>

        {/* Desktop Nav Links */}
        <div className="navSections">
          <Link className="s" to="/">Dashboard <i className="bi bi-chevron-up"></i></Link>
          <Link className="s" to="/add-activity">Add Activity <i className="bi bi-chevron-up"></i></Link>
          <Link className="s" to="/reports">Reports <i className="bi bi-chevron-up"></i></Link>
        </div>

        {/* Hamburger — mobile only, for toggle + auth */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>

        {/* Mobile Dropdown — toggle + auth only, no nav links */}
        <div className={`mobileDropdown ${menuOpen ? "active" : ""}`}>

          <div
            className={`toggle ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <div className="circle"></div>
          </div>

          {!user ? (
            <div className="logSign">
              <Link className="reg" to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
              <Link className="log" to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            </div>
          ) : (
            <div className="logou">
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
          )}

        </div>

        {/* Desktop Toggle */}
        <div
          className={`toggle desktopOnly ${darkMode ? "active" : ""}`}
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className="circle"></div>
        </div>

        {/* Desktop Auth */}
        {!user ? (
          <div className="logSign desktopOnly">
            <Link className="reg" to="/register">Register</Link>
            <Link className="log" to="/login">Login</Link>
          </div>
        ) : (
          <div className="logou desktopOnly">
            <button className="logout" onClick={handleLogout}>Logout</button>
          </div>
        )}

      </div>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="bottomNav">
        <Link
          className={`bottomNav__item ${location.pathname === "/" ? "bottomNav__item--active" : ""}`}
          to="/"
        >
          <i className="bi bi-house-door"></i>
          <span>Home</span>
        </Link>

        <Link
          className={`bottomNav__item ${location.pathname === "/add-activity" ? "bottomNav__item--active" : ""}`}
          to="/add-activity"
        >
          <i className="bi bi-plus-circle"></i>
          <span>Add Activity</span>
        </Link>

        <Link
          className={`bottomNav__item ${location.pathname === "/reports" ? "bottomNav__item--active" : ""}`}
          to="/reports"
        >
          <i className="bi bi-bar-chart"></i>
          <span>Reports</span>
        </Link>
      </nav>
    </>
  );
}

export default Navbar;