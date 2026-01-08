import { ContentWrapper } from "@/components/content-wrapper";

export default function Loading() {
  return (
    <div className="flex flex-col gap-20">
      <ContentWrapper>
        <div className="flex flex-col gap-6 w-full h-fit">
          {/* Shimmer text skeleton */}
          <div className="h-8 w-48 bg-foreground/5 rounded animate-pulse" />
          {/* Email button skeleton */}
          <div className="h-10 w-56 bg-foreground/5 rounded animate-pulse" />
        </div>
      </ContentWrapper>

      <ContentWrapper>
        <div className="flex flex-col gap-4">
          {/* Section title skeleton */}
          <div className="h-5 w-20 bg-foreground/5 rounded animate-pulse" />
          {/* Project links skeleton */}
          <div className="flex flex-col gap-2">
            <div className="h-8 w-full max-w-xs bg-foreground/5 rounded animate-pulse" />
            <div className="h-8 w-full max-w-[280px] bg-foreground/5 rounded animate-pulse" />
            <div className="h-8 w-full max-w-[240px] bg-foreground/5 rounded animate-pulse" />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
}
