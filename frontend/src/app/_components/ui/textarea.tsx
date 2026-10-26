import * as React from "react";
import { cn } from "cn";

interface TextAreaProps {
  id: string;
  label: string;
}

export const Textarea = ({
  id,
  label,
  className,
  ...props
}: React.ComponentProps<"textarea"> & TextAreaProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <textarea
        id={id}
        data-slot="textarea"
        className={cn(
          "flex w-full min-h-24 px-3 py-2",
          "rounded-md border bg-background text-sm text-foreground",
          "outline-none duration-200",
          "border-border hover:border-primary/50 focus:border-ring focus:ring-2 focus:ring-ring/30",
          "disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground",
          className,
        )}
        {...props}
      />
    </div>
  );
};
