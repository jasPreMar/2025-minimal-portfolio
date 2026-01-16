import { getAllProjects, type NotionProject } from "@/lib/notion";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";
import { aiPatternLibraryProject } from "@/lib/ai-pattern-library-data";
import { skye2Project } from "@/lib/skye-2.0-data";

// Project interface that matches what ProjectLinkWithThumbnails expects
export interface ProjectForLink {
  id: string;
  title: string;
  company: string;
  slug: string;
  heroImages: string[];
  finalScreens?: string[];
  subtitle?: string;
  featured?: boolean;
}

// Get all projects in the same order as the home page
export async function getAllProjectsInOrder(): Promise<ProjectForLink[]> {
  // Get Notion projects
  const notionProjects = await getAllProjects();
  
  // Create hardcoded project entries matching home page structure
  const chatgptAppHomeProject: ProjectForLink = {
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

  const aiPatternLibraryHomeProject: ProjectForLink = {
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

  const skye2HomeProject: ProjectForLink = {
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

  // Convert Notion projects to ProjectForLink format
  const notionProjectsForLink: ProjectForLink[] = notionProjects.map((project) => ({
    id: project.id,
    title: project.title,
    company: project.company,
    slug: project.slug,
    heroImages: project.heroImages,
    finalScreens: project.finalScreens,
    subtitle: project.subtitle,
    featured: project.featured,
  }));

  // Return in the same order as home page
  return [
    chatgptAppHomeProject,
    aiPatternLibraryHomeProject,
    skye2HomeProject,
    ...notionProjectsForLink,
  ];
}

// Get the next project for a given slug
export async function getNextProject(currentSlug: string): Promise<ProjectForLink | null> {
  const allProjects = await getAllProjectsInOrder();
  const currentIndex = allProjects.findIndex((p) => p.slug === currentSlug);
  
  if (currentIndex === -1) {
    return null;
  }
  
  // Get the next project, wrapping around to the first if it's the last
  const nextIndex = (currentIndex + 1) % allProjects.length;
  return allProjects[nextIndex];
}
