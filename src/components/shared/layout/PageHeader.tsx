"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface PageHeaderProps {
  category?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  category,
  title,
  description,
  icon,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end lg:items-center justify-between gap-4",
        className
      )}
    >
      <div className="flex items-start gap-3.5">
        {icon && (
          <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            {icon}
          </div>
        )}
        <div className="space-y-1">
          {category && (
            <div className="flex items-center gap-2 flex-wrap">
              {typeof category === "string" ? (
                <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  {category}
                </span>
              ) : (
                category
              )}
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 flex-wrap shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

