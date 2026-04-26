import React from "react";
import { motion } from "framer-motion";
import "./cards.css";


export default function ScrollCards() {
  return (
    <div className="container">
      {food.map(([emoji, title, hueA, hueB], i) => (
        <Card
          key={i}
          emoji={emoji}
          title={title}
          hueA={hueA}
          hueB={hueB}
        />
      ))}
    </div>
  );
}

function Card({ emoji, title, hueA, hueB }) {
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
          <p>{title}</p>
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
  ["🚗", "Transportation", "#161716", "#18230c"],
  ["⚡", "Electricity", "#161716", "#18230c"],
  ["🍔", "Food", "#161716", "#18230c"],
  ["🌿", "Home Energy", "#161716", "#18230c"],
  ["🛍️", "Shopping/Waste", "#161716", "#18230c"],
];