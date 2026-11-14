"use client";

import { useForm } from "react-hook-form";
import { Input, PasswordInput } from "@/app/_components/ui";
import { AuthShell } from "@/app/_components/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginSchema, LoginValues } from "@/schemas/login";
import { loginUser, ValidationError } from "@/lib";

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

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await loginUser(data);

      if (response) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof ValidationError) {
        Object.entries(error.errors).forEach(([field, messages]) => {
          const key = field.toLowerCase();

          if (key === "email" || key === "password") {
            setError(key, { message: messages[0] });
          } else {
            setError("root", { message: messages[0] });
          }
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
