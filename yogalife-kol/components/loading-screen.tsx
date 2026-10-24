"use client";
import { motion, useReducedMotion } from "motion/react";
import { WellnessArt } from "./wellness-art";
export function LoadingScreen() {
  const reduced = useReducedMotion();
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <motion.div
        aria-hidden="true"
        animate={
          reduced ? {} : { scale: [1, 1.035, 1], opacity: [0.8, 1, 0.8] }
        }
        transition={{ duration: 3, repeat: Infinity }}
      >
        <WellnessArt />
      </motion.div>
      <h2>A little room to breathe.</h2>
      <p>We’re preparing your space…</p>
    </div>
  );
}
