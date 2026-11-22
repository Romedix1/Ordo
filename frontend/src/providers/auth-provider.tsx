"use client";

import { getMe, refreshAccessToken, type Me } from "@/lib";
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
    <AuthContext.Provider value={{ user, accessToken, loading, signIn }}>
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
