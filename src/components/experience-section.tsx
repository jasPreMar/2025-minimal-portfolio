"use client";

import { ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Experience {
  title: string;
  company: string;
  startYear: string;
  endYear: string;
  location: string;
}

const experiences: Experience[] = [
  {
    title: "Senior Product Designer",
    company: "CarMax",
    startYear: "2022",
    endYear: "Now",
    location: "Brooklyn, NY",
  },
  {
    title: "Senior Product Designer",
    company: "Mad Mobile",
    startYear: "2021",
    endYear: "2022",
    location: "Remote",
  },
  {
    title: "Senior User Experience Designer",
    company: "The Home Depot",
    startYear: "2018",
    endYear: "2021",
    location: "Atlanta, GA",
  },
  {
    title: "User Experience Designer",
    company: "The Home Depot",
    startYear: "2017",
    endYear: "2018",
    location: "Atlanta, GA",
  },
  {
    title: "UX Designer",
    company: "Mendr",
    startYear: "2017",
    endYear: "2017",
    location: "Dallas, TX",
  },
  {
    title: "User Experience Designer",
    company: "Happy Medium LLC",
    startYear: "2016",
    endYear: "2017",
    location: "Dallas, TX",
  },
];

function ExperienceItem({ experience }: { experience: Experience }) {
  return (
    <>
      <div className="text-secondary py-4">
        {experience.startYear} — {experience.endYear}
      </div>
      <div className="flex flex-col gap-1 py-4">
        <div className="text-foreground">
          {experience.title} at {experience.company}
        </div>
        <div className="text-secondary">
          {experience.location}
        </div>
      </div>
    </>
  );
}

const LINKEDIN_URL = "linkedin.com/in/jpmarsh";

export function ExperienceSection() {
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
    if (supportsHover) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover) {
      setIsHovered(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`https://www.${LINKEDIN_URL}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 w-fit"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span className="text-base font-semibold group-hover:underline underline-offset-2">
              Experience
            </span>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, x: 0 }}
                  animate={{ opacity: 1, x: "0.25rem" }}
                  exit={{
                    x: 0,
                    opacity: 0,
                    transition: {
                      x: { duration: 0.2, ease: "easeOut" },
                      opacity: { duration: 0.2, ease: "easeOut" }
                    }
                  }}
                  transition={{
                    opacity: { duration: 0.2 },
                    x: { 
                      duration: 0,
                      ease: "easeOut"
                    }
                  }}
                  className="flex items-center justify-center w-6 h-6 shrink-0"
                >
                  <ArrowUpRight size={16} strokeWidth={2} />
                </motion.div>
              )}
            </AnimatePresence>
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <p>{LINKEDIN_URL}</p>
        </TooltipContent>
      </Tooltip>
      <div className="grid grid-cols-[max-content_1fr] gap-4">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
    </div>
  );
}

