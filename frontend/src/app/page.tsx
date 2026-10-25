import { Avatar } from "@/app/_components/ui/avatar";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Avatar userId="12d" initials="MD" />
      <Avatar userId="13d" initials="MD" />
      <Avatar userId="1d2d" initials="MD" />
      <Avatar userId="1522ad" initials="MD" />
    </div>
  );
}
