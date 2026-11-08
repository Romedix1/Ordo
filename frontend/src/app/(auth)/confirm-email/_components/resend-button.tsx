"use client";

import { Button } from "@/app/_components/ui";
import { useCountdown } from "@/hooks";
import { resendConfirmationEmail, ResendEmailError } from "@/lib";
import { useState } from "react";

interface ResendButtonProps {
  userId: string;
  onError: (message: string | null) => void;
  onSuccess: (success: string | null) => void;
}

export const RESEND_COOLDOWN = 30;

export const ResendButton = ({
  userId,
  onError,
  onSuccess,
}: ResendButtonProps) => {
  const [sending, setSending] = useState(false);

  const { timer, isRunning, starCountdown } = useCountdown(30);

  const handleClick = async () => {
    try {
      onError(null);
      onSuccess(null);

      setSending(true);

      await resendConfirmationEmail({ userId });

      onSuccess("Email send successfully");
      starCountdown();
    } catch (error) {
      const message =
        error instanceof ResendEmailError
          ? error.message
          : "Something went wrong. Try again.";

      onError(message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isRunning || sending || !userId}
      variant="secondary"
      className="w-full"
    >
      {isRunning
        ? `Resend in ${timer}s`
        : sending
          ? "Sending..."
          : !userId
            ? "Missing data to resend"
            : "Resend email"}
    </Button>
  );
};
