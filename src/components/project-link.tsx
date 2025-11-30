"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface ProjectLinkProps {
  name: string;
  href?: string;
}

export function ProjectLink({ name, href = "#" }: ProjectLinkProps) {
  const arrowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (arrowRef.current) {
      arrowRef.current.style.transition = "transform 0ms";
      arrowRef.current.style.transform = "translateX(0.25rem)";
    }
  };

  const handleMouseLeave = () => {
    if (arrowRef.current) {
      arrowRef.current.style.transition = "transform 200ms ease-out";
      arrowRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <Link
      href={href}
      className="project-link group flex items-center py-1 w-full justify-between sm:w-fit sm:justify-start sm:gap-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
