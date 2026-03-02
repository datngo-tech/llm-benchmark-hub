import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CompanyTrendChart } from "@/components/company-trend-chart";
import { TrendingUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Model Trends",
};

const insights = [
  {
    company: "OpenAI",
    color: "#10b981",
    insight:
      "Largest absolute jump came between GPT-4 Turbo and GPT-4o on SWE-bench (5% → 37%). The o1 reasoning series then pushed GPQA from 53% to 78% in a single generation.",
  },
  {
    company: "Anthropic",
    color: "#f59e0b",
    insight:
      "Claude 3.5 Sonnet set the standard for SWE-bench at 49% — a 44-point leap over Claude 3 Opus. Claude Opus 4.6 added another 30 points, reaching 79.2%.",
  },
  {
    company: "Google",
    color: "#3b82f6",
    insight:
      "Gemini 1.5 Pro made the biggest single-generation jump on GPQA (30% → 72%) of any company. Gemini 3.1 Pro now leads GPQA at 94.3%, overtaking all competitors.",
  },
  {
    company: "Meta",
    color: "#a855f7",
    insight:
      "Meta showed the most dramatic catch-up: Llama 2 → Llama 3.1 405B was a 60-point jump on HumanEval (29% → 89%). Llama 4 Maverick continued the trend on reasoning tasks.",
  },
  {
    company: "DeepSeek",
    color: "#ef4444",
    insight:
      "DeepSeek V3 matched or exceeded GPT-4o on LiveCodeBench (89.6% vs 74%) despite being a fraction of the cost. Rapid iteration from Coder-V2 to V3.2 in under 18 months.",
  },
];

export default function TrendsPage() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            Model Trends Over Time
          </h1>
        </div>
        <p className="text-slate-400 max-w-2xl">
          How has each company&apos;s model lineage improved across benchmarks? Select a
          benchmark to see each company&apos;s trajectory from 2023 to early 2026. Each
          dot represents a specific model release. Click company names to show or hide
          their line.
        </p>
      </div>

      {/* Main chart */}
      <Card className="border-slate-800 bg-slate-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-slate-200">
            Company Model Progression
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CompanyTrendChart />
        </CardContent>
      </Card>

      <Separator />

      {/* Key insights */}
      <section>
        <h2 className="text-xl font-semibold text-slate-100 mb-4">Key Insights by Company</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {insights.map(({ company, color, insight }) => (
            <Card key={company} className="border-slate-800 bg-slate-900">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <span className="font-semibold text-slate-100">{company}</span>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">{insight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      {/* How to read */}
      <section>
        <h2 className="text-xl font-semibold text-slate-100 mb-4">How to Read the Chart</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            {
              title: "X-axis — Time",
              body: "Each tick marks a specific model release. Models from different companies released close together may share or overlap on the axis.",
            },
            {
              title: "Y-axis — Score",
              body: "Percentage score on the selected benchmark. Higher is better. The dashed line at 100% represents the theoretical human ceiling.",
            },
            {
              title: "Gaps in lines",
              body: "A gap means no model from that company was released at that time point. Lines connect to the next available model, showing cumulative progress.",
            },
          ].map(({ title, body }) => (
            <Card key={title} className="border-slate-800 bg-slate-800/50">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-slate-200 mb-1">{title}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
