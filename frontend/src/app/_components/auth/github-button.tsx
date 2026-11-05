import { Button } from "@/app/_components/ui";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

interface GithubButtonProps {
  isSubmitting: boolean;
}

export const GithubButton = ({ isSubmitting }: GithubButtonProps) => {
  return (
    <Button type="button" variant="secondary" disabled={isSubmitting}>
      <Link
        href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}
        className="flex items-center gap-2"
      >
        <FaGithub />
        Continue with GitHub
      </Link>
    </Button>
  );
};
