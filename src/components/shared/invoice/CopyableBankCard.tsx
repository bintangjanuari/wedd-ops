"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface CopyableBankCardProps {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  note?: string;
  className?: string;
}

export function CopyableBankCard({
  bankName,
  accountNumber,
  accountHolder,
  note,
  className,
}: CopyableBankCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      toast.success("Nomor rekening berhasil disalin!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Gagal menyalin nomor rekening");
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
        className
      )}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2 py-0.5 rounded">
            {bankName}
          </span>
          {note && <span className="text-[11px] text-slate-500">{note}</span>}
        </div>
        <div className="font-mono text-lg font-bold text-slate-900 tracking-wider">
          {accountNumber}
        </div>
        <div className="text-xs text-slate-600">
          a.n. <span className="font-medium text-slate-800">{accountHolder}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleCopy}
        aria-label="Salin nomor rekening"
        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all shadow-sm shrink-0 min-h-[44px] min-w-[44px]"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-emerald-600" />
            <span className="text-emerald-700">Tersalin</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4 text-slate-500" />
            <span>Salin No. Rek</span>
          </>
        )}
      </button>
    </div>
  );
}

