import { GuestSection } from "@/app/_components/start/guest/guest-section";
import { Button } from "@/app/_components/ui";
import { Separator } from "@base-ui/react";
import { cn } from "cn";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export interface GuestSectionData {
  id: string;
  ordered: boolean;
  header: string;
  paragraph: string;
  list: { value: string; text: string }[];
}

const guestSections: GuestSectionData[] = [
  {
    id: "does",
    ordered: false,
    header: "What it does",
    paragraph: "The parts you will use every day.",
    list: [
      {
        text: "Boards and columns",
        value:
          "Make a board per project, add columns like To do, In progress and Done, and rename or reorder them any time.",
      },
      {
        text: "Drag and drop",
        value:
          "Move cards between columns with a mouse or a finger. On the keyboard: Space to pick up, arrows to move, Space to drop.",
      },
      {
        text: "Card details",
        value:
          "Each card has a description, labels, comments and a checklist that shows how much is done.",
      },
      {
        text: "Accounts",
        value:
          "Sign up with an email and confirm it, reset a forgotten password, or sign in with GitHub.",
      },
    ],
  },
  {
    id: "how",
    ordered: true,
    header: "How it works",
    paragraph: "From an empty board to a working one in three steps.",
    list: [
      {
        text: "Create a board",
        value:
          "One board per project: a side project, a trip, a semester. Give it a name and you are in.",
      },
      {
        text: "Add columns and cards",
        value:
          "Start with To do, In progress and Done, or make your own. Each task is a card.",
      },
      {
        text: "Move cards as work moves",
        value:
          "Drag a card to the next column when you start it and again when it is finished. The board shows where everything stands.",
      },
    ],
  },
];

export const GuestPage = () => {
  return (
    <>
      <div
        className={cn(
          "pt-10 px-4 flex flex-col gap-8 items-center",
          "sm:px-0 sm:pt-20 sm:gap-3.5",
        )}
      >
        <div className={cn("flex flex-col gap-5 w-full", "sm:gap-6")}>
          <h1
            className={cn(
              "max-w-190 font-semibold text-[34px] leading-9.5 tracking-[-2.5%]",
              "sm:text-[52px] sm:leading-14",
            )}
          >
            A kanban board for small projects.
          </h1>
          <p
            className={cn(
              "text-[18px] leading-7 text-muted-foreground max-w-140",
              "sm:text-[16px] sm:leading-6",
            )}
          >
            Ordo keeps your tasks in columns you can drag between, so you always
            see what is next, what is in progress and what is done.
          </p>

          <div
            className={cn(
              "flex flex-col gap-3 w-full items-center",
              "sm:flex-row sm:gap-6",
            )}
          >
            <Button
              render={<Link href={"/register"} />}
              className={cn("w-full px-7 py-2.5", "sm:w-fit")}
            >
              Get started
            </Button>
            <Link
              href="/login"
              className={cn(
                "text-[14px] font-medium text-foreground flex items-center gap-3 group",
                "underline decoration-2 underline-offset-4 decoration-transparent",
                "transition-colors duration-300 hover:decoration-border-dashed",
                "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              )}
            >
              I already have an account
              <ArrowRight className="w-3.5 h-3.5 duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* TODO: ADD BOARD IMAGE */}
      </div>

      <div
        className={cn(
          "pt-16 px-4 flex flex-col gap-14 pb-22",
          "sm:px-0 sm:pt-28 sm:gap-24",
        )}
      >
        {guestSections.map((section) => (
          <GuestSection key={section.header} data={section} />
        ))}

        <Separator className="bg-border w-full h-px" />

        <div
          className={cn(
            "flex flex-col gap-4 justify-between items-center",
            "sm:flex-row sm:gap-0",
          )}
        >
          <div className="flex flex-col gap-1">
            <h3 className="text-[24px] leading-8 font-semibold">
              Start with an empty board.
            </h3>
            <p className="text-sm leading-5 text-muted-foreground">
              Sign up with an email or your GitHub account. It takes about a
              minute.
            </p>
          </div>

          <Button
            className={cn("w-full py-3", "sm:w-fit sm:py-2")}
            render={<Link href="/register" />}
          >
            Get started
          </Button>
        </div>
      </div>
    </>
  );
};
