type StatCardProps = {
  value: string;
  label: string;
  className?: string;
  loading?: boolean;
};

export function StatCard({ value, label, className, loading }: StatCardProps) {
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
