import { Button } from "@/app/_components/ui";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface GithubButtonProps {
  isSubmitting: boolean;
}

export const GithubButton = ({ isSubmitting }: GithubButtonProps) => {
  return (
    <Button
      render={
        <Link
          href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}
          className="flex items-center gap-2"
        />
      }
      type="button"
      variant="secondary"
      disabled={isSubmitting}
    >
      <FaGithub />
      Continue with GitHub
    </Button>
  );
};
