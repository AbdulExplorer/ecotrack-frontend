import React from "react";
import { Link } from "react-router-dom";


import "./LeafAnimation.css";

const LeafAnimation = () => {
  const leaves = Array.from({ length: 20 });

  return (
    <div className="leaf-container">
      {leaves.map((_, i) => (
        <div key={i} className="leaf"></div>
      ))}
    </div>
  );
};

export default LeafAnimation;