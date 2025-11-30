"use client";

import { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from "react";

const PRISMATIC_DELAY_RATIO = 0.35; // Prismatic starts right on the heels of white shimmer

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
  wipeDuration?: number;
  pauseDuration?: number;
  /**
   * If set, triggers a shimmer animation on mount after this delay (in seconds).
   * Useful for syncing with fade-in animations.
   */
  initialShimmerDelay?: number;
  /**
   * The word to shimmer into on the initial animation.
   * Only used when initialShimmerDelay is set.
   */
  initialWord?: string;
}

export interface ShimmerTextRef {
  trigger: () => void;
}

const ShimmerTextComponent = forwardRef<ShimmerTextRef, ShimmerTextProps>(({
  prefix = " in New York",
  wipeDuration = 0.65,
  pauseDuration = 4.35, // Adjusted so total cycle is 5 seconds (4.35 + 0.65 = 5)
  initialShimmerDelay,
  initialWord,
}, ref) => {
  const [currentWord, setCurrentWord] = useState("Vibing");
  const [previousWord, setPreviousWord] = useState("Vibing");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPrismaticAnimating, setIsPrismaticAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prismaticTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prismaticEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomWord = useCallback((excludeWord: string) => {
    let newWord: string;
    do {
      const randomIndex = Math.floor(Math.random() * WORDS.length);
      newWord = WORDS[randomIndex];
    } while (newWord === excludeWord);
    return newWord;
  }, []);

  const triggerAnimation = useCallback((targetWord?: string) => {
    // Clear any existing timeouts to avoid conflicts
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    if (prismaticTimeoutRef.current) {
      clearTimeout(prismaticTimeoutRef.current);
    }
    if (prismaticEndTimeoutRef.current) {
      clearTimeout(prismaticEndTimeoutRef.current);
    }

    setCurrentWord((prev) => {
      setPreviousWord(prev);
      return targetWord || getRandomWord(prev);
    });
    setIsAnimating(true);

    const prismaticDelay = wipeDuration * PRISMATIC_DELAY_RATIO * 1000;
    const prismaticDuration = wipeDuration * 1.4 * 1000;

    // Start prismatic shimmer partway through the white shimmer
    prismaticTimeoutRef.current = setTimeout(() => {
      setIsPrismaticAnimating(true);
    }, prismaticDelay);

    // Reset animation state after wipe completes
    animationTimeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
    }, wipeDuration * 1000);

    // End prismatic animation
    prismaticEndTimeoutRef.current = setTimeout(() => {
      setIsPrismaticAnimating(false);
    }, prismaticDelay + prismaticDuration);
  }, [wipeDuration, getRandomWord]);

  useImperativeHandle(ref, () => ({
    trigger: triggerAnimation,
  }), [triggerAnimation]);

  // Trigger initial shimmer on mount if delay is specified
  useEffect(() => {
    if (initialShimmerDelay === undefined) return;
    
    const initialTimeout = setTimeout(() => {
      triggerAnimation(initialWord);
    }, initialShimmerDelay * 1000);
    
    return () => clearTimeout(initialTimeout);
  }, [initialShimmerDelay, initialWord, triggerAnimation]);

  const startInterval = useCallback(() => {
    const totalCycleDuration = (wipeDuration + pauseDuration) * 1000;
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      triggerAnimation();
    }, totalCycleDuration);
  }, [wipeDuration, pauseDuration, triggerAnimation]);

  useEffect(() => {
    startInterval();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (prismaticTimeoutRef.current) {
        clearTimeout(prismaticTimeoutRef.current);
      }
      if (prismaticEndTimeoutRef.current) {
        clearTimeout(prismaticEndTimeoutRef.current);
      }
    };
  }, [startInterval]);

  const fullTextNew = `${currentWord}${prefix}...`;
  const fullTextOld = `${previousWord}${prefix}...`;

  const handleClick = useCallback(() => {
    triggerAnimation();
    startInterval(); // Reset the timer
  }, [triggerAnimation, startInterval]);

  return (
    <p
      className="shimmer-container"
      onClick={handleClick}
      style={
        {
          "--wipe-duration": `${wipeDuration}s`,
          "--prismatic-duration": `${wipeDuration * 1.4}s`,
          cursor: "pointer",
        } as React.CSSProperties
      }
    >
      {/* New text layer - reveals from left */}
      <span
        className={`shimmer-new ${isAnimating ? "shimmer-animating" : ""}`}
      >
        {fullTextNew}
      </span>

      {/* Old text layer - hides from left (only during animation) */}
      {isAnimating && (
        <span className="shimmer-old shimmer-animating" aria-hidden="true">
          {fullTextOld}
        </span>
      )}

      {/* Shimmer highlight at boundary (only during animation) */}
      {isAnimating && (
        <span className="shimmer-highlight shimmer-animating" aria-hidden="true">
          {fullTextNew}
        </span>
      )}

      {/* Prismatic shimmer - follows the white shimmer */}
      {isPrismaticAnimating && (
        <span className="shimmer-prismatic shimmer-animating" aria-hidden="true">
          {fullTextNew}
        </span>
      )}
    </p>
  );
});

ShimmerTextComponent.displayName = "ShimmerText";

export const ShimmerText = ShimmerTextComponent;
