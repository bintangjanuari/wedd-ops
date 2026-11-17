import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type KpiBadgeVariant = "neutral" | "success" | "warning" | "danger";

export interface MetricKpiCardProps {
  title: string;
  value: string;
  icon?: ReactNode;
  badge?: {
    text: string;
    variant: KpiBadgeVariant;
  };
  subtext?: string;
  className?: string;
}

const badgeVariants: Record<KpiBadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border border-amber-200",
  danger: "bg-rose-50 text-rose-700 border border-rose-200",
};

export function MetricKpiCard({
  title,
  value,
  icon,
  badge,
  subtext,
  className,
}: MetricKpiCardProps) {
  return (
    <div
      className={cn(
        "bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between transition-all hover:shadow-md",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
          {title}
        </span>
        {icon && (
          <div className="h-9 w-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2">
        <div className="text-2xl font-bold text-slate-900 tracking-tight font-display">
          {value}
        </div>

        {(badge || subtext) && (
          <div className="mt-2.5 flex items-center gap-2 flex-wrap">
            {badge && (
              <span
                className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                  badgeVariants[badge.variant]
                )}
              >
                {badge.text}
              </span>
            )}
            {subtext && (
              <span className="text-xs text-slate-500 truncate">{subtext}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

