import Image from "next/image";
import { ArrowUpRight, Briefcase, Calendar, Users } from "lucide-react";
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { InteractiveImage } from "@/components/interactive-image";
import { SetProjectTitle } from "@/components/project-title-context";
import { ProjectsStaggeredFade } from "@/components/projects-staggered-fade";
import { HashScroll } from "@/components/hash-scroll";
import { Badge } from "@/components/ui/badge";
import { Preview } from "@/components/preview";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate metadata for SEO
export const metadata = {
  title: "Projects | Jason Marsh",
  description: "A collection of design projects and case studies.",
};

// Parse markdown-style bullet lists into array of strings
function parseBulletList(text: string): string[] {
  if (!text) return [];

  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      // Remove common bullet prefixes
      return line.replace(/^[-•*]\s*/, "").trim();
    })
    .filter((line) => line.length > 0);
}

// Format date range
function formatDateRange(startDate: string, endDate: string | null): string {
  if (!startDate) return "";
  if (!endDate) return startDate;

  // Parse dates (format is like "Jan 12, 2024")
  const parseDate = (dateStr: string) => {
    const parts = dateStr.trim().split(' ');
    const month = parts[0]; // "Jan"
    const year = parts[2]; // "2024" (after the comma)
    return { month, year };
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  // Same year: "Month - Month Year"
  if (start.year === end.year) {
    return `${start.month} – ${end.month} ${start.year}`;
  }

  // Different years: "Year - Year"
  return `${start.year} – ${end.year}`;
}

// Single project section component
function ProjectSection({ project }: { project: NotionProject }) {
  const dateRange = formatDateRange(project.startDate, project.endDate);
  const outcomesList = parseBulletList(project.impactMetrics);
  const contributionsList = parseBulletList(project.keyContributions);

  // Debug: log what we're getting from Notion
  console.log(`\n=== ${project.title} ===`);
  console.log(`background: "${project.background?.substring(0, 100)}..."`);
  console.log(`impactMetrics: "${project.impactMetrics?.substring(0, 100)}..."`);
  console.log(`keyContributions: "${project.keyContributions?.substring(0, 100)}..."`);

  return (
    <section
      id={project.slug}
      className="flex flex-col gap-6 scroll-mt-0 py-28"
    >
      {/* New Badge */}
      {project.featured && (
        <Badge variant="featured" className="w-fit">
          New
        </Badge>
      )}

      {/* Hero Images - Breakout Horizontal Scroll */}
      {project.heroImages.length > 0 && (
        <div className="w-screen ml-[calc(50%-50vw)] overflow-x-auto scrollbar-hide mb-2 -mr-[calc(50%-50vw)] snap-x snap-mandatory">
          <div className="flex gap-2 px-8 md:pl-[calc((100vw-608px)/2+32px)] w-max max-w-none">
            {project.heroImages.map((image, index) => (
              <div
                key={index}
                className="relative w-[calc(100vw-64px)] md:w-[544px] flex-shrink-0 snap-center"
              >
                <InteractiveImage
                  src={image}
                  alt={`${project.title} hero image ${index + 1}`}
                  priority={index === 0}
                />
              </div>
            ))}
            {/* Right padding spacer to match left padding visually when scrolling to end */}
            <div className="w-6 md:w-[calc((100vw-608px)/2+8px)] flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Title + Subtitle + Metadata group - tight spacing */}
      <div className="flex flex-col gap-2 mb-6">
        {/* Title */}
        <h2 className="tracking-tight">{project.title}</h2>

        {/* Subtitle */}
        {project.subtitle && (
          <p className="text-xl font-semibold leading-tight">
            {project.subtitle}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-secondary text-sm max-[480px]:flex-col max-[480px]:items-start">
          {/* Company */}
          {project.company && (
            <div className="flex items-baseline gap-2">
              {project.companyLogo && (
                <Image
                  src={project.companyLogo}
                  alt={`${project.company} logo`}
                  width={16}
                  height={16}
                  className="flex-shrink-0 translate-y-[2px]"
                  unoptimized
                />
              )}
              <span>{project.company}</span>
            </div>
          )}

          {/* Role */}
          {project.role && (
            <div className="flex items-baseline gap-1.5">
              <Briefcase size={16} className="flex-shrink-0 translate-y-[2px]" />
              <span>{project.role}</span>
            </div>
          )}

          {/* Date range */}
          {dateRange && (
            <div className="flex items-baseline gap-1.5">
              <Calendar size={16} className="flex-shrink-0 translate-y-[2px]" />
              <span>{dateRange}</span>
            </div>
          )}

          {/* Team */}
          {project.team && (
            <div className="flex items-baseline gap-1.5">
              <Users size={16} className="flex-shrink-0 translate-y-[2px]" />
              <span>{project.team}</span>
            </div>
          )}
        </div>
      </div>

      {/* Overview */}
      {project.background && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Overview</h3>
          <p className="leading-relaxed whitespace-pre-line">
            {project.background}
          </p>
        </div>
      )}

      {/* Preview */}
      <Preview />

      {/* Prototype Button */}
      {project.prototypeUrl && (
        <div>
          <a
            href={project.prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity"
          >
            Prototype
            <ArrowUpRight size={16} />
          </a>
        </div>
      )}

      {/* Outcomes */}
      {outcomesList.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Outcomes</h3>
          <ul className="list-disc list-outside -ml-6 pl-6 leading-relaxed space-y-1">
            {outcomesList.map((outcome, i) => (
              <li key={i}>{outcome}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Key Contributions */}
      {contributionsList.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Key Contributions</h3>
          <ul className="list-disc list-outside -ml-6 pl-6 leading-relaxed space-y-1">
            {contributionsList.map((contribution, i) => (
              <li key={i}>{contribution}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Keywords/Tags */}
      {project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-full text-sm text-secondary border border-foreground/10"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function ProjectsPage() {
  // Fetch all projects from Notion
  const allProjects = await getAllProjects();

  return (
    <div className="flex flex-col">
      {/* Handle hash scroll for deep links */}
      <HashScroll />

      {/* Set header title to "Projects" */}
      <SetProjectTitle title="Projects" />

      <p className="mt-2 text-base max-w-md">
        A collection of real, impactful, and shipped projects.
      </p>

      {/* All projects with staggered animation */}
      <ProjectsStaggeredFade>
        {allProjects.map((project) => (
          <ProjectSection key={project.id} project={project} />
        ))}
      </ProjectsStaggeredFade>

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  );
}

