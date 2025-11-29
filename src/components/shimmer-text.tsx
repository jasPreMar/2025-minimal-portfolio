"use client";

import { useState, useEffect, useCallback, useRef } from "react";

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
}

export function ShimmerText({
  prefix = "In New York, ",
  passDuration = 2,
  pauseDuration = 1,
}: ShimmerTextProps) {
  const [currentWord, setCurrentWord] = useState("Designing");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalDuration = (passDuration + pauseDuration) * 1000;

  const getRandomWord = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    return WORDS[randomIndex];
  }, []);

  useEffect(() => {
    // Change word at the end of each full cycle
    intervalRef.current = setInterval(() => {
      setCurrentWord(getRandomWord());
    }, totalDuration);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [totalDuration, getRandomWord]);

  return (
    <p
      className="shimmer-text"
      style={
        {
          "--shimmer-total-duration": `${passDuration + pauseDuration}s`,
        } as React.CSSProperties
      }
    >
      {prefix}
      {currentWord}...
    </p>
  );
}
