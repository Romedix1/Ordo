import { CardContainer, Logo } from "@/app/_components/ui";
import { ConfirmEmailCard } from "@/app/confirm-email/_components";
import { Mail } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default function ConfirmEmailPage() {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <CardContainer className="items-center">
          <div className="p-3 bg-accent-subtle flex justify-center items-center rounded-xl">
            <Mail className="w-7 h-7 text-primary" />
          </div>

          <Suspense>
            <ConfirmEmailCard />
          </Suspense>

          <p className="text-xs text-muted-foreground text-center">
            Didn{"'"}t get it? Check your spam folder. The link expires in 24
            hours
          </p>
        </CardContainer>

        <div className="flex justify-center">
          <p>
            <span className="text-muted-foreground text-sm">Wrong email?</span>
            <Link
              href={"/register"}
              className="text-sm font-medium text-primary hover:text-primary/80 focus:text-primary/80 outline-none duration-200"
            >
              {" "}
              Back to sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
