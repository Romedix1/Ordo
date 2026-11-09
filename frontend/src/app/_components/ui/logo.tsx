import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        width={64}
        height={64}
        src="/logo.svg"
        alt="logo"
        className="h-8 w-8"
      />
      <h2 className="text-2xl text-foreground font-semibold">Ordo</h2>
    </div>
  );
};
