"use client";

import { Loading } from "@/components/ui/loading";

import { useAuth } from "@/features/auth/context/auth-context";

export default function RootClientPage() {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return null;
  }

  return <div>Home page {user.id}</div>;
}
