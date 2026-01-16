import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/projects");

// Project metadata type matching the frontmatter schema
export type MDXProject = {
  slug: string;
  title: string;
  subtitle: string;
  company: string;
  companyLogo?: string;
  tags: string[];
  featured?: boolean;
  status?: "live" | "in-flight";
  startDate: string;
  endDate?: string | null;
  heroImages: string[];
  finalScreens?: string[];
  id: string;
  projectType?: "Project" | "Side Project";
  role?: string;
  team?: string;
  duration?: string;
  background?: string;
  // Content will be the MDX source
  content: string;
};

// Get all project slugs
export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

// Get a single project by slug
export async function getProjectBySlug(slug: string): Promise<MDXProject | null> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: data.slug || slug,
    title: data.title || "",
    subtitle: data.subtitle || "",
    company: data.company || "",
    companyLogo: data.companyLogo || null,
    tags: data.tags || [],
    featured: data.featured || false,
    status: data.status || "in-flight",
    startDate: data.startDate || "",
    endDate: data.endDate || null,
    heroImages: data.heroImages || [],
    finalScreens: data.finalScreens || [],
    id: `mdx-${slug}`, // Generate a unique ID
    projectType: data.projectType || "Project",
    role: data.role || "",
    team: data.team || "",
    duration: data.duration || "",
    background: data.background || "",
    content, // The MDX content (without frontmatter)
  };
}

// Get all projects
export async function getAllProjects(): Promise<MDXProject[]> {
  const slugs = getAllProjectSlugs();
  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug))
  );

  // Filter out nulls and sort by startDate (newest first)
  return projects
    .filter((project): project is MDXProject => project !== null)
    .sort((a, b) => {
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);
      return dateB.getTime() - dateA.getTime();
    });
}

// Get featured projects
export async function getFeaturedProjects(): Promise<MDXProject[]> {
  const allProjects = await getAllProjects();
  return allProjects.filter((p) => p.featured);
}
