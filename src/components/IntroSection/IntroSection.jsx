import React, { useRef } from "react";
import "./IntroSection.css";
import Cards from "../Cards/cards";



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
          <h2>What is Carbon Footprint?</h2>
          <p>
            Every action you take leaves a mark on the planet. 
            Your carbon footprint is the total CO₂ produced by your daily activities.
          </p>
        </div>

      <Cards />


      </section>
    </div>
  );
};

export default IntroSection;