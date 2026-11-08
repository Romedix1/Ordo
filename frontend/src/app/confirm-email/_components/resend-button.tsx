"use client";

import { Button } from "@/app/_components/ui";
import { useEffect, useState } from "react";

class ResendEmailError extends Error {}

interface ResendButtonProps {
  userId: string;
  onError: (message: string) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5259";

const RESEND_COOLDOWN = 1;

export const ResendButton = ({ userId, onError }: ResendButtonProps) => {
  const [sending, setSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const isDisabled = resendTimer > 0;

  useEffect(() => {
    if (isDisabled) {
      const timerInterval = setInterval(
        () => setResendTimer((prev) => prev - 1),
        1000,
      );

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [isDisabled, resendTimer]);

  const handleClick = async () => {
    try {
      onError("");
      setSending(true);

      const response = await fetch(`${API_URL}/auth/resend-confirmation`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();

        const errorMessage =
          errorData?.title || "Failed to resend confirmation email.";

        throw new ResendEmailError(errorMessage);
      }
    } catch (error) {
      const message =
        error instanceof ResendEmailError
          ? error.message
          : "Something went wrong. Try again.";

      onError(message);
    } finally {
      setSending(false);
      setResendTimer(RESEND_COOLDOWN);
    }
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled || !userId}
      variant="secondary"
      className="w-full"
    >
      {isDisabled
        ? `Resend in ${resendTimer}s`
        : sending
          ? "Sending..."
          : !userId
            ? "Missing data to resend"
            : "Resend email"}
    </Button>
  );
};
