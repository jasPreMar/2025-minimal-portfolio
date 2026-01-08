import { BlockRenderer } from "@/components/block-renderer";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";
import { ContentWrapper } from "@/components/content-wrapper";

// Static page - no revalidation needed
export const dynamic = "force-static";

// Generate metadata for SEO
export function generateMetadata() {
  return {
    title: `${chatgptAppProject.title} | Jason Marsh`,
    description: chatgptAppProject.subtitle,
  };
}

export default function ChatGPTAppPage() {
  const project = chatgptAppProject;

  return (
    <div className="flex flex-col gap-6">
      {/* Project Title Section - 80px below header */}
      <ContentWrapper>
        <div className="flex flex-col gap-2 mt-20">
          <h1 className="text-3xl font-semibold tracking-tight">
            {project.title}
          </h1>
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
