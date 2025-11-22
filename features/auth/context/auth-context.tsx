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
  login: ({ email, password }: { email: string; password: string }) => void;
  error: string | null;
  message: string | null;
  signup:({email,password}:{email:string,password:string})=>void
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
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

  const signup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setMessage(null)
    setLoading(true);
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      setMessage(null);
      return;
    }

    setLoading(false);
    setMessage("Check your email to confirm your signup.");
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

    // Redirect user to test after login -- replace /test with actual page
    router.push("/test");
    setError(null);
      setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    setUser(null);
    await supabaseClient.auth.signOut();

    //after log out re-direct to home page
    router.push("/");
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading, login, error,message ,signup}}>
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
