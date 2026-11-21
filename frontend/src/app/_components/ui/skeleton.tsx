import { cn } from "cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "rounded-md bg-secondary motion-safe:animate-pulse",
        className,
      )}
    />
  );
}
