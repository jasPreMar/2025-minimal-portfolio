import { ShimmerText } from "@/components/shimmer-text";
import { ProjectLink } from "@/components/project-link";
import { PageTransition } from "@/components/page-transition";
import { getAllProjects } from "@/lib/notion";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function Home() {
  // Fetch projects from Notion
  // Automatically filters by environment:
  // - Production: only "Go live" projects
  // - Development: "Draft" and "Go live" (excludes "Not started" and "Reject")
  const projects = await getAllProjects();

  return (
    <PageTransition direction="left">
      <div className="flex flex-col gap-20">
        {/* Shimmer text below header */}
        <div className="-mt-16">
          <ShimmerText />
        </div>

        {/* Projects section */}
        <div className="flex flex-col gap-4">
          <p className="text-base font-semibold">Projects</p>
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
      </div>
    </PageTransition>
  );
}
