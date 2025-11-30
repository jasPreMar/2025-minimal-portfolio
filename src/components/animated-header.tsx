"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { getProjectTitle } from "@/lib/projects";

export function AnimatedHeader() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract project slug from pathname
  const projectSlugMatch = pathname.match(/^\/projects\/([^/]+)/);
  const projectSlug = projectSlugMatch ? projectSlugMatch[1] : null;
  const projectTitle = projectSlug ? getProjectTitle(projectSlug) : null;
  const isProjectPage = projectTitle !== null;

  const handleBackClick = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center gap-0 text-xl font-semibold tracking-tight min-h-[28px]">
      {/* "J" that's always visible, clickable when on project page */}
      <motion.div
        className={`relative ${isProjectPage ? "cursor-pointer" : ""}`}
        onClick={isProjectPage ? handleBackClick : undefined}
        whileHover={isProjectPage ? { opacity: 0.7 } : undefined}
        style={{
          padding: isProjectPage ? "8px" : "0",
          margin: isProjectPage ? "-8px" : "0",
        }}
      >
        <span>J</span>
      </motion.div>

      {/* "ason Marsh" - simple fade with delay only when entering (back home) */}
      <AnimatePresence mode="popLayout">
        {!isProjectPage && (
          <motion.span
            key="ason-marsh"
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
        {isProjectPage && (
          <motion.div
            key="breadcrumb"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{
              duration: 0.35,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex items-center"
          >
            <span className="text-secondary mx-2 font-normal">/</span>
            <span>{projectTitle}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
