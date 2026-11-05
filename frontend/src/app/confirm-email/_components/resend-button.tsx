"use client";

import { Button } from "@/app/_components/ui";
import { useEffect, useState } from "react";

export const ResendButton = () => {
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

  const handleClick = () => {
    setResendTimer(30);
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDisabled}
      variant="secondary"
      className="w-full"
    >
      {isDisabled ? `Resend in ${resendTimer}s` : "Resend email"}
    </Button>
  );
};
