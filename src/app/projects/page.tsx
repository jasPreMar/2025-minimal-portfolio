import Image from "next/image";
import { ArrowUpRight, Briefcase, Calendar, Users } from "lucide-react";
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { CompactCarousel } from "@/components/compact-carousel";
import { InteractiveImage } from "@/components/interactive-image";
import { SetProjectTitle } from "@/components/project-title-context";

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
  return `${startDate} – ${endDate}`;
}

// Single project section component
function ProjectSection({ project }: { project: NotionProject }) {
  const dateRange = formatDateRange(project.startDate, project.endDate);
  const outcomesList = parseBulletList(project.impactMetrics);
  const contributionsList = parseBulletList(project.keyFindings);

  return (
    <section
      id={project.slug}
      className="flex flex-col gap-6 scroll-mt-32"
    >
      {/* Hero Image */}
      {project.heroImage && (
        <div className="mb-6">
          <InteractiveImage
            src={project.heroImage}
            alt={project.title}
            priority
          />
        </div>
      )}

      {/* Title + Subtitle + Metadata group - tight spacing */}
      <div className="flex flex-col gap-2 mb-6">
        {/* Title */}
        <h2 className="tracking-tight">{project.title}</h2>

        {/* Subtitle */}
        {project.subtitle && (
          <p className="text-xl font-semibold leading-relaxed">
            {project.subtitle}
          </p>
        )}

        {/* Metadata row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-secondary">
          {/* Company */}
          {project.company && (
            <div className="flex items-center gap-2">
              {project.companyLogo && (
                <Image
                  src={project.companyLogo}
                  alt={`${project.company} logo`}
                  width={20}
                  height={20}
                  className="flex-shrink-0"
                  unoptimized
                />
              )}
              <span>{project.company}</span>
            </div>
          )}

          {/* Role */}
          {project.role && (
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} />
              <span>{project.role}</span>
            </div>
          )}

          {/* Date range */}
          {dateRange && (
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{dateRange}</span>
            </div>
          )}

          {/* Team */}
          {project.team && (
            <div className="flex items-center gap-1.5">
              <Users size={16} />
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

      {/* Process Images */}
      {project.processImages.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Process</h3>
          <CompactCarousel images={project.processImages} />
        </div>
      )}

      {/* Final Screens */}
      {project.finalScreens.length > 0 && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Final Screens</h3>
          <CompactCarousel images={project.finalScreens} />
        </div>
      )}

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
          <ul className="list-disc list-inside leading-relaxed space-y-1">
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
          <ul className="list-disc list-inside leading-relaxed space-y-1">
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
    <div className="flex flex-col gap-20 -mt-16">
      {/* Set header title to "Projects" */}
      <SetProjectTitle title="Projects" />

      {/* All projects */}
      {allProjects.map((project) => (
        <ProjectSection key={project.id} project={project} />
      ))}

      {/* Footer spacing */}
      <div className="h-20" />
    </div>
  );
}

