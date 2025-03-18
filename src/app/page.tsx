import { AppWrapper } from "@/components/AppWrapper";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import StatsSection from "@/components/StatsSection";
export default function Home() {
  return (
    <div className="flex flex-col gap-8 pt-4 row-start-2 text-neutral-100 justify-between items-center sm:items-start w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="px-8 sm:px-20 flex flex-col gap-8">
        <div className="mt-[200px]">
          <Hero />
        </div>
      </div>
      <StatsSection />
    </div>
  );
}
