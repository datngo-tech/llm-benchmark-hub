import type { Metadata } from "next";
import { benchmarks } from "@/lib/data";
import { BenchmarkCard } from "@/components/benchmark-card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Cpu, Code2, GitPullRequest, FlaskConical, Database } from "lucide-react";

export const metadata: Metadata = {
  title: "Tech Benchmarks",
  description:
    "LLM benchmarks for software engineering, code generation, scientific coding, and developer tooling.",
};

const techBenchmarks = benchmarks.filter(
  (b) => b.domain === "Technology" || b.domain === "Technology / Finance"
);
const crossDomainBenchmarks = benchmarks.filter(
  (b) => b.domain === "Technology / Finance"
);

const categories = [
  {
    icon: Code2,
    title: "Code Generation",
    description:
      "HumanEval, MBPP, BigCodeBench, and LiveCodeBench test a model's ability to write correct Python from docstrings or natural language. LiveCodeBench uniquely filters for post-training problems to avoid contamination.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
    benchmarkIds: ["humaneval", "mbpp", "bigcodebench", "livecodebench"],
  },
  {
    icon: GitPullRequest,
    title: "Software Engineering Agents",
    description:
      "SWE-bench Verified measures whether an agent can autonomously resolve real GitHub issues by editing a codebase and passing the project's unit tests — the closest proxy to real-world developer productivity.",
    color: "text-blue-400",
    bg: "bg-blue-950/40",
    benchmarkIds: ["swe-bench", "mlagentbench"],
  },
  {
    icon: FlaskConical,
    title: "Scientific & Research Coding",
    description:
      "SciCode tests whether models can produce code used in actual scientific research workflows from physics to computational biology. Current top models score below 13%, highlighting a major frontier.",
    color: "text-violet-400",
    bg: "bg-violet-950/40",
    benchmarkIds: ["scicode", "cruxeval"],
  },
  {
    icon: Database,
    title: "Data & SQL",
    description:
      "BIRD and Spider benchmark natural language to SQL translation at scale. DS-1000 tests data science workflows in Pandas, NumPy, and ML libraries — cross-domain with finance applications.",
    color: "text-orange-400",
    bg: "bg-orange-950/40",
    benchmarkIds: ["bird", "spider", "ds1000"],
  },
];

export default function TechPage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-900/50">
            <Cpu className="h-5 w-5 text-emerald-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Tech Benchmarks
          </h1>
        </div>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          Technology benchmarks measure coding ability, software engineering
          judgment, scientific reasoning, and data manipulation. They range from
          simple Python exercises (MBPP) to autonomous research agents
          (MLAgentBench). The{" "}
          <strong className="text-slate-300">{techBenchmarks.length}</strong>{" "}
          benchmarks here span code generation, agentic problem-solving, and
          structured data tasks.
        </p>
      </div>

      {/* Cross-domain note */}
      {crossDomainBenchmarks.length > 0 && (
        <div className="rounded-xl border border-orange-900/40 bg-orange-950/20 p-5">
          <div className="flex items-start gap-3">
            <Badge variant="crossDomain" className="shrink-0 mt-0.5">
              Cross-domain
            </Badge>
            <div>
              <p className="text-sm font-medium text-slate-200 mb-1">
                {crossDomainBenchmarks.length} benchmarks are classified as
                Technology / Finance
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                {crossDomainBenchmarks.map((b) => b.name).join(" and ")}{" "}
                overlap both domains: data science code is essential for
                financial analytics, and SQL over enterprise databases powers
                both tech and finance workflows.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Category breakdown */}
      <section aria-labelledby="categories-heading">
        <h2
          id="categories-heading"
          className="text-xl font-semibold text-slate-100 mb-4"
        >
          Benchmark Categories
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {categories.map(({ icon: Icon, title, description, color, bg }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5"
            >
              <div className={`inline-flex rounded-lg p-2 ${bg} mb-3`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h3 className="text-sm font-semibold text-slate-100 mb-1.5">
                {title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Separator />

      {/* Benchmark cards */}
      <section aria-labelledby="tech-benchmarks-heading">
        <h2
          id="tech-benchmarks-heading"
          className="text-xl font-semibold text-slate-100 mb-2"
        >
          {techBenchmarks.length} Technology Benchmarks
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Includes {crossDomainBenchmarks.length} cross-domain (Technology /
          Finance) benchmarks. Status indicators reflect benchmark saturation
          by current frontier models.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {techBenchmarks.map((b) => (
            <BenchmarkCard key={b.id} benchmark={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
