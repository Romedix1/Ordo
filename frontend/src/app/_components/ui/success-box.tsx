import { CircleCheckBig } from "lucide-react";

interface SuccessBoxProps {
  message: string;
}

export const SuccessBox = ({ message }: SuccessBoxProps) => {
  return (
    <div
      role="status"
      className="p-3 flex gap-2 items-center bg-label-green border-destructive/30 rounded-lg text-sm text-label-green-foreground w-full"
    >
      <CircleCheckBig className="text-label-green-foreground shrink-0" />
      {message}
    </div>
  );
};
