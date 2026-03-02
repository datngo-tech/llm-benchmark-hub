export type ModelScore = {
  model: string;
  score: number;
  note?: string;
};

export type BenchmarkDomain =
  | "Finance"
  | "Technology"
  | "General"
  | "Technology / Finance";

export type BenchmarkStatus =
  | "Active"
  | "Near-saturated"
  | "Saturated"
  | "Active (continuously updated)"
  | "Partially saturated"
  | "Active / Living Leaderboard";

export type Benchmark = {
  id: string;
  name: string;
  domain: BenchmarkDomain;
  subdomain: string;
  creator: string;
  year: number;
  venue?: string;
  datasetSize: string;
  tasks: string[];
  primaryMetric: string;
  metricScale: string;
  status: BenchmarkStatus;
  humanBaseline?: number;
  topModelScores: ModelScore[];
  url: string;
  limitations?: string;
  contaminationHandling?: string;
};

export type ModelComparison = {
  model: string;
  humaneval: number;
  mbpp: number;
  sweBench: number;
  livecodebench: number;
  gpqa: number;
  mmlu: number;
  gsm8k: number;
  finqa: number;
};
