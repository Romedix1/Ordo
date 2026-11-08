"use client";

import { ErrorBox } from "@/app/_components/ui";
import { ResendButton } from "@/app/confirm-email/_components/resend-button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export const ConfirmEmailCard = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const email = searchParams.get("email");

  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-2xl font-semibold text-foreground">
          Check your email
        </h2>
        <p className="text-sm text-center text-muted-foreground">
          We sent a confirmation link to{" "}
          <span className="text-foreground font-medium">
            {email || "[MISSING ADDRESS]"}
          </span>
          . Click it to activate your account.
        </p>
      </div>

      {error && <ErrorBox error={error} />}

      <ResendButton userId={userId || ""} onError={setError} />
    </>
  );
};
