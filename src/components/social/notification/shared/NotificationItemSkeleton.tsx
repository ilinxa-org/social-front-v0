import { Skeleton } from "@/components/ui/skeleton";

type SkeletonVariant = "user" | "platform" | "event" | "system";

interface NotificationItemSkeletonProps {
  variant?: SkeletonVariant;
}

export function NotificationItemSkeleton({ variant = "user" }: NotificationItemSkeletonProps) {
  // User-based skeleton (connection, engagement, network)
  if (variant === "user") {
    return (
      <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full rounded bg-muted/50 p-2" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    );
  }

  // Platform notification skeleton
  if (variant === "platform") {
    return (
      <div className="p-4 rounded-lg border bg-muted/10">
        <div className="flex items-start gap-3">
          <Skeleton className="h-9 w-9 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-16" />
            </div>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    );
  }

  // Event notification skeleton
  if (variant === "event") {
    return (
      <div className="p-4 rounded-lg border bg-muted/30">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 rounded" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-32 col-span-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 flex-1 rounded" />
          <Skeleton className="h-8 flex-1 rounded" />
        </div>
      </div>
    );
  }

  // System notification skeleton
  if (variant === "system") {
    return (
      <div className="flex items-start gap-3 p-3 rounded-lg border bg-muted/30">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-7 w-20 rounded" />
        </div>
      </div>
    );
  }

  return null;
}

interface NotificationSkeletonListProps {
  count?: number;
  variant?: SkeletonVariant;
}

export function NotificationSkeletonList({ count = 3, variant = "user" }: NotificationSkeletonListProps) {
  return (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, i) => (
        <NotificationItemSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
