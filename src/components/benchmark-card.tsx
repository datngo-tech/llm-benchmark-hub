import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DomainBadge } from "@/components/domain-badge";
import { SaturationBadge } from "@/components/saturation-badge";
import { ModelScoresChart } from "@/components/model-scores-chart";
import { ExternalLink, Database, FlaskConical, Ruler } from "lucide-react";
import type { Benchmark } from "@/lib/types";

interface BenchmarkCardProps {
  benchmark: Benchmark;
}

export function BenchmarkCard({ benchmark }: BenchmarkCardProps) {
  return (
    <Card className="flex flex-col gap-0 overflow-hidden">
      <CardHeader className="pb-3">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <CardTitle className="text-base">{benchmark.name}</CardTitle>
              <span className="shrink-0 rounded border border-slate-700 px-1.5 py-0.5 text-[10px] font-mono text-slate-500">
                {benchmark.year}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate">
              {benchmark.subdomain}
            </p>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <DomainBadge domain={benchmark.domain} />
            <SaturationBadge status={benchmark.status} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Meta row */}
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-start gap-1.5 text-slate-400">
            <FlaskConical className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <span className="leading-snug">{benchmark.creator}</span>
          </div>
          {benchmark.venue && (
            <div className="flex items-start gap-1.5 text-slate-400">
              <span className="mt-0.5 text-slate-500 font-medium shrink-0">Venue</span>
              <span className="leading-snug">{benchmark.venue}</span>
            </div>
          )}
          <div className="flex items-start gap-1.5 text-slate-400">
            <Database className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <span className="leading-snug">{benchmark.datasetSize}</span>
          </div>
          <div className="flex items-start gap-1.5 text-slate-400">
            <Ruler className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
            <span className="leading-snug">
              {benchmark.primaryMetric}{" "}
              <span className="text-slate-600">({benchmark.metricScale})</span>
            </span>
          </div>
        </div>

        {/* Tasks */}
        <div>
          <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Tasks
          </p>
          <div className="flex flex-wrap gap-1">
            {benchmark.tasks.map((task) => (
              <span
                key={task}
                className="rounded bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300"
              >
                {task}
              </span>
            ))}
          </div>
        </div>

        {/* Scores chart */}
        {benchmark.topModelScores.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Top Model Scores
            </p>
            <ModelScoresChart
              scores={benchmark.topModelScores}
              humanBaseline={benchmark.humanBaseline}
            />
          </div>
        )}

        {/* Limitations */}
        {benchmark.limitations && (
          <div className="rounded-md border border-yellow-900/40 bg-yellow-950/20 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-yellow-600 mb-1">
              Limitations
            </p>
            <p className="text-xs text-yellow-200/70 leading-relaxed">
              {benchmark.limitations}
            </p>
          </div>
        )}

        {/* Contamination note */}
        {benchmark.contaminationHandling && (
          <div className="rounded-md border border-sky-900/40 bg-sky-950/20 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600 mb-1">
              Contamination Handling
            </p>
            <p className="text-xs text-sky-200/70 leading-relaxed">
              {benchmark.contaminationHandling}
            </p>
          </div>
        )}

        {/* View paper link */}
        <div className="mt-auto pt-1">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a
              href={benchmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              View Paper / Resource
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
