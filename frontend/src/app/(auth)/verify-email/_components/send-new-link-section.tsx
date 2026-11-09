"use client";

import { Button, Input } from "@/app/_components/ui";
import { useCountdown } from "@/hooks";
import { resendConfirmationEmail, ResendEmailError } from "@/lib";
import { ResendEmailSchema, ResendEmailValues } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface SendNewLinkSectionProps {
  onError: (error: string | null) => void;
  onSuccess: (message: string | null) => void;
}

export const SendNewLinkSection = ({
  onError,
  onSuccess,
}: SendNewLinkSectionProps) => {
  const { timer, isRunning, starCountdown } = useCountdown(30);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResendEmailValues>({
    resolver: zodResolver(ResendEmailSchema),
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      onError(null);
      onSuccess(null);

      await resendConfirmationEmail({ email: data.email });

      onSuccess("If an account exists, a new confirmation link was sent.");
      starCountdown();
    } catch (error) {
      const message =
        error instanceof ResendEmailError
          ? error.message
          : "Something went wrong. Try again.";

      onError(message);
    }
  });

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-5">
      <Input
        {...register("email")}
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="email@example.com"
        error={errors.email?.message}
        required
      />

      <Button
        type="submit"
        disabled={isRunning || isSubmitting}
        variant="secondary"
        className="w-full"
      >
        {isRunning
          ? `Resend in ${timer}s`
          : isSubmitting
            ? "Sending..."
            : "Send new link"}
      </Button>
    </form>
  );
};
