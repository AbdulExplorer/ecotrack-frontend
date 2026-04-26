import React from "react";
import "./HeroSection.css";
import bgVideo from "../../assets/gbg2.mp4";
import { useNavigate, Link } from "react-router-dom";


const HeroSection = () => {

  const navigate = useNavigate(); 
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="hero">

      <video autoPlay loop muted playsInline className="video-bg">
        <source src={bgVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      {/*show only if user exists */}
      {user && (
        <div className="wel">
          <i className="bi bi-geo-alt-fill"></i>
          <h3>{user.city}, {user.state}</h3>
        </div>
      )}

      <div className="hero-content">

        {/*show only if user exists */}
        {user && (
        <div className="wu">
          <h3>Welcome {user.name}</h3>
        </div>)}

        <h1>Your Choices Shape the Planet</h1>

        <h2>Measure Your Carbon Footprint & Make a Difference</h2>

        <p>
          Discover how your everyday habits impact the environment
          and take simple steps toward a greener future.
        </p>

        <div className="cta-buttons">

          <button
            className="btn1"
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                const section = document.getElementById("intro");
                if (section) section.scrollIntoView();
              }, 100);
            }}
          >
            Learn More
          </button>

          <Link to="/add-activity" className="btn2">
            Start Tracking
          </Link>

        </div>
      </div>

    </div>
  );
};

export default HeroSection;