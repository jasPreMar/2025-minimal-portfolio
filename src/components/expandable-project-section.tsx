"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

interface Project {
  id: string;
  title: string;
  company: string;
  slug: string;
  heroImages: string[];
  finalScreens?: string[];
  subtitle?: string;
  featured?: boolean;
  [key: string]: unknown;
}

interface ExpandableProjectSectionProps {
  title: string;
  projects: Project[];
}

// Fullscreen image component with zoom/pan functionality
function FullscreenImage({
  url,
  isZoomed,
  onToggleZoom,
}: {
  url: string;
  isZoomed: boolean;
  onToggleZoom: () => void;
}) {
  const [panPosition, setPanPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ mouseX: number; mouseY: number; panX: number; panY: number } | null>(null);

  useEffect(() => {
    if (!isZoomed) {
      setPanPosition({ x: 50, y: 50 });
    }
  }, [isZoomed]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed) return;
      setIsDragging(true);
      dragStartRef.current = {
        mouseX: e.clientX,
        mouseY: e.clientY,
        panX: panPosition.x,
        panY: panPosition.y,
      };
    },
    [isZoomed, panPosition]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isZoomed || !isDragging || !dragStartRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = ((e.clientX - dragStartRef.current.mouseX) / rect.width) * 100;
      const deltaY = ((e.clientY - dragStartRef.current.mouseY) / rect.height) * 100;
      setPanPosition({
        x: dragStartRef.current.panX - deltaX,
        y: dragStartRef.current.panY - deltaY,
      });
    },
    [isZoomed, isDragging]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!isZoomed) return;
      const touch = e.touches[0];
      dragStartRef.current = {
        mouseX: touch.clientX,
        mouseY: touch.clientY,
        panX: panPosition.x,
        panY: panPosition.y,
      };
    },
    [isZoomed, panPosition]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isZoomed || !dragStartRef.current) return;
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      const deltaX = ((touch.clientX - dragStartRef.current.mouseX) / rect.width) * 100;
      const deltaY = ((touch.clientY - dragStartRef.current.mouseY) / rect.height) * 100;
      setPanPosition({
        x: dragStartRef.current.panX - deltaX,
        y: dragStartRef.current.panY - deltaY,
      });
    },
    [isZoomed]
  );

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        cursor: isZoomed ? (isDragging ? "grabbing" : "grab") : "zoom-in",
      }}
      onClick={() => {
        if (!isDragging) onToggleZoom();
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => { dragStartRef.current = null; }}
    >
      <Image
        src={url}
        alt=""
        fill
        className="transition-none"
        style={{
          objectFit: isZoomed ? "cover" : "contain",
          objectPosition: isZoomed ? `${panPosition.x}% ${panPosition.y}%` : "center",
        }}
        unoptimized
        draggable={false}
      />
    </div>
  );
}

