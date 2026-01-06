"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

interface ProjectLinkProps {
  name: string;
  href?: string;
}

export function ProjectLink({ name, href = "#" }: ProjectLinkProps) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    // Check if device supports hover (not a touch device)
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleMouseEnter = () => {
    if (arrowRef.current && supportsHover) {
      arrowRef.current.style.transition = "transform 0ms";
      arrowRef.current.style.transform = "translateX(0.25rem)";
    }
  };

  const handleMouseLeave = () => {
    if (arrowRef.current && supportsHover) {
      arrowRef.current.style.transition = "transform 200ms ease-out";
      arrowRef.current.style.transform = "translateX(0)";
    }
  };

  const handleTouchStart = () => {
    // On touch devices, clear any stuck hover states
    if (!supportsHover && arrowRef.current) {
      arrowRef.current.style.transition = "transform 200ms ease-out";
      arrowRef.current.style.transform = "translateX(0)";
    }
  };

  // Clear hover state when clicking/tapping elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (linkRef.current && !linkRef.current.contains(e.target as Node)) {
        if (arrowRef.current && !supportsHover) {
          arrowRef.current.style.transition = "transform 200ms ease-out";
          arrowRef.current.style.transform = "translateX(0)";
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [supportsHover]);

  return (
    <Link
      ref={linkRef}
      href={href}
      className="project-link group flex items-center py-2 min-[480px]:py-1 w-full justify-between min-[480px]:w-fit min-[480px]:justify-start min-[480px]:gap-2"
      onMouseEnter={supportsHover ? handleMouseEnter : undefined}
      onMouseLeave={supportsHover ? handleMouseLeave : undefined}
      onTouchStart={handleTouchStart}
    >
      <span className="project-link-text truncate">
        {name}
      </span>
      <div
        ref={arrowRef}
        className="project-link-arrow flex items-center justify-center w-6 h-6 shrink-0"
      >
        <ArrowRight size={16} strokeWidth={2} />
      </div>
    </Link>
  );
}
