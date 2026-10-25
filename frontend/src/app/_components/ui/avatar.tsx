import { BadgeColors, colorVariants } from "@/constants";
import { cn } from "cn";

interface AvatarProps {
  userId: string;
  initials: string;
}

const getRandomBadgeColor = (userId: string): BadgeColors => {
  const keys = Object.keys(colorVariants) as BadgeColors[];

  const charSum = userId
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);

  return keys[charSum % keys.length];
};

export const Avatar = ({ userId, initials }: AvatarProps) => {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium",
        colorVariants[getRandomBadgeColor(userId)],
      )}
    >
      {initials}
    </div>
  );
};
