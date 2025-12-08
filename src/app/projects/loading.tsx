import { Skeleton } from "@/components/ui/skeleton";
import { SetProjectTitle } from "@/components/project-title-context";

// Loading skeleton for projects page - shows immediately while data fetches
export default function ProjectsLoading() {
    return (
        <div className="flex flex-col">
            {/* Set header title immediately */}
            <SetProjectTitle title="Projects" />
            {/* Header spacing to match page layout */}
            <div className="my-8">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
            </div>

            {/* First project section skeleton */}
            <div className="flex flex-col gap-6 py-20 border-b border-border">
                {/* Hero image skeleton - breakout width */}
                <div className="w-screen ml-[calc(50%-50vw)] mb-6 -mr-[calc(50%-50vw)]">
                    <div className="flex gap-2 px-8 md:pl-[calc((100vw-608px)/2+32px)]">
                        <Skeleton className="w-[calc(100vw-64px)] md:w-[544px] aspect-video rounded-xl flex-shrink-0" />
                    </div>
                </div>

                {/* Title + metadata skeleton */}
                <div className="flex flex-col gap-2 mb-6">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <div className="flex gap-4 mt-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>

                {/* Content skeleton */}
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                </div>
            </div>

            {/* Second project section skeleton (partial, hints at more content) */}
            <div className="flex flex-col gap-6 py-20 opacity-50">
                <div className="w-screen ml-[calc(50%-50vw)] mb-6 -mr-[calc(50%-50vw)]">
                    <div className="flex gap-2 px-8 md:pl-[calc((100vw-608px)/2+32px)]">
                        <Skeleton className="w-[calc(100vw-64px)] md:w-[544px] aspect-video rounded-xl flex-shrink-0" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-8 w-2/3" />
                    <Skeleton className="h-6 w-1/3" />
                </div>
            </div>
        </div>
    );
}
