import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 pt-4 row-start-2 justify-between items-center sm:items-start h-full w-full min-h-screen px-8 pb-20 sm:px-20 font-[family-name:var(--font-geist-sans)]">
      <header className="flex items-center justify-start">
        <Image
          aria-hidden
          src="/assets/images/logo.webp"
          alt="File icon"
          width={48}
          height={48}
        />
        <h1 className="text-2xl font-bold">SteakStache</h1>
      </header>
      <main className="flex flex-1 flex-col gap-8 row-start-2 justify-start items-center sm:items-start h-full w-full">
        <h2>
          SteakStache is a high-quality Solana validator node for you to stake
          with
        </h2>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center w-full">
        SteakStache © 2025
      </footer>
    </div>
  );
}
