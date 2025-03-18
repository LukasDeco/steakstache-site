"use client";

import { useStakeWizData } from "@/hooks/useStakeWizData";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-black sm:rounded-3xl p-6 min-w-64 w-full sm:w-auto shadow-lg ${className}`}
    >
      <span className="text-6xl font-bold text-[#18AB7C]">{value}</span>
      <span className="text-sm text-gray-400 mt-2">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  const { data, isLoading } = useStakeWizData();
  return (
    <div className="flex items-center sm:flex-row flex-col justify-center w-full mt-[100px]">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex sm:flex-row flex-col items-end justify-center w-full gap-0.5 animate-(--fade-in-animation)">
          <div className="bg-black rounded-r-3xl rounded-bl-3xl h-[150px] w-full sm:block hidden" />
          <StatCard
            value={data?.commission + "%"}
            className="-mb-[24px]"
            label="Commission"
          />
          <StatCard
            value={data?.total_apy + "%"}
            className="sm:min-h-48"
            label="TrueAPY"
          />
          <div className="bg-black rounded-l-3xl rounded-br-3xl h-[150px] w-full sm:block hidden" />
        </div>
      )}
    </div>
  );
}
