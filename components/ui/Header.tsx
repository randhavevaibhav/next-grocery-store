"use client";

import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/features/auth/context/AuthContext";

export const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLoginLogout = () => {
    if (user) {
      logout();
    }
    router.push("/login");
  };
  return (
    <div className="flex p-5 shadow-md justify-between">
      <div className="flex items-center gap-8">
        <Link href={`/`}>
          <Image
            src={`/logo.png`}
            width={`80`}
            height={`80`}
            alt="logo"
            loading="eager"
          />
        </Link>

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
        <div className="md:flex hidden gap-2 rounded-full border p-2">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag />0
        </h2>
        <Button className="cursor-pointer" onClick={handleLoginLogout}>
          {`${user ? `Logout` : `Login`}`}
        </Button>
      </div>
    </div>
  );
};
