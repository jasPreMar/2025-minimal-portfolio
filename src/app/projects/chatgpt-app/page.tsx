import { SetProjectTitle } from "@/components/project-title-context";
import { BlockRenderer } from "@/components/block-renderer";
import { chatgptAppProject } from "@/lib/chatgpt-app-data";

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
      {/* Set header title to project name */}
      <SetProjectTitle title={project.title} />

      {/* Header: Subtitle */}
      <div className="flex flex-col">
        <p className="text-base max-w-md">{project.subtitle}</p>
      </div>

      {/* Content Blocks */}
      <BlockRenderer blocks={project.blocks} projectTitle={project.title} />

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
