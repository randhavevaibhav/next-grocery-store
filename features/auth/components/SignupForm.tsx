"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/supabse-client";
import Link from "next/link";

export const SignupForm = () => {
  const supabaseClient = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email to confirm your signup.");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16 p-4">
      <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

      <form onSubmit={handleSignup} className="space-y-4">
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
          className="bg-black text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm">
        Have an account?&nbsp;
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </p>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};
