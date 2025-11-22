"use client";

import { LayoutGrid, MapPin, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Link } from "react-transition-progress/next";
import { useAuth } from "@/features/auth/context/auth-context";
import { useProgress } from "react-transition-progress";
import { startTransition } from "react";


export const Header = () => {
  const { user: isUserAuthenticated } = useAuth();

  return (
    <header className="flex justify-between items-center p-4 shadow-md mb-1">
      <SiteLogo />

      <nav className="flex items-center space-x-4">
        {isUserAuthenticated ? (
          // --- Authenticated View ---
          <AuthView />
        ) : (
          // --- Un-Authenticated View ---
          <UnAuthView />
        )}
      </nav>
    </header>
  );
};

const AuthView = () => {
  const { loading, logout } = useAuth();
  const startProgress = useProgress();

  const handleLogout = async () => {
    startProgress();
    await logout();
  };

  return (
    <>
      <SearchProduct />

      <SelectCategories />
      <Link href="/test" className="hover:underline">
        Test
      </Link>
     

      <span>Welcome</span>
      <button
        type="button"
        onClick={() => {
          startTransition(handleLogout);
        }}
        disabled={loading}
        className="bg-black text-white py-1.5 px-4 rounded-full cursor-pointer disabled:cursor-not-allowed"
      >
        Logout
      </button>
       <h2 className="flex gap-2 items-center text-lg">
        <ShoppingBag />0
      </h2>
    </>
  );
};

const UnAuthView = () => {
 
  return (
    <>
      
      <p className="inline-flex gap-2 cursor-pointer">Find us <MapPin/> </p>
     
    </>
  );
};

const SiteLogo = () => {
  return (
    <Link href={`/`}>
      <Image
        src={`/logo.png`}
        width={`60`}
        height={`60`}
        alt="logo"
        loading="eager"
      />
    </Link>
  );
};

const SelectCategories = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <h2 className="md:flex hidden gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
          <LayoutGrid className="h-5 w-5" />
          Category
        </h2>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Browse category</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SearchProduct = () => {
  return (
    <div className="md:flex hidden gap-2 rounded-full border p-2">
      <Search />
      <input type="text" placeholder="Search" className="outline-none" />
    </div>
  );
};
