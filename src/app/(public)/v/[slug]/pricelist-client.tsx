"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Star,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  MessageCircle,
  Check,
  ChevronRight,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";
import { PackageSelectCard } from "@/components/shared/cards/PackageSelectCard";
import { AddonSelectCard } from "@/components/shared/cards/AddonSelectCard";

const packages = [
  {
    id: "pkg-1",
    name: "Paket Akad + Resepsi Premium",
    price: 6500000,
    tag: "⭐ Paling Dipilih",
    features: [
      "2x ganti busana pengantin lengkap",
      "Makeup tahan hingga 12 jam (matte flawless)",
      "Retouch standby hingga selesai resepsi",
      "Termasuk hijab styling / sanggul modern",
    ],
  },
  {
    id: "pkg-2",
    name: "Paket Diamond Akad Saja",
    price: 4500000,
    features: [
      "Makeup pengantin akad intimate",
      "1x busana akad & melati standar",
      "Free touch-up kit",
    ],
  },
  {
    id: "pkg-3",
    name: "Paket Royal Luxury Full Day",
    price: 12000000,
    features: [
      "Full day asistensi lead MUA pribadi",
      "3 pasang busana kebaya adat eksklusif",
      "Makeup 4 orang tua / mertua",
      "Aksesoris mahkota siger bertabur kristal",
    ],
  },
];

const addons = [
  {
    id: "add-1",
    name: "Melati Segar Kualitas Utama Grade A",
    desc: "2 Set Ronce Melati Asli",
    price: 500000,
  },
  {
    id: "add-2",
    name: "Rias Ibu Pengantin & Besan",
    desc: "2 Orang Ibu (Makeup + Hairdo)",
    price: 1200000,
  },
  {
    id: "add-3",
    name: "Sewa Aksesoris Siger Sunda Lengkap",
    desc: "Siger Kencana, Kembang Goyang, Penetep",
    price: 750000,
  },
  {
    id: "add-4",
    name: "Softlens Pengantin Premium",
    desc: "Diameter 14.5mm natural grey / brown",
    price: 250000,
  },
];

export function PricelistClient({ slug }: { slug: string }) {
  const [eventDate, setEventDate] = useState("2026-12-15");
  const [selectedShift, setSelectedShift] = useState<"morning" | "night">("morning");
  const [selectedPackageId, setSelectedPackageId] = useState("pkg-1");
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(["add-1"]);

  const selectedPackage =
    packages.find((p) => p.id === selectedPackageId) || packages[0];

  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = addons.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const grandTotal = selectedPackage.price + addonsTotal;
  const dpAmount = Math.round(grandTotal * 0.3);

  const toggleAddon = (id: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSendReservationWA = () => {
    const shiftLabel = selectedShift === "morning" ? "Akad Pagi" : "Resepsi Malam";
    const selectedAddonNames = selectedAddonIds
      .map((id) => addons.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(", ");

    const msg = `Halo Sanggar Ayu Lestari, saya tertarik untuk booking tanggal ${eventDate} (${shiftLabel}) untuk ${selectedPackage.name}.${
      selectedAddonNames ? ` Add-on: ${selectedAddonNames}.` : ""
    } Estimasi Total: ${formatIDR(grandTotal)}. Apakah slot ini masih tersedia? Terima kasih!`;

    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="p-4 sm:p-6 pb-36 space-y-5">
      {/* 1. VENDOR PROFILE CARD */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4 relative overflow-hidden">
        <div className="flex items-start gap-3.5 relative z-10">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-display font-bold text-xl shadow-xs">
              AL
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-[11px] ring-2 ring-white">
              ✓
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h1 className="font-display text-lg font-bold text-slate-900 truncate">
                Sanggar Ayu Lestari
              </h1>
              <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full text-[10px] font-bold border border-indigo-100 flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-indigo-600" /> Resmi
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              MUA & Wedding Specialist • Jakarta & Sekitarnya
            </p>
          </div>
        </div>

        {/* Rating & Response Rate */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/80 flex items-center gap-1 text-slate-800 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>4.9</span>
            <span className="text-slate-400 font-normal text-[11px]">
              (48 Ulasan Pengantin Terverifikasi)
            </span>
          </div>

          <div className="bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1 text-emerald-800 text-xs font-medium">
            <Clock className="h-3.5 w-3.5 text-emerald-600" />
            <span>Respon &lt; 15 Menit</span>
          </div>
        </div>

        {/* Bio */}
        <p className="text-xs text-slate-600 leading-relaxed">
          Spesialis tata rias pengantin adat tradisional (Sunda Siger, Solo Putri) & modern presisi sejak 2018. Memberikan sentuhan sakral, anggun, dan tahan seharian penuh.
        </p>
      </div>

      {/* 2. STEP 1: REAL-TIME SLOT AVAILABILITY ENGINE */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[11px] uppercase tracking-wider font-bold">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Langkah 1 — Cek Tanggal Pernikahan</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700" htmlFor="publicEventDate">
              Tanggal Akad / Resepsi
            </label>
            <div className="relative">
              <Calendar className="h-4 w-4 absolute left-3 top-2.5 text-indigo-600" />
              <input
                id="publicEventDate"
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Pilih Sesi Acara
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedShift("morning")}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition",
                  selectedShift === "morning"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <Sun className="h-3.5 w-3.5" />
                <span>Akad Pagi</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedShift("night")}
                className={cn(
                  "py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition",
                  selectedShift === "night"
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-2xs"
                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                )}
              >
                <Moon className="h-3.5 w-3.5" />
                <span>Resepsi Malam</span>
              </button>
            </div>
          </div>

          {/* Slot availability status callout */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-emerald-950">Tanggal Masih Tersedia!</p>
              <p className="text-emerald-800 text-[11px] mt-0.5">
                Tim kami siap melayani hari bahagia Anda{" "}
                <span className="font-semibold">(1 dari 2 Slot Tim Kosong)</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. STEP 2: SERVICE PACKAGES */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[11px] uppercase tracking-wider font-bold">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Langkah 2 — Pilih Paket Utama</span>
        </div>

        <div className="space-y-3">
          {packages.map((pkg) => (
            <PackageSelectCard
              key={pkg.id}
              id={pkg.id}
              name={pkg.name}
              price={pkg.price}
              tag={pkg.tag}
              features={pkg.features}
              isSelected={selectedPackageId === pkg.id}
              onSelect={(id) => setSelectedPackageId(id)}
            />
          ))}
        </div>
      </div>

      {/* 4. STEP 3: INTERACTIVE ADD-ONS */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[11px] uppercase tracking-wider font-bold">
          <span className="w-2 h-2 rounded-full bg-indigo-600" />
          <span>Langkah 3 — Tambahan Layanan (Opsional)</span>
        </div>

        <div className="space-y-2">
          {addons.map((addon) => (
            <AddonSelectCard
              key={addon.id}
              id={addon.id}
              name={addon.name}
              desc={addon.desc}
              price={addon.price}
              isSelected={selectedAddonIds.includes(addon.id)}
              onToggle={(id) => toggleAddon(id)}
            />
          ))}
        </div>
      </div>

      {/* 5. STICKY BOTTOM BAR: TOTAL ESTIMATION & WHATSAPP ACTION */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl p-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">
              Estimasi Total Biaya
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-lg sm:text-xl font-bold text-slate-900 font-mono">
                {formatIDR(grandTotal)}
              </span>
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">
              DP Slot 30%: {formatIDR(dpAmount)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSendReservationWA}
            className="h-11 px-5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Ajukan Reservasi / Tanya WA</span>
          </button>
        </div>
      </div>
    </div>
  );
}

