"use client";

import Image from "next/image";
import { WalletMultiButton } from "./Hero";
export const Nav = () => {
  return (
    <header className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <Image
          aria-hidden
          src="/assets/images/logo.png"
          alt="File icon"
          width={48}
          height={48}
        />
        <h1 className="text-2xl font-bold text-neutral-100">SteakStache</h1>
      </div>
      <WalletMultiButton className="bg-[#090C08] hover:bg-[#18AB7C] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out" />
    </header>
  );
};
