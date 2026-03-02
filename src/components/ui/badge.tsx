import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-slate-700 text-slate-100 hover:bg-slate-600",
        secondary:
          "border-transparent bg-slate-800 text-slate-300 hover:bg-slate-700",
        destructive:
          "border-transparent bg-red-900/50 text-red-300 hover:bg-red-900",
        outline: "text-slate-300 border-slate-700",
        finance:
          "border-transparent bg-blue-900/50 text-blue-300",
        tech:
          "border-transparent bg-emerald-900/50 text-emerald-300",
        general:
          "border-transparent bg-violet-900/50 text-violet-300",
        crossDomain:
          "border-transparent bg-orange-900/50 text-orange-300",
        active:
          "border-transparent bg-emerald-900/50 text-emerald-300",
        saturated:
          "border-transparent bg-red-900/50 text-red-300",
        nearSaturated:
          "border-transparent bg-yellow-900/50 text-yellow-300",
        partiallySaturated:
          "border-transparent bg-orange-900/50 text-orange-300",
        living:
          "border-transparent bg-sky-900/50 text-sky-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
