import React from "react";
import { motion } from "framer-motion";
import "./cards.css";


export default function ScrollCards() {
  return (
    <div className="container">
      {food.map(([emoji, title, def, hueA, hueB], i) => (
        <Card
          key={i}
          emoji={emoji}
          title={title}
          def={def}
          hueA={hueA}
          hueB={hueB}
        />
      ))}
    </div>
  );
}

function Card({ emoji, title, def, hueA, hueB }) {
  const background = `linear-gradient(306deg, ${hueA}, ${hueB})`;

  return (
    <motion.div
      className="card-container"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div className="splash" style={{ background }} />

      <motion.div className="cards" variants={cardVariants}>
        <div className="card-content">
          <div className="emoji">{emoji}</div>
          <h2>{title}</h2>
          <p>{def}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const cardVariants = {
  offscreen: { y: 300 },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const food = [
  ["🚗", "Transportation","Driving vehicles releases carbon dioxide into the air.", "#161716", "#18230c"],
  ["🍔", "Food", "Using electricity contributes to carbon emissions.", "#161716", "#18230c"],
  ["⚡", "Electricity", "Your eating habits and lifestyle choices impact the planet.", "#161716", "#18230c"],
  ["🛍️", "Waste", "Waste generation impacts the environment and increases pollution.", "#161716", "#18230c"],
];