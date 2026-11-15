import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PasswordResetLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {children}

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
