import { AvatarUser, Badge } from "@/app/_components/ui";
import { AvatarGroup } from "@/app/_components/ui/avatarGroup";
import { cn } from "cn";
import { MessageSquare } from "lucide-react";

interface Badge {
  id: string;
  title: string;
  color: string;
}

export interface CardProps {
  id: string;
  badges: Badge[];
  title: string;
  commentsCount: number;
  assignedUsers: AvatarUser[];
  isDragging?: boolean;
}

export const Card = ({
  id,
  badges,
  title,
  commentsCount,
  assignedUsers,
  isDragging,
}: CardProps) => {
  return (
    <article
      tabIndex={0}
      className={cn(
        "p-3 flex flex-col gap-2 w-full",
        "bg-card border-border rounded-lg outline-none",
        "hover:border-muted-foreground/30 focus-visible:ring-[3px] focus-visible:ring-ring/50",
        isDragging
          ? "rotate-2 border-ring opacity-90 cursor-grab"
          : "cursor-pointer",
      )}
    >
      <div className="flex gap-1.5">
        {badges.map((badge) => {
          return <Badge key={badge.id} id={badge.id} text={badge.title} />;
        })}
      </div>

      <h3 className="text-sm font-medium wrap-break-word">{title}</h3>

      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          <MessageSquare className="w-3.5 h-3.5" />
          <span className="text-xs text-muted-foreground">{commentsCount}</span>
        </div>

        {assignedUsers && <AvatarGroup users={assignedUsers} />}
      </div>
    </article>
  );
};
