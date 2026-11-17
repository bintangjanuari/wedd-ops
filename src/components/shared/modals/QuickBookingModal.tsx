"use client";

import { useState } from "react";
import {
  X,
  Calendar as CalendarIcon,
  User,
  Phone,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Plus,
  Building2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";
import { ShiftSelectorPills } from "@/components/shared/forms/ShiftSelectorPills";

export interface QuickBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const packages = [
  {
    id: "pkg-1",
    name: "Paket Rias Pengantin Premium (Akad + Resepsi)",
    price: 8500000,
    desc: "Make up bride & groom, 2 ibu, retouch malam",
  },
  {
    id: "pkg-2",
    name: "Paket Akad Saja (Diamond Intimate)",
    price: 4500000,
    desc: "Make up bride & groom intimate ceremony",
  },
  {
    id: "pkg-3",
    name: "Paket Luxury Full Day + Busana Adat",
    price: 15000000,
    desc: "Full day asistensi, 2 pasang kebaya premium, 4 besan",
  },
];

const addonsList = [
  { id: "add-1", name: "Retouch Resepsi Malam", price: 1500000 },
  { id: "add-2", name: "Rias Ibu Kandung & Mertua (2 Orang)", price: 1200000 },
  { id: "add-3", name: "Sewa Melati Segi & Ronce Asli", price: 750000 },
  { id: "add-4", name: "Hijab Do / Hair Do Tambahan Bridesmaid", price: 500000 },
];

export function QuickBookingModal({
  isOpen,
  onClose,
  onSuccess,
}: QuickBookingModalProps) {
  // Form states
  const [clientName, setClientName] = useState("Sarah Jenkins");
  const [clientPhone, setClientPhone] = useState("+62 812-8899-0011");
  const [eventDate, setEventDate] = useState("2026-12-15");
  const [selectedShift, setSelectedShift] = useState<
    "morning" | "afternoon" | "night" | "fullday"
  >("morning");
  const [selectedPkgId, setSelectedPkgId] = useState("pkg-1");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["add-1"]);
  const [dpType, setDpType] = useState<"30" | "50" | "custom">("30");
  const [customDpAmount, setCustomDpAmount] = useState<number>(3000000);
  const [repaymentDue, setRepaymentDue] = useState("h-7");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  // Price calculations
  const selectedPackage =
    packages.find((p) => p.id === selectedPkgId) || packages[0];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsList.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);
  const grandTotal = selectedPackage.price + addonsTotal;

  let dpAmount = 0;
  if (dpType === "30") {
    dpAmount = Math.round(grandTotal * 0.3);
  } else if (dpType === "50") {
    dpAmount = Math.round(grandTotal * 0.5);
  } else {
    dpAmount = customDpAmount;
  }
  const remainingAmount = grandTotal - dpAmount;

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim() || !eventDate) {
      toast.error("Harap lengkapi nama klien, nomor WhatsApp, dan tanggal acara");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
      });
      toast.success(
        `Booking ${clientName} berhasil dibuat! Invoice otomatis diterbitkan.`
      );
      if (onSuccess) onSuccess();
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-booking-title"
        className="relative w-full max-w-[680px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Top Decorative Indicator Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-amber-400" />

        {/* Modal Header */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4 border-b border-slate-100">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[11px] uppercase tracking-wider font-bold">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>Reservasi Baru & Terbitkan Tagihan</span>
            </div>
            <h2
              id="quick-booking-title"
              className="font-display text-xl sm:text-2xl font-bold text-slate-900 tracking-tight"
            >
              Buat Reservasi & Terbitkan Tagihan
            </h2>
            <p className="text-xs text-slate-500">
              Kunci tanggal kalender dan kirim invoice digital resmi ke calon pengantin via WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup Dialog"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-5 space-y-6 max-h-[calc(100vh-220px)] overflow-y-auto scroll-smooth"
        >
          {/* SECTION 1: DATA KLIEN & KONTAK */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                1
              </span>
              <span>Data Pasangan / Klien</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="modalClientName">
                  Nama Lengkap Pasangan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="modalClientName"
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Contoh: Rina & Budi"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="modalClientPhone">
                  Nomor WhatsApp (Aktif) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-[#25D366]" />
                  <input
                    id="modalClientPhone"
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+62 812-xxxx-xxxx"
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: JADWAL ACARA & VALIDASI SLOT */}
          <section className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                  2
                </span>
                <span>Jadwal Acara & Cek Slot</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">GMT+7 WIB</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="modalEventDate">
                  Tanggal Acara <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    id="modalEventDate"
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Shift Waktu <span className="text-rose-500">*</span>
                </label>
                <ShiftSelectorPills
                  selectedId={selectedShift}
                  onChange={(id) =>
                    setSelectedShift(
                      id as "morning" | "afternoon" | "night" | "fullday"
                    )
                  }
                  options={[
                    { id: "morning", label: "Akad Pagi" },
                    { id: "night", label: "Resepsi Malam" },
                    { id: "fullday", label: "Full Day" },
                  ]}
                />
              </div>
            </div>

            {/* Live Slot Availability Callout */}
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-emerald-900 font-medium">
                  <strong>Slot Tersedia!</strong> Tim B (Junior Squad) bebas jadwal pada tanggal ini.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800 font-mono text-[10px] font-bold">
                1/2 TERPAKAI
              </span>
            </div>
          </section>

          {/* SECTION 3: PAKET LAYANAN & ADD-ON */}
          <section className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                3
              </span>
              <span>Paket Layanan & Tambahan</span>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="packageSelect">
                Pilih Paket Utama
              </label>
              <select
                id="packageSelect"
                value={selectedPkgId}
                onChange={(e) => setSelectedPkgId(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              >
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.name} — {formatIDR(pkg.price)}
                  </option>
                ))}
              </select>
            </div>

            {/* Addons List */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Pilihan Add-on / Tambahan:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {addonsList.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={cn(
                        "flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition text-xs",
                        isChecked
                          ? "bg-indigo-50/50 border-indigo-300 text-slate-900"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleAddon(addon.id)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{addon.name}</p>
                        <p className="font-mono text-[11px] text-indigo-700 font-bold">
                          + {formatIDR(addon.price)}
                        </p>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: KETENTUAN DP & TERMIN */}
          <section className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-900 uppercase tracking-wider">
              <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                4
              </span>
              <span>Skema Pembayaran & DP Pengunci Slot</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { val: "30", label: "DP 30% (Standar)", sub: formatIDR(Math.round(grandTotal * 0.3)) },
                { val: "50", label: "DP 50%", sub: formatIDR(Math.round(grandTotal * 0.5)) },
                { val: "custom", label: "Nominal Kustom", sub: "Atur Sendiri" },
              ].map((item) => (
                <button
                  key={item.val}
                  type="button"
                  onClick={() => setDpType(item.val as any)}
                  className={cn(
                    "p-2.5 rounded-xl text-center border transition flex flex-col items-center justify-center",
                    dpType === item.val
                      ? "bg-indigo-50 border-indigo-600 text-indigo-700 font-bold shadow-2xs"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                  )}
                >
                  <span className="text-xs">{item.label}</span>
                  <span className="font-mono text-[11px] mt-0.5">{item.sub}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-600" htmlFor="modalRepaymentDue">
                  Jatuh Tempo Pelunasan Sisa
                </label>
                <select
                  id="modalRepaymentDue"
                  value={repaymentDue}
                  onChange={(e) => setRepaymentDue(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none"
                >
                  <option value="h-7">H-7 Sebelum Acara (Rekomendasi)</option>
                  <option value="h-3">H-3 Sebelum Acara</option>
                  <option value="h-1">H-1 Sebelum Acara</option>
                  <option value="h-0">Hari-H di Lokasi</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-600">
                  Rekening Penerima Resmi
                </label>
                <div className="h-10 px-3 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs font-mono">
                  <span>BCA 8820192881</span>
                  <span className="text-slate-500 font-sans text-[11px]">a/n Ayu Lestari</span>
                </div>
              </div>
            </div>
          </section>

          {/* TOTAL SUMMARY CARD */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
            <div>
              <p className="text-[11px] text-slate-400 font-medium">
                Total Kontrak: {formatIDR(grandTotal)}
              </p>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xs text-amber-400 font-bold uppercase">
                  Tagihan DP Awal:
                </span>
                <span className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {formatIDR(dpAmount)}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                Sisa pelunasan: {formatIDR(remainingAmount)} ({repaymentDue.toUpperCase()})
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-5 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition active:scale-95 disabled:opacity-50"
              >
                <Receipt className="h-4 w-4" />
                <span>{isLoading ? "Menerbitkan..." : "Terbitkan Invoice & Kunci Slot"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

