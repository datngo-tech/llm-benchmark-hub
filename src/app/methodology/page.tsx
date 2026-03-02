import type { Metadata } from "next";
import { benchmarks } from "@/lib/data";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  AlertTriangle,
  Shield,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How LLM benchmarks work: metrics, contamination problems, and mitigation strategies.",
};

const metrics = [
  {
    name: "pass@k",
    formula: "pass@k = 1 − C(n−c, k) / C(n, k)",
    description:
      "The probability that at least one of k generated samples passes all unit tests. In practice, pass@1 is computed with n=1 to measure greedy or sampled accuracy. Originally from HumanEval; now standard for code benchmarks.",
    usedIn: ["HumanEval", "MBPP", "LiveCodeBench", "SciCode", "DS-1000"],
  },
  {
    name: "Execution Accuracy (EX)",
    formula: "EX = correct_executions / total_questions × 100",
    description:
      "Whether executing the generated SQL/code against the target database produces the correct answer set. More robust than string-match because it allows semantically equivalent queries.",
    usedIn: ["BIRD", "Spider", "FinQA", "ConvFinQA"],
  },
  {
    name: "F1 Score",
    formula: "F1 = 2 × (Precision × Recall) / (Precision + Recall)",
    description:
      "Harmonic mean of precision and recall. Used for classification tasks (sentiment, NER) and span extraction. Macro-F1 averages across classes equally; micro-F1 weighs by instance count.",
    usedIn: ["FLARE / FLUE", "BloombergGPT Eval", "TAT-QA", "FinBen"],
  },
  {
    name: "Exact Match (EM)",
    formula: "EM = exact_string_matches / total × 100",
    description:
      "Binary metric — prediction must exactly equal the gold answer. Often supplemented by LLM-as-Judge scoring when answers have equivalent paraphrases. Used in FinanceBench and DocFinQA.",
    usedIn: ["FinanceBench", "DocFinQA"],
  },
  {
    name: "% Resolved",
    formula: "% Resolved = issues_all_tests_pass / total_issues × 100",
    description:
      "For SWE-bench: the percentage of GitHub issues where the model-generated patch causes all existing unit tests to pass (without adding new tests). The hardest real-world coding metric.",
    usedIn: ["SWE-bench Verified"],
  },
];

const contaminationTypes = [
  {
    type: "Direct Leakage",
    description:
      "Benchmark questions and answers appear verbatim in pretraining data (e.g., scraped from GitHub, HuggingFace, or academic repositories).",
    severity: "High",
    severityColor: "text-red-400 bg-red-950/40",
  },
  {
    type: "Paraphrase Leakage",
    description:
      "Rephrased versions of benchmark items are in training data. Models benefit even without exact matches due to semantic overlap.",
    severity: "Medium",
    severityColor: "text-orange-400 bg-orange-950/40",
  },
  {
    type: "Answer Distribution Bias",
    description:
      "Training data skews toward certain answers in multiple-choice benchmarks (e.g., 'C' being more frequent), inflating accuracy on specific option letters.",
    severity: "Low",
    severityColor: "text-yellow-400 bg-yellow-950/40",
  },
  {
    type: "Benchmark-Specific Fine-tuning",
    description:
      "Models are intentionally fine-tuned on held-out benchmark splits or similar synthetic data, gaming leaderboards while not generalizing.",
    severity: "High",
    severityColor: "text-red-400 bg-red-950/40",
  },
];

const mitigations = [
  {
    strategy: "Time-based Filtering",
    description:
      "Problems are tagged with release dates. Evaluations only use problems released after the model's training cutoff, ensuring the model has not seen them. Used by LiveCodeBench.",
    examples: ["LiveCodeBench"],
  },
  {
    strategy: "Canary String Injection",
    description:
      "Unique random strings are embedded in benchmark documents. If these strings appear in model completions, contamination is confirmed. Used by many academic datasets.",
    examples: ["GPQA Diamond", "ARC-AGI-2"],
  },
  {
    strategy: "Private Hold-out Sets",
    description:
      "A hidden test set is never released publicly. Evaluation is performed via a server-side API. Prevents any training on gold labels.",
    examples: ["SWE-bench Verified", "HumanEval (unit tests hidden)"],
  },
  {
    strategy: "Execution-based Verification",
    description:
      "Unit tests verify functional correctness rather than string matching. Models cannot memorize answers — they must generate runnable code.",
    examples: ["HumanEval", "MBPP", "FinQA", "BIRD"],
  },
];

// Create a timeline from benchmark years
const timelineData = [...benchmarks]
  .sort((a, b) => a.year - b.year)
  .reduce<{ year: number; names: string[] }[]>((acc, b) => {
    const existing = acc.find((e) => e.year === b.year);
    if (existing) {
      existing.names.push(b.name);
    } else {
      acc.push({ year: b.year, names: [b.name] });
    }
    return acc;
  }, []);

