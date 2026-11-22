"use client";

import { SearchBar } from "@/app/_components/navigation/search-bar";
import { UserAction } from "@/app/_components/navigation/user-action";
import { Button, Logo } from "@/app/_components/ui";
import { useAuth } from "@/providers";
import { cn } from "cn";
import { ChevronLeft, Search, SearchIcon, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Navigation = () => {
  const { user } = useAuth();

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setSearchOpen(false);
    };

    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  const guestLinks = [
    { text: "Features", url: "/" },
    { text: "How it works", url: "/" },
    { text: "Github", url: "https://github.com/Romedix1/Ordo" },
  ];

  return (
    <nav
      aria-label="Main"
      className={cn(
        "px-6 w-full flex justify-between items-center py-3 fixed",
        "bg-background border-b",
      )}
    >
      {searchOpen ? (
        <div className="flex items-center gap-2 w-full">
          <Button
            variant="ghost"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          >
            <ChevronLeft />
          </Button>

          <div className="flex-1 motion-safe:animate-in motion-safe:slide-in-from-right-6 motion-safe:duration-200">
            <SearchBar
              autoFocus
              className="w-full"
              onEscape={() => setSearchOpen(false)}
              endAdornment={
                <button
                  aria-label="Close search"
                  className="mr-2 rounded-md p-1 cursor-pointer text-muted-foreground outline-none hover:text-destructive focus-visible:text-destructive focus-visible:ring-2 focus-visible:ring-destructive/50"
                >
                  <X
                    onClick={() => setSearchOpen(false)}
                    className="w-4.5 h-4.5"
                  />
                </button>
              }
            />
          </div>
        </div>
      ) : (
        <>
          <Logo />

          {user ? (
            <div className="hidden sm:block min-w-[320px]">
              <SearchBar
                className="pr-20"
                startAdornment={
                  <SearchIcon className="w-4.5 h-4.5 text-muted-foreground" />
                }
                endAdornment={
                  <kbd className="pointer-events-none mr-3 rounded border border-border py-0.5 px-1.5 text-xs text-muted-foreground">
                    Ctrl K
                  </kbd>
                }
              />
            </div>
          ) : (
            <ul className=" hidden sm:flex gap-6 text-sm font-medium text-muted-foreground">
              {guestLinks.map((link) => {
                return (
                  <li key={`guest-link-${link.text}`}>
                    <Link
                      className="rounded-md outline-none hover:text-foreground focus-visible:ring-2 focus-visible:text-foreground focus-visible:ring-primary duration-200"
                      href={link.url}
                    >
                      {link.text}
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="flex">
            {user && (
              <Button
                onClick={() => setSearchOpen((prev) => !prev)}
                className="sm:hidden"
                aria-label="Open search"
                variant="ghost"
              >
                <Search />
              </Button>
            )}

            <UserAction />
          </div>
        </>
      )}
    </nav>
  );
};
