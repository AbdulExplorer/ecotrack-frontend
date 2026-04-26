import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/etlogo-w.png";

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="whitebar"></div>

                <div className="foot">
                    {/* LEFT */}
                    <div className="footSA">

                        <Link to="/">
                            <img src={logo} alt="EcoTrack Logo" className="logoF" />
                            
                        </Link>
                        
                        {/* <h2>ECOTRACK</h2> */}
                        <p>
                            Eco Track helps you monitor and reduce your carbon footprint with
                            smart insights, tracking tools, and sustainable solutions.
                        </p>
                        
                    </div>

                    <div className="footSB">
                            <h4>Contact</h4>
                            <a href="tel:+91XXXXXXXXXX">📞 Phone</a>
                            <a href="mailto:abdulali0407@gmail.com">📧 Email</a>
                        </div>


                        <div className="footSB">
                            <h4>EcoTrack</h4>
                            <Link to="/features">Features</Link>
                            <Link to="/dashboard">Dashboard</Link>
                        </div>

                        <div className="footSB">
                            <h4>Services</h4>
                            <Link to="/tracking">Carbon Tracking</Link>
                            <Link to="/analytics">Analytics</Link>
                        </div>

                    


                    <div className="footSB">
                        <h4>Company</h4>
                        <Link to="/about">About</Link>
                        <Link to="/privacy">Privacy</Link>
                        <Link to="/terms">Terms</Link>
                    </div>


                </div>

                <div className="footline"></div>

                <div className="smFoot">
                    <span>© 2026 EcoTrack</span>

                    <div className="smf">
                        <a href="#"><i className="bi bi-instagram"></i></a>
                        <a href="#"><i className="bi bi-facebook"></i></a>
                    </div>
                </div>
            </footer>

            <div className="blackbar">
                <span>Designed by Abdul Ali</span>
            </div>
        </>
    );
};

export default Footer;