export default function MethodologyPage() {
  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-900/50">
            <BookOpen className="h-5 w-5 text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Methodology
          </h1>
        </div>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          How LLM benchmarks are constructed, evaluated, and how to interpret
          scores. This page covers primary metrics, the benchmark contamination
          problem, and the mitigation strategies used by leading benchmarks.
        </p>
      </div>

      {/* Metrics */}
      <section aria-labelledby="metrics-heading">
        <h2
          id="metrics-heading"
          className="text-xl font-semibold text-slate-100 mb-4"
        >
          Primary Evaluation Metrics
        </h2>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <Card key={metric.name} className="border-slate-800 bg-slate-900">
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <CardTitle className="text-base text-slate-100">
                    {metric.name}
                  </CardTitle>
                  <code className="rounded bg-slate-800 px-2 py-1 text-xs font-mono text-slate-300 break-all">
                    {metric.formula}
                  </code>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-slate-400 leading-relaxed">
                  {metric.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-xs text-slate-600">Used in:</span>
                  {metric.usedIn.map((b) => (
                    <span
                      key={b}
                      className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* Contamination problem */}
      <section aria-labelledby="contamination-heading">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h2
            id="contamination-heading"
            className="text-xl font-semibold text-slate-100"
          >
            The Benchmark Contamination Problem
          </h2>
        </div>
        <p className="text-sm text-slate-400 mb-6 max-w-3xl leading-relaxed">
          Contamination occurs when benchmark data leaks into a model's
          pretraining or fine-tuning corpus, inflating measured performance
          beyond genuine generalization. As training datasets have grown to
          trillions of tokens scraped from the web, contamination has become a
          central validity concern for LLM evaluation.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950">
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Contamination Type
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400 hidden sm:table-cell">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Severity
                </th>
              </tr>
            </thead>
            <tbody>
              {contaminationTypes.map((row, i) => (
                <tr
                  key={row.type}
                  className={
                    i % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }
                >
                  <td className="px-4 py-3 font-medium text-slate-200 align-top">
                    {row.type}
                    <p className="text-xs text-slate-500 mt-1 sm:hidden leading-relaxed">
                      {row.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden sm:table-cell align-top leading-relaxed">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <span
                      className={`inline-flex rounded px-2 py-0.5 text-xs font-medium ${row.severityColor}`}
                    >
                      {row.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Mitigation strategies */}
      <section aria-labelledby="mitigations-heading">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-emerald-400" />
          <h2
            id="mitigations-heading"
            className="text-xl font-semibold text-slate-100"
          >
            Contamination Mitigation Strategies
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950">
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Strategy
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400 hidden sm:table-cell">
                  How it works
                </th>
                <th className="px-4 py-3 text-left font-medium text-slate-400">
                  Examples
                </th>
              </tr>
            </thead>
            <tbody>
              {mitigations.map((row, i) => (
                <tr
                  key={row.strategy}
                  className={
                    i % 2 === 0 ? "bg-slate-900" : "bg-slate-900/50"
                  }
                >
                  <td className="px-4 py-3 font-medium text-slate-200 align-top">
                    {row.strategy}
                    <p className="text-xs text-slate-500 mt-1 sm:hidden leading-relaxed">
                      {row.description}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs hidden sm:table-cell align-top leading-relaxed">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap gap-1">
                      {row.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded bg-emerald-950/40 px-2 py-0.5 text-[10px] text-emerald-400"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator />

      {/* Timeline */}
      <section aria-labelledby="timeline-heading">
        <div className="flex items-center gap-2 mb-6">
          <Clock className="h-5 w-5 text-blue-400" />
          <h2
            id="timeline-heading"
            className="text-xl font-semibold text-slate-100"
          >
            Benchmark Timeline
          </h2>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-14 top-0 bottom-0 w-px bg-slate-800" aria-hidden="true" />
          <div className="space-y-6">
            {timelineData.map(({ year, names }) => (
              <div key={year} className="flex gap-6">
                <div className="w-14 shrink-0 text-right">
                  <span className="text-sm font-semibold text-slate-400">
                    {year}
                  </span>
                </div>
                <div className="relative flex-1 pb-2">
                  {/* Dot on the line */}
                  <div
                    className="absolute -left-[19px] top-1.5 h-3 w-3 rounded-full border-2 border-blue-500 bg-slate-950"
                    aria-hidden="true"
                  />
                  <div className="flex flex-wrap gap-2 pl-2">
                    {names.map((name) => (
                      <span
                        key={name}
                        className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-300"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