// Fullscreen carousel view
function FullscreenCarousel({
  items,
  initialIndex,
  onClose,
}: {
  items: string[];
  initialIndex: number;
  onClose: () => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const showCounter = items.length > 1;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current && initialIndex > 0) {
      const scrollContainer = scrollRef.current;
      const slideWidth = scrollContainer.clientWidth + 8;
      scrollContainer.scrollLeft = slideWidth * initialIndex;
    }
  }, [initialIndex]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const slideWidth = scrollContainer.clientWidth + 8;
      const newIndex = Math.round(scrollContainer.scrollLeft / slideWidth);
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < items.length) {
        setCurrentIndex(newIndex);
        setIsZoomed(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [currentIndex, items.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.style.overflowX = isZoomed ? "hidden" : "auto";
    }
  }, [isZoomed]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "#e5e5e5" }}
    >
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: "56px" }}
      >
        <button
          onClick={onClose}
          className="p-2 -ml-2 transition-colors cursor-pointer text-foreground"
          aria-label="Close fullscreen"
        >
          <ChevronLeft size={28} />
        </button>
        {showCounter && (
          <span className="text-sm font-medium text-foreground">
            {currentIndex + 1} / {items.length}
          </span>
        )}
      </div>

      <div
        className="flex-1 flex items-center justify-center"
        style={{
          position: "relative",
          top: "14px",
          maxHeight: "calc(100% - 70px)",
        }}
      >
        <div
          ref={scrollRef}
          className="w-full h-full flex overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: isZoomed ? "none" : "x mandatory",
            gap: "8px",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {items.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="flex-shrink-0 w-full h-full relative"
              style={{ scrollSnapAlign: "start" }}
            >
              <FullscreenImage
                url={url}
                isZoomed={isZoomed && index === currentIndex}
                onToggleZoom={() => setIsZoomed(!isZoomed)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
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
      className="relative flex-shrink-0 h-[90px] rounded-lg overflow-hidden bg-muted group/thumb"
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
      {/* Border overlay - stays above scaled image */}
      <div className="absolute inset-0 rounded-lg pointer-events-none z-10 image-inner-shadow" />
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
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isPrismaticShimmering, setIsPrismaticShimmering] = useState(false);
  const prismaticTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const prismaticEndTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    if (supportsHover) {
      setIsHovered(true);
      if (arrowRef.current) {
        arrowRef.current.style.transition = "transform 0ms";
        arrowRef.current.style.transform = "translateX(0.25rem)";
      }
      
      // Trigger shimmer effect on hover
      const prismaticDuration = 0.91; // Duration in seconds
      
      // Clear any existing timeouts
      if (prismaticTimeoutRef.current) clearTimeout(prismaticTimeoutRef.current);
      if (prismaticEndTimeoutRef.current) clearTimeout(prismaticEndTimeoutRef.current);
      
      // Start prismatic shimmer immediately
      setIsPrismaticShimmering(true);
      
      // End prismatic shimmer
      prismaticEndTimeoutRef.current = setTimeout(() => {
        setIsPrismaticShimmering(false);
      }, prismaticDuration * 1000);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover) {
      setIsHovered(false);
      if (arrowRef.current) {
        arrowRef.current.style.transition = "transform 200ms ease-out";
        arrowRef.current.style.transform = "translateX(0)";
      }
    }
  };

  const handleTouchStart = () => {
    // On touch devices, clear any stuck hover states
    if (!supportsHover) {
      setIsHovered(false);
      if (arrowRef.current) {
        arrowRef.current.style.transition = "transform 200ms ease-out";
        arrowRef.current.style.transform = "translateX(0)";
      }
    }
  };

  // Clear hover state when clicking/tapping elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (linkRef.current && !linkRef.current.contains(e.target as Node)) {
        if (!supportsHover) {
          setIsHovered(false);
          if (arrowRef.current) {
            arrowRef.current.style.transition = "transform 200ms ease-out";
            arrowRef.current.style.transform = "translateX(0)";
          }
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


  const showHoverBg = isHovered;

  return (
    <Link
      ref={linkRef}
      href={href}
      className={`group flex flex-col rounded-xl px-3 -mx-3 py-2 min-[480px]:py-2 ${
        showHoverBg ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
      }`}
      style={{
        transition: showHoverBg ? "none" : "background-color 150ms ease-out",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {/* Title and arrow row */}
      <div className="flex items-center w-full justify-between gap-1 min-[480px]:w-fit min-[480px]:justify-start min-[480px]:gap-2">
        <span
          className="truncate whitespace-nowrap"
          style={
            {
              "--prismatic-duration": "0.91s",
              position: "relative",
              display: "block",
            } as React.CSSProperties
          }
        >
          {/* Base text */}
          <span className="truncate block">
            {isExpanded ? (
              <>
                {project.title} <span className="text-secondary">- {project.company}</span>
              </>
            ) : (
              project.title
            )}
          </span>
          {/* Prismatic shimmer */}
          {isPrismaticShimmering && (
            <span
              className="shimmer-prismatic shimmer-animating"
              aria-hidden="true"
            >
              {isExpanded ? `${project.title} - ${project.company}` : project.title}
            </span>
          )}
        </span>
        {project.featured && (
          <Badge variant="featured" className="shrink-0 ml-2">
            New
          </Badge>
        )}
        <div
          ref={arrowRef}
          className="project-link-arrow flex items-center justify-center w-6 h-6 shrink-0"
        >
          <ArrowRight size={16} strokeWidth={2} />
        </div>
      </div>

      {/* Subtitle row - only in expanded mode */}
      {isExpanded && project.subtitle && (
        <div className="overflow-hidden mt-0.5">
          <p className="text-secondary text-sm truncate whitespace-nowrap">
            {project.subtitle}
          </p>
        </div>
      )}

      {/* Animated thumbnail container */}
      {(() => {
        const allImages = [...project.heroImages, ...(project.finalScreens || [])];
        return (
          <div
            className="overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxHeight: isExpanded && allImages.length > 0 ? "110px" : "0px",
              opacity: isExpanded ? 1 : 0,
              marginTop: isExpanded && allImages.length > 0 ? "4px" : "0px",
            }}
          >
            <div className="flex gap-2 overflow-x-auto scrollbar-hide py-1">
              {allImages.map((src, index) => (
                <ThumbnailImage
                  key={`${src}-${index}`}
                  src={src}
                />
              ))}
            </div>
          </div>
        );
      })()}
    </Link>
  );
}

