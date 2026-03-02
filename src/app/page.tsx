import type { Metadata } from "next";
import { benchmarks } from "@/lib/data";
import { BenchmarkCard } from "@/components/benchmark-card";
import { LeaderboardTable } from "@/components/leaderboard-table";
import { ComparisonBarChart } from "@/components/comparison-bar-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart3, DollarSign, Cpu, BookOpen, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Overview",
};

const stats = [
  {
    label: "Total Benchmarks",
    value: "26",
    icon: BarChart3,
    color: "text-blue-400",
    bg: "bg-blue-950/40",
  },
  {
    label: "Finance Benchmarks",
    value: "8",
    icon: DollarSign,
    color: "text-blue-400",
    bg: "bg-blue-950/40",
  },
  {
    label: "Tech Benchmarks",
    value: "11",
    description: "incl. 2 cross-domain",
    icon: Cpu,
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
  },
  {
    label: "General Benchmarks",
    value: "5",
    icon: BookOpen,
    color: "text-violet-400",
    bg: "bg-violet-950/40",
  },
];

export default function OverviewPage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-100">
          LLM Benchmark Hub
        </h1>
        <p className="mt-2 text-slate-400 max-w-2xl">
          A curated leaderboard of the most important LLM benchmarks for the
          finance and technology sectors, updated through March 2026. Track
          model performance, benchmark saturation, and real-world capabilities.
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map(({ label, value, description, icon: Icon, color, bg }) => (
          <Card key={label} className="border-slate-800 bg-slate-900">
            <CardContent className="p-5">
              <div className={`inline-flex rounded-lg p-2 ${bg} mb-3`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-slate-100">{value}</p>
              <p className="text-sm text-slate-400 mt-0.5">{label}</p>
              {description && (
                <p className="text-[10px] text-slate-600 mt-0.5">
                  {description}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Separator />

      {/* Model comparison chart */}
      <section aria-labelledby="chart-heading">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-5 w-5 text-yellow-400" />
          <h2
            id="chart-heading"
            className="text-xl font-semibold text-slate-100"
          >
            Model Performance — Key Benchmarks
          </h2>
        </div>
        <p className="text-sm text-slate-400 mb-4">
          Comparing top frontier models on SWE-bench (software engineering),
          GPQA Diamond (expert reasoning), and HumanEval (code generation).
          Scores are pass@1 or accuracy percentage.
        </p>
        <Card className="border-slate-800 bg-slate-900">
          <CardContent className="pt-6 pb-4">
            <ComparisonBarChart />
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Full leaderboard table */}
      <section aria-labelledby="leaderboard-heading">
        <h2
          id="leaderboard-heading"
          className="text-xl font-semibold text-slate-100 mb-2"
        >
          Full Model Leaderboard
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Click column headers to sort. Color coding: green = top tier, yellow
          = mid tier, red = lower relative scores within that benchmark.
        </p>
        <LeaderboardTable />
      </section>

      <Separator />

      {/* All benchmarks grid */}
      <section aria-labelledby="all-benchmarks-heading">
        <h2
          id="all-benchmarks-heading"
          className="text-xl font-semibold text-slate-100 mb-2"
        >
          All Benchmarks
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {benchmarks.length} benchmarks spanning finance, technology, and
          general reasoning. Filter by domain on the sidebar pages.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {benchmarks.map((b) => (
            <BenchmarkCard key={b.id} benchmark={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
