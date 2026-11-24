import { Logo } from "@/app/_components/ui";
import { cn } from "cn";
import { cacheLife } from "next/cache";
import { FiGithub } from "react-icons/fi";

const getCurrentYear = async () => {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
};

export const Footer = async () => {
  const dateYear = await getCurrentYear();

  return (
    <footer
      className={cn(
        "px-4 py-6 sm:p-6",
        "border-t border-t-border",
        "flex flex-col gap-4 sm:flex-row sm:gap-0 sm:justify-between",
      )}
    >
      <div className="flex items-center gap-3 w-full">
        <Logo size="responsive" />
        <p className="text-[13px] text-[#71717a]">
          &copy; {dateYear} &bull; Built by Romedix1
        </p>
      </div>

      <a
        rel="noopener noreferrer"
        target="_blank"
        href={"https://github.com/Romedix1/Ordo"}
        className="flex items-center gap-2 shrink-0"
      >
        <FiGithub className="w-4 h-4 shrink-0" />
        <span className="text-sm font-medium text-muted-foreground">
          Source on GitHub
        </span>
      </a>
    </footer>
  );
};
