"use client";

import { StatCard } from "./StatCard";
import { useStakeWizData } from "@/hooks/useStakeWizData";

export default function HeroStats() {
  const { data, isLoading } = useStakeWizData();
  return (
    <div className="flex items-center sm:flex-row flex-col justify-center w-full bg-[url('/assets/images/red-hills.png')] p-10 rounded-2xl bg-cover bg-center">
      <div className="flex sm:flex-row flex-col items-center justify-center w-full gap-4">
        <div className="flex-1">
          <StatCard
            value={data?.total_apy + "%"}
            label="TrueAPY"
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
