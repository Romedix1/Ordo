"use client";

import { AuthForm } from "@/app/_components/auth";

export default function Home() {
  return (
    <div className="flex items-start pt-48 flex-1  justify-center bg-zinc-50 dark:bg-black  gap-4">
      <AuthForm type="login" />
      <AuthForm type="register" />
    </div>
  );
}
