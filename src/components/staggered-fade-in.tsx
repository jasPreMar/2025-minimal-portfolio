"use client";

import React from "react";
import { motion } from "motion/react";

interface StaggeredFadeInProps {
  children: React.ReactNode;
  /**
   * Initial delay before the first item starts fading in (in seconds)
   */
  initialDelay?: number;
  /**
   * Delay between each item's fade-in (in seconds)
   */
  staggerDelay?: number;
  /**
   * Duration of each fade-in animation (in seconds)
   */
  duration?: number;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function StaggeredFadeIn({
  children,
  initialDelay = 0.1,
  staggerDelay = 0.15,
  duration = 0.5,
}: StaggeredFadeInProps) {
  // Convert children to array and filter out null/undefined/false
  const validChildren = React.Children.toArray(children).filter(Boolean);

  return (
    <div className="flex flex-col gap-20">
      {validChildren.map((child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration,
            delay: initialDelay + index * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

