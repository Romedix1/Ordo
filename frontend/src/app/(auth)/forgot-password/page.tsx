import { Button, CardContainer, Input } from "@/app/_components/ui";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <>
      <CardContainer>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-foreground">
            Forgot password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email and we will send you a lik to reset your password
          </p>
        </div>

        <Input label="Email" placeholder="email@example.com" />

        <Button>Send reset link</Button>
      </CardContainer>

      <div className="flex justify-center">
        <Link
          href="/login"
          className="flex gap-1.5 items-center text-muted-foreground hover:text-muted-foreground/70 focus:text-muted-foreground/70 duration-200"
        >
          <ArrowLeft className="w-5 h-5" />{" "}
          <p className="text-sm font-medium">Back to sign in</p>
        </Link>
      </div>
    </>
  );
}
