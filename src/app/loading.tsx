import { ContentWrapper } from "@/components/content-wrapper";

// Skeleton for a single project item (matches ProjectLinkWithThumbnails structure)
function ProjectItemSkeleton({ showThumbnails = true }: { showThumbnails?: boolean }) {
  return (
    <div className="flex flex-col rounded-xl px-3 -mx-3 py-2 min-[480px]:py-2">
      {/* Title and arrow row */}
      <div className="flex items-center w-full justify-between gap-1 min-[480px]:w-fit min-[480px]:justify-start min-[480px]:gap-2">
        <div className="h-6 w-40 bg-foreground/5 rounded animate-pulse" />
        <div className="w-6 h-6 shrink-0" />
      </div>
      {/* Subtitle row */}
      <div className="mt-0.5">
        <div className="h-5 w-64 max-w-full bg-foreground/5 rounded animate-pulse" />
      </div>
      {/* Thumbnail row */}
      {showThumbnails && (
        <div className="mt-1 py-1">
          <div className="flex gap-2">
            <div className="h-[130px] w-[231px] bg-foreground/5 rounded-lg animate-pulse shrink-0" />
            <div className="h-[130px] w-[231px] bg-foreground/5 rounded-lg animate-pulse shrink-0" />
            <div className="h-[130px] w-[173px] bg-foreground/5 rounded-lg animate-pulse shrink-0" />
          </div>
        </div>
      )}
    </div>
  );
}

// Skeleton for a project section (matches ExpandableProjectSection structure)
function ProjectSectionSkeleton({ itemCount = 3 }: { itemCount?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Section title button skeleton */}
      <div className="flex items-center w-fit justify-start gap-2 rounded-md px-3 -mx-3 py-2 min-[480px]:py-1">
        <div className="h-6 w-20 bg-foreground/5 rounded animate-pulse" />
        <div className="w-6 h-6 shrink-0" />
      </div>
      {/* Project items */}
      <div className="flex flex-col gap-5 min-[480px]:gap-1">
        {Array.from({ length: itemCount }).map((_, i) => (
          <ProjectItemSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex flex-col gap-20 pt-28">
      <ContentWrapper>
        <ProjectSectionSkeleton itemCount={4} />
      </ContentWrapper>
    </div>
  );
}
