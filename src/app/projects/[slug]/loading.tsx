import { Skeleton } from "@/components/ui/skeleton";

// Loading skeleton for individual project page
export default function ProjectLoading() {
    return (
        <div className="flex flex-col">
            {/* Title section skeleton - 80px below header */}
            <div className="flex flex-col gap-2 mt-20">
                <Skeleton className="h-9 w-3/4" />
                <Skeleton className="h-5 w-64 max-w-md" />
            </div>

            {/* Hero image skeleton - breakout width */}
            <div className="w-screen ml-[calc(50%-50vw)] mb-2 mt-6 -mr-[calc(50%-50vw)] px-8">
                <Skeleton className="w-full aspect-video rounded-xl" />
            </div>

            {/* Content skeleton */}
            <div className="flex flex-col gap-2 mt-6">
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
