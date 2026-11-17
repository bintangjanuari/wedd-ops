"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";

export interface AddonSelectCardProps {
  id: string;
  name: string;
  desc?: string;
  price: number;
  isSelected: boolean;
  onToggle: (id: string) => void;
  className?: string;
}

export function AddonSelectCard({
  id,
  name,
  desc,
  price,
  isSelected,
  onToggle,
  className,
}: AddonSelectCardProps) {
  return (
    <div
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onToggle(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle(id);
        }
      }}
      className={cn(
        "cursor-pointer p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-1",
        isSelected
          ? "border-indigo-600 bg-indigo-50/20"
          : "border-slate-200/80 bg-white hover:border-slate-300",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        <div
          className={cn(
            "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all",
            isSelected
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white"
          )}
        >
          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 truncate">{name}</p>
          {desc && (
            <p className="text-[11px] text-slate-500 truncate">{desc}</p>
          )}
        </div>
      </div>

      <span className="font-mono text-xs font-bold text-slate-900 shrink-0">
        +{formatIDR(price)}
      </span>
    </div>
  );
}

