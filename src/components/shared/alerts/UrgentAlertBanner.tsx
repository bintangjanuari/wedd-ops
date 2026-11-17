"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AlertBannerAction {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  isExternal?: boolean;
  className?: string;
}

export interface UrgentAlertBannerProps {
  badge: string;
  deadline?: string;
  title: string;
  description: React.ReactNode;
  icon?: React.ReactNode;
  primaryAction?: AlertBannerAction;
  secondaryAction?: AlertBannerAction;
  className?: string;
}

export function UrgentAlertBanner({
  badge,
  deadline,
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  className,
}: UrgentAlertBannerProps) {
  return (
    <section
      className={cn(
        "rounded-2xl bg-gradient-to-r from-amber-50 via-white to-white p-5 sm:p-6 border border-amber-200 shadow-2xs",
        className
      )}
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
            {icon || <AlertTriangle className="h-5 w-5" />}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold uppercase tracking-wider">
                {badge}
              </span>
              {deadline && (
                <span className="text-xs text-slate-400">{deadline}</span>
              )}
            </div>
            <h2 className="font-display text-base sm:text-lg font-bold text-slate-900">
              {title}
            </h2>
            <div className="text-xs text-slate-600">{description}</div>
          </div>
        </div>

        {(primaryAction || secondaryAction) && (
          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {primaryAction &&
              (primaryAction.href ? (
                <a
                  href={primaryAction.href}
                  target={primaryAction.isExternal ? "_blank" : undefined}
                  rel={primaryAction.isExternal ? "noreferrer" : undefined}
                  onClick={primaryAction.onClick}
                  className={cn(
                    "h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition",
                    primaryAction.className
                  )}
                >
                  {primaryAction.icon}
                  <span>{primaryAction.label}</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={primaryAction.onClick}
                  className={cn(
                    "h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition",
                    primaryAction.className
                  )}
                >
                  {primaryAction.icon}
                  <span>{primaryAction.label}</span>
                </button>
              ))}

            {secondaryAction &&
              (secondaryAction.href ? (
                <Link
                  href={secondaryAction.href}
                  onClick={secondaryAction.onClick}
                  className={cn(
                    "h-10 px-4 rounded-xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition",
                    secondaryAction.className
                  )}
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={secondaryAction.onClick}
                  className={cn(
                    "h-10 px-4 rounded-xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition",
                    secondaryAction.className
                  )}
                >
                  {secondaryAction.icon}
                  <span>{secondaryAction.label}</span>
                </button>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}

