"use client";

type StatCardProps = {
  value: string;
  label: string;
  className?: string;
};

function StatCard({ value, label, className }: StatCardProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-black rounded-3xl p-6 min-w-64 w-full sm:w-auto shadow-lg ${className}`}
    >
      <span className="text-6xl font-bold text-[#18AB7C]">{value}</span>
      <span className="text-sm text-gray-400 mt-2">{label}</span>
    </div>
  );
}

export default function StatsSection() {
  return (
    <div className="flex items-center sm:flex-row flex-col justify-center gap-0.5 my-4 rounded-3xl w-full mt-[100px]">
      <div className="bg-black rounded-r-3xl h-[100px] w-full sm:block hidden" />
      <StatCard value="0%" className="-mt-12" label="Commission" />
      <StatCard value="8.49%" className="-mb-8 min-h-48" label="TrueAPY" />
      <div className="bg-black rounded-l-3xl h-[100px] w-full sm:block hidden" />
    </div>
  );
}

function ConcaveSVG() {
  return (
    <svg className="w-16 h-16" viewBox="0 0 100 100">
      <path d="M100,100 H0 V0 Q100,0 100,100 Z" fill="black" />
    </svg>
  );
}
