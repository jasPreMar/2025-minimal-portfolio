import { ShimmerText } from "@/components/shimmer-text";
import { ProjectLink } from "@/components/project-link";
import { StaggeredFadeIn } from "@/components/staggered-fade-in";
import { getAllProjects, type NotionProject } from "@/lib/notion";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Section component that only renders if there are projects
function ProjectSection({
  title,
  projects,
}: {
  title: string;
  projects: NotionProject[];
}) {
  if (projects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold">{title}</p>
      <div className="flex flex-col gap-0">
        {projects.map((project) => (
          <ProjectLink
            key={project.id}
            name={`${project.title} - ${project.company}`}
            href={`/projects/${project.slug}`}
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
      <div className="-mt-16">
        <ShimmerText />
      </div>

      {/* Section 2: Projects - only renders if there are projects */}
      {projects.length > 0 && (
        <ProjectSection title="Projects" projects={projects} />
      )}

      {/* Section 3: Side Projects - only renders if there are side projects */}
      {sideProjects.length > 0 && (
        <ProjectSection title="Side Projects" projects={sideProjects} />
      )}
    </StaggeredFadeIn>
  );
}
