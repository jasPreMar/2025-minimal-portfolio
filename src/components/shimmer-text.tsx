"use client";

import { useState, useEffect, useCallback, useRef, useImperativeHandle, forwardRef } from "react";

const PRISMATIC_DELAY_RATIO = 0.35; // Prismatic starts right on the heels of white shimmer

export const DEFAULT_WORDS = [
  "Designing",
  "Actioning",
  "Actualizing",
  "Aligning",
  "Animating",
  "Architecting",
  "Balancing",
  "Blending",
  "Calculating",
  "Caring",
  "Choreographing",
  "Clauding",
  "Coalescing",
  "Coding",
  "Componentizing",
  "Composing",
  "Computing",
  "Conjuring",
  "Considering",
  "Cooking",
  "Crafting",
  "Creating",
  "Crunching",
  "Debugging",
  "Deliberating",
  "Delighting",
  "Delivering",
  "Determining",
  "Digging",
  "Discovering",
  "Distilling",
  "Easing",
  "Effecting",
  "Empathizing",
  "Executing",
  "Exploring",
  "Finagling",
  "Flowing",
  "Focusing",
  "Forging",
  "Forming",
  "Framing",
  "Generating",
  "Grouping",
  "Guiding",
  "Harmonizing",
  "Hatching",
  "Herding",
  "Hustling",
  "Ideating",
  "Inspecting",
  "Interpolating",
  "Intuiting",
  "Iterating",
  "Jamming",
  "Layering",
  "Levitating",
  "Listening",
  "Manifesting",
  "Mapping",
  "Morphing",
  "Mulling",
  "Musing",
  "Noodling",
  "Obsessing",
  "Optimizing",
  "Orchestrating",
  "Owning",
  "Percolating",
  "Pixelating",
  "Polishing",
  "Pondering",
  "Processing",
  "Prototyping",
  "Rasterizing",
  "Redlining",
  "Refactoring",
  "Refining",
  "Rendering",
  "Ruminating",
  "Scaling",
  "Scoping",
  "Sensing",
  "Simmering",
  "Simplifying",
  "Sketching",
  "Solving",
  "Studying",
  "Synthesizing",
  "Systematizing",
  "Tessellating",
  "Thinking",
  "Tokenizing",
  "Transforming",
  "Transitioning",
  "Transmuting",
  "Typesetting",
  "Vectoring",
  "Vibe coding",
  "Wireframing",
  "Working",
];

const LOCATIONS = [
  "in New York",
  "in the City",
  "on Work Island",
  "in Brooklyn",
  "in BK",
  "in Willy B",
  "in the concrete jungle",
  "in Williamsburg",
  "in the Big Apple",
  "in NYC",
  "in the 718",
  "in Kings County",
  "in north Brooklyn",
  "in Billyburg",
  "in the burg",
  "in Gotham",
  "in the city that never sleeps",
  "in Nueva York",
  "in the Empire State",
  "in Manhattan-adjacent",
  "in East Williamsburg",
  "in the Northside",
  "on Bedford Ave",
  "at McCarren Park",
  "at Domino Park",
  "in the 11211",
  "by the BQE",
];

interface ShimmerTextProps {
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
  /**
   * The location to shimmer into on the initial animation.
   * Only used when initialShimmerDelay is set.
   */
  initialLocation?: string;
  /**
   * Custom list of words/verbs to cycle through.
   * Defaults to DEFAULT_WORDS if not provided.
   */
  words?: string[];
}

export interface ShimmerTextRef {
  trigger: () => void;
}

const ShimmerTextComponent = forwardRef<ShimmerTextRef, ShimmerTextProps>(({
  wipeDuration = 0.65,
  pauseDuration = 5.025, // Adjusted so total cycle is 5.675 seconds (5.025 + 0.65 = 5.675)
  initialShimmerDelay,
  initialWord,
  initialLocation,
  words = DEFAULT_WORDS,
}, ref) => {
  const [currentWord, setCurrentWord] = useState("Designing");
  const [previousWord, setPreviousWord] = useState("Designing");
  const [currentLocation, setCurrentLocation] = useState("in New York");
  const [previousLocation, setPreviousLocation] = useState("in New York");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPrismaticAnimating, setIsPrismaticAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prismaticTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prismaticEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getRandomWord = useCallback((excludeWord: string) => {
    let newWord: string;
    do {
      const randomIndex = Math.floor(Math.random() * words.length);
      newWord = words[randomIndex];
    } while (newWord === excludeWord);
    return newWord;
  }, [words]);

  const getRandomLocation = useCallback((excludeLocation: string) => {
    let newLocation: string;
    do {
      const randomIndex = Math.floor(Math.random() * LOCATIONS.length);
      newLocation = LOCATIONS[randomIndex];
    } while (newLocation === excludeLocation);
    return newLocation;
  }, []);

  const triggerAnimation = useCallback((targetWord?: string, targetLocation?: string) => {
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
    setCurrentLocation((prev) => {
      setPreviousLocation(prev);
      return targetLocation || getRandomLocation(prev);
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
  }, [wipeDuration, getRandomWord, getRandomLocation]);

  useImperativeHandle(ref, () => ({
    trigger: triggerAnimation,
  }), [triggerAnimation]);

  const startInterval = useCallback(() => {
    const totalCycleDuration = (wipeDuration + pauseDuration) * 1000;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      triggerAnimation();
    }, totalCycleDuration);
  }, [wipeDuration, pauseDuration, triggerAnimation]);

  // Trigger initial shimmer on mount if delay is specified
  useEffect(() => {
    if (initialShimmerDelay === undefined) {
      // If no initial delay, start interval immediately
      startInterval();
      return;
    }

    // Trigger first shimmer with the same starting text (shimmer from start to start)
    const initialTimeout = setTimeout(() => {
      const wordToUse = initialWord || "Designing";
      const locationToUse = initialLocation || "in New York";
      triggerAnimation(wordToUse, locationToUse);
      
      // After one full cycle, trigger first random shimmer and start the interval
      const totalCycleDuration = (wipeDuration + pauseDuration) * 1000;
      setTimeout(() => {
        triggerAnimation(); // First random shimmer
        startInterval(); // Start interval for subsequent shimmers
      }, totalCycleDuration);
    }, initialShimmerDelay * 1000);

    return () => clearTimeout(initialTimeout);
  }, [initialShimmerDelay, initialWord, initialLocation, triggerAnimation, startInterval, wipeDuration, pauseDuration]);

  useEffect(() => {
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
  }, []);

  const fullTextNew = `${currentWord} ${currentLocation}...`;
  const fullTextOld = `${previousWord} ${previousLocation}...`;

  const handleClick = useCallback(() => {
    triggerAnimation();
    startInterval(); // Reset the timer
  }, [triggerAnimation, startInterval]);

  return (
    <p
      className="shimmer-container text-sm"
      onClick={handleClick}
      style={
        {
          "--wipe-duration": `${wipeDuration}s`,
          "--prismatic-duration": `${wipeDuration * 1.4}s`,
          cursor: "default",
          userSelect: "none",
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
