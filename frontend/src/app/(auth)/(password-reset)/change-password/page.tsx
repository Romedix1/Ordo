"use client";

import { ChangePasswordSuccess } from "@/app/(auth)/(password-reset)/change-password/_components/change-password-success";
import {
  Button,
  CardContainer,
  ErrorBox,
  PasswordInput,
} from "@/app/_components/ui";
import { ResetPasswordSchema, ResetPasswordValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ChangePasswordPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit((data) => {
    setSuccess(false);

    try {
      const response = true;

      if (response) {
        setSuccess(true);
      }
    } catch (error) {}
  });

  if (success) return <ChangePasswordSuccess />;

  return (
    <form onSubmit={onSubmit} noValidate>
      <CardContainer>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Set new password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>
        </div>

        {errors.root?.message && <ErrorBox error={errors.root.message} />}

        <PasswordInput
          {...register("password")}
          label="New password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.password?.message}
          required
        />

        <PasswordInput
          {...register("confirmPassword")}
          label="Confirm password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.confirmPassword?.message}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Reseting..." : "Reset password"}
        </Button>
      </CardContainer>
    </form>
  );
}
