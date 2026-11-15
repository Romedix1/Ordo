import { StatusCard } from "@/app/_components/auth";
import { Button } from "@/app/_components/ui";
import Link from "next/link";

export const EmailVerifiedSuccess = () => {
  return (
    <StatusCard
      variant="success"
      title="Email confirmed"
      description="Your account is active. You can sign in now."
    >
      <Button render={<Link href="/login" />} className="w-full">
        Continue to sign in
      </Button>
    </StatusCard>
  );
};
