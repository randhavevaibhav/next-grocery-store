"use client";

import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LoginForm } from "./login-form";
import { useState } from "react";
import { SignupForm } from "./signup-form";
import { useAuth } from "../context/auth-context";
import { Button } from "@/components/ui/button";

export const AuthContainer = () => {
  const [formType, setFormType] = useState<"loginForm" | "signupForm">(
    "loginForm"
  );
  const { user, loading } = useAuth();

  return (
    <>
      {!user ? (
        <Dialog>
          <DialogTrigger asChild onClick={() => setFormType("loginForm")}>
            <div className="flex flex-col mb-4 lg:mb-6 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <Button size={"lg"}>
                <LogIn size={22} />
                Login
              </Button>
            </div>
          </DialogTrigger>

          <p className="mt-4 text-center  text-white">
            Don’t have an account?&nbsp;
            <DialogTrigger onClick={() => setFormType("signupForm")}>
              <p className=" underline cursor-pointer">Sign up</p>
            </DialogTrigger>
          </p>

          <DialogContent
            className="sm:max-w-[425px]"
            // Prevent closing via clicking outside of a dialog
            onPointerDownOutside={(e) => {
              if (loading) {
                e.preventDefault();
              }
            }}
            // conditionally show X - close dialog button
            showCloseButton={!loading}
            // Prevent closing via Escape key press
            onEscapeKeyDown={(e) => {
              if (loading) {
                e.preventDefault();
              }
            }}
          >
            {formType === "loginForm" ? (
              <>
                <DialogTitle>Login to Farm Fresh</DialogTitle>
                <LoginForm />
              </>
            ) : (
              <>
                <DialogTitle>Signup to Farm Fresh</DialogTitle>
                <SignupForm />
              </>
            )}

            {formType === "loginForm" && !loading ? (
              <DialogFooter className="justify-center!">
                <p className="mt-4 text-center text-sm">
                  Don’t have an account?&nbsp;
                  <button
                    type="button"
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => setFormType("signupForm")}
                  >
                    Sign up
                  </button>
                </p>
              </DialogFooter>
            ) : !loading ? (
              <DialogFooter className="justify-center!">
                <p className="mt-4 text-center text-sm">
                  have a account?&nbsp;
                  <button
                    type="button"
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() => setFormType("loginForm")}
                  >
                    Login
                  </button>
                </p>
              </DialogFooter>
            ) : null}
          </DialogContent>
        </Dialog>
      ) : null}
    </>
  );
};
