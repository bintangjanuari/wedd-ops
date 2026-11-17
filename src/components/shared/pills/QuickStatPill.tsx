"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface QuickStatPillProps {
  label: string;
  value: React.ReactNode;
  dotColor?: "emerald" | "rose" | "amber" | "indigo" | "slate";
  pulse?: boolean;
  className?: string;
}

const dotColorClasses: Record<string, string> = {
  emerald: "bg-emerald-500",
  rose: "bg-rose-500",
  amber: "bg-amber-500",
  indigo: "bg-indigo-600",
  slate: "bg-slate-400",
};

export function QuickStatPill({
  label,
  value,
  dotColor = "emerald",
  pulse = false,
  className,
}: QuickStatPillProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs",
        className
      )}
    >
      <span
        className={cn(
          "w-2.5 h-2.5 rounded-full shrink-0",
          dotColorClasses[dotColor] || "bg-emerald-500",
          pulse && "animate-pulse"
        )}
      />
      <span className="text-xs text-slate-500">{label}</span>
      <span className="font-mono text-xs font-bold text-slate-900">{value}</span>
    </div>
  );
}

