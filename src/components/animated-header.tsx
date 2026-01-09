"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { ContentWrapper } from "@/components/content-wrapper";
import { ShimmerText } from "@/components/shimmer-text";
import EmailCopyButton from "@/components/email-copy-button";
import { Rulers } from "@/components/rulers";
import { Ruler } from "lucide-react";
import { motion } from "motion/react";

export function AnimatedHeader() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const [isRulerFilled, setIsRulerFilled] = useState(false);

  const isHomePage = pathname === "/";

  const handleClick = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Handle touch events to prevent stuck hover state on mobile
  const handleTouchEnd = useCallback(() => {
    // Small delay to allow the click to register first
    setTimeout(() => {
      setIsHovered(false);
    }, 100);
  }, []);

  // Use Link for prefetching, but render as span when on home page
  const linkContent = <span>Jason Marsh</span>;

  return (
    <>
    <Rulers visible={isRulerFilled} />
    <ContentWrapper as="header">
      <div className="flex items-center gap-4 w-full">
        {/* Left side: Name and shimmer text stacked */}
        <div className="flex flex-col min-w-0 flex-1 overflow-visible">
          <div className="flex items-center gap-1 text-xl font-semibold tracking-tight min-h-[28px]">
            {isHomePage ? (
              <span
                className={`relative rounded-xl cursor-pointer select-none transition-colors duration-150 truncate ${
                  isHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
                }`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                className={`relative rounded-xl cursor-pointer select-none transition-colors duration-150 truncate ${
                  isHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
                }`}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
          <div className="truncate">
            <ShimmerText initialShimmerDelay={0.25} initialWord="Designing" />
          </div>
        </div>

        {/* Right side: Ruler button and Email copy button */}
        <div className="flex-shrink-0 mb-0 flex items-center gap-2">
          <motion.button
            className="email-button-chromatic outline-none h-10 w-10 hidden sm:flex items-center justify-center rounded-lg focus-visible:ring-1 focus-visible:ring-[oklch(0.145_0_0)] focus-visible:ring-offset-1 focus:outline-none bg-[oklch(1_0_0)] text-[oklch(0.145_0_0)] font-sans cursor-pointer"
            aria-label="Ruler"
            onClick={() => setIsRulerFilled(!isRulerFilled)}
          >
            <Ruler 
              size={16} 
              strokeWidth={2} 
              fill="none"
            />
          </motion.button>
          <EmailCopyButton />
        </div>
      </div>
    </ContentWrapper>
    </>
  );
}
