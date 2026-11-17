"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Copy,
  Calendar,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Upload,
  MessageCircle,
  FileText,
  Lock,
  QrCode,
  Download,
  AlertTriangle,
  Receipt,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";
import { CopyableBankCard } from "@/components/shared/invoice/CopyableBankCard";

export function PublicInvoiceClient({ token }: { token: string }) {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Mock invoice data
  const invoiceData = {
    invoiceCode: "INV/202611/041",
    vendorName: "Sanggar Ayu Lestari",
    vendorTagline: "MUA & Wedding Specialist Official Partner",
    coupleName: "Rina & Budi",
    eventDate: "Sabtu, 14 Nov 2026 • 06:00 - 12:00 WIB (Akad Pagi)",
    venueName: "Gedung Sasana Kriya, TMII, Jakarta Timur",
    venueMapsUrl: "https://maps.google.com/?q=Gedung+Sasana+Kriya+TMII",
    crewAssignment: "Tim A: Lead MUA (Kak Sarah)",
    totalContract: 8000000,
    dpPaid: 5000000,
    remainingAmount: 3000000,
    dueDate: "11 Nov 2026",
    dueDateLabel: "Termin H-3",
    items: [
      {
        name: "Paket Akad + Resepsi Premium",
        sub: "Tradisional Adat Sunda Siger Lengkap",
        amount: 5500000,
      },
      {
        name: "Add-on: Melati Segar Pagi",
        sub: "Kualitas Utama Grade A (2 Set)",
        amount: 500000,
      },
      {
        name: "Add-on: Rias Ibu & Pagar Ayu",
        sub: "2 Ibu Pengantin & 4 Pagar Ayu",
        amount: 2000000,
      },
    ],
    bankName: "BCA",
    accountNumber: "8820192881",
    accountHolder: "Ayu Lestari (Sanggar Ayu Lestari)",
    vendorPhone: "6281234567890",
  };

  const handleCopyInvoiceNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(invoiceData.invoiceCode);
      toast.success("Nomor faktur berhasil disalin!");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      setTimeout(() => {
        setIsUploading(false);
        setUploadedFile(file.name);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
        toast.success(`Bukti transfer "${file.name}" berhasil diunggah!`);
      }, 700);
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-4">
      {/* 1. VENDOR BRANDING & INVOICE META */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-lg shadow-xs">
            AL
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="font-display text-base font-bold text-slate-900 truncate">
                {invoiceData.vendorName}
              </h1>
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
            <p className="text-xs text-slate-500 truncate">
              {invoiceData.vendorTagline}
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase block">
              FAKTUR PEMBAYARAN RESMI
            </span>
            <span className="font-mono text-xs font-bold text-slate-900">
              {invoiceData.invoiceCode}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyInvoiceNumber}
            className="h-8 px-3 rounded-lg bg-white hover:bg-slate-100 text-indigo-700 text-xs font-semibold border border-slate-200 flex items-center gap-1 transition"
          >
            <Copy className="h-3 w-3" />
            <span>Salin</span>
          </button>
        </div>
      </div>

      {/* 2. PAYMENT STATUS BANNER */}
      <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-amber-900 font-semibold text-xs">
            <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
            <span>Menunggu Pelunasan {invoiceData.dueDateLabel}</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
            Belum Lunas
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-xs text-slate-500 block">Sisa Tagihan:</span>
            <span className="font-display text-2xl font-bold text-slate-900 tracking-tight">
              {formatIDR(invoiceData.remainingAmount)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-slate-400 block">Jatuh Tempo:</span>
            <span className="font-mono text-xs font-bold text-rose-600">
              {invoiceData.dueDate}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="w-full bg-amber-200/50 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: "62.5%" }}
            />
          </div>
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium text-[11px]">
              <CheckCircle2 className="h-3 w-3" />
              DP 1 Terbayar ({formatIDR(invoiceData.dpPaid)})
            </span>
            <span className="font-mono text-[11px]">62.5%</span>
          </div>
        </div>
      </div>

      {/* 3. EVENT & COUPLE CARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            <h2 className="font-display text-base font-bold text-slate-900">
              {invoiceData.coupleName}
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold border border-indigo-100">
            Akad & Resepsi
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-600 pt-1">
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <span>{invoiceData.eventDate}</span>
          </div>

          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
            <a
              href={invoiceData.venueMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 hover:underline flex items-center gap-1 font-medium"
            >
              <span>{invoiceData.venueName}</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <Users className="h-4 w-4 text-slate-400 shrink-0" />
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
              {invoiceData.crewAssignment}
            </span>
          </div>
        </div>
      </div>

      {/* 4. BREAKDOWN TABLE CARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Rincian Kontrak Biaya
          </h3>
          <span className="text-[11px] text-slate-400">
            {invoiceData.items.length} Item Layanan
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {invoiceData.items.map((item, idx) => (
            <div key={idx} className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-slate-800">{item.name}</p>
                <p className="text-[10px] text-slate-400">{item.sub}</p>
              </div>
              <span className="font-mono font-medium text-slate-900">
                {formatIDR(item.amount)}
              </span>
            </div>
          ))}

          {/* Subtotal */}
          <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between font-semibold mt-2">
            <span>Total Kontrak Acara</span>
            <span className="font-mono text-sm">{formatIDR(invoiceData.totalContract)}</span>
          </div>

          {/* DP Deduction */}
          <div className="flex items-center justify-between py-1 px-2 text-emerald-700 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
              <span>Pembayaran DP 1 (Terverifikasi)</span>
            </span>
            <span className="font-mono font-bold">- {formatIDR(invoiceData.dpPaid)}</span>
          </div>

          {/* Net Due */}
          <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                SISA PELUNASAN
              </span>
              <span className="text-[10px] text-amber-700">{invoiceData.dueDateLabel}</span>
            </div>
            <div className="text-right">
              <span className="font-display text-lg font-bold text-slate-900 font-mono block">
                {formatIDR(invoiceData.remainingAmount)}
              </span>
              <span className="text-[10px] text-amber-800 font-semibold">Belum Dibayar</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BANK ACCOUNT & QRIS */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-sm font-bold text-slate-900">
            Tujuan Transfer Bank Resmi
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
            Rekening Resmi
          </span>
        </div>

        <CopyableBankCard
          bankName={invoiceData.bankName}
          accountNumber={invoiceData.accountNumber}
          accountHolder={invoiceData.accountHolder}
        />

        {/* QRIS Fallback option */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-800 shadow-2xs">
              <QrCode className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Atau Scan QRIS Statis</p>
              <p className="text-[10px] text-slate-400">Mendukung GoPay, OVO, ShopeePay, BCA Mobile</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => toast.info("QRIS statis siap dipindai")}
            className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1 shadow-2xs"
          >
            <Download className="h-3 w-3" />
            <span>Unduh</span>
          </button>
        </div>
      </div>

      {/* 6. UPLOAD BUKTI TRANSFER & CONFIRMATION */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="font-display text-sm font-bold text-slate-900">
          Konfirmasi Pembayaran
        </h3>

        {/* Dropzone Upload */}
        <label className="cursor-pointer border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/20 hover:bg-indigo-50/40 transition rounded-2xl p-6 flex flex-col items-center justify-center text-center gap-2 group block">
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Upload className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">
              {uploadedFile ? "Ganti Bukti Transfer" : "Unggah Bukti Transfer"}
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Screenshot M-Banking (PNG, JPG, WEBP maks. 5MB)
            </p>
          </div>

          {uploadedFile && (
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{uploadedFile}</span>
            </div>
          )}
        </label>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <a
            href={`https://wa.me/${invoiceData.vendorPhone}?text=Halo%20${encodeURIComponent(invoiceData.vendorName)},%20saya%20sudah%20melakukan%20pelunasan%20termin%20H-3%20untuk%20faktur%20${encodeURIComponent(invoiceData.invoiceCode)}%20a.n.%20${encodeURIComponent(invoiceData.coupleName)}.%20Mohon%20diverifikasi.%20Terima%20kasih!`}
            target="_blank"
            rel="noreferrer"
            className="w-full h-11 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-98"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Kirim Konfirmasi ke WhatsApp Sanggar</span>
          </a>

          <button
            type="button"
            onClick={() => toast.success("Mengunduh kwitansi digital resmi PDF...")}
            className="w-full h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition"
          >
            <FileText className="h-4 w-4 text-slate-500" />
            <span>Unduh Kwitansi PDF Resmi</span>
          </button>
        </div>

        {/* SSL Trust Stamp */}
        <div className="flex items-center justify-center gap-1.5 pt-2 text-[11px] text-slate-400">
          <Lock className="h-3.5 w-3.5 text-slate-400" />
          <span>Enkripsi SSL 256-bit • WeddOps Transaction Security</span>
        </div>
      </div>
    </div>
  );
}

