"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DynamicCounterInputProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  unitLabel?: string; // contoh: "Tim Lapangan"
  onChange: (newValue: number) => void;
  className?: string;
}

export function DynamicCounterInput({
  value,
  min = 1,
  max = 10,
  disabled = false,
  unitLabel,
  onChange,
  className,
}: DynamicCounterInputProps) {
  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && value < max;

  const handleDecrement = () => {
    if (canDecrement) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (canIncrement) onChange(value + 1);
  };

  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={!canDecrement}
          aria-label="Kurangi kuota"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition active:scale-95"
        >
          <Minus className="h-4 w-4" />
        </button>

        <span className="min-w-[56px] text-center font-display text-lg font-bold text-slate-900 select-none">
          {value}
        </span>

        <button
          type="button"
          onClick={handleIncrement}
          disabled={!canIncrement}
          aria-label="Tambah kuota"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition active:scale-95"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {unitLabel && (
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {unitLabel}
        </span>
      )}
    </div>
  );
}

