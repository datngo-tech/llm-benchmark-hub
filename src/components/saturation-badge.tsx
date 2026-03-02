import type { BenchmarkStatus } from "@/lib/types";

interface SaturationBadgeProps {
  status: BenchmarkStatus;
}

type StatusConfig = {
  dotColor: string;
  textColor: string;
  label: string;
};

const statusConfig: Record<BenchmarkStatus, StatusConfig> = {
  Active: {
    dotColor: "bg-emerald-400",
    textColor: "text-emerald-400",
    label: "Active",
  },
  "Active (continuously updated)": {
    dotColor: "bg-sky-400",
    textColor: "text-sky-400",
    label: "Continuously Updated",
  },
  "Active / Living Leaderboard": {
    dotColor: "bg-sky-400",
    textColor: "text-sky-400",
    label: "Living Leaderboard",
  },
  "Near-saturated": {
    dotColor: "bg-yellow-400",
    textColor: "text-yellow-400",
    label: "Near-saturated",
  },
  Saturated: {
    dotColor: "bg-red-400",
    textColor: "text-red-400",
    label: "Saturated",
  },
  "Partially saturated": {
    dotColor: "bg-orange-400",
    textColor: "text-orange-400",
    label: "Partially Saturated",
  },
};

export function SaturationBadge({ status }: SaturationBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-medium ${config.textColor}`}
    >
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full ${config.dotColor}`}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
