"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useProjectTitle } from "./project-title-context";

export function AnimatedHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { title: projectTitle, setTitle } = useProjectTitle();
  const [isHovered, setIsHovered] = useState(false);

  // Check if we're on a project page (either /projects or /projects/*)
  const isProjectPage = (pathname === "/projects" || pathname.startsWith("/projects/")) && projectTitle !== null;

  const handleBackClick = () => {
    // Clear hover state immediately so button styling resets
    setIsHovered(false);
    // Clear title immediately to trigger header animation before navigation
    setTitle(null);
    router.push("/");
  };

  const handleMouseEnter = () => {
    if (isProjectPage) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex items-center gap-1 text-xl font-semibold tracking-tight min-h-[28px]">
      {/* "J" that's always visible, clickable when on project page */}
      <motion.div
        className={`relative rounded-md ${isProjectPage ? "cursor-pointer" : ""} ${
          isHovered ? "bg-black/5 dark:bg-white/5" : "bg-transparent"
        }`}
        onClick={isProjectPage ? handleBackClick : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          padding: isProjectPage ? "2px 10px" : "0",
          margin: isProjectPage ? "-2px -10px" : "0",
          transition: isHovered ? "none" : "background-color 150ms ease-out",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: isHovered ? "translateX(-2px)" : "translateX(0)",
            transition: "transform 200ms ease-out",
          }}
        >
          J
        </span>
      </motion.div>

      {/* Wrapper to maintain width during transitions */}
      <div className="relative inline-block min-w-0">
        {/* "ason Marsh" - simple fade with delay only when entering (back home) */}
        <AnimatePresence mode="popLayout">
          {!isProjectPage && (
            <motion.span
              key="ason-marsh"
              className="-ml-1 whitespace-nowrap inline-block"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {
                  opacity: 0,
                  transition: {
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.25,
                    delay: 0.2,
                    ease: [0.25, 0.1, 0.25, 1],
                  },
                },
              }}
            >
              ason Marsh
            </motion.span>
          )}
        </AnimatePresence>

        {/* Breadcrumb separator and project title - both slide in from the right */}
        <AnimatePresence mode="popLayout">
          {isProjectPage && projectTitle && (
            <motion.div
              key="breadcrumb"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{
                duration: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-center whitespace-nowrap"
              onAnimationStart={(definition) => {
                // When exiting, use absolute positioning to maintain container width
                if (definition === "exit") {
                  const element = document.querySelector('[data-breadcrumb]') as HTMLElement;
                  if (element) {
                    const width = element.offsetWidth;
                    const parent = element.parentElement;
                    if (parent) {
                      parent.style.minWidth = `${width}px`;
                    }
                  }
                }
              }}
              onAnimationComplete={(definition) => {
                // Clear min-width after exit animation completes
                if (definition === "exit") {
                  const element = document.querySelector('[data-breadcrumb]') as HTMLElement;
                  if (element) {
                    const parent = element.parentElement;
                    if (parent) {
                      parent.style.minWidth = "";
                    }
                  }
                }
              }}
              data-breadcrumb
            >
              <span className="text-foreground/10 mx-3 font-normal">/</span>
              <span className="pl-1">{projectTitle}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