export function ExpandableProjectSection({
  title,
  projects,
}: ExpandableProjectSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [fullscreenState, setFullscreenState] = useState<{
    images: string[];
    initialIndex: number;
  } | null>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
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

  const handleImageClick = (project: Project, index: number) => {
    const allImages = [...project.heroImages, ...(project.finalScreens || [])];
    setFullscreenState({
      images: allImages,
      initialIndex: index,
    });
  };

  const handleTitleMouseEnter = () => {
    if (supportsHover) {
      setIsTitleHovered(true);
      if (chevronRef.current) {
        chevronRef.current.style.transition = "transform 200ms ease-out";
        chevronRef.current.style.transform = isExpanded ? "translateY(-2px)" : "translateY(2px)";
      }
    }
  };

  const handleTitleMouseLeave = () => {
    if (supportsHover) {
      setIsTitleHovered(false);
      if (chevronRef.current) {
        chevronRef.current.style.transition = "transform 200ms ease-out";
        chevronRef.current.style.transform = "translateY(0)";
      }
    }
  };

  const handleTitleTouchStart = () => {
    // On touch devices, clear any stuck hover states
    if (!supportsHover) {
      setIsTitleHovered(false);
      if (chevronRef.current) {
        chevronRef.current.style.transition = "transform 200ms ease-out";
        chevronRef.current.style.transform = "translateY(0)";
      }
    }
  };

  // Clear hover state when clicking/tapping elsewhere
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target as Node)) {
        if (!supportsHover) {
          setIsTitleHovered(false);
          if (chevronRef.current) {
            chevronRef.current.style.transition = "transform 200ms ease-out";
            chevronRef.current.style.transform = "translateY(0)";
          }
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

  // Update chevron position when isExpanded changes while hovering
  useEffect(() => {
    if (isTitleHovered && chevronRef.current) {
      chevronRef.current.style.transition = "transform 200ms ease-out";
      chevronRef.current.style.transform = isExpanded ? "translateY(-2px)" : "translateY(2px)";
    }
  }, [isExpanded, isTitleHovered]);

  if (projects.length === 0) return null;

  return (
    <>
      <div className="flex flex-col gap-4">
        <button
          ref={buttonRef}
          onClick={() => setIsExpanded(!isExpanded)}
          className={`project-link flex items-center w-fit justify-start gap-2 rounded-md px-3 -mx-3 py-2 min-[480px]:py-1 cursor-pointer ${
            isTitleHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
          }`}
          style={{
            transition: isTitleHovered ? "none" : "background-color 150ms ease-out",
          }}
          aria-label={isExpanded ? "Collapse projects" : "Expand projects"}
          onMouseEnter={handleTitleMouseEnter}
          onMouseLeave={handleTitleMouseLeave}
          onTouchStart={handleTitleTouchStart}
        >
          <p className="text-base font-semibold font-heading">{title}</p>
          <div
            ref={chevronRef}
            className="flex items-center justify-center w-6 h-6 shrink-0"
            style={{
              transform: "translateY(0)",
              transition: "transform 200ms ease-out",
            }}
          >
            {isExpanded ? (
              <ChevronUp size={16} strokeWidth={2} />
            ) : (
              <ChevronDown size={16} strokeWidth={2} />
            )}
          </div>
        </button>
        <div className={`flex flex-col ${isExpanded ? "gap-5 min-[480px]:gap-1" : "gap-0.5"}`}>
          {projects.map((project) => (
            <ProjectLinkWithThumbnails
              key={project.id}
              project={project}
              href={`/projects/${project.slug}`}
              isExpanded={isExpanded}
            />
          ))}
        </div>
      </div>

      {fullscreenState && (
        <FullscreenCarousel
          items={fullscreenState.images}
          initialIndex={fullscreenState.initialIndex}
          onClose={() => setFullscreenState(null)}
        />
      )}
    </>
  );
}
