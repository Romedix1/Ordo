"use client";

import { SendNewLinkSection } from "@/app/(auth)/verify-email/_components";
import { StatusCard } from "@/app/_components/auth";
import { ErrorBox, SuccessBox } from "@/app/_components/ui";
import { useState } from "react";

export const EmailVerifiedFailed = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <StatusCard
      variant="error"
      title="Invalid link"
      description="This confirmation link is incomplete, invalid or has expired. Enter your email and we will send you a new one."
    >
      {error && <ErrorBox error={error} />}
      {success && <SuccessBox message={success} />}

      <SendNewLinkSection onError={setError} onSuccess={setSuccess} />
    </StatusCard>
  );
};
