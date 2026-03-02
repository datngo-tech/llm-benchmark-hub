"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { ModelScore } from "@/lib/types";

interface ModelScoresChartProps {
  scores: ModelScore[];
  humanBaseline?: number;
  metricScale?: string;
  /** Maximum bar height - defaults to 100 */
  maxValue?: number;
}

const BAR_COLORS = [
  "#3b82f6",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ef4444",
  "#06b6d4",
  "#ec4899",
  "#84cc16",
];

interface TooltipPayloadEntry {
  value: number;
  name: string;
  payload: { model: string; score: number; note?: string };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const entry = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl">
        <p className="text-xs font-medium text-slate-200">{entry.model}</p>
        <p className="text-sm font-semibold text-blue-400">
          {entry.score.toFixed(1)}
        </p>
        {entry.note && (
          <p className="text-xs text-slate-500">{entry.note}</p>
        )}
      </div>
    );
  }
  return null;
}

export function ModelScoresChart({
  scores,
  humanBaseline,
  maxValue = 100,
}: ModelScoresChartProps) {
  if (scores.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-slate-500">
        No score data available
      </div>
    );
  }

  const displayScores = scores.slice(0, 6);
  const chartData = displayScores.map((s) => ({
    model: s.model.length > 22 ? s.model.slice(0, 20) + "…" : s.model,
    score: s.score,
    note: s.note,
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={chartData}
        margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
        <XAxis
          type="number"
          domain={[0, maxValue]}
          tick={{ fontSize: 10, fill: "#64748b" }}
          axisLine={{ stroke: "#334155" }}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="model"
          width={130}
          tick={{ fontSize: 10, fill: "#94a3b8" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e293b" }} />
        {humanBaseline !== undefined && (
          <ReferenceLine
            x={humanBaseline}
            stroke="#ef4444"
            strokeDasharray="4 4"
            label={{
              value: `Human ${humanBaseline}`,
              position: "top",
              fontSize: 9,
              fill: "#ef4444",
            }}
          />
        )}
        <Bar dataKey="score" radius={[0, 4, 4, 0]}>
          {chartData.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={BAR_COLORS[index % BAR_COLORS.length]}
              opacity={0.85}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
