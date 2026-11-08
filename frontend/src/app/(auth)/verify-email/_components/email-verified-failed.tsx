"use client";

import { SendNewLinkSection } from "@/app/(auth)/verify-email/_components";
import { CardContainer, ErrorBox, SuccessBox } from "@/app/_components/ui";
import { CircleAlert } from "lucide-react";
import { useState } from "react";

export const EmailVerifiedFailed = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <CardContainer className="items-center">
        <div className="p-3 bg-destructive/10 flex justify-center items-center rounded-xl">
          <CircleAlert className="w-7 h-7 text-destructive" />
        </div>

        <div className="flex flex-col justify-center items-center gap-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Invalid link
          </h2>
          <p className="text-sm text-center text-muted-foreground">
            This confirmation link is incomplete, invalid or has expired.Enter
            your email and we will send you a new one.
          </p>
        </div>

        {error && <ErrorBox error={error} />}
        {success && <SuccessBox message={success} />}

        <SendNewLinkSection onError={setError} onSuccess={setSuccess} />
      </CardContainer>
    </div>
  );
};
