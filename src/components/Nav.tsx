"use client";

import { WalletMultiButton } from "./WalletMultiButton";
import Image from "next/image";
import Link from "next/link";

export const Nav = () => {
  return (
    <header className="flex items-center justify-end w-full p-4">
      <div className="w-full flex items-center gap-6 justify-self-start">
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
      <nav className="flex items-center gap-2 pr-10">
        <Link
          href="/projects"
          className="text-neutral-100 hover:text-[var(--color-primary-neon)] transition-colors duration-300"
        >
          Projects
        </Link>
      </nav>
      <WalletMultiButton className="min-w-[180px] bg-[var(--color-primary-neon)] hover:bg-[var(--color-secondary-accent)] cursor-pointer text-neutral-100 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out" />
    </header>
  );
};
