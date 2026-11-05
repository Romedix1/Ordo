"use client";

import { GithubButton } from "@/app/_components/auth/github-button";
import { Button, CardContainer, Logo } from "@/app/_components/ui";
import { cn } from "cn";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

interface AuthShellProps {
  title: string;
  description: string;
  footerText: string;
  footerLink: { href: string; text: string };
  actionLabel: string;
  onSubmit: () => void;
  isSubmitting: boolean;
  children: ReactNode;
  formError?: string;
}

export const AuthShell = ({
  title,
  description,
  footerText,
  footerLink,
  actionLabel,
  onSubmit,
  isSubmitting,
  children,
  formError,
}: AuthShellProps) => {
  const separatorStyles = "w-full block bg-border h-px";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <Logo />
      </div>

      <form onSubmit={onSubmit}>
        <CardContainer>
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {formError && (
            <div
              role="alers"
              className="p-3 flex gap-2 items-center bg-destructive/10 border-destructive/30 rounded-lg text-sm text-destructive"
            >
              <CircleAlert className="text-destructive" />
              {formError}
            </div>
          )}

          {children}

          <Button type="submit" disabled={isSubmitting}>
            {actionLabel}
          </Button>

          <div className="flex items-center gap-3">
            <span className={separatorStyles}></span>
            <span className="uppercase text-xs text-muted-foreground">or</span>
            <span className={separatorStyles}></span>
          </div>

          <GithubButton isSubmitting={isSubmitting} />
        </CardContainer>
      </form>

      <div className="flex justify-center">
        <p>
          <span className="text-muted-foreground text-sm">{footerText}</span>
          <Link
            href={footerLink.href}
            className="text-sm font-medium text-primary hover:text-primary/80 focus:text-primary/80 outline-none duration-200"
          >
            {" "}
            {footerLink.text}
          </Link>
        </p>
      </div>
    </div>
  );
};
