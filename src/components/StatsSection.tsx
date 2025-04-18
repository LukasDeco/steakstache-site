"use client";

import { useStakeWizData } from "@/hooks/useStakeWizData";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
  loading?: boolean;
};

function StatCard({ value, label, className, loading }: StatCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center p-3 bg-[var(--transparent-background)] rounded-2xl justify-center w-full sm:w-auto shadow-lg ${className}`}
    >
      <span className="text-6xl font-bold text-[var(--color-primary-neon)]">
        {loading ? (
          <span className="animate-pulse">...</span>
        ) : (
          <span className="animate-(--fade-in-animation)">{value}</span>
        )}
      </span>
      <span className="text-sm text-[var(--color-primary-neon)] mt-2 text-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function StatsSection() {
  const { data, isLoading } = useStakeWizData();
  return (
    <div className="flex items-center sm:flex-row flex-col justify-center w-full bg-[url('/assets/images/red-hills.png')] p-10 rounded-2xl bg-cover bg-center">
      <div className="flex sm:flex-row flex-col items-center justify-center w-full gap-4">
        {/* <div className="flex-1">
          <StatCard
            value={data?.commission?.toFixed(2) + "%"}
            label="Inflation Commission"
            loading={isLoading}
          />
        </div> */}
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
