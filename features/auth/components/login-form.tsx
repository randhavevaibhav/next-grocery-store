"use client";

import { useAuth } from "../context/auth-context";
import { LoadingBar } from "@/components/ui/loading";
import { useForm } from "react-hook-form";
import { loginFormSchema, loginFormValues } from "./auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<loginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  function handleLogin(data: loginFormValues) {
    login({
      email: data.email,
      password: data.password,
    });
  }

 

  return (
    <div className="max-w-sm mx-auto mt-4 p-4">
       {loading?<LoadingBar />:null}
      <h1 className="text-2xl font-semibold mb-4">Log In</h1>

      <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
       
          <p className={`text-start text-sm text-red-600 mb-0 ${errors.email?'opacity-100':`opacity-0`}`}>
            *&nbsp;{errors.email?.message}
          </p>
      
        <input
          type="email"
          placeholder="Email"
          className="border px-3 py-2 w-full rounded"
          {...register("email")}
        />

       
          <p className={`text-start text-sm text-red-600 mb-0 ${errors.password?'opacity-100':`opacity-0`}`}>
            *&nbsp;{errors.password?.message}
          </p>
        
        <input
          type="password"
          placeholder="Password"
          className="border px-3 py-2 w-full rounded"
          {...register("password")}
        />

        <button
          type="submit"
          className="bg-black text-white cursor-pointer px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {error && (
        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};
