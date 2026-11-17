"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShiftOption {
  id: string;
  label: string;
  icon?: React.ReactNode;
  sublabel?: string;
}

export interface ShiftSelectorPillsProps {
  options: ShiftOption[];
  selectedId: string;
  onChange: (id: string) => void;
  className?: string;
}

export function ShiftSelectorPills({
  options,
  selectedId,
  onChange,
  className,
}: ShiftSelectorPillsProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl",
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all",
              isSelected
                ? "bg-white text-indigo-600 shadow-2xs font-bold"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {opt.icon}
            <span>{opt.label}</span>
            {opt.sublabel && (
              <span className="text-[10px] text-slate-400">({opt.sublabel})</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

