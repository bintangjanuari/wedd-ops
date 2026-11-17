"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Receipt,
  Search,
  Filter,
  Download,
  Plus,
  MessageCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Link as LinkIcon,
  Eye,
  CreditCard,
  Building2,
  ChevronDown,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";
import { PaymentStatusBadge, PaymentStatusVariant } from "@/components/shared/invoice/PaymentStatusBadge";
import { PaymentProgressIndicator } from "@/components/shared/invoice/PaymentProgressIndicator";
import { CopyableBankCard } from "@/components/shared/invoice/CopyableBankCard";
import { PageHeader } from "@/components/shared/layout/PageHeader";
import { FilterMetricTab } from "@/components/shared/cards/FilterMetricTab";
import { useUiStore } from "@/stores/use-ui-store";

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;
  createdDate: string;
  dueDate: string;
  clientName: string;
  clientInitials: string;
  clientPhone: string;
  venueName: string;
  eventDate: string;
  eventShift: string;
  packageName: string;
  totalAmount: number;
  paidAmount: number;
  status: PaymentStatusVariant;
  isUrgent?: boolean;
  dueDateLabel: string;
  publicToken: string;
}

const mockInvoices: InvoiceRecord[] = [
  {
    id: "inv-1",
    invoiceNumber: "INV/202611/042",
    createdDate: "02 Nov 2026",
    dueDate: "08 Des 2026",
    clientName: "Sarah Jenkins",
    clientInitials: "SJ",
    clientPhone: "6281234567890",
    venueName: "Hotel Mulia, Senayan",
    eventDate: "15 Des 2026",
    eventShift: "Akad Pagi (07:30 WIB)",
    packageName: "Paket Luxury MUA",
    totalAmount: 9700000,
    paidAmount: 3000000,
    status: "PARTIAL",
    dueDateLabel: "Pelunasan H-7 (08 Des)",
    publicToken: "tok-sj-042",
  },
  {
    id: "inv-2",
    invoiceNumber: "INV/202611/041",
    createdDate: "25 Okt 2026",
    dueDate: "11 Nov 2026",
    clientName: "Rina & Budi",
    clientInitials: "RB",
    clientPhone: "6281299887766",
    venueName: "Gedung Sasana Kriya, TMII",
    eventDate: "14 Nov 2026",
    eventShift: "Akad & Resepsi (Full Day)",
    packageName: "Paket Rias Tradisional",
    totalAmount: 8000000,
    paidAmount: 5000000,
    status: "PARTIAL",
    isUrgent: true,
    dueDateLabel: "Batas: Besok (23:59 WIB)",
    publicToken: "tok-rb-041",
  },
  {
    id: "inv-3",
    invoiceNumber: "INV/202611/040",
    createdDate: "20 Okt 2026",
    dueDate: "28 Okt 2026",
    clientName: "Amanda & Kevin",
    clientInitials: "AK",
    clientPhone: "6281233445566",
    venueName: "Masjid Al-Azhar, Kebayoran",
    eventDate: "08 Des 2026",
    eventShift: "Akad Pagi",
    packageName: "Akad Silver",
    totalAmount: 6500000,
    paidAmount: 6500000,
    status: "PAID",
    dueDateLabel: "Lunas Penuh",
    publicToken: "tok-ak-040",
  },
  {
    id: "inv-4",
    invoiceNumber: "INV/202611/039",
    createdDate: "18 Okt 2026",
    dueDate: "01 Nov 2026",
    clientName: "Dinda & Rama",
    clientInitials: "DR",
    clientPhone: "6281288776655",
    venueName: "Grand Ballroom Hotel Mulia",
    eventDate: "15 Nov 2026",
    eventShift: "Resepsi Malam",
    packageName: "Resepsi Glamour",
    totalAmount: 12000000,
    paidAmount: 12000000,
    status: "PAID",
    dueDateLabel: "Lunas Penuh",
    publicToken: "tok-dr-039",
  },
  {
    id: "inv-5",
    invoiceNumber: "INV/202611/038",
    createdDate: "12 Okt 2026",
    dueDate: "25 Okt 2026",
    clientName: "Tasya & Fajar",
    clientInitials: "TF",
    clientPhone: "6281277665544",
    venueName: "Masjid Al-Bina Senayan",
    eventDate: "20 Nov 2026",
    eventShift: "Akad Pagi",
    packageName: "Diamond MUA",
    totalAmount: 7500000,
    paidAmount: 7500000,
    status: "PAID",
    dueDateLabel: "Lunas Penuh",
    publicToken: "tok-tf-038",
  },
];

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "partial" | "paid" | "urgent">("all");
  const setQuickAddModalOpen = useUiStore((state) => state.setQuickAddModalOpen);

  // Filtered records
  const filteredInvoices = mockInvoices.filter((inv) => {
    const matchesSearch =
      inv.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.venueName.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "all") return true;
    if (statusFilter === "urgent") return inv.isUrgent;
    if (statusFilter === "partial") return inv.status === "PARTIAL";
    if (statusFilter === "paid") return inv.status === "PAID";
    return true;
  });

  const handleCopyLink = (token: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://weddops.id/i/${token}`);
      toast.success("Tautan faktur digital klien berhasil disalin!");
    }
  };

  const handleSendWhatsApp = (inv: InvoiceRecord) => {
    const remaining = inv.totalAmount - inv.paidAmount;
    const msg = `Halo Kak ${inv.clientName}, mengingatkan tagihan termin WeddOps untuk nomor ${inv.invoiceNumber} sisa pembayaran ${formatIDR(remaining)}. Rincian faktur digital: https://weddops.id/i/${inv.publicToken}`;
    window.open(`https://wa.me/${inv.clientPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* 1. HEADER & ACTIONS BAR */}
      <PageHeader
        category={
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
            <span>Keuangan</span>
            <span>&gt;</span>
            <span className="text-indigo-600">Faktur & Termin</span>
          </div>
        }
        title="Invoice & Penagihan Pembayaran"
        description="Kelola penerbitan faktur digital, termin DP, dan pelunasan klien vendor secara otomatis."
        actions={
          <>
            <button
              type="button"
              onClick={() => toast.success("Mengekspor rekap invoice format CSV...")}
              className="h-10 px-4 bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/80 shadow-2xs font-semibold text-xs rounded-xl flex items-center gap-2 transition"
            >
              <Download className="h-4 w-4 text-slate-500" />
              <span>Ekspor Rekap CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setQuickAddModalOpen(true)}
              className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 transition active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>+ Buat Invoice Baru</span>
            </button>
          </>
        }
      />

      {/* 2. STATUS METRIC TABS (4 FILTER PILLS) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <FilterMetricTab
          label="Total Tagihan"
          count={24}
          countUnit="Klien"
          subvalue="Rp 198.400.000"
          icon={<Receipt className="h-4 w-4 text-indigo-600" />}
          isActive={statusFilter === "all"}
          onClick={() => setStatusFilter("all")}
          variant="indigo"
        />

        <FilterMetricTab
          label="Menunggu Pelunasan"
          count={6}
          countUnit="DP Masuk"
          subvalue="Sisa Rp 32.800.000"
          icon={<span className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
          isActive={statusFilter === "partial"}
          onClick={() => setStatusFilter("partial")}
          variant="amber"
        />

        <FilterMetricTab
          label="Sudah Lunas"
          count={16}
          countUnit="Selesai 100%"
          subvalue="Rp 154.600.000"
          icon={<span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />}
          isActive={statusFilter === "paid"}
          onClick={() => setStatusFilter("paid")}
          variant="emerald"
        />

        <FilterMetricTab
          label="🔴 H-3 Jatuh Tempo"
          count={2}
          countUnit="Invoice Urgent"
          subvalue="Tertahan Rp 11.000.000"
          badge="Urgent"
          isActive={statusFilter === "urgent"}
          onClick={() => setStatusFilter("urgent")}
          variant="rose"
        />
      </div>

      {/* 3. TOOLBAR: SEARCH & SELECT FILTER ROW */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pengantin, nomor invoice (INV/2026...), atau venue..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition"
            />
          </div>

          {/* Filter Status */}
          <div className="md:col-span-3 relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-indigo-600 outline-none appearance-none"
            >
              <option value="all">Status: Semua Tagihan</option>
              <option value="urgent">🔴 Jatuh Tempo H-3</option>
              <option value="partial">🟡 Menunggu Pelunasan (DP)</option>
              <option value="paid">🟢 Sudah Lunas Penuh</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>

          {/* Filter Periode */}
          <div className="md:col-span-4 relative">
            <select
              className="w-full h-10 px-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-indigo-600 outline-none appearance-none"
              defaultValue="nov"
            >
              <option value="nov">Rentang: Bulan Ini (Nov 2026)</option>
              <option value="des">Desember 2026 (Peak Season)</option>
              <option value="q4">Kuartal 4 (Okt - Des 2026)</option>
              <option value="all">Tahun Kalender 2026</option>
            </select>
            <ChevronDown className="h-4 w-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Quick Filter Info Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span>Filter Aktif:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-[11px]">
              Nov 2026
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px]">
              Sanggar Ayu Lestari
            </span>
          </div>

          <div>
            Menampilkan <strong className="text-slate-900">{filteredInvoices.length}</strong> dari{" "}
            <strong>24</strong> faktur tercatat
          </div>
        </div>
      </div>

      {/* 4. INVOICES DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4 font-bold">NO. INVOICE</th>
                <th className="py-3 px-4 font-bold">NAMA KLIEN & ACARA</th>
                <th className="py-3 px-4 font-bold">TANGGAL ACARA</th>
                <th className="py-3 px-4 font-bold">TOTAL KONTRAK</th>
                <th className="py-3 px-4 font-bold">STATUS PEMBAYARAN</th>
                <th className="py-3 px-4 font-bold">TERMIN / SISA</th>
                <th className="py-3 px-4 font-bold text-right">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filteredInvoices.map((inv) => (
                <tr
                  key={inv.id}
                  className={cn(
                    "hover:bg-slate-50/80 transition-colors",
                    inv.isUrgent && "bg-rose-50/40 hover:bg-rose-50/70"
                  )}
                >
                  {/* Col 1: Invoice Code */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Receipt
                        className={cn(
                          "h-4 w-4",
                          inv.isUrgent ? "text-rose-600" : "text-indigo-600"
                        )}
                      />
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {inv.invoiceNumber}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 pl-6 mt-0.5">
                      Dibuat {inv.createdDate}
                    </p>
                  </td>

                  {/* Col 2: Client Name & Venue */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                          inv.isUrgent
                            ? "bg-rose-600 text-white"
                            : "bg-indigo-100 text-indigo-700"
                        )}
                      >
                        {inv.clientInitials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-display text-sm font-bold text-slate-900 truncate">
                            {inv.clientName}
                          </p>
                          {inv.isUrgent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-600 text-white uppercase">
                              H-3
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <span>{inv.venueName}</span>
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Col 3: Event Date & Shift */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-900">{inv.eventDate}</div>
                    <div className="text-[11px] text-slate-500">{inv.eventShift}</div>
                  </td>

                  {/* Col 4: Total Amount */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="font-mono text-xs font-bold text-slate-900">
                      {formatIDR(inv.totalAmount)}
                    </div>
                    <div className="text-[10px] text-slate-400">{inv.packageName}</div>
                  </td>

                  {/* Col 5: Status */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {inv.isUrgent ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-ping" />
                        🔴 H-3 JATUH TEMPO
                      </span>
                    ) : (
                      <PaymentStatusBadge status={inv.status} />
                    )}
                  </td>

                  {/* Col 6: Payment Progress Indicator */}
                  <td className="py-4 px-4 w-52">
                    <PaymentProgressIndicator
                      paidAmount={inv.paidAmount}
                      totalAmount={inv.totalAmount}
                      dueDateLabel={inv.dueDateLabel}
                    />
                  </td>

                  {/* Col 7: Actions */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {inv.status !== "PAID" && (
                        <button
                          type="button"
                          onClick={() => handleSendWhatsApp(inv)}
                          title="Tagih via WhatsApp"
                          className="h-8 px-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs rounded-lg flex items-center gap-1 shadow-2xs transition"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          <span>Tagih WA</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          toast.success(`Pembayaran ${inv.invoiceNumber} diverifikasi masuk!`)
                        }
                        title="Verifikasi Pembayaran"
                        className="h-8 px-2 bg-white hover:bg-slate-50 text-indigo-700 border border-slate-200 text-xs font-medium rounded-lg flex items-center gap-1 transition"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Verifikasi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleCopyLink(inv.publicToken)}
                        title="Salin Link Invoice"
                        className="h-8 w-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center transition"
                      >
                        <LinkIcon className="h-3.5 w-3.5" />
                      </button>

                      <Link
                        href={`/i/${inv.publicToken}`}
                        target="_blank"
                        title="Lihat Faktur Digital"
                        className="h-8 w-8 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center transition"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. BOTTOM WIDGETS: REKENING & WHATSAPP GATEWAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bank Account Widget */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-indigo-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Rekening Penerimaan Resmi Vendor
              </h4>
            </div>
            <span className="text-[11px] font-mono text-emerald-600 font-semibold">
              Terverifikasi Otomatis
            </span>
          </div>

          <CopyableBankCard
            bankName="BCA"
            accountNumber="8820192881"
            accountHolder="Ayu Lestari (Sanggar Ayu Lestari)"
          />
        </div>

        {/* WhatsApp Gateway Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-[#25D366]" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                WhatsApp Gateway Engine v2.4
              </h4>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366]">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              Connected
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Tingkat Keterkiriman Pesan:</span>
              <strong className="text-emerald-700 font-bold">99.8% Berhasil</strong>
            </div>
            <div className="flex items-center justify-between font-mono text-[11px]">
              <span>Hotline PIC Aktif:</span>
              <strong className="text-slate-900">+62 812-3456-7890</strong>
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              Template penagihan otomatis dikirim pada H-7 dan H-3 sebelum jadwal acara.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

