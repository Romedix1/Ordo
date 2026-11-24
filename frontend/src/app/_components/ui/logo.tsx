import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  size?: keyof typeof sizes;
}

const sizes = {
  sm: { link: "gap-2", icon: "h-6 w-6", text: "text-lg" },
  default: { link: "gap-2.5", icon: "h-8 w-8", text: "text-2xl" },
  responsive: {
    link: "gap-2 sm:gap-2.5",
    icon: "h-6 w-6 sm:h-8 sm:w-8",
    text: "text-lg sm:text-2xl",
  },
};

export const Logo = ({ className, size = "default" }: LogoProps) => {
  const styles = sizes[size];

  return (
    <Link href="/" className={cn("flex items-center", styles.link, className)}>
      <Image
        width={64}
        height={64}
        src="/logo.svg"
        alt=""
        className={styles.icon}
      />
      <span className={cn("font-semibold text-foreground", styles.text)}>
        Ordo
      </span>
    </Link>
  );
};
