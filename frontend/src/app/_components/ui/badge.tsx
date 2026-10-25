import { BadgeColors, colorVariants } from "@/constants";
import { cn } from "cn";
import { ReactNode } from "react";

interface BadgeProps {
  color: BadgeColors;
  children: ReactNode;
}

export const Badge = ({ color, children }: BadgeProps) => {
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
