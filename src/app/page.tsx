import { ProjectLink } from "@/components/project-link";
import { StaggeredFadeIn } from "@/components/staggered-fade-in";
import { getAllProjects, type NotionProject } from "@/lib/notion";
import { ExpandableProjectSection } from "@/components/expandable-project-section";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";
import { aiPatternLibraryProject } from "@/lib/ai-pattern-library-data";
import { skye2Project } from "@/lib/skye-2.0-data";
import { cdpProject } from "@/lib/cdp-data";
import { ContentWrapper } from "@/components/content-wrapper";
import { BentoGrid } from "@/components/bento-grid";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  const skye2HomeProject = {
    id: "hardcoded-skye-2",
    title: skye2Project.title,
    company: skye2Project.company,
    slug: skye2Project.slug,
    heroImages: ["/projects/skye-2.0-hero-chat-redesign.png"],
    finalScreens: [
      "/projects/skye-2.0-vision-board-week-one.png",
      "/projects/skye-2.0-component-library-overview-1.png",
      "/projects/skye-2.0-desktop-chat-ui.png",
      "/projects/skye-2.0-snippets.png",
      "/projects/skye-2.0-escalation-flow-screens.png",
      "/projects/skye-2.0-github-pr-activity.png",
      "/projects/skye-2.0-feedback-sketches.png",
      "/projects/skye-2.0-feedback-rating-final.png",
      "/projects/skye-2.0-car-carousel-inline.png",
    ],
    subtitle: skye2Project.subtitle,
    featured: false,
  };

  const chatgptAppHomeProject = {
    id: "hardcoded-chatgpt-app",
    title: chatgptAppProject.title,
    company: chatgptAppProject.company,
    slug: chatgptAppProject.slug,
    heroImages: ["/projects/Chat GPT Hero.png"],
    finalScreens: [
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

  const cdpHomeProject = {
    id: "hardcoded-cdp",
    title: cdpProject.title,
    company: cdpProject.company,
    slug: cdpProject.slug,
    heroImages: ["/projects/cdp-hero.png"],
    finalScreens: [
      "/projects/cdp-header-reserve.png",
      "/projects/cdp-carousel-gallery.png",
      "/projects/cdp-page-structure.png",
    ],
    subtitle: cdpProject.subtitle,
    featured: false,
  };

  // Prepend hardcoded projects to the list
  const projects = [chatgptAppHomeProject, aiPatternLibraryHomeProject, skye2HomeProject, cdpHomeProject, ...notionProjects];

  return (
    <StaggeredFadeIn initialDelay={0.25} staggerDelay={0.18} duration={0.45} className="pt-28">
      {/* Section 1: Projects - only renders if there are projects */}
      {projects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection
            title="Selected Work"
            projects={projects}
            rightContent={
              // <Link
              //   href="https://www.linkedin.com/in/jpmarsh/"
              //   target="_blank"
              //   rel="noopener noreferrer"
              //   className="sm:mt-0.5 transition-[filter] duration-150 hover:[&>*]:brightness-95"
              // >
              //   <Badge variant="grey">
              //     linkedin.com
              //     <ArrowUpRight className="w-[1em] h-[1em] shrink-0 text-current" strokeWidth={2} aria-hidden />
              //   </Badge>
              // </Link>
              null
            }
          />
        </ContentWrapper>
      )}

      {/* Section 2: Bento-style Side Projects grid */}
      <ContentWrapper>
        <BentoGrid />
      </ContentWrapper>

      {/* Section 3: Side Projects from Notion - only renders if there are side projects */}
      {sideProjects.length > 0 && (
        <ContentWrapper>
          <ExpandableProjectSection title="Side Projects" projects={sideProjects} />
        </ContentWrapper>
      )}
    </StaggeredFadeIn>
  );
}
