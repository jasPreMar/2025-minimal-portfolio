"use client";

import { useEffect, useRef, useState } from "react";

interface ShimmerKeywordProps {
  children: React.ReactNode;
}

export function ShimmerKeyword({ children }: ShimmerKeywordProps) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated) return;

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry.isIntersecting) {
            setIsAnimating(true);
            setHasAnimated(true);
            observer.disconnect();

            // End animation after it completes
            setTimeout(() => {
              setIsAnimating(false);
            }, 900);
          }
        },
        {
          threshold: 0,
          rootMargin: "0px",
        }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [hasAnimated]);

  return (
    <span
      ref={ref}
      className={`font-semibold ${isAnimating ? "keyword-shimmer-active" : ""}`}
    >
      {children}
    </span>
  );
}
