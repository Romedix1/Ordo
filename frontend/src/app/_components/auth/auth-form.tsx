"use client";

import { Button, Input, Logo } from "@/app/_components/ui";
import { cn } from "cn";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const typeTexts = {
    login: {
      header: "Sign in",
      eyebrow: "Welcome back. Enter your details to continue",

      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",

      actionButton: "Sign in",

      footerParagraph: "No account yet?",
      footerLink: "Sign up",
    },
    register: {
      header: "Create account",
      eyebrow: "Start organizing your projects in minutes",

      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "••••••••",

      actionButton: "Create account",

      footerParagraph: "Already have an account?",
      footerLink: "Sign in",
    },
  };

  const separatorStyles = "w-full block bg-border h-px";

  const isRegister = type === "register";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-center">
        <Logo />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className={cn(
          "flex flex-col gap-5 p-6 lg:p-8 lg:w-100",
          "bg-card rounded-2xl",
        )}
      >
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">{typeTexts[type].header}</h1>
          <p className="text-sm text-muted-foreground">
            {typeTexts[type].eyebrow}
          </p>
        </div>

        {isRegister && (
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            label="Name"
            placeholder="Your name"
            required
          />
        )}

        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          label={typeTexts[type].emailLabel}
          placeholder={typeTexts[type].emailPlaceholder}
          required
        />

        <div className="flex flex-col gap-1.5">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete={isRegister ? "new-password" : "current-password"}
            action={
              !isRegister && (
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary hover:text-primary/80 duration-200"
                >
                  Forgot password
                </Link>
              )
            }
            label={typeTexts[type].passwordLabel}
            placeholder={typeTexts[type].passwordPlaceholder}
            required
          />
        </div>

        {isRegister && (
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            label="Confirm password"
            placeholder={typeTexts[type].passwordPlaceholder}
            required
          />
        )}

        <Button type="submit">{typeTexts[type].actionButton}</Button>

        <div className="flex items-center gap-3">
          <span className={separatorStyles}></span>
          <span className="uppercase text-xs text-muted-foreground">or</span>
          <span className={separatorStyles}></span>
        </div>

        <Button type="button" variant="secondary">
          <FaGithub />
          Continue with GitHub
        </Button>
      </form>

      <div className="flex justify-center">
        <p>
          <span className="text-muted-foreground text-sm">
            {typeTexts[type].footerParagraph}
          </span>
          <Link
            href={isRegister ? "/login" : "/register"}
            className="text-sm font-medium text-primary hover:text-primary/80 focus:text-primary/80 outline-none duration-200"
          >
            {" "}
            {typeTexts[type].footerLink}
          </Link>
        </p>
      </div>
    </div>
  );
};
