"use client";

import { ArrowUpRight } from "lucide-react";
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
    <div className="grid grid-cols-[max-content_1fr] gap-8 py-4">
      <div className="text-secondary">
        {experience.startYear} — {experience.endYear}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-foreground">
          {experience.title} at {experience.company}
        </div>
        <div className="text-secondary">
          {experience.location}
        </div>
      </div>
    </div>
  );
}

const LINKEDIN_URL = "linkedin.com/in/jpmarsh";

export function ExperienceSection() {
  return (
    <div className="flex flex-col gap-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={`https://www.${LINKEDIN_URL}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 w-fit"
          >
            <span className="text-base font-semibold group-hover:underline underline-offset-2">
              Experience
            </span>
            <ArrowUpRight
              size={16}
              strokeWidth={2}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            />
          </a>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          <p>{LINKEDIN_URL}</p>
        </TooltipContent>
      </Tooltip>
      <div className="flex flex-col">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
    </div>
  );
}

