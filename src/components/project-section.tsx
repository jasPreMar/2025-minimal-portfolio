"use client";

import { motion } from "motion/react";
import { ReactNode } from "react";

interface ProjectSectionProps {
  children: ReactNode;
  /**
   * Delay before this section starts fading in (in seconds)
   */
  delay?: number;
  /**
   * Duration of the fade-in animation (in seconds)
   */
  duration?: number;
  /**
   * Optional className for the wrapper
   */
  className?: string;
}

export function ProjectSection({
  children,
  delay = 0,
  duration = 0.45,
  className = "",
}: ProjectSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

