"use client";

import { WalletMultiButton } from "./Hero";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <header className="flex items-center justify-between w-full p-4">
      <div className="flex items-center gap-2">
        <Link className="flex items-center gap-2" href="/">
          <Image
            aria-hidden
            src="/assets/images/logo.png"
            alt="File icon"
            width={48}
            height={48}
          />
          <h1 className="text-2xl font-bold text-neutral-100">SteakStache</h1>
        </Link>
      </div>
      <WalletMultiButton className="bg-[var(--color-background)] hover:bg-[var(--color-secondary-accent)] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out" />
    </header>
  );
};
