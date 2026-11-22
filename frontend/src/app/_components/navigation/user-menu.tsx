"use client";

import { Button, buttonVariants } from "@/app/_components/ui";
import { useAuth } from "@/providers";
import { Menu, Separator } from "@base-ui/react";
import { cn } from "cn";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

const MenuSeparator = () => {
  return <Menu.Separator className="-mx-1 my-2 h-px bg-border" />;
};

export const UserMenu = () => {
  const { user } = useAuth();

  if (!user) return null;

  const itemClass = buttonVariants({
    variant: "ghost",
    className:
      "w-full justify-start data-[highlighted]:bg-secondary/80 data-[highlighted]:text-foreground",
  });

  return (
    <Menu.Portal className={cn("", "bg-")}>
      <Menu.Positioner side="bottom" align="end" sideOffset={10}>
        <Menu.Popup
          className={cn(
            "p-1 rounded-xl min-w-64",
            "bg-card border-px border-border",
          )}
        >
          <div className="flex flex-col gap-2 p-2">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>

          <MenuSeparator />

          <Menu.Item render={<Link href="/dashboard" />} className={itemClass}>
            <User /> Account
          </Menu.Item>

          <MenuSeparator />

          <Menu.Item className={itemClass}>
            <LogOut /> Sign out
          </Menu.Item>
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
};
