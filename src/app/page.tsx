import { ShimmerText } from "@/components/shimmer-text";
import { ProjectLink } from "@/components/project-link";
import { StaggeredFadeIn } from "@/components/staggered-fade-in";
import { ExperienceSection } from "@/components/experience-section";
import EmailCopyButton from "@/components/email-copy-button";
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { ExpandableProjectSection } from "@/components/expandable-project-section";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Section component that only renders if there are projects
function ProjectSection({
  title,
  projects,
  firstItemAsMainLink = false,
}: {
  title: string;
  projects: NotionProject[];
  firstItemAsMainLink?: boolean;
}) {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold">{title}</p>
      <div className="flex flex-col gap-0">
        {projects.map((project, index) => (
          <ProjectLink
            key={project.id}
            name={`${project.title} - ${project.company}`}
            href={
              firstItemAsMainLink && index === 0
                ? "/projects"
                : `/projects#${project.slug}`
            }
          />
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  // Fetch projects from Notion
  // Automatically filters by environment:
  // - Production: only "Live" projects
  // - Development: "Draft", "Ready", and "Live" (excludes "Not started" and "Rejected")
  const allProjects = await getAllProjects();

  // Split projects by type
  const projects = allProjects.filter((p) => p.projectType === "Project");
  const sideProjects = allProjects.filter((p) => p.projectType === "Side Project");

  return (
    <StaggeredFadeIn initialDelay={0.25} staggerDelay={0.18} duration={0.45}>
      {/* Section 1: Shimmer text below header */}
      <div className="flex flex-col gap-6 w-full h-fit">
        <ShimmerText initialShimmerDelay={0.25} initialWord="Designing" />
        <p className="mt-0 text-base w-full h-fit">
          Currently designing conversational AI interfaces at CarMax. I enjoy hidden details, differing perspectives, and bold ideas.
        </p>
        <div className="mt-1 w-full h-fit">
          <EmailCopyButton />
        </div>
      </div>

      {/* Section 2: Projects - only renders if there are projects */}
      {projects.length > 0 && (
        <ExpandableProjectSection title="Projects" projects={projects} />
      )}

      {/* Section 3: Side Projects - only renders if there are side projects */}
      {sideProjects.length > 0 && (
        <ExpandableProjectSection title="Side Projects" projects={sideProjects} />
      )}

      {/* Section 4: Experience */}
      <ExperienceSection />
    </StaggeredFadeIn>
  );
}
