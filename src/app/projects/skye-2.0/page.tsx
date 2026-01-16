import { BlockRenderer } from "@/components/block-renderer";
import { skye2Project } from "@/lib/skye-2.0-data";
import { ContentWrapper } from "@/components/content-wrapper";
import { Badge } from "@/components/ui/badge";

// Static page - no revalidation needed
export const dynamic = "force-static";

// Generate metadata for SEO
export function generateMetadata() {
  return {
    title: `${skye2Project.title} | Jason Marsh`,
    description: skye2Project.subtitle,
  };
}

export default function Skye2Page() {
  const project = skye2Project;

  return (
    <div>
      {/* Project Title Section - 80px below header */}
      <ContentWrapper outerClassName="-mb-12">
        <div className="flex flex-col gap-1 mt-20">
          {/* Mobile: Badge above title */}
          {project.status && (
            <div className="sm:hidden">
              <Badge variant={project.status === "live" ? "live" : "in-flight"}>
                {project.status === "live" ? "Live" : "In flight"}
              </Badge>
            </div>
          )}
          {/* Desktop: Badge inline with title, Mobile: Just title */}
          <div className="flex items-start gap-3 sm:gap-2">
            <h1 className="text-3xl font-semibold tracking-tight flex-1">
              {project.title}
            </h1>
            {project.status && (
              <Badge 
                variant={project.status === "live" ? "live" : "in-flight"}
                className="hidden sm:flex sm:mt-2"
              >
                {project.status === "live" ? "Live" : "In flight"}
              </Badge>
            )}
          </div>
          <p className="text-base text-secondary max-w-md">{project.subtitle}</p>
        </div>
      </ContentWrapper>

      {/* Content Blocks */}
      <BlockRenderer blocks={project.blocks} projectTitle={project.title} />

      {/* Keywords/Tags */}
      {project.tags.length > 0 && (
        <ContentWrapper>
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
        </ContentWrapper>
      )}
    </div>
  );
}
