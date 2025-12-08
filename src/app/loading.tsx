import { Skeleton } from "@/components/ui/skeleton";

// Minimal loading skeleton - no animations to avoid double-fade with page.tsx
// Just shows instantly to replace previous page content during navigation
export default function HomeLoading() {
    return (
        <div className="flex flex-col gap-20">
            {/* Section 1: Hero area skeleton */}
            <div className="flex flex-col gap-4">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-3/4 max-w-md" />
                <div className="mt-4">
                    <Skeleton className="h-5 w-5 rounded" />
                </div>
            </div>

            {/* Section 2: Projects skeleton */}
            <div className="flex flex-col gap-4">
                <Skeleton className="h-5 w-20" />
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-6 w-64" />
                    <Skeleton className="h-6 w-56" />
                    <Skeleton className="h-6 w-60" />
                </div>
            </div>

            {/* Section 3: Experience skeleton */}
            <div className="flex flex-col gap-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-4 w-48" />
            </div>
        </div>
    );
}
