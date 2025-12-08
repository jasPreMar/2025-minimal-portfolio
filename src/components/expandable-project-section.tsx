"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface Project {
  id: string;
  title: string;
  company: string;
  slug: string;
  heroImages: string[];
  [key: string]: unknown;
}

interface ExpandableProjectSectionProps {
  title: string;
  projects: Project[];
  firstItemAsMainLink?: boolean;
}

// Thumbnail image with skeleton loading
function ThumbnailImage({
  src,
}: {
  src: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);

  return (
    <div
      className="relative flex-shrink-0 h-[90px] rounded-lg overflow-hidden bg-muted border border-border group/thumb"
      style={{ aspectRatio }}
    >
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      <Image
        src={src}
        alt=""
        fill
        className={`object-cover transition-all duration-500 ease-out group-hover/thumb:scale-[1.06] ${isLoading ? "opacity-0" : "opacity-100"}`}
        unoptimized
        onLoad={(e) => {
          const img = e.currentTarget;
          if (img.naturalWidth && img.naturalHeight) {
            setAspectRatio(img.naturalWidth / img.naturalHeight);
          }
          setIsLoading(false);
        }}
      />
    </div>
  );
}

// Project link with thumbnail carousel inside
function ProjectLinkWithThumbnails({
  project,
  href,
  isExpanded,
}: {
  project: Project;
  href: string;
  isExpanded: boolean;
}) {
  const arrowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
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
    if (!supportsHover) return;
    setIsHovered(true);
    if (arrowRef.current) {
      arrowRef.current.style.transition = "transform 0ms";
      arrowRef.current.style.transform = "translateX(0.25rem)";
    }
  };

  const handleMouseLeave = () => {
    if (!supportsHover) return;
    setIsHovered(false);
    if (arrowRef.current) {
      arrowRef.current.style.transition = "transform 200ms ease-out";
      arrowRef.current.style.transform = "translateX(0)";
    }
  };

  const showHoverBg = isHovered;

  return (
    <Link
      href={href}
      className={`group flex flex-col ${
        isExpanded
          ? "rounded-xl px-3 -mx-3 py-3"
          : "project-link py-2 min-[480px]:py-1"
      }`}
      style={isExpanded ? {
        backgroundColor: showHoverBg ? "var(--accent)" : "transparent",
        transition: showHoverBg ? "none" : "background-color 150ms ease-out",
      } : undefined}
      onMouseEnter={supportsHover ? handleMouseEnter : undefined}
      onMouseLeave={supportsHover ? handleMouseLeave : undefined}
    >
      {/* Text row */}
      <div className="flex items-center w-full justify-between min-[480px]:w-fit min-[480px]:justify-start min-[480px]:gap-2">
        <span className={`truncate ${isExpanded ? "" : "project-link-text"}`}>
          {project.title} - {project.company}
        </span>
        <div
          ref={arrowRef}
          className="project-link-arrow flex items-center justify-center w-6 h-6 shrink-0"
        >
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>

      {/* Animated thumbnail container */}
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{
          maxHeight: isExpanded && project.heroImages.length > 0 ? "110px" : "0px",
          opacity: isExpanded ? 1 : 0,
          marginTop: isExpanded && project.heroImages.length > 0 ? "8px" : "0px",
        }}
      >
        <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
          {project.heroImages.map((src, index) => (
            <ThumbnailImage
              key={`${src}-${index}`}
              src={src}
            />
          ))}
        </div>
      </div>
    </Link>
  );
}

export function ExpandableProjectSection({
  title,
  projects,
  firstItemAsMainLink = false,
}: ExpandableProjectSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsExpanded(scrollY >= 120);
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold">{title}</p>
      <div className={`flex flex-col ${isExpanded ? "gap-1" : "gap-0"}`}>
        {projects.map((project, index) => (
          <ProjectLinkWithThumbnails
            key={project.id}
            project={project}
            href={
              firstItemAsMainLink && index === 0
                ? "/projects"
                : `/projects#${project.slug}`
            }
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
}
