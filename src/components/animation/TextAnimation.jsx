"use client";
import React from "react";
import { motion } from "framer-motion";

function TextAnimation({ text }) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04 * i,
      },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div variants={container} initial="hidden" animate="visible" className="text-purple-600">
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default TextAnimation;
