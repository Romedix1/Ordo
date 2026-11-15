"use client";

import {
  Button,
  CardContainer,
  ErrorBox,
  Input,
  SuccessBox,
} from "@/app/_components/ui";
import { ApiError, forgotPasswordEmail, ValidationError } from "@/lib";
import { ForgotPasswordSchema, ForgotPasswordValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    setSuccess(false);

    try {
      await forgotPasswordEmail(data);
      setSuccess(true);
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = error.errors.email?.[0];

        setError(message ? "email" : "root", {
          message: message ?? error.message,
        });

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

  return (
    <form onSubmit={onSubmit} noValidate>
      <CardContainer>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Forgot password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we will send you a link to reset your password.
          </p>
        </div>

        {errors.root?.message && <ErrorBox error={errors.root.message} />}
        {success && (
          <SuccessBox message="If an account exists for this email, a reset link has been sent." />
        )}

        <Input
          {...register("email")}
          type="email"
          label="Email"
          autoComplete="email"
          placeholder="email@example.com"
          error={errors.email?.message}
          required
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send reset link"}
        </Button>
      </CardContainer>
    </form>
  );
}
