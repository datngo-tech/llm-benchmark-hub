import type { Metadata } from "next";
import { benchmarks } from "@/lib/data";
import { BenchmarkCard } from "@/components/benchmark-card";
import { Separator } from "@/components/ui/separator";
import { DollarSign, FileText, TrendingUp, MessageSquare, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Finance Benchmarks",
  description:
    "LLM benchmarks focused on financial NLP, numerical reasoning, document QA, and market analysis.",
};

const finBenchmarks = benchmarks.filter((b) => b.domain === "Finance");

const focusAreas = [
  {
    icon: FileText,
    title: "Numerical Reasoning over SEC Filings",
    description:
      "Benchmarks like FinQA and ConvFinQA test multi-step arithmetic over earnings reports, requiring models to extract numbers from tables and text, then compute results via structured programs.",
    color: "text-blue-400",
    bg: "bg-blue-950/40",
  },
  {
    icon: TrendingUp,
    title: "Market Sentiment Classification",
    description:
      "FLARE/FLUE and the BloombergGPT evaluation suite include headline sentiment tasks over financial news, testing domain-specific tone and connotation understanding.",
    color: "text-emerald-400",
    bg: "bg-emerald-950/40",
  },
  {
    icon: Search,
    title: "Entity Recognition in Financial Text",
    description:
      "Financial NER tasks require identifying named entities such as companies, currencies, financial instruments, and regulatory bodies that behave differently from general-domain NER.",
    color: "text-violet-400",
    bg: "bg-violet-950/40",
  },
  {
    icon: MessageSquare,
    title: "Multi-turn Conversational QA",
    description:
      "ConvFinQA chains dependent questions across a conversation, requiring models to track prior answers in dialogue context while performing numerical reasoning — testing both memory and computation.",
    color: "text-orange-400",
    bg: "bg-orange-950/40",
  },
];

export default function FinancePage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <div className="flex items-center gap-2.5 mb-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-900/50">
            <DollarSign className="h-5 w-5 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Finance Benchmarks
          </h1>
        </div>
        <p className="text-slate-400 max-w-3xl leading-relaxed">
          Financial NLP is a uniquely challenging domain that requires models to
          reason over structured tables, parse regulatory language, perform
          multi-step arithmetic, and understand domain-specific terminology. The{" "}
          <strong className="text-slate-300">{finBenchmarks.length}</strong>{" "}
          benchmarks below cover the full spectrum of financial language
          understanding — from numerical QA over S&P 500 earnings reports to
          sentiment analysis of Bloomberg headlines.
        </p>
      </div>

      {/* Key focus areas */}
      <section aria-labelledby="focus-areas-heading">
        <h2
          id="focus-areas-heading"
          className="text-xl font-semibold text-slate-100 mb-4"
        >
          Key Focus Areas
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {focusAreas.map(({ icon: Icon, title, description, color, bg }) => (
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
      <section aria-labelledby="benchmarks-heading">
        <h2
          id="benchmarks-heading"
          className="text-xl font-semibold text-slate-100 mb-2"
        >
          {finBenchmarks.length} Finance Benchmarks
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Sorted chronologically. Status indicators reflect benchmark
          saturation by current frontier models.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {finBenchmarks.map((b) => (
            <BenchmarkCard key={b.id} benchmark={b} />
          ))}
        </div>
      </section>
    </div>
  );
}
