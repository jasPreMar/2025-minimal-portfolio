import { ProjectLink } from "@/components/project-link";
import { StaggeredFadeIn } from "@/components/staggered-fade-in";
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { ExpandableProjectSection } from "@/components/expandable-project-section";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";
import { aiPatternLibraryProject } from "@/lib/ai-pattern-library-data";
import { ContentWrapper } from "@/components/content-wrapper";

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
            name={project.title}
            href={
              firstItemAsMainLink && index === 0
                ? `/projects/${projects[0].slug}`
                : `/projects/${project.slug}`
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
  const notionProjects = allProjects.filter((p) => p.projectType === "Project");
  const sideProjects = allProjects.filter((p) => p.projectType === "Side Project");

  // Create hardcoded project entries for the home page carousel
  const chatgptAppHomeProject = {
    id: "hardcoded-chatgpt-app",
    title: chatgptAppProject.title,
    company: chatgptAppProject.company,
    slug: chatgptAppProject.slug,
    heroImages: ["/projects/Final Multi-car.png"],
    finalScreens: [
      "/projects/Personal AI concept.png",
      "/projects/Mock ChatGPT app.png",
      "/projects/Mock OpenAI logos.png",
      "/projects/MVP Single car.png",
      "/projects/MVP Multi-car.png",
      "/projects/Final Single car.png",
      "/projects/Final Multi-car.png",
    ],
    subtitle: chatgptAppProject.subtitle,
    featured: false,
  };

  const aiPatternLibraryHomeProject = {
    id: "hardcoded-ai-pattern-library",
    title: aiPatternLibraryProject.title,
    company: aiPatternLibraryProject.company,
    slug: aiPatternLibraryProject.slug,
    heroImages: ["/projects/ai-pattern-library-hero.png"],
    finalScreens: [
      "/projects/ai-pattern-library-components.png",
      "/projects/ai-pattern-library-variants.png",
      "/projects/ai-pattern-library-storybook.gif",
    ],
    subtitle: aiPatternLibraryProject.subtitle,
    featured: false,
  };

  // Prepend hardcoded projects to the list
  const projects = [aiPatternLibraryHomeProject, chatgptAppHomeProject, ...notionProjects];

  return (
    <StaggeredFadeIn initialDelay={0.25} staggerDelay={0.18} duration={0.45}>
      {/* Section 1: Projects - only renders if there are projects */}
      {projects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection title="Projects" projects={projects} />
        </ContentWrapper>
      )}

      {/* Section 2: Side Projects - only renders if there are side projects */}
      {sideProjects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection title="Side Projects" projects={sideProjects} />
        </ContentWrapper>
      )}
    </StaggeredFadeIn>
  );
}
