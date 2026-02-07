"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { ContentWrapper } from "@/components/content-wrapper";
import { ShimmerText } from "@/components/shimmer-text";
import EmailCopyButton from "@/components/email-copy-button";
import { Rulers } from "@/components/rulers";
import { Ruler } from "lucide-react";
import { motion } from "motion/react";
import { getVerbsForPath } from "@/lib/project-verbs";

export function AnimatedHeader() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isRulerFilled, setIsRulerFilled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [lastScrollDown, setLastScrollDown] = useState(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const prevScrollY = useRef(0);

  // Detect when header is stuck at top (scrolled past initial offset)
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Track last scroll direction for sticky header dimming
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY ?? document.documentElement.scrollTop;
      setLastScrollDown(y > prevScrollY.current);
      prevScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  
  // Get project-specific verbs based on current path
  const projectVerbs = useMemo(() => getVerbsForPath(pathname), [pathname]);

  // Detect if device supports touch
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleClick = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    // Only set hover state on non-touch devices
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle touch events to prevent stuck hover state on mobile
  const handleTouchStart = useCallback(() => {
    // Prevent hover state from being set on touch devices
    setIsHovered(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    // Immediately clear hover state on touch end
    setIsHovered(false);
  }, []);

  // Use Link for prefetching, but render as span when on home page
  const linkContent = <span>Jason Marsh</span>;

  return (
    <>
    <Rulers visible={isRulerFilled} />
    <div ref={sentinelRef} className="h-px w-full -mt-px" aria-hidden />
    <div
      className={`sticky top-0 z-10 -mt-px ${isStuck ? "py-3 nav-sticky-gradient flex items-center" : "bg-background"}`}
      onMouseEnter={() => setIsHeaderHovered(true)}
      onMouseLeave={() => setIsHeaderHovered(false)}
    >
      <ContentWrapper as="header">
        <div
          className="flex items-center gap-4 w-full transition-opacity duration-200"
          style={{ opacity: isHeaderHovered ? 1 : isStuck && lastScrollDown ? 0.12 : 1 }}
        >
        {/* Left side: Name and shimmer text stacked (shimmer hidden when stuck) */}
        <div className="flex flex-col min-w-0 flex-1 overflow-visible">
          <div className={`flex items-center gap-1 text-xl font-semibold tracking-tight ${isStuck ? "" : "min-h-[28px]"}`}>
            {isHomePage ? (
              <span
                className={`relative rounded-md cursor-pointer select-none transition-colors duration-150 truncate ${
                  isHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding: "2px 10px",
                  margin: "-2px -10px",
                }}
              >
                {linkContent}
              </span>
            ) : (
              <Link
                href="/"
                prefetch={true}
                className={`relative rounded-md cursor-pointer select-none transition-colors duration-150 truncate ${
                  isHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
                }`}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                  padding: "2px 10px",
                  margin: "-2px -10px",
                }}
              >
                {linkContent}
              </Link>
            )}
          </div>
          {!isStuck && (
            <div className="truncate">
              <ShimmerText 
                initialShimmerDelay={0.25} 
                initialWord="Designing" 
                words={projectVerbs}
              />
            </div>
          )}
        </div>

        {/* Right side: Email copy button */}
        <div className="flex-shrink-0 mb-0 flex items-center gap-2">
          {/* Ruler button temporarily commented out
          <motion.button
            className="email-button-chromatic outline-none h-10 w-10 hidden sm:flex items-center justify-center rounded-lg focus-visible:ring-1 focus-visible:ring-[oklch(0.145_0_0)] focus-visible:ring-offset-1 focus:outline-none bg-[oklch(1_0_0)] text-[oklch(0.145_0_0)] font-sans cursor-pointer"
            aria-label="Ruler"
            onClick={() => setIsRulerFilled(!isRulerFilled)}
            whileTap={{
              y: 0.5,
              boxShadow: "0 0 0 1px #00000014, 0px 1px 1px #0000000a, inset 0 1.25px 0 0 rgba(255, 255, 255, 0.12), inset 0 -1px 0 0 rgba(0, 0, 0, 0.12), inset 0 2.5px 5px 0 rgba(0, 0, 0, 0.15), inset 0 -2px 4px 0 rgba(255, 255, 255, 0.15)"
            }}
            transition={{ duration: 0.1 }}
          >
            <Ruler 
              size={16} 
              strokeWidth={2} 
              fill="none"
            />
          </motion.button>
          */}
          <EmailCopyButton />
        </div>
      </div>
      </ContentWrapper>
    </div>
    </>
  );
}
