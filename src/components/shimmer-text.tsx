"use client";

import { useState, useEffect, useCallback } from "react";

const WORDS = [
  "Actioning",
  "Actualizing",
  "Believing",
  "Brewing",
  "Calculating",
  "Caring",
  "Cerebrating",
  "Churning",
  "Clauding",
  "Coalescing",
  "Coding",
  "Cogitating",
  "Computing",
  "Conjuring",
  "Considering",
  "Cooking",
  "Crafting",
  "Creating",
  "Crunching",
  "Distilling",
  "Designing",
  "Deliberating",
  "Delivering",
  "Determining",
  "Empathizing",
  "Effecting",
  "Executing",
  "Exploring",
  "Finagling",
  "Focusing",
  "Forging",
  "Forming",
  "Framing",
  "Generating",
  "Grouping",
  "Hatching",
  "Herding",
  "Hustling",
  "Ideating",
  "Inspecting",
  "Intuiting",
  "Layering",
  "Levitating",
  "Listening",
  "Manifesting",
  "Marinating",
  "Mulling",
  "Musing",
  "Noodling",
  "Obsessing",
  "Owning",
  "Percolating",
  "Pondering",
  "Prestidigitating",
  "Processing",
  "Prototyping",
  "Reticulating",
  "Ruminating",
  "Schlepping",
  "Scoping",
  "Sensing",
  "Shucking",
  "Simmering",
  "Simplifying",
  "Sketching",
  "Smooshing",
  "Solving",
  "Stewing",
  "Stirring",
  "Synthesizes",
  "Thinking",
  "Transmuting",
  "Vectoring",
  "Vibing",
  "Working",
];

interface ShimmerTextProps {
  prefix?: string;
  passDuration?: number;
  pauseDuration?: number;
  spread?: number;
  color?: string;
}

export function ShimmerText({
  prefix = "In New York, ",
  passDuration = 2,
  pauseDuration = 1,
  spread = 50,
  color,
}: ShimmerTextProps) {
  const [currentWord, setCurrentWord] = useState("Designing");
  const [isAnimating, setIsAnimating] = useState(false);

  const totalDuration = (passDuration + pauseDuration) * 1000;

  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }, []);

  useEffect(() => {
    // Start the animation cycle
    const runCycle = () => {
      // Start shimmer animation
      setIsAnimating(true);

      // After pass duration, stop animating and wait for pause
      setTimeout(() => {
        setIsAnimating(false);
      }, passDuration * 1000);

      // At the end of the full cycle, change the word
      setTimeout(() => {
        setCurrentWord(getRandomWord());
      }, totalDuration);
    };

    // Run immediately
    runCycle();

    // Set up interval for subsequent cycles
    const interval = setInterval(runCycle, totalDuration);

    return () => clearInterval(interval);
  }, [passDuration, totalDuration, getRandomWord]);

  // Calculate gradient colors
  const baseColor = color || "currentColor";
  const gradientStyle = {
    "--shimmer-duration": `${passDuration}s`,
    backgroundImage: `linear-gradient(
      90deg,
      ${baseColor} 0%,
      ${baseColor} ${50 - spread / 2}%,
      var(--shimmer-highlight, rgba(156, 163, 175, 0.4)) 50%,
      ${baseColor} ${50 + spread / 2}%,
      ${baseColor} 100%
    )`,
  } as React.CSSProperties;

  return (
    <p
      className={`shimmer-text ${isAnimating ? "animating" : ""}`}
      style={gradientStyle}
    >
      {prefix}
      {currentWord}...
    </p>
  );
}

