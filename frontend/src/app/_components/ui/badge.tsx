import { cn } from "cn";
import { ReactNode } from "react";

type BadgeColors = "indigo" | "amber" | "red" | "green" | "sky" | "violet";

interface BadgeProps {
  color: BadgeColors;
  children: ReactNode;
}

export const Badge = ({ color, children }: BadgeProps) => {
  const colorVariants: Record<BadgeColors, string> = {
    indigo: "bg-label-indigo text-label-indigo-foreground",
    amber: "bg-label-amber text-label-amber-foreground",
    red: "bg-label-red text-label-red-foreground",
    green: "bg-label-green text-label-green-foreground",
    sky: "bg-label-sky text-label-sky-foreground",
    violet: "bg-label-violet text-label-violet-foreground",
  };

  return (
    <div
      className={cn(
        "px-2 py-1 flex justify-center items-center text-xs font-medium h-fit rounded-[6px]",
        colorVariants[color],
      )}
    >
      {children}
    </div>
  );
};
