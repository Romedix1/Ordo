import { BadgeColors, colorVariants } from "@/constants";
import { cn } from "cn";
import { ReactNode } from "react";

interface BadgeProps {
  text: ReactNode;
  color?: BadgeColors;
}

export const Badge = ({ color = "indigo", text }: BadgeProps) => {
  return (
    <div
      className={cn(
        "px-2 py-1 flex justify-center items-center text-xs font-medium h-fit rounded-[6px]",
        colorVariants[color],
      )}
    >
      {text}
    </div>
  );
};
