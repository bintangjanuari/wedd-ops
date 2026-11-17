"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CapacityProgressCardProps {
  title: string;
  percentage: number;
  usedCount: number;
  totalCount: number;
  unitName?: string;
  remainingLabel?: string;
  className?: string;
}

export function CapacityProgressCard({
  title,
  percentage,
  usedCount,
  totalCount,
  unitName = "slot acara",
  remainingLabel,
  className,
}: CapacityProgressCardProps) {
  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-slate-800">{title}</span>
        <span className="font-mono text-xs font-bold text-indigo-600">
          {safePercentage}% Terisi
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${safePercentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>
          {usedCount} dari {totalCount} {unitName}
        </span>
        {remainingLabel && (
          <span className="text-emerald-600 font-semibold">
            {remainingLabel}
          </span>
        )}
      </div>
    </div>
  );
}

