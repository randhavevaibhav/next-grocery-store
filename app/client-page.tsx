"use client";

import { Redirect } from "@/components/ui/redirect";
import { useAuth } from "@/features/auth/context/auth-context";

export default function RootClientPage() {
  const { loading, user } = useAuth();

  if (loading) {
    return <Redirect />;
  }

  if (!user) {
    return null;
  }

  return <div>Home page</div>;
}
