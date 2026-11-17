"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Lock,
  Plus,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  MapPin,
  MessageCircle,
  Receipt,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CalendarCell, CalendarEventSummary } from "@/components/shared/calendar/CalendarCell";
import { CalendarLegendBar } from "@/components/shared/calendar/CalendarLegendBar";
import { PageHeader } from "@/components/shared/layout/PageHeader";
import { QuickStatPill } from "@/components/shared/pills/QuickStatPill";
import { useUiStore } from "@/stores/use-ui-store";

// Mock calendar data generator for November 2026
interface DayData {
  dayNumber: number;
  dateStr: string; // YYYY-MM-DD
  status: "available" | "partial" | "full" | "locked";
  usedSlots: number;
  maxSlots: number;
  lockLabel?: string;
  events?: CalendarEventSummary[];
}

const novemberDays: DayData[] = [
  // Padding for Sunday Nov 1 (Starts on Sunday)
  // Let's create dates 1..30
  { dayNumber: 1, dateStr: "2026-11-01", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e1", clientName: "Maya & Edo", shift: "MORNING_AKAD", isPaid: true }] },
  { dayNumber: 2, dateStr: "2026-11-02", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 3, dateStr: "2026-11-03", status: "locked", usedSlots: 0, maxSlots: 2, lockLabel: "Libur Kru" },
  { dayNumber: 4, dateStr: "2026-11-04", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 5, dateStr: "2026-11-05", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 6, dateStr: "2026-11-06", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e2", clientName: "Nadia & Reza", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 7, dateStr: "2026-11-07", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e3", clientName: "Intan & Dimas", shift: "MORNING_AKAD", isPaid: true }, { id: "e4", clientName: "Aulia & Kevin", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 8, dateStr: "2026-11-08", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e5", clientName: "Putri & Arga", shift: "FULL_DAY", isPaid: true }, { id: "e6", clientName: "Tiara & Bagus", shift: "EVENING_RECEPTION", isPaid: false }] },
  { dayNumber: 9, dateStr: "2026-11-09", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 10, dateStr: "2026-11-10", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 11, dateStr: "2026-11-11", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 12, dateStr: "2026-11-12", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e7", clientName: "Citra & Gilang", shift: "MORNING_AKAD", isPaid: true }] },
  { dayNumber: 13, dateStr: "2026-11-13", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e8", clientName: "Siti & Hendra", shift: "EVENING_RECEPTION", isPaid: true }] },
  // Selected date: 14 Nov
  { dayNumber: 14, dateStr: "2026-11-14", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e9", clientName: "Rina & Budi", shift: "MORNING_AKAD", isPaid: false }, { id: "e10", clientName: "Adinda & Rizky", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 15, dateStr: "2026-11-15", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e11", clientName: "Dinda & Rama", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 16, dateStr: "2026-11-16", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 17, dateStr: "2026-11-17", status: "locked", usedSlots: 0, maxSlots: 2, lockLabel: "Maintenance" },
  { dayNumber: 18, dateStr: "2026-11-18", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 19, dateStr: "2026-11-19", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 20, dateStr: "2026-11-20", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e12", clientName: "Tasya & Fajar", shift: "MORNING_AKAD", isPaid: true }] },
  { dayNumber: 21, dateStr: "2026-11-21", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e13", clientName: "Bella & Vian", shift: "MORNING_AKAD", isPaid: true }, { id: "e14", clientName: "Gita & Radit", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 22, dateStr: "2026-11-22", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e15", clientName: "Kania & Denis", shift: "FULL_DAY", isPaid: true }, { id: "e16", clientName: "Dewi & Bayu", shift: "EVENING_RECEPTION", isPaid: false }] },
  { dayNumber: 23, dateStr: "2026-11-23", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 24, dateStr: "2026-11-24", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 25, dateStr: "2026-11-25", status: "available", usedSlots: 0, maxSlots: 2 },
  { dayNumber: 26, dateStr: "2026-11-26", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e17", clientName: "Laras & Danu", shift: "MORNING_AKAD", isPaid: true }] },
  { dayNumber: 27, dateStr: "2026-11-27", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e18", clientName: "Tari & Yusuf", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 28, dateStr: "2026-11-28", status: "full", usedSlots: 2, maxSlots: 2, events: [{ id: "e19", clientName: "Wulan & Ilham", shift: "MORNING_AKAD", isPaid: true }, { id: "e20", clientName: "Dara & Ryan", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 29, dateStr: "2026-11-29", status: "partial", usedSlots: 1, maxSlots: 2, events: [{ id: "e21", clientName: "Hesti & Fikri", shift: "EVENING_RECEPTION", isPaid: true }] },
  { dayNumber: 30, dateStr: "2026-11-30", status: "available", usedSlots: 0, maxSlots: 2 },
];

export default function CalendarPage() {
  const [selectedDateStr, setSelectedDateStr] = useState("2026-11-14");
  const [activeShiftFilter, setActiveShiftFilter] = useState<"all" | "morning" | "night">("all");
  const setQuickAddModalOpen = useUiStore((state) => state.setQuickAddModalOpen);

  const selectedDay =
    novemberDays.find((d) => d.dateStr === selectedDateStr) || novemberDays[13];

  return (
    <div className="space-y-6">
      {/* 1. TOP CONTEXT RIBBON & QUICK STATS */}
      <PageHeader
        icon={<CalendarIcon className="h-6 w-6" />}
        category={
          <>
            <span className="font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              MODUL OPERASIONAL
            </span>
            <span className="text-slate-300 text-xs">•</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Live Sync
            </span>
          </>
        }
        title="Kalender Slot & Anti-Bentrok"
        actions={
          <>
            <QuickStatPill
              label="Slot Tersedia Bln Ini:"
              value="42 Shift"
              dotColor="emerald"
              pulse
            />

            <QuickStatPill
              label="Terkunci Penuh:"
              value="9 Tanggal"
              dotColor="rose"
            />

            <button
              type="button"
              onClick={() => toast.info("Fitur kunci tanggal manual (cuti bersama/maintenance) aktif")}
              className="flex items-center gap-1.5 h-9 px-3 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 shadow-2xs transition"
            >
              <Lock className="h-3.5 w-3.5 text-slate-500" />
              <span>Kunci Tanggal Manual</span>
            </button>
          </>
        }
      />

      {/* 2. CALENDAR CONTROLS & FILTER BAR */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Month Navigator */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => toast.info("Navigasi ke Oktober 2026")}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="px-3 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-indigo-600" />
                <span className="font-display text-sm font-bold text-slate-900 tracking-tight">
                  November 2026
                </span>
              </div>
              <button
                type="button"
                onClick={() => toast.info("Navigasi ke Desember 2026")}
                className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-white rounded-lg transition"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setSelectedDateStr("2026-11-14")}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-indigo-700 font-semibold text-xs transition"
            >
              Hari Ini
            </button>

            {/* View Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                className="px-3 py-1 rounded-lg bg-white text-indigo-700 text-xs font-bold shadow-2xs"
              >
                Bulan
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium"
              >
                Minggu
              </button>
              <button
                type="button"
                className="px-3 py-1 rounded-lg text-slate-500 hover:text-slate-800 text-xs font-medium"
              >
                Agenda
              </button>
            </div>
          </div>

          {/* Capacity Pill & Filter Group */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-slate-800 text-xs">
              <Users className="h-4 w-4 text-indigo-600" />
              <div>
                <span className="text-[10px] text-slate-400 font-bold uppercase block leading-none">
                  Kapasitas Harian
                </span>
                <span className="font-semibold text-indigo-900">Maks. 2 Acara (2 Tim)</span>
              </div>
            </div>

            {/* Shift Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveShiftFilter("all")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition",
                  activeShiftFilter === "all"
                    ? "bg-white text-indigo-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Semua Shift
              </button>
              <button
                type="button"
                onClick={() => setActiveShiftFilter("morning")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition",
                  activeShiftFilter === "morning"
                    ? "bg-white text-indigo-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Pagi
              </button>
              <button
                type="button"
                onClick={() => setActiveShiftFilter("night")}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-semibold transition",
                  activeShiftFilter === "night"
                    ? "bg-white text-indigo-700 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                Malam
              </button>
            </div>
          </div>
        </div>

        {/* Legend Bar: Pure Presentational */}
        <CalendarLegendBar />
      </div>

      {/* 3. CALENDAR WORKSPACE: GRID (8 COLS) + INSPECTOR (4 COLS) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* LEFT 8 COLUMNS: Monthly Grid */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-2xs">
          {/* Day of Week Headers (SEN to MIN) */}
          <div className="grid grid-cols-7 gap-2 mb-2 pb-2 text-center border-b border-slate-100">
            {["SEN", "SEL", "RAB", "KAM", "JUM", "SAB", "MIN"].map((day, idx) => (
              <div
                key={day}
                className={cn(
                  "font-mono text-xs font-bold tracking-wider",
                  idx >= 5 ? "text-indigo-600" : "text-slate-500"
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* 7-column Calendar Cells */}
          <div className="grid grid-cols-7 gap-2">
            {/* Nov 2026 starts on Sunday (day 1 is index 6) -> 6 empty placeholders */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="min-h-[90px] rounded-xl bg-slate-50/40 border border-dashed border-slate-200/60 opacity-30 p-2"
              >
                <span className="font-mono text-xs text-slate-300">{25 + i}</span>
              </div>
            ))}

            {novemberDays.map((day) => {
              const isSelected = day.dateStr === selectedDateStr;
              return (
                <CalendarCell
                  key={day.dateStr}
                  date={day.dayNumber}
                  fullDateString={day.dateStr}
                  isCurrentMonth={true}
                  isSelected={isSelected}
                  isToday={day.dayNumber === 14}
                  status={day.status}
                  usedSlots={day.usedSlots}
                  maxSlots={day.maxSlots}
                  lockLabel={day.lockLabel}
                  events={day.events}
                  onClick={(d) => setSelectedDateStr(d)}
                />
              );
            })}
          </div>
        </div>

        {/* RIGHT 4 COLUMNS: DATE INSPECTOR PANEL */}
        <div className="xl:col-span-4 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs space-y-5">
          {/* Inspector Header */}
          <div className="space-y-1 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-400 font-bold uppercase">
                Detail Tanggal Terpilih
              </span>
              <span
                className={cn(
                  "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono",
                  selectedDay.status === "full"
                    ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : selectedDay.status === "partial"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                )}
              >
                {selectedDay.status === "full"
                  ? "Penuh Terkunci (2/2)"
                  : selectedDay.status === "partial"
                    ? "Sisa 1 Tim"
                    : "Bebas Booking"}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-slate-900">
              {selectedDay.dateStr === "2026-11-14"
                ? "Sabtu, 14 November 2026"
                : `Tanggal ${selectedDay.dayNumber} November 2026`}
            </h3>
            <p className="text-xs text-slate-500">
              Anti Double-Booking Engine mengunci jadwal shift yang telah berstatus terisi.
            </p>
          </div>

          {/* Scheduled Events List on Selected Date */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Acara Terjadwal ({selectedDay.events?.length || 0})
            </h4>

            {selectedDay.events && selectedDay.events.length > 0 ? (
              selectedDay.events.map((evt, idx) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[10px] font-bold text-indigo-700 px-1.5 py-0.5 rounded bg-indigo-50 border border-indigo-100">
                          {evt.shift === "MORNING_AKAD" ? "08:00 - 13:00 WIB" : "18:30 - 22:00 WIB"}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {evt.shift === "MORNING_AKAD" ? "Akad Pagi" : "Resepsi Malam"}
                        </span>
                      </div>
                      <h5 className="font-display text-sm font-bold text-slate-900 mt-1">
                        {evt.clientName}
                      </h5>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3 w-3 text-slate-400" />
                        <span>{idx === 0 ? "Gedung Sasana Kriya TMII" : "Balai Kartini"}</span>
                      </p>
                    </div>

                    <span
                      className={cn(
                        "px-2 py-0.5 rounded-full text-[10px] font-bold",
                        evt.isPaid
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      )}
                    >
                      {evt.isPaid ? "LUNAS" : "DP (Sisa Rp 3jt)"}
                    </span>
                  </div>

                  {/* Team Assignment Tag */}
                  <div className="p-2 rounded-lg bg-white border border-slate-200 text-xs flex items-center justify-between">
                    <span className="text-slate-600 font-medium">
                      {idx === 0 ? "Tim A: Sarah (Lead MUA)" : "Tim B: Amanda & Nanda"}
                    </span>
                    <span className="text-[11px] font-mono text-indigo-600 font-semibold">
                      Terkunci
                    </span>
                  </div>

                  {/* WhatsApp & Invoice Actions */}
                  <div className="flex items-center gap-2 pt-1">
                    {!evt.isPaid && (
                      <a
                        href="https://wa.me/6281234567890?text=Halo%20Kak%20Rina,%20pengingat%20pelunasan%20WeddOps"
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 h-8 rounded-lg bg-[#25D366] text-white text-[11px] font-semibold flex items-center justify-center gap-1 shadow-2xs hover:bg-[#20ba59] transition"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>Kirim Reminder WA</span>
                      </a>
                    )}
                    <Link
                      href="/invoices"
                      className="px-3 h-8 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 text-[11px] font-medium flex items-center justify-center gap-1 transition"
                    >
                      <Receipt className="h-3 w-3" />
                      <span>Invoice</span>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center space-y-2">
                <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">
                  Tidak Ada Jadwal Bentrok
                </p>
                <p className="text-[11px] text-slate-400">
                  Kedua kuota tim tersedia bebas untuk reservasi baru.
                </p>
                <button
                  type="button"
                  onClick={() => setQuickAddModalOpen(true)}
                  className="mt-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold shadow-2xs"
                >
                  + Buat Booking Tanggal Ini
                </button>
              </div>
            )}
          </div>

          {/* Quick Manual Lock CTA */}
          <div className="pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => toast.info("Slot tanggal berhasil dikunci")}
              className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <Lock className="h-3.5 w-3.5 text-slate-500" />
              <span>Kunci Slot Manual / Tambah Catatan Tanggal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

