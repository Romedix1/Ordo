import { AvatarUser, Badge } from "@/app/_components/ui";
import { AvatarGroup } from "@/app/_components/ui/avatarGroup";
import { cn } from "cn";
import { MessageSquare } from "lucide-react";

interface Badge {
  title: string;
  color: string;
}

interface CardProps {
  badges: Badge[];
  title: string;
  commentsCount: number;
  assignedUsers: AvatarUser[];
}

export const Card = ({
  badges,
  title,
  commentsCount,
  assignedUsers,
}: CardProps) => {
  return (
    <article
      tabIndex={0}
      className={cn(
        "p-3 flex flex-col gap-2 w-64",
        "bg-card border-border rounded-lg outline-none",
        "hover:border-muted-foreground/30 hover:cursor-pointer focus-visible:ring-[3px] focus-visible:ring-ring/50",
        // drag
        // "rotate-2 border-ring opacity-90"
      )}
    >
      <div className="flex gap-1.5">
        {badges.map((badge, index) => {
          return <Badge key={`card-badge-${index}`} text={badge.title} />;
        })}
      </div>

      <h2 className="text-sm font-medium wrap-break-word">{title}</h2>

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
