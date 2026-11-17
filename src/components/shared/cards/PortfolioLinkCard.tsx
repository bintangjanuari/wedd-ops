"use client";

import React from "react";
import Link from "next/link";
import { Share2, Eye, QrCode, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PortfolioLinkCardProps {
  title?: string;
  subtitle?: string;
  url: string;
  previewUrl: string;
  viewsCount?: string;
  waClicksCount?: string;
  onCopy?: () => void;
  onQrCode?: () => void;
  className?: string;
}

export function PortfolioLinkCard({
  title = "Halaman Publik Klien",
  subtitle = "Tautan Portofolio & Cek Slot Mandiri:",
  url,
  previewUrl,
  viewsCount = "128 dilihat minggu ini",
  waClicksCount = "6 klik tanya WA",
  onCopy,
  onQrCode,
  className,
}: PortfolioLinkCardProps) {
  return (
    <div
      className={cn(
        "p-5 rounded-2xl bg-[#0F172A] text-white shadow-md space-y-3.5 relative overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4 text-amber-400" />
          <span className="text-[11px] uppercase font-bold tracking-wider text-amber-400">
            {title}
          </span>
        </div>
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>

      <div className="space-y-1.5">
        {subtitle && <p className="text-xs text-slate-300">{subtitle}</p>}
        <div className="p-2 rounded-xl bg-white/10 flex items-center justify-between gap-2 border border-white/10">
          <span className="font-mono text-xs text-slate-100 truncate">
            {url}
          </span>
          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              className="shrink-0 px-2.5 py-1 rounded-lg bg-white text-slate-900 hover:bg-slate-100 text-xs font-bold transition"
            >
              Salin
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1 text-xs">
        <Link
          href={previewUrl}
          target="_blank"
          className="text-indigo-300 hover:text-white flex items-center gap-1 transition font-medium"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Pratinjau Tampilan Klien</span>
        </Link>
        {onQrCode && (
          <button
            type="button"
            onClick={onQrCode}
            className="text-slate-400 hover:text-white flex items-center gap-1 transition font-medium"
          >
            <QrCode className="h-3.5 w-3.5" />
            <span>QR Code</span>
          </button>
        )}
      </div>

      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-slate-400 font-mono text-[11px]">
        <span className="flex items-center gap-1 text-emerald-300">
          <Eye className="h-3 w-3" />
          <span>{viewsCount}</span>
        </span>
        <span>•</span>
        <span className="flex items-center gap-1 text-[#25D366]">
          <MessageCircle className="h-3 w-3" />
          <span>{waClicksCount}</span>
        </span>
      </div>
    </div>
  );
}

