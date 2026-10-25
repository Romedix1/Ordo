import { Avatar } from "@/app/_components/ui/avatar";

export interface AvatarUser {
  id: string;
  initials: string;
}

interface AvatarGroupProps {
  users: AvatarUser[];
}

export const AvatarGroup = ({ users }: AvatarGroupProps) => {
  return (
    <div className="flex flex-row-reverse -space-x-1.5 space-x-reverse">
      {users.map((user, index) => {
        return <Avatar key={`group-user-${index}`} user={user} />;
      })}
    </div>
  );
};
