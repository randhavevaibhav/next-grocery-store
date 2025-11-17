"use client";

import { createClient } from "@/lib/supabase/supabse-client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export type AuthUser = {
  id: string;
  email: string | undefined;
};

type AuthContextType = {
  user: AuthUser | null;
  logout: () => Promise<void>;
  loading: boolean;
  login: ({ email, password }: { email: string; password: string }) => {};
  error: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const supabaseClient = createClient();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      setUser(data.user ? { id: data.user.id, email: data.user.email } : null);
      setLoading(false);
    };
    getUser();

    // Listen for login/logout changes
    const { data: listener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setUser(
          session?.user
            ? { id: session.user.id, email: session.user.email }
            : null
        );
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const logout = async () => {
    setLoading(true);
    setUser(null);
    await supabaseClient.auth.signOut();

    setLoading(false);
    router.push("/login");
    router.refresh();
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);

      return;
    }

    // Redirect user after login
    setLoading(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, login, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(`Please use auth context inside auth context provider`);
  }

  return contextValue;
};
