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

  return (
    <Link
      href={href}
      className="project-link group flex items-center py-2 min-[480px]:py-1 w-full justify-between min-[480px]:w-fit min-[480px]:justify-start min-[480px]:gap-2"
      onMouseEnter={supportsHover ? handleMouseEnter : undefined}
      onMouseLeave={supportsHover ? handleMouseLeave : undefined}
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
