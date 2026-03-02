import { Badge } from "@/components/ui/badge";
import type { BenchmarkDomain } from "@/lib/types";

interface DomainBadgeProps {
  domain: BenchmarkDomain;
}

export function DomainBadge({ domain }: DomainBadgeProps) {
  const variantMap: Record<
    BenchmarkDomain,
    "finance" | "tech" | "general" | "crossDomain"
  > = {
    Finance: "finance",
    Technology: "tech",
    General: "general",
    "Technology / Finance": "crossDomain",
  };

  return (
    <Badge variant={variantMap[domain]}>
      {domain}
    </Badge>
  );
}
