import React, { useRef } from "react";
import "./IntroSection.css";

import b1 from "../../assets/b1.mp4";
import b2 from "../../assets/b4.mp4";
import b3 from "../../assets/b3.mp4";

const IntroSection = () => {

  const handleEnter = (ref) => {
    ref.current.play();
  };

  const handleLeave = (ref) => {
    ref.current.pause();
    ref.current.currentTime = 0;
  };

  return (
  <div>
    <div id="intro"></div>
    <section className="intro-section" >
      
      <div className="intro-header">
        <h2>What is Carbon Footprint?</h2>
        <p>
          Every action you take leaves a mark on the planet. 
          Your carbon footprint is the total CO₂ produced by your daily activities.
        </p>
      </div>

      <div className="intro-cards">

        {/* 🚗 CARD 1 */}
        {(() => {
          const videoRef = useRef(null);
          return (
            <div 
              className="card"
              onMouseEnter={() => handleEnter(videoRef)}
              onMouseLeave={() => handleLeave(videoRef)}
            >
              <video ref={videoRef} className="bg-video" muted loop playsInline>
                <source src={b1} type="video/mp4" />
              </video>

              <div className="content">
                <div className="icon"></div>
                <h3>Transportation</h3>
                <p>Driving vehicles releases carbon dioxide into the air.</p>
              </div>
            </div>
          );
        })()}

        {/* ⚡ CARD 2 */}
        {(() => {
          const videoRef = useRef(null);
          return (
            <div 
              className="card"
              onMouseEnter={() => handleEnter(videoRef)}
              onMouseLeave={() => handleLeave(videoRef)}
            >
              <video ref={videoRef} className="bg-video" muted loop playsInline>
                <source src={b2} type="video/mp4" />
              </video>

              <div className="content">
                <div className="icon"></div>
                <h3>Electricity</h3>
                <p>Using electricity contributes to carbon emissions.</p>
              </div>
            </div>
          );
        })()}

        {/* 🍔 CARD 3 */}
        {(() => {
          const videoRef = useRef(null);
          return (
            <div 
              className="card"
              onMouseEnter={() => handleEnter(videoRef)}
              onMouseLeave={() => handleLeave(videoRef)}
            >
              <video ref={videoRef} className="bg-video" muted loop playsInline>
                <source src={b3} type="video/mp4" />
              </video>

              <div className="content">
                <div className="icon"></div>
                <h3>Food & Lifestyle</h3>
                <p>Your eating habits and lifestyle choices impact the planet.</p>
              </div>
            </div>
          );
        })()}

      </div>

    </section>
  </div>  
  );
};

export default IntroSection;