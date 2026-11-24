"use client";

import { useAuth } from "@/providers";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface RedirectIfAuthenticatedProps {
  to: string;
  children: ReactNode;
  fallback?: ReactNode;
}

export const RedirectIfAuthenticated = ({
  to,
  children,
  fallback = null,
}: RedirectIfAuthenticatedProps) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace(to);
    }
  }, [loading, user, router, to]);

  if (loading || user) {
    return fallback;
  }

  return children;
};
