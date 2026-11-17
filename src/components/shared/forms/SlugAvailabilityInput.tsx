"use client";

import { Check, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SlugAvailabilityInputProps {
  value: string;
  isChecking?: boolean;
  isAvailable?: boolean | null;
  errorMessage?: string;
  onChange: (newSlug: string) => void;
  className?: string;
}

export function SlugAvailabilityInput({
  value,
  isChecking = false,
  isAvailable = null,
  errorMessage,
  onChange,
  className,
}: SlugAvailabilityInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Normalisasi slug (huruf kecil, ganti spasi/karakter spesial dengan dash)
    const sanitized = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-")
      .replace(/-+/g, "-");
    onChange(sanitized);
  };

  return (
    <div className={cn("space-y-1.5 w-full", className)}>
      <label className="text-xs font-semibold text-slate-700">
        Tautan Halaman Penawaran Publik (Link Klien)
      </label>

      <div className="flex items-center rounded-xl border border-slate-200 bg-white shadow-2xs overflow-hidden focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
        <span className="bg-slate-50 px-3 py-2.5 text-xs text-slate-500 border-r border-slate-200 font-mono select-none">
          weddops.com/v/
        </span>

        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="sanggar-ayu"
          className="flex-1 px-3 py-2 text-xs font-medium text-slate-900 outline-none bg-transparent"
        />

        {/* Status indicator icon */}
        <div className="px-3 flex items-center justify-center">
          {isChecking ? (
            <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
          ) : isAvailable === true ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <Check className="h-3 w-3 stroke-[3]" />
              Tersedia
            </span>
          ) : isAvailable === false ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              <X className="h-3 w-3 stroke-[3]" />
              Terpakai
            </span>
          ) : null}
        </div>
      </div>

      {errorMessage && (
        <p className="text-[11px] text-rose-600">{errorMessage}</p>
      )}
    </div>
  );
}

