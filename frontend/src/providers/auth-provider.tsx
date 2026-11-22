"use client";

import { API_URL, getMe, refreshAccessToken, type Me } from "@/lib";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextValue {
  user: Me | null;
  accessToken: string | null;
  loading: boolean;
  signIn: (accessToken: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Me | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (token: string) => {
    setAccessToken(token);
    setUser(await getMe(token));
  };

  const signOut = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    }).catch(() => null);

    setAccessToken(null);
    setUser(null);
  };

  useEffect(() => {
    const load = async () => {
      try {
        await signIn(await refreshAccessToken());
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
