"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";

export interface PackageSelectCardProps {
  id: string;
  name: string;
  price: number;
  tag?: string;
  desc?: string;
  features?: string[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  className?: string;
}

export function PackageSelectCard({
  id,
  name,
  price,
  tag,
  desc,
  features,
  isSelected,
  onSelect,
  className,
}: PackageSelectCardProps) {
  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onClick={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(id);
        }
      }}
      className={cn(
        "cursor-pointer rounded-2xl p-5 border-2 transition-all relative focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2",
        isSelected
          ? "border-indigo-600 bg-indigo-50/20 shadow-xs"
          : "border-slate-200/80 bg-white hover:border-slate-300",
        className
      )}
    >
      {tag && (
        <span className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-amber-950 shadow-xs">
          {tag}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <h4 className="font-display text-base font-bold text-slate-900">
            {name}
          </h4>
          <p className="font-mono text-base font-bold text-indigo-600">
            {formatIDR(price)}
          </p>
          {desc && <p className="text-xs text-slate-500 pt-0.5">{desc}</p>}
        </div>

        <div
          className={cn(
            "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
            isSelected
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white"
          )}
        >
          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>

      {features && features.length > 0 && (
        <ul className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

