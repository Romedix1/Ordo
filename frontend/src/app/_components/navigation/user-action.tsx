"use client";

import { UserMenu } from "@/app/_components/navigation/user-menu";
import { Avatar, Button, Skeleton } from "@/app/_components/ui";
import { useAuth } from "@/providers";
import { Menu } from "@base-ui/react";
import { cn } from "cn";
import { Bell } from "lucide-react";
import Link from "next/link";

export const UserAction = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 sm:hidden" />
        <Skeleton className="h-10 w-10" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Button variant="ghost">
            <Bell />
          </Button>

          <Menu.Root>
            <Menu.Trigger
              aria-label="Open user menu"
              className={cn(
                "rounded-full",
                "duration-200 outline-none",
                "hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background",
                "focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "data-popup-open:ring-2 data-popup-open:ring-primary data-popup-open:ring-offset-background data-popup-open:ring-offset-2",
              )}
            >
              <Avatar user={{ ...user, avatarUrl: null }} />
            </Menu.Trigger>

            <UserMenu />
          </Menu.Root>
        </>
      ) : (
        <>
          <Button variant="ghost" render={<Link href={"/login"} />}>
            Sign in
          </Button>
          <Button className="px-3 sm:px-4" render={<Link href={"/register"} />}>
            Get started
          </Button>
        </>
      )}
    </div>
  );
};
