"use client";

import { createClient } from "@/lib/supabase/supabse-client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthUser = {
  id: string;
  email: string | undefined;
};

type AuthContextType = {
  user: AuthUser | null;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabaseClient = createClient();

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
    await supabaseClient.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, loading }}>
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
