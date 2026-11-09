"use client";

import { EmailVerifiedFailed } from "@/app/(auth)/verify-email/_components/email-verified-failed";
import { EmailVerifiedSuccess } from "@/app/(auth)/verify-email/_components/email-verified-success";
import { CardContainer } from "@/app/_components/ui";
import { verifyEmail } from "@/lib";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const VerifyEmailCard = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!userId || !token) {
      return;
    }

    verifyEmail({ userId, token })
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [userId, token, status]);

  if (status === "loading") {
    return (
      <CardContainer className="items-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Verifying your email...</p>
      </CardContainer>
    );
  }

  return status === "success" ? (
    <EmailVerifiedSuccess />
  ) : (
    <EmailVerifiedFailed />
  );
};
