import { CardContainer } from "@/app/_components/ui";
import { cn } from "cn";
import { CircleAlert, CircleCheckBig, LucideIcon } from "lucide-react";
import { ReactNode } from "react";

type StatusVariant = "success" | "error";

const variants: Record<
  StatusVariant,
  { icon: LucideIcon; iconBg: string; iconColor: string }
> = {
  success: {
    icon: CircleCheckBig,
    iconBg: "bg-label-green",
    iconColor: "text-label-green-foreground",
  },
  error: {
    icon: CircleAlert,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
  },
};

interface StatusCardProps {
  variant: StatusVariant;
  title: string;
  description: ReactNode;
  children?: ReactNode;
}

export const StatusCard = ({
  variant,
  title,
  description,
  children,
}: StatusCardProps) => {
  const { icon: Icon, iconBg, iconColor } = variants[variant];

  return (
    <CardContainer className="items-center">
      <div
        className={cn("p-3 flex justify-center items-center rounded-xl", iconBg)}
      >
        <Icon className={cn("w-7 h-7", iconColor)} />
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-sm text-center text-muted-foreground">
          {description}
        </p>
      </div>

      {children}
    </CardContainer>
  );
};
