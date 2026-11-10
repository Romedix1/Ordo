"use client";

import { useForm } from "react-hook-form";
import { Input, PasswordInput } from "@/app/_components/ui";
import { AuthShell } from "@/app/_components/auth";
import { RegisterValidationError, registerUser } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterValues } from "@/schemas/register";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginValues } from "@/schemas/login";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    const response = true;
  });

  return (
    <AuthShell
      title="Sign in"
      description="Welcome back. Enter your details to continue."
      footerText="No account yet?"
      footerLink={{ href: "/register", text: "Sign up" }}
      actionLabel="Sign in"
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      formError={errors.root?.message}
    >
      <Input
        {...register("email")}
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="email@example.com"
        error={errors.email?.message}
        required
      />

      <PasswordInput
        {...register("password")}
        label="Password"
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.password?.message}
        required
      />
    </AuthShell>
  );
};
