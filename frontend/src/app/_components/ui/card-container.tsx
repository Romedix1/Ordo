import { cn } from "cn";
import { ReactNode } from "react";

interface CardContainerProps {
  children: ReactNode;
  className?: string;
}

export const CardContainer = ({ children, className }: CardContainerProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 p-6 md:p-8 md:w-100",
        "bg-card rounded-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
};
