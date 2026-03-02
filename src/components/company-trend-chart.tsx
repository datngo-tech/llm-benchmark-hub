"use client";

import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { companyTimelines } from "@/lib/data";
import type { BenchmarkKey } from "@/lib/types";

const BENCHMARKS: { key: BenchmarkKey; label: string; description: string }[] = [
  { key: "humaneval",    label: "HumanEval",      description: "Code generation — pass@1 (%)" },
  { key: "gpqa",         label: "GPQA Diamond",    description: "Expert reasoning — accuracy (%)" },
  { key: "sweBench",     label: "SWE-bench",       description: "Software engineering — % resolved" },
  { key: "livecodebench",label: "LiveCodeBench",   description: "Contamination-free code — pass@1 (%)" },
  { key: "mmlu",         label: "MMLU",            description: "Multi-domain knowledge — accuracy (%)" },
  { key: "gsm8k",        label: "GSM8K",           description: "Grade-school math — accuracy (%)" },
  { key: "finqa",        label: "FinQA",           description: "Financial numerical reasoning — exec. accuracy (%)" },
];

// Build unified x-axis from all unique release dates, sorted chronologically
function buildChartData(benchmarkKey: BenchmarkKey) {
  const allDates = Array.from(
    new Set(companyTimelines.flatMap((c) => c.models.map((m) => m.releaseDate)))
  ).sort();

  return allDates.map((date) => {
    const row: Record<string, string | number | null> = { date };
    for (const company of companyTimelines) {
      const entry = company.models.find((m) => m.releaseDate === date);
      row[company.key] = entry ? entry.scores[benchmarkKey] : null;
      row[`${company.key}_model`] = entry ? entry.model : null;
    }
    // Use label from any company that has a model on this date
    const anyEntry = companyTimelines
      .flatMap((c) => c.models)
      .find((m) => m.releaseDate === date);
    row.label = anyEntry ? anyEntry.label : date;
    return row;
  });
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: { color: string; name: string; value: number; payload: Record<string, string | number | null> }[];
  label?: string;
};

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const visible = payload.filter((p) => p.value != null);
  if (visible.length === 0) return null;

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm shadow-xl">
      <p className="text-slate-400 text-xs mb-2">{label}</p>
      {visible.map((entry) => {
        const modelKey = `${entry.name}_model`;
        const modelName = entry.payload[modelKey] as string | null;
        return (
          <div key={entry.name} className="flex items-start gap-2 mb-1">
            <span
              className="mt-1 h-2 w-2 shrink-0 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <div>
              <span className="font-medium text-slate-100">
                {entry.value.toFixed(1)}%
              </span>
              {modelName && (
                <span className="ml-1 text-slate-400">— {modelName}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function CompanyTrendChart() {
  const [selectedBenchmark, setSelectedBenchmark] = useState<BenchmarkKey>("sweBench");
  const [hiddenCompanies, setHiddenCompanies] = useState<Set<string>>(new Set());

  const benchmark = BENCHMARKS.find((b) => b.key === selectedBenchmark)!;
  const chartData = useMemo(() => buildChartData(selectedBenchmark), [selectedBenchmark]);

  function toggleCompany(key: string) {
    setHiddenCompanies((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  return (
    <div className="space-y-5">
      {/* Benchmark selector */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-400 shrink-0">Benchmark:</span>
        <div className="flex flex-wrap gap-2">
          {BENCHMARKS.map((b) => (
            <button
              key={b.key}
              onClick={() => setSelectedBenchmark(b.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedBenchmark === b.key
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-500">{benchmark.description}</p>

      {/* Company toggles */}
      <div className="flex flex-wrap gap-2">
        {companyTimelines.map((c) => {
          const hidden = hiddenCompanies.has(c.key);
          return (
            <button
              key={c.key}
              onClick={() => toggleCompany(c.key)}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-all ${
                hidden
                  ? "border-slate-700 bg-transparent text-slate-500"
                  : "border-transparent text-white"
              }`}
              style={hidden ? {} : { backgroundColor: c.color + "33", borderColor: c.color, color: c.color }}
            >
              <span
                className="inline-block h-2 w-2 rounded-full"
                style={{ backgroundColor: hidden ? "#475569" : c.color }}
              />
              {c.company}
            </button>
          );
        })}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={100}
            stroke="#475569"
            strokeDasharray="4 4"
            label={{ value: "Human ceiling", fill: "#475569", fontSize: 10, position: "insideTopRight" }}
          />
          {companyTimelines.map((c) => (
            <Line
              key={c.key}
              type="monotone"
              dataKey={c.key}
              name={c.key}
              stroke={c.color}
              strokeWidth={hiddenCompanies.has(c.key) ? 0 : 2.5}
              dot={{ r: 5, fill: c.color, strokeWidth: 0 }}
              activeDot={{ r: 7, fill: c.color, strokeWidth: 2, stroke: "#0f172a" }}
              connectNulls
              hide={hiddenCompanies.has(c.key)}
            />
          ))}
          <Legend
            content={() => null}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Model timeline table */}
      <details className="group">
        <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-300 transition-colors select-none">
          Show model release table
        </summary>
        <div className="mt-3 overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-3 py-2 text-left text-slate-400 font-medium">Company</th>
                <th className="px-3 py-2 text-left text-slate-400 font-medium">Model</th>
                <th className="px-3 py-2 text-left text-slate-400 font-medium">Released</th>
                <th className="px-3 py-2 text-right text-slate-400 font-medium">{benchmark.label} Score</th>
              </tr>
            </thead>
            <tbody>
              {companyTimelines.flatMap((c) =>
                c.models.map((m) => (
                  <tr key={`${c.key}-${m.releaseDate}`} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-3 py-2">
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                        <span className="text-slate-300">{c.company}</span>
                      </span>
                    </td>
                    <td className="px-3 py-2 text-slate-200">{m.model}</td>
                    <td className="px-3 py-2 text-slate-400">{m.label}</td>
                    <td className="px-3 py-2 text-right font-mono text-slate-100">
                      {m.scores[selectedBenchmark].toFixed(1)}%
                    </td>
                  </tr>
                ))
              ).sort((a, b) => {
                // Sort by release date ascending
                const dateA = companyTimelines.flatMap(c => c.models).find(m => m.model === (a.key as unknown as string))?.releaseDate ?? "";
                const dateB = companyTimelines.flatMap(c => c.models).find(m => m.model === (b.key as unknown as string))?.releaseDate ?? "";
                return dateA.localeCompare(dateB);
              })}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
