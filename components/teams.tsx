import { Skeleton } from "./ui/skeleton";

export function TeamListSkeleton() {
  return (
    <div className="divide-y">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-4 w-24 mt-2" />
            </div>
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      ))}
    </div>
  );
}
