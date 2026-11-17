"use client";

import React from "react";
import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Receipt,
  Users,
  Sparkles,
  Navigation,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface EventCardProps {
  dateLabel: string;
  shiftLabel: string;
  teamLabel: string;
  teamVariant?: "indigo" | "emerald" | "slate";
  clientName: string;
  venueName: string;
  mapsUrl?: string;
  statusBadge: React.ReactNode;
  packageName: string;
  invoiceCode?: string;
  whatsappUrl?: string;
  invoiceUrl?: string;
  onWhatsappClick?: () => void;
  onInvoiceClick?: () => void;
  className?: string;
}

export function EventCard({
  dateLabel,
  shiftLabel,
  teamLabel,
  teamVariant = "indigo",
  clientName,
  venueName,
  mapsUrl,
  statusBadge,
  packageName,
  invoiceCode,
  whatsappUrl,
  invoiceUrl = "/invoices",
  onWhatsappClick,
  onInvoiceClick,
  className,
}: EventCardProps) {
  const teamBgClass =
    teamVariant === "emerald"
      ? "bg-emerald-50 text-emerald-700"
      : teamVariant === "slate"
      ? "bg-slate-100 text-slate-700"
      : "bg-indigo-50 text-indigo-700";

  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-xs transition space-y-3",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-[11px] font-bold text-indigo-700 px-2 py-0.5 rounded bg-indigo-50 border border-indigo-100">
              {dateLabel}
            </span>
            <span className="text-xs text-slate-400">{shiftLabel}</span>
            <span
              className={cn(
                "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
                teamBgClass
              )}
            >
              <Users className="h-3 w-3" />
              {teamLabel}
            </span>
          </div>

          <h4 className="font-display text-base font-bold text-slate-900">
            {clientName}
          </h4>

          <p className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
            <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
            <span>{venueName}</span>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:underline inline-flex items-center gap-0.5 font-medium ml-1"
              >
                <Navigation className="h-3 w-3" /> Maps
              </a>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:items-end gap-1 self-start sm:self-auto">
          {statusBadge}
          {invoiceCode && (
            <span className="font-mono text-[10px] text-slate-400">
              {invoiceCode}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs gap-2">
        <div className="flex items-center gap-1.5 text-slate-600 font-medium truncate">
          <Sparkles className="h-3.5 w-3.5 text-amber-500 shrink-0" />
          <span className="truncate">{packageName}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={onWhatsappClick}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#25D366] font-semibold hover:bg-emerald-100 transition"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              <span>WhatsApp</span>
            </a>
          ) : (
            onWhatsappClick && (
              <button
                type="button"
                onClick={onWhatsappClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-[#25D366] font-semibold hover:bg-emerald-100 transition"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>WhatsApp</span>
              </button>
            )
          )}

          {invoiceUrl ? (
            <Link
              href={invoiceUrl}
              onClick={onInvoiceClick}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition"
            >
              <Receipt className="h-3.5 w-3.5" />
              <span>Invoice</span>
            </Link>
          ) : (
            onInvoiceClick && (
              <button
                type="button"
                onClick={onInvoiceClick}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition"
              >
                <Receipt className="h-3.5 w-3.5" />
                <span>Invoice</span>
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

