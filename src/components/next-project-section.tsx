"use client";

import { ProjectLinkWithThumbnails, type Project } from "@/components/expandable-project-section";
import { ContentWrapper } from "@/components/content-wrapper";

interface NextProjectSectionProps {
  nextProject: Project | null;
}

export function NextProjectSection({ nextProject }: NextProjectSectionProps) {
  if (!nextProject) {
    return null;
  }

  return (
    <ContentWrapper>
      <div className="flex flex-col pt-28 pb-28">
        {/* Light divider */}
        <div className="border-t border-foreground/10 mb-28" />
        
        {/* Title */}
        <p className="text-3xl font-semibold tracking-tight mb-4">Next Project</p>
        
        {/* Expanded project link */}
        <ProjectLinkWithThumbnails
          project={nextProject}
          href={`/projects/${nextProject.slug}`}
          isExpanded={true}
        />
      </div>
    </ContentWrapper>
  );
}
