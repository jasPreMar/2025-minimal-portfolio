"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { ContentWrapper } from "@/components/content-wrapper";

export function AnimatedHeader() {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = useState(false);

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
  const linkContent = (
    <span
      className="inline-block transition-transform duration-200 ease-out"
      style={{
        transform: isHovered && !isHomePage ? "translateX(-2px)" : "translateX(0)",
      }}
    >
      Jason Marsh
    </span>
  );

  return (
    <ContentWrapper as="header">
      <div className="flex items-center gap-1 text-xl font-semibold tracking-tight min-h-[28px]">
        {isHomePage ? (
          <span
            className="relative rounded-md select-none transition-colors duration-150 bg-transparent"
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
            className={`relative rounded-md cursor-pointer select-none transition-colors duration-150 ${
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
    </ContentWrapper>
  );
}
