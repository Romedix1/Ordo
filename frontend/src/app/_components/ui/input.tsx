import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "cn";
import { cva } from "class-variance-authority";

interface InputProps {
  label?: string;
  error?: string;
}

const inputStyles = cva(
  "w-full rounded-md border bg-background px-3 py-1.5 text-sm duration-200 text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-border focus:border-ring focus:ring-2 focus:ring-ring/30 hover:border-primary/50",
        error:
          "border-destructive focus:border-destructive focus:ring-2 focus:ring-destructive/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const Input = ({
  label,
  error,
  className,
  type,
  id,
  ...props
}: React.ComponentProps<"input"> & InputProps) => {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <InputPrimitive
        id={id}
        type={type}
        data-slot="input"
        className={cn(
          inputStyles({ variant: error ? "error" : "default" }),
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};
