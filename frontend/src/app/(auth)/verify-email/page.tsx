import { VerifyEmailCard } from "@/app/(auth)/verify-email/_components";
import { Suspense } from "react";

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailCard />
    </Suspense>
  );
}
