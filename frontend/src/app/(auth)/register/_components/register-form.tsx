"use client";

import { useForm } from "react-hook-form";
import { Input, PasswordInput } from "@/app/_components/ui";
import { AuthShell } from "@/app/_components/auth";
import { RegisterValidationError, registerUser } from "@/lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema, RegisterValues } from "@/schemas/register";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    mode: "onTouched",
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await registerUser(data);

      if (response) {
        router.push(`/confirm-email?userId=${response.id}&email=${encodeURIComponent(response.email)}`);
      }
    } catch (error) {
      if (error instanceof RegisterValidationError) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          setError(field as keyof RegisterValues, {
            message: messages[0],
          });
        });

        return;
      }

      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Try again.";

      setError("root", { message });
    }
  });

  return (
    <AuthShell
      title="Create account"
      description="Start organizing your projects in minutes"
      footerText="Already have an account?"
      footerLink={{ href: "/login", text: "Sign in" }}
      actionLabel="Create account"
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      formError={errors.root?.message}
    >
      <Input
        {...register("name")}
        label="Name"
        autoComplete="name"
        placeholder="Your name"
        error={errors.name?.message}
        required
      />

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

      <PasswordInput
        {...register("confirmPassword")}
        label="Confirm password"
        autoComplete="new-password"
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        required
      />
    </AuthShell>
  );
};
