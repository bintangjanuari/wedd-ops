"use client";

import React from "react";
import { ShieldCheck, Sparkles, MapPin, Instagram } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VendorProfileHeaderProps {
  initials?: string;
  name: string;
  category?: string;
  verified?: boolean;
  address?: string;
  instagram?: string;
  tagline?: string;
  className?: string;
}

export function VendorProfileHeader({
  initials = "AL",
  name,
  category = "Tata Rias & Busana Pengantin Tradisional",
  verified = true,
  address,
  instagram,
  tagline,
  className,
}: VendorProfileHeaderProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-indigo-50 to-transparent opacity-70 pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-2xl sm:text-3xl shadow-md shrink-0">
            {initials}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {name}
              </h1>
              {verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Vendor Terverifikasi
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
              <span>{category}</span>
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap pt-1">
              {address && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  {address}
                </span>
              )}
              {instagram && (
                <span className="flex items-center gap-1">
                  <Instagram className="h-3.5 w-3.5 text-slate-400" />
                  @{instagram}
                </span>
              )}
            </div>
          </div>
        </div>

        {tagline && (
          <div className="sm:text-right text-xs text-slate-500 max-w-xs sm:border-l sm:border-slate-100 sm:pl-6">
            <p className="italic">"{tagline}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

