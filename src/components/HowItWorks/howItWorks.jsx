import React, { useRef } from "react";
import "./howItWorks.css";

import b1 from "../../assets/b1.mp4";
import b2 from "../../assets/b4.mp4";
import b3 from "../../assets/b3.mp4";

const IntroSection = () => {

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

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

      <section className="intro-section" data-aos="fade-up">

        {/* Header */}
        <div className="intro-header" data-aos="fade-up" data-aos-delay="100">
          <h2>How it Works?</h2>
          <p>
            Every action you take leaves a mark on the planet. 
            Your carbon footprint is the total CO₂ produced by your daily activities.
          </p>
        </div>

        {/* Cards */}
        <div className="intro-cards">

          {/* 🚗 CARD 1 */}
          <div
            className="card"
            data-aos="fade-up"
            data-aos-delay="200"
            onMouseEnter={() => handleEnter(ref1)}
            onMouseLeave={() => handleLeave(ref1)}
          >
            <video ref={ref1} className="bg-video" muted loop playsInline>
              <source src={b1} type="video/mp4" />
            </video>

            <div className="content">
              <div className="icon"></div>
              <h3>Add Activity</h3>
              <p>Log your daily activities such as travel, electricity usage, and food habits.</p>
            </div>
          </div>

          {/* ⚡ CARD 2 */}
          <div
            className="card"
            data-aos="fade-up"
            data-aos-delay="400"
            onMouseEnter={() => handleEnter(ref2)}
            onMouseLeave={() => handleLeave(ref2)}
          >
            <video ref={ref2} className="bg-video" muted loop playsInline>
              <source src={b2} type="video/mp4" />
            </video>

            <div className="content">
              <div className="icon"></div>
              <h3>Track Your Emissions</h3>
              <p>We calculate your carbon footprint instantly based on your inputs.</p>
            </div>
          </div>

          {/* 🍔 CARD 3 */}
          <div
            className="card"
            data-aos="fade-up"
            data-aos-delay="600"
            onMouseEnter={() => handleEnter(ref3)}
            onMouseLeave={() => handleLeave(ref3)}
          >
            <video ref={ref3} className="bg-video" muted loop playsInline>
              <source src={b3} type="video/mp4" />
            </video>

            <div className="content">
              <div className="icon"></div>
              <h3>Improve Lifestyle</h3>
              <p>Get insights and take simple steps to reduce your environmental impact.</p>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default IntroSection;