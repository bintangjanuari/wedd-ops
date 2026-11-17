"use client";

import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Link as LinkIcon,
  TrendingUp,
  Clock,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Receipt,
  Users,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { MetricKpiCard } from "@/components/shared/kpi/MetricKpiCard";
import { PageHeader } from "@/components/shared/layout/PageHeader";
import { UrgentAlertBanner } from "@/components/shared/alerts/UrgentAlertBanner";
import { EventCard } from "@/components/shared/cards/EventCard";
import { TeamStatusCard } from "@/components/shared/cards/TeamStatusCard";
import { PortfolioLinkCard } from "@/components/shared/cards/PortfolioLinkCard";
import { CapacityProgressCard } from "@/components/shared/cards/CapacityProgressCard";
import { useUiStore } from "@/stores/use-ui-store";

export default function DashboardSummaryPage() {
  const setQuickAddModalOpen = useUiStore((state) => state.setQuickAddModalOpen);

  const handleCopyOfferLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText("https://weddops.id/v/sanggar-ayu-lestari");
      toast.success("Tautan portofolio publik berhasil disalin!");
    }
  };

  return (
    <div className="space-y-7">
      {/* 1. TOP GREETING & QUICK ACTIONS BAR */}
      <PageHeader
        category={
          <>
            <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400 font-bold">
              Ringkasan Eksekutif
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            <span className="font-mono text-[11px] text-slate-500 font-semibold">
              Nov 2026
            </span>
          </>
        }
        title="Selamat Pagi, Kak Sarah 👋"
        description="Berikut ringkasan operasional Sanggar Ayu Lestari bulan ini."
        actions={
          <>
            <Link
              href="/calendar"
              className="h-10 px-4 rounded-xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center gap-2 transition text-xs font-semibold"
            >
              <CalendarIcon className="h-4 w-4 text-slate-500" />
              <span>Buka Kalender Bulan Ini</span>
            </Link>

            <button
              type="button"
              onClick={handleCopyOfferLink}
              className="h-10 px-4 rounded-xl bg-white text-slate-800 hover:bg-slate-50 border border-slate-200/80 shadow-2xs flex items-center gap-2 transition text-xs font-semibold"
            >
              <LinkIcon className="h-4 w-4 text-slate-500" />
              <span>Salin Link Penawaran</span>
            </button>
          </>
        }
      />

      {/* 2. 4 KEY METRIC KPI CARDS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricKpiCard
          title="Omset Bulan Ini"
          value="Rp 48.500.000"
          icon={<TrendingUp className="h-4 w-4 text-indigo-600" />}
          badge={{ text: "+18% dr bln lalu", variant: "success" }}
          subtext="Target: 50jt"
        />

        <MetricKpiCard
          title="Acara Bulan Ini"
          value="12 Acara"
          icon={<CalendarIcon className="h-4 w-4 text-amber-600" />}
          subtext="8 Selesai, 4 Menuju"
        />

        <MetricKpiCard
          title="Sisa Pelunasan Tertunda"
          value="Rp 7.200.000"
          icon={<Clock className="h-4 w-4 text-amber-500" />}
          badge={{ text: "3 Klien H-7 acara", variant: "warning" }}
        />

        <MetricKpiCard
          title="Slot Weekend Tersedia"
          value="4 Slot Akhir Pekan"
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          badge={{ text: "2 Sabtu, 2 Minggu kosong", variant: "success" }}
        />
      </section>

      {/* 3. URGENT ATTENTION ALERT BANNER (H-3 REMINDER) */}
      <UrgentAlertBanner
        badge="Tindakan Cepat"
        deadline="Deadline: Kamis, 12 Nov"
        title="Acara Rina & Budi (Sabtu, 14 Nov) sisa pelunasan H-3 belum dikonfirmasi!"
        description={
          <p>
            Tagihan tersisa senilai{" "}
            <span className="font-mono font-bold text-amber-700">Rp 3.000.000</span>.
            Slot rias dan tim dekorasi siap dikonfirmasi final begitu bukti transfer diunggah.
          </p>
        }
        primaryAction={{
          label: "Kirim Pengingat WA Otomatis",
          href: "https://wa.me/6281234567890?text=Halo%20Kak%20Rina,%20mengingatkan%20pelunasan%20WeddOps",
          isExternal: true,
          icon: <MessageCircle className="h-4 w-4" />,
        }}
        secondaryAction={{
          label: "Buka Tagihan / Invoice",
          href: "/invoices",
          icon: <Receipt className="h-4 w-4 text-slate-400" />,
        }}
      />

      {/* 4. TWO-COLUMN OPERATIONS LAYOUT (7 cols vs 5 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: JADWAL ACARA TERDEKAT (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-indigo-600" />
              <h3 className="font-display text-base font-bold text-slate-900">
                Jadwal Acara Terdekat
              </h3>
            </div>
            <Link
              href="/calendar"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
            >
              Lihat Semua Kalender <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Event Cards List */}
          <div className="space-y-3">
            <EventCard
              dateLabel="14 Nov • 08:00 WIB"
              shiftLabel="Akad Pagi"
              teamLabel="Tim A: Lead MUA (Sarah)"
              clientName="Rina & Budi"
              venueName="Gedung Sasana Kriya, TMII"
              mapsUrl="https://maps.google.com/?q=Gedung+Sasana+Kriya+TMII"
              statusBadge={
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  DP Masuk (Sisa Rp 3.000.000)
                </span>
              }
              packageName="Paket: Akad + Resepsi Premium"
              whatsappUrl="https://wa.me/6281234567890"
              invoiceUrl="/invoices"
            />

            <EventCard
              dateLabel="15 Nov • 18:30 WIB"
              shiftLabel="Resepsi Malam"
              teamLabel="Tim B: Asisten & Junior MUA"
              teamVariant="emerald"
              clientName="Dinda & Rama"
              venueName="Grand Ballroom Hotel Mulia Senayan"
              mapsUrl="https://maps.google.com/?q=Hotel+Mulia+Senayan"
              invoiceCode="INV/202611/039"
              statusBadge={
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  LUNAS
                </span>
              }
              packageName="Paket: Resepsi Glamour + Retouch"
              whatsappUrl="https://wa.me/6281234567891"
              invoiceUrl="/invoices"
            />

            <EventCard
              dateLabel="20 Nov • 09:00 WIB"
              shiftLabel="Akad Pagi"
              teamLabel="Tim A: Lead MUA (Sarah)"
              clientName="Tasya & Fajar"
              venueName="Masjid Al-Bina Senayan, Jakarta Pusat"
              mapsUrl="https://maps.google.com/?q=Masjid+Al-Bina+Senayan"
              statusBadge={
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  LUNAS
                </span>
              }
              packageName="Paket: Diamond MUA + Hijab Styling"
              whatsappUrl="https://wa.me/6281234567892"
              invoiceUrl="/invoices"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: KESIAPAN TIM & PORTOFOLIO PUBLIK (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-slate-700" />
              <h3 className="font-display text-base font-bold text-slate-900">
                Kesiapan Tim (Sabtu, 14 Nov)
              </h3>
            </div>
            <span className="font-mono text-xs text-slate-400">2 Tim Aktif</span>
          </div>

          {/* Tim Lapangan Cards */}
          <div className="space-y-3">
            <TeamStatusCard
              teamLetter="A"
              teamName="Tim Rias A (Utama)"
              pic="PIC: Sarah (Lead MUA)"
              statusLabel="Aktif - Terjadwal"
              statusVariant="indigo"
              locationOrInfo="Gedung Sasana Kriya"
              scheduleOrStandby="14 Nov (06:00 Standby)"
            />

            <TeamStatusCard
              teamLetter="B"
              teamName="Tim Rias B (Asisten)"
              pic="PIC: Amanda & Nanda"
              statusLabel="Bebas Slot"
              statusVariant="emerald"
              locationOrInfo="Standby / Bebas Booking Baru"
              actionSlot={
                <button
                  type="button"
                  onClick={() => setQuickAddModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[11px] shadow-2xs flex items-center gap-1 transition"
                >
                  <Plus className="h-3 w-3" />
                  <span>Isi Slot Tim B</span>
                </button>
              }
            />
          </div>

          {/* Mini Quick-Quote Link preview box (Dark Charcoal Card) */}
          <PortfolioLinkCard
            url="https://weddops.id/v/sanggar-ayu-lestari"
            previewUrl="/v/sanggar-ayu-lestari"
            onCopy={handleCopyOfferLink}
            onQrCode={() => toast.info("QR Code untuk meja resepsionis atau bio")}
          />

          {/* Kapasitas Slot Bulan Ini Progress Widget */}
          <CapacityProgressCard
            title="Kapasitas Slot Bulan Ini"
            percentage={75}
            usedCount={12}
            totalCount={16}
            unitName="slot acara"
            remainingLabel="Sisa 4 slot tersedia"
          />
        </div>
      </section>
    </div>
  );
}
