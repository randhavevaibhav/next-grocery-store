"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/auth-context";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAuth();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    login({
      email,
      password,
    });
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-4">
      <h1 className="text-2xl font-semibold mb-6">Log In</h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 w-full rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 w-full rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="cursor-pointer px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
      )}

      <p className="mt-4 text-center text-sm">
        Don’t have an account?&nbsp;
        <Link href="/signup" className="text-blue-600 underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};
