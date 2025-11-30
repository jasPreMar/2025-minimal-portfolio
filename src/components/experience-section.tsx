"use client";

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
    <div className="grid grid-cols-[140px_1fr] gap-8 py-4">
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

export function ExperienceSection() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold">Experience</p>
      <div className="flex flex-col">
        {experiences.map((experience, index) => (
          <ExperienceItem key={index} experience={experience} />
        ))}
      </div>
    </div>
  );
}

