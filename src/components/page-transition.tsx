"use client";

import { motion } from "motion/react";

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: "left" | "right";
}

export function PageTransition({
  children,
  direction = "right",
}: PageTransitionProps) {
  const xOffset = direction === "right" ? 20 : -20;

  return (
    <motion.div
      initial={{ opacity: 0, x: xOffset }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
