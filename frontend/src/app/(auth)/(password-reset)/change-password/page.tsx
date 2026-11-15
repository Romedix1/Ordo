import { ChangePasswordForm } from "@/app/(auth)/(password-reset)/change-password/_components";
import { Suspense } from "react";

export default function ChangePasswordPage() {
  return (
    <Suspense>
      <ChangePasswordForm />
    </Suspense>
  );
}
