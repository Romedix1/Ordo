import { colorVariants } from "@/constants";
import { cn } from "cn";
import Image from "next/image";

interface AvatarUser {
  name: string;
  avatarColor: number;
  avatarUrl?: string | null;
}

interface AvatarProps {
  user: AvatarUser;
  className?: string;
}

const getInitials = (name: string) => {
  const words = name.trim().split(/\s+/);

  if (words.length === 0) return "?";

  if (words.length === 1) {
    return Array.from(words[0]).slice(0, 2).join("").toUpperCase();
  }

  const first = Array.from(words[0])[0];
  const last = Array.from(words[words.length - 1])[0];

  return (first + last).toUpperCase();
};

export const Avatar = ({ user, className }: AvatarProps) => {
  const colors = Object.values(colorVariants);
  const color = colors[user.avatarColor] ?? colors[0];

  if (user.avatarUrl) {
    return (
      <Image
        src={user.avatarUrl}
        alt={user.name}
        className={cn("w-6 h-6 rounded-full object-cover", className)}
      />
    );
  }

  return (
    <div
      className={cn(
        "p-2 rounded-full flex items-center justify-center text-xs font-medium",
        "select-none cursor-pointer",
        color,
      )}
    >
      {getInitials(user.name)}
    </div>
  );
};
