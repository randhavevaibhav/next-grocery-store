import { Button } from "@/components/ui/button";
import { LayoutGrid, Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <div className="flex p-5 shadow-md justify-between">
      <div className="flex items-center gap-8">
        <Image src={`/logo.png`} width={80} height={80} alt="logo" />

        <h2 className="md:flex hidden gap-2 items-center border rounded-full p-2 px-10 bg-slate-200">
          <LayoutGrid className="h-5 w-5" />
          Category
        </h2>
        <div className="md:flex hidden gap-2 rounded-full border p-2">
          <Search />
          <input type="text" placeholder="Search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <h2 className="flex gap-2 items-center text-lg">
          <ShoppingBag />0
        </h2>
        <Button>Login</Button>
      </div>
    </div>
  );
};
