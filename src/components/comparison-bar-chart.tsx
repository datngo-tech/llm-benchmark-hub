"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { modelComparison } from "@/lib/data";

const FEATURED_MODELS = [
  "GPT-4o",
  "Claude 3.5 Sonnet",
  "Claude Opus 4.6",
  "Gemini 3 Pro",
  "GPT-5.2",
  "DeepSeek V3",
];

const BENCHMARKS: {
  key: keyof (typeof modelComparison)[0];
  label: string;
  color: string;
}[] = [
  { key: "sweBench", label: "SWE-bench", color: "#10b981" },
  { key: "gpqa", label: "GPQA Diamond", color: "#8b5cf6" },
  { key: "humaneval", label: "HumanEval", color: "#3b82f6" },
];

interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 shadow-xl">
        <p className="mb-2 text-sm font-semibold text-slate-100">{label}</p>
        {payload.map((entry) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-400">{entry.name}:</span>
            <span className="font-medium text-slate-200">
              {entry.value.toFixed(1)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export function ComparisonBarChart() {
  const data = modelComparison
    .filter((m) => FEATURED_MODELS.includes(m.model))
    .map((m) => ({
      model: m.model.replace(" Sonnet", " S.").replace(" Opus ", " O."),
      sweBench: m.sweBench,
      gpqa: m.gpqa,
      humaneval: m.humaneval,
    }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart
        data={data}
        margin={{ top: 8, right: 16, left: -16, bottom: 8 }}
        barCategoryGap="25%"
        barGap={2}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
        <XAxis
          dataKey="model"
          tick={{ fontSize: 10, fill: "#64748b" }}
          axisLine={{ stroke: "#334155" }}
          tickLine={false}
        />
        <YAxis
          domain={[0, 100]}
          tick={{ fontSize: 10, fill: "#64748b" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "#1e293b" }} />
        <Legend
          wrapperStyle={{ fontSize: "11px", paddingTop: "12px", color: "#94a3b8" }}
        />
        {BENCHMARKS.map(({ key, label, color }) => (
          <Bar
            key={key}
            dataKey={key}
            name={label}
            fill={color}
            radius={[3, 3, 0, 0]}
            opacity={0.85}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
