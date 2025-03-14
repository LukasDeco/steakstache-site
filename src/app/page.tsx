import { AppWrapper } from "@/components/AppWrapper";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import StatsSection from "@/components/StatsSection";
export default function Home() {
  return (
    <div className="flex flex-col gap-8 pt-4 row-start-2 text-neutral-100 justify-between items-center sm:items-start bg-[radial-gradient(100%_100%_at_50%_80%,#FFDADE_0%,#18AB7C_40%,#090C08_70%)] h-screen w-full min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
      <AppWrapper>
        <div className="px-8 sm:px-20 flex flex-col gap-8">
          <Nav />
          <div className="mt-[200px]">
            <Hero />
          </div>
        </div>
        <StatsSection />
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center w-full">
          SteakStache © 2025
        </footer>
      </AppWrapper>
    </div>
  );
}
