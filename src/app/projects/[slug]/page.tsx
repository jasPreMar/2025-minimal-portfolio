import Image from "next/image";
import { ArrowUpRight, Briefcase, Calendar, Users } from "lucide-react";
import { getProjectBySlug, getAllProjectSlugs, getAllProjects, type NotionProject } from "@/lib/notion";
import { InteractiveImage } from "@/components/interactive-image";
import { SetProjectTitle } from "@/components/project-title-context";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

// Generate static params for all projects
export async function generateStaticParams() {
  try {
    const slugs = await getAllProjectSlugs();
    return slugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  
  if (!project) {
    return {
      title: "Project Not Found | Jason Marsh",
    };
  }

  return {
    title: `${project.title} | Jason Marsh`,
    description: project.subtitle || project.background || "A design project by Jason Marsh",
  };
}

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

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Try to find the project - slugs should match exactly as generated
  let project = await getProjectBySlug(slug);
  
  // If not found, try URL decoding (in case of special characters)
  if (!project) {
    const decodedSlug = decodeURIComponent(slug);
    project = await getProjectBySlug(decodedSlug);
  }

  if (!project) {
    // Log available slugs for debugging (only in development)
    if (process.env.NODE_ENV === 'development') {
      const allSlugs = await getAllProjectSlugs();
      const allProjectsList = await getAllProjects();
      console.error(`Project not found for slug: "${slug}"`);
      console.error(`Available slugs:`, allSlugs);
      console.error(`Available projects:`, allProjectsList.map(p => ({ title: p.title, slug: p.slug })));
    }
    notFound();
  }

  const dateRange = formatDateRange(project.startDate, project.endDate);

  // Use subtitle if available, otherwise use the default one-liner
  const oneLiner = project.subtitle || "A collection of real, impactful, and shipped projects.";

  return (
    <div className="flex flex-col gap-6">
      {/* Set header title to project name */}
      <SetProjectTitle title={project.title} />

      {/* Header: Title and Subtitle */}
      <div className="flex flex-col">
        <p className="text-base max-w-md">
          {oneLiner}
        </p>
        {project.featured && (
          <Badge variant="featured" className="w-fit">
            New
          </Badge>
        )}
      </div>

      {/* Hero Image - Full Width with Padding */}
      {project.heroImages.length > 0 && (
        <div className="w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8">
          <InteractiveImage
            src={project.heroImages[0]}
            alt={`${project.title} hero image`}
            priority={true}
          />
        </div>
      )}

      {/* Overview */}
      {project.background && (
        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">Overview</h3>
          <p className="leading-relaxed whitespace-pre-line">
            {project.background}
          </p>
        </div>
      )}

      {/* Final Screens */}
      {project.finalScreens.length > 0 && (() => {
        // Group images into rows: 2, 1, 2, 1, ...
        const rows: { images: string[]; startIndex: number }[] = [];
        let currentIndex = 0;
        let rowIndex = 0;

        while (currentIndex < project.finalScreens.length) {
          const startIndex = currentIndex;
          if (rowIndex % 2 === 0) {
            // Even rows: 2 columns
            rows.push({
              images: project.finalScreens.slice(currentIndex, currentIndex + 2),
              startIndex,
            });
            currentIndex += 2;
          } else {
            // Odd rows: 1 column
            rows.push({
              images: project.finalScreens.slice(currentIndex, currentIndex + 1),
              startIndex,
            });
            currentIndex += 1;
          }
          rowIndex++;
        }

        return (
          <div className="flex flex-col gap-2">
            {rows.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`w-screen ml-[calc(50%-50vw)] -mr-[calc(50%-50vw)] px-8 ${
                  row.images.length === 2 ? "grid grid-cols-2 gap-2" : ""
                }`}
              >
                {row.images.map((screen, screenIndex) => (
                  <InteractiveImage
                    key={row.startIndex + screenIndex}
                    src={screen}
                    alt={`${project.title} final screen ${row.startIndex + screenIndex + 1}`}
                    objectFit="cover"
                    aspectRatio={row.images.length === 2 ? "square" : "video"}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      })()}

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
    </div>
  );
}

