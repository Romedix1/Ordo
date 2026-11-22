"use client";

import { Input } from "@/app/_components/ui";
import { ReactNode, useEffect, useRef } from "react";

interface SearchBarProps {
  className?: string;
  autoFocus?: boolean;
  onEscape?: () => void;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const SearchBar = ({
  className,
  autoFocus,
  onEscape,
  startAdornment,
  endAdornment,
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!(event.ctrlKey && event.key === "k")) return;

      event.preventDefault();

      inputRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Input
      autoFocus={autoFocus}
      onKeyDown={(event) => {
        if (event.key === "Escape") onEscape?.();
      }}
      ref={inputRef}
      type="text"
      className={className}
      startAdornment={startAdornment}
      endAdornment={endAdornment}
      placeholder="Search boards..."
    />
  );
};
