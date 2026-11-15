import { StatusCard } from "@/app/_components/auth";
import { Button } from "@/app/_components/ui";
import Link from "next/link";

export const ChangePasswordSuccess = () => {
  return (
    <StatusCard
      variant="success"
      title="Password changed"
      description="Your password has been updated. You can sign in with your new password."
    >
      <Button render={<Link href="/login" />} className="w-full">
        Continue to sign in
      </Button>
    </StatusCard>
  );
};
