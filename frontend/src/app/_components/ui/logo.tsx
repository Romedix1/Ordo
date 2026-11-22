import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <Image
        width={64}
        height={64}
        src="/logo.svg"
        alt="Logo"
        className="h-8 w-8"
      />

      <span className="text-2xl text-foreground font-semibold">Ordo</span>
    </Link>
  );
};
