import { Skeleton } from "@/components/ui/skeleton";
import { SetProjectTitle } from "@/components/project-title-context";

// Loading skeleton for individual project page
export default function ProjectLoading() {
    return (
        <div className="flex flex-col">
            {/* Set header title immediately - will be updated when project loads */}
            <SetProjectTitle title="Loading..." />

            {/* One-liner skeleton */}
            <Skeleton className="mt-2 h-5 w-64 max-w-md" />

            {/* Hero image skeleton - breakout width */}
            <div className="w-screen ml-[calc(50%-50vw)] mb-2 mt-6 -mr-[calc(50%-50vw)] px-8">
                <Skeleton className="w-full aspect-video rounded-xl" />
            </div>

            {/* Title + Subtitle + Metadata skeleton */}
            <div className="flex flex-col gap-2 mb-6 mt-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-7 w-1/2" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
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

            {/* Another content section skeleton */}
            <div className="flex flex-col gap-2 mt-6">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}


