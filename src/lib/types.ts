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

export type BenchmarkKey =
  | "humaneval"
  | "gpqa"
  | "sweBench"
  | "livecodebench"
  | "mmlu"
  | "gsm8k"
  | "finqa";

export type ModelDataPoint = {
  model: string;
  releaseDate: string; // "YYYY-MM"
  label: string;       // "Mar '23"
  scores: Record<BenchmarkKey, number>;
};

export type CompanyTimeline = {
  company: string;
  key: string;
  color: string;
  models: ModelDataPoint[];
};
