import { Logo } from "@/app/_components/ui";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex items-center justify-center h-screen px-4">
      <div className="flex flex-col gap-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        {children}
      </div>
    </div>
  );
}
