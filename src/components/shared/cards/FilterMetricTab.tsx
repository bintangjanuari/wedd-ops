"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterMetricTabProps {
  label: string;
  count: string | number;
  countUnit?: string;
  subvalue?: string;
  icon?: React.ReactNode;
  badge?: string;
  isActive: boolean;
  onClick: () => void;
  variant?: "indigo" | "amber" | "emerald" | "rose";
  className?: string;
}

export function FilterMetricTab({
  label,
  count,
  countUnit,
  subvalue,
  icon,
  badge,
  isActive,
  onClick,
  variant = "indigo",
  className,
}: FilterMetricTabProps) {
  const activeClasses = {
    indigo: "border-indigo-600 ring-2 ring-indigo-50 shadow-xs",
    amber: "border-amber-500 ring-2 ring-amber-50 shadow-xs",
    emerald: "border-emerald-500 ring-2 ring-emerald-50 shadow-xs",
    rose: "bg-rose-50 border-rose-500 ring-2 ring-rose-100 shadow-xs",
  }[variant];

  const inactiveClasses = {
    indigo: "border-slate-200/80 hover:bg-slate-50",
    amber: "border-slate-200/80 hover:bg-slate-50",
    emerald: "border-slate-200/80 hover:bg-slate-50",
    rose: "bg-rose-50/50 border-rose-200 hover:bg-rose-50",
  }[variant];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "text-left p-4 rounded-2xl border transition-all shadow-2xs w-full bg-white",
        isActive ? activeClasses : inactiveClasses,
        className
      )}
    >
      <div className="flex items-center justify-between text-xs text-slate-500 font-semibold gap-1">
        <span className={cn(variant === "rose" && "text-rose-700 font-bold")}>
          {label}
        </span>
        {badge ? (
          <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-600 text-white font-mono animate-pulse">
            {badge}
          </span>
        ) : (
          icon
        )}
      </div>

      <div className="mt-2 flex items-baseline gap-2">
        <span
          className={cn(
            "font-display text-2xl font-bold",
            variant === "rose" ? "text-rose-950" : "text-slate-900"
          )}
        >
          {count}
        </span>
        {countUnit && (
          <span
            className={cn(
              "text-xs font-semibold",
              variant === "amber"
                ? "text-amber-600"
                : variant === "emerald"
                ? "text-emerald-600"
                : variant === "rose"
                ? "text-rose-600 font-medium"
                : "text-slate-400 font-normal"
            )}
          >
            {countUnit}
          </span>
        )}
      </div>

      {subvalue && (
        <div
          className={cn(
            "mt-1 font-mono text-xs",
            variant === "rose" ? "text-rose-700 font-medium" : "text-slate-600"
          )}
        >
          {subvalue}
        </div>
      )}
    </button>
  );
}

