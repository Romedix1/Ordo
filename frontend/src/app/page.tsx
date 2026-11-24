import { RedirectIfAuthenticated } from "@/app/_components/auth";
import { GuestPage } from "@/app/_components/start/guest";
import { cn } from "cn";

export default function Home() {
  return (
    <div className="bg-background">
      <div className={cn("container max-w-7xl mx-auto px-2", "sm:px-6")}>
        <RedirectIfAuthenticated to="/dashboard">
          {/* TODO: ADD FALLBACK LOADING PAGE */}
          <GuestPage />
        </RedirectIfAuthenticated>
      </div>
    </div>
  );
}
