"use client";

import { ChangePasswordSuccess } from "@/app/(auth)/(password-reset)/change-password/_components/change-password-success";
import { StatusCard } from "@/app/_components/auth";
import {
  Button,
  CardContainer,
  ErrorBox,
  PasswordInput,
} from "@/app/_components/ui";
import { ApiError, changePassword, ValidationError } from "@/lib";
import { ResetPasswordSchema, ResetPasswordValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ChangePasswordForm = () => {
  const [success, setSuccess] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const userId = searchParams.get("userId") ?? "";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await changePassword({
        token,
        userId,
        newPassword: data.newPassword,
      });

      setSuccess(true);
    } catch (error) {
      if (error instanceof ValidationError) {
        if (error.errors.password) {
          setError("newPassword", { message: error.errors.password[0] });
        } else {
          setError("root", { message: error.message });
        }

        return;
      }

      setError("root", {
        message:
          error instanceof ApiError
            ? error.message
            : "Something went wrong. Try again.",
      });
    }
  });

  if (!userId || !token) {
    return (
      <StatusCard
        variant="error"
        title="Invalid link"
        description="This reset link is incomplete. Request a new one."
      >
        <Button render={<Link href="/forgot-password" />} className="w-full">
          Request new link
        </Button>
      </StatusCard>
    );
  }

  if (success) return <ChangePasswordSuccess />;

  return (
    <form onSubmit={onSubmit} noValidate>
      <CardContainer>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Set new password
          </h1>
          <p className="text-sm text-muted-foreground">
            Choose a new password for your account.
          </p>
        </div>

        {errors.root?.message && <ErrorBox error={errors.root.message} />}

        <PasswordInput
          {...register("newPassword")}
          label="New password"
          placeholder="••••••••"
          autoComplete="new-password"
          error={errors.newPassword?.message}
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
          {isSubmitting ? "Resetting..." : "Reset password"}
        </Button>
      </CardContainer>
    </form>
  );
};
