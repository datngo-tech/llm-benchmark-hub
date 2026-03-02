"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { modelComparison } from "@/lib/data";
import type { ModelComparison } from "@/lib/types";
import { cn } from "@/lib/utils";

type SortKey = keyof Omit<ModelComparison, "model">;
type SortDir = "asc" | "desc";

const columns: { key: SortKey; label: string; shortLabel: string }[] = [
  { key: "humaneval", label: "HumanEval", shortLabel: "HumanEval" },
  { key: "mbpp", label: "MBPP", shortLabel: "MBPP" },
  { key: "sweBench", label: "SWE-bench", shortLabel: "SWE" },
  { key: "livecodebench", label: "LiveCodeBench", shortLabel: "LCB" },
  { key: "gpqa", label: "GPQA Diamond", shortLabel: "GPQA" },
  { key: "mmlu", label: "MMLU", shortLabel: "MMLU" },
  { key: "gsm8k", label: "GSM8K", shortLabel: "GSM8K" },
  { key: "finqa", label: "FinQA", shortLabel: "FinQA" },
];

/**
 * Returns a Tailwind bg class based on how a value compares to the column max.
 */
function getScoreColor(value: number, max: number): string {
  const pct = max > 0 ? value / max : 0;
  if (pct >= 0.92) return "text-emerald-400 font-semibold";
  if (pct >= 0.80) return "text-emerald-500";
  if (pct >= 0.65) return "text-yellow-400";
  if (pct >= 0.50) return "text-orange-400";
  return "text-red-400";
}

export function LeaderboardTable() {
  const [sortKey, setSortKey] = useState<SortKey>("sweBench");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const columnMaxes = Object.fromEntries(
    columns.map(({ key }) => [
      key,
      Math.max(...modelComparison.map((m) => m[key])),
    ])
  ) as Record<SortKey, number>;

  const sorted = [...modelComparison].sort((a, b) => {
    const aVal = a[sortKey];
    const bVal = b[sortKey];
    return sortDir === "desc" ? bVal - aVal : aVal - bVal;
  });

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((prev) => (prev === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ colKey }: { colKey: SortKey }) {
    if (sortKey !== colKey)
      return <ArrowUpDown className="ml-1 h-3 w-3 text-slate-600" />;
    return sortDir === "desc" ? (
      <ArrowDown className="ml-1 h-3 w-3 text-blue-400" />
    ) : (
      <ArrowUp className="ml-1 h-3 w-3 text-blue-400" />
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="sticky left-0 bg-slate-950 text-slate-300 font-semibold min-w-[160px]">
              Model
            </TableHead>
            {columns.map(({ key, label, shortLabel }) => (
              <TableHead key={key} className="text-right min-w-[90px]">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-auto px-1 py-0.5 text-xs font-medium",
                    sortKey === key
                      ? "text-blue-400"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                  onClick={() => handleSort(key)}
                >
                  <span className="hidden sm:inline">{label}</span>
                  <span className="sm:hidden">{shortLabel}</span>
                  <SortIcon colKey={key} />
                </Button>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((row, idx) => (
            <TableRow key={row.model}>
              <TableCell className="sticky left-0 bg-slate-950 font-medium text-slate-200 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-600 text-xs w-4 text-right tabular-nums">
                    {idx + 1}
                  </span>
                  {row.model}
                </div>
              </TableCell>
              {columns.map(({ key }) => (
                <TableCell
                  key={key}
                  className={cn(
                    "text-right tabular-nums text-sm",
                    getScoreColor(row[key], columnMaxes[key])
                  )}
                >
                  {row[key].toFixed(1)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
