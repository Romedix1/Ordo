import { CircleAlert } from "lucide-react";

interface ErrorBoxProps {
  error: string;
}

export const ErrorBox = ({ error }: ErrorBoxProps) => {
  return (
    <div
      role="alert"
      className="p-3 flex gap-2 items-center bg-destructive/10 border-destructive/30 rounded-lg text-sm text-destructive w-full"
    >
      <CircleAlert className="text-destructive shrink-0" />
      {error}
    </div>
  );
};
