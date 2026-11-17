"use client";

import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TeamStatusCardProps {
  teamLetter: string;
  teamName: string;
  pic: string;
  statusLabel: string;
  statusVariant?: "indigo" | "emerald" | "amber" | "slate";
  locationOrInfo: string;
  scheduleOrStandby?: string;
  actionSlot?: React.ReactNode;
  className?: string;
}

export function TeamStatusCard({
  teamLetter,
  teamName,
  pic,
  statusLabel,
  statusVariant = "indigo",
  locationOrInfo,
  scheduleOrStandby,
  actionSlot,
  className,
}: TeamStatusCardProps) {
  const avatarColors = {
    indigo: "bg-indigo-50 text-indigo-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  }[statusVariant];

  const badgeColors = {
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    slate: "bg-slate-100 text-slate-700 border-slate-200",
  }[statusVariant];

  return (
    <div
      className={cn(
        "p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm shrink-0",
              avatarColors
            )}
          >
            {teamLetter}
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">{teamName}</h5>
            <p className="text-[11px] text-slate-500">{pic}</p>
          </div>
        </div>

        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
            badgeColors
          )}
        >
          {statusLabel}
        </span>
      </div>

      <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-1.5 text-slate-700 min-w-0">
          {statusVariant === "emerald" ? (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
          ) : (
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          )}
          <span className="font-medium truncate">{locationOrInfo}</span>
        </div>

        {scheduleOrStandby && (
          <span className="font-mono text-[11px] text-slate-400 shrink-0">
            {scheduleOrStandby}
          </span>
        )}

        {actionSlot && <div className="shrink-0">{actionSlot}</div>}
      </div>
    </div>
  );
}

