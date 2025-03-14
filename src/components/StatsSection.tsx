"use client";

import Image from "next/image";

type StatCardProps = {
  value: string;
  label: string;
};

function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="relative flex flex-col items-center justify-center bg-black rounded-3xl p-6 w-64 shadow-lg">
      <span className="text-5xl font-bold text-[#18AB7C]">{value}</span>
      <span className="text-sm text-gray-400 mt-2">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <div className="flex items-center justify-center gap-1 my-4 rounded-3xl w-full">
      <div className="bg-black rounded-3xl h-full w-full" />
      <StatCard value="192k" label="Assets under management" />
      <StatCard value="34" label="Unique delegators" />
      <div className="bg-black rounded-3xl h-full w-full" />
    </div>
  );
}
