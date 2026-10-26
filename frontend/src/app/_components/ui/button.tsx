import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

const buttonVariants = cva(
  "h-fit gap-2 rounded-lg flex items-center justify-center px-4 py-2 text-sm font-medium duration-200 outline-none hover:cursor-pointer focus-visible:ring-[3px] ring-ring/50 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "bg-secondary text-foreground hover:bg-secondary/80",
        ghost:
          "bg-transparent text-muted-foreground hover:bg-secondary/80 hover:text-foreground",
        destructive:
          "bg-destructive text-primary-foreground hover:bg-destructive/90",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export const Button = ({
  className,
  variant = "primary",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  );
};
