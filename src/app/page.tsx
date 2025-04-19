import { Hero } from "@/components/Hero";
import StakeSection from "@/components/StakeSection";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 row-start-2 text-neutral-100 justify-between items-center sm:items-start w-full min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full flex flex-col gap-8">
        <div className="flex flex-col gap-8">
          <Hero />
          <div id="staking-section">
            <StakeSection />
          </div>
        </div>
      </div>
    </div>
  );
}
