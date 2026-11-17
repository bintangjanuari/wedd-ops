"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Search,
  Filter,
  Plus,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  Phone,
  FileText,
  Printer,
  ChevronDown,
  Navigation,
  FolderOpen,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";
import { DossierChecklist, ChecklistItem } from "@/components/shared/client/DossierChecklist";
import { CrewAssignmentBadge } from "@/components/shared/client/CrewAssignmentBadge";
import { PageHeader } from "@/components/shared/layout/PageHeader";
import { MetricKpiCard } from "@/components/shared/kpi/MetricKpiCard";
import { useUiStore } from "@/stores/use-ui-store";

interface ClientEventRecord {
  id: string;
  clientName: string;
  clientInitials: string;
  clientPhone: string;
  eventDate: string;
  venueName: string;
  packageName: string;
  teamLabel: string;
  stage: "prospect" | "dp" | "ready" | "done";
  stageLabel: string;
  stageBadgeClass: string;
  invoiceCode: string;
  dpPaid: number;
  remainingDue: number;
  totalContract: number;
  picWO: string;
  picWOPhone: string;
  standbyTime: string;
  checklist: ChecklistItem[];
}

const mockClients: ClientEventRecord[] = [
  {
    id: "cl-1",
    clientName: "Rina & Budi",
    clientInitials: "RB",
    clientPhone: "+62 812-3456-7890",
    eventDate: "Sabtu, 14 Nov 2026",
    venueName: "Gedung Sasana Kriya, TMII",
    packageName: "Akad + Resepsi Premium",
    teamLabel: "Tim A: Lead Sarah",
    stage: "dp",
    stageLabel: "H-3 (Tunggu Pelunasan)",
    stageBadgeClass: "bg-amber-50 text-amber-800 border-amber-200",
    invoiceCode: "INV/202611/041",
    dpPaid: 5000000,
    remainingDue: 3000000,
    totalContract: 8000000,
    picWO: "Kak Dimas WO",
    picWOPhone: "+62 812-9999-1111",
    standbyTime: "04:00 WIB",
    checklist: [
      { id: "c1", label: "Kunci Slot Kalender & Terima DP Awal", subtext: "DP Rp 5.000.000 Terverifikasi", isDone: true },
      { id: "c2", label: "Konfirmasi Moodboard Kebaya & Siger", subtext: "PDF Desain disetujui", isDone: true },
      { id: "c3", label: "Penugasan Kru Lapangan (Tim A)", subtext: "Kak Sarah + 2 Asisten", isDone: true },
      { id: "c4", label: "Verifikasi Pelunasan H-3", subtext: "Sisa tagihan Rp 3.000.000", isDone: false },
      { id: "c5", label: "Packing Kotak Kosmetik & Surat Jalan Kru", subtext: "Pengecekan H-1", isDone: false },
    ],
  },
  {
    id: "cl-2",
    clientName: "Dinda & Rama",
    clientInitials: "DR",
    clientPhone: "+62 811-9876-5432",
    eventDate: "Minggu, 15 Nov 2026",
    venueName: "Hotel Mulia Senayan",
    packageName: "Paket Resepsi Glamour",
    teamLabel: "Tim B: Amanda & Nanda",
    stage: "ready",
    stageLabel: "100% Siap Hari-H (Lunas)",
    stageBadgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
    invoiceCode: "INV/202611/039",
    dpPaid: 12000000,
    remainingDue: 0,
    totalContract: 12000000,
    picWO: "Ibu Maya (Wedding Planner)",
    picWOPhone: "+62 813-8888-2222",
    standbyTime: "14:00 WIB",
    checklist: [
      { id: "c1", label: "Kunci Slot Kalender & DP", isDone: true },
      { id: "c2", label: "Fitting Gaun & Moodboard", isDone: true },
      { id: "c3", label: "Penugasan Kru (Tim B)", isDone: true },
      { id: "c4", label: "Pelunasan Tagihan Penuh", isDone: true },
      { id: "c5", label: "Packing & Briefing Hari-H", isDone: true },
    ],
  },
  {
    id: "cl-3",
    clientName: "Tasya & Fajar",
    clientInitials: "TF",
    clientPhone: "+62 813-2233-4455",
    eventDate: "Jumat, 20 Nov 2026",
    venueName: "Masjid Al-Bina Senayan",
    packageName: "Paket Diamond MUA",
    teamLabel: "Tim A: Lead Sarah",
    stage: "dp",
    stageLabel: "Selesai Fitting & Moodboard",
    stageBadgeClass: "bg-indigo-50 text-indigo-700 border-indigo-200",
    invoiceCode: "INV/202611/038",
    dpPaid: 7500000,
    remainingDue: 0,
    totalContract: 7500000,
    picWO: "Mas Farhan",
    picWOPhone: "+62 812-7777-3333",
    standbyTime: "05:00 WIB",
    checklist: [
      { id: "c1", label: "Kunci Slot Kalender & DP", isDone: true },
      { id: "c2", label: "Moodboard Hijab & Melati", isDone: true },
      { id: "c3", label: "Penugasan Kru (Tim A)", isDone: true },
      { id: "c4", label: "Pelunasan H-7", isDone: true },
      { id: "c5", label: "Final Recheck", isDone: false },
    ],
  },
  {
    id: "cl-4",
    clientName: "Sarah Jenkins",
    clientInitials: "SJ",
    clientPhone: "+62 812-8899-0011",
    eventDate: "Sabtu, 15 Des 2026",
    venueName: "Hotel Mulia Senayan",
    packageName: "Paket Luxury MUA",
    teamLabel: "Tim A: Lead Sarah",
    stage: "dp",
    stageLabel: "Booking Terkunci (DP 31%)",
    stageBadgeClass: "bg-purple-50 text-purple-800 border-purple-200",
    invoiceCode: "INV/202611/042",
    dpPaid: 3000000,
    remainingDue: 6700000,
    totalContract: 9700000,
    picWO: "WO Glamour",
    picWOPhone: "+62 811-6666-4444",
    standbyTime: "06:00 WIB",
    checklist: [
      { id: "c1", label: "Kunci Slot & DP Awal", isDone: true },
      { id: "c2", label: "Jadwal Fitting Gaun Pengantin", isDone: false },
      { id: "c3", label: "Penugasan Kru", isDone: true },
      { id: "c4", label: "Pelunasan H-7 (08 Des)", isDone: false },
      { id: "c5", label: "Hari-H Execution", isDone: false },
    ],
  },
  {
    id: "cl-5",
    clientName: "Nadia & Kevin",
    clientInitials: "NK",
    clientPhone: "+62 817-5566-7788",
    eventDate: "Sabtu, 28 Nov 2026 (Tentatif)",
    venueName: "Belum Pilih Gedung",
    packageName: "Tanya Paket Rias + Adat",
    teamLabel: "Belum Plot Tim",
    stage: "prospect",
    stageLabel: "Prospek Baru • Belum DP",
    stageBadgeClass: "bg-orange-50 text-orange-800 border-orange-200",
    invoiceCode: "Belum Terbit",
    dpPaid: 0,
    remainingDue: 0,
    totalContract: 0,
    picWO: "Belum Ada",
    picWOPhone: "-",
    standbyTime: "Tentatif",
    checklist: [
      { id: "c1", label: "Follow-up Konsultasi WhatsApp", isDone: true },
      { id: "c2", label: "Kirim E-Proposal & Rincian Harga", isDone: true },
      { id: "c3", label: "Menunggu Keputusan Tanggal & DP", isDone: false },
    ],
  },
];

export default function ClientsEventsPage() {
  const [selectedClientId, setSelectedClientId] = useState("cl-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [stageFilter, setStageFilter] = useState<"all" | "prospect" | "dp" | "ready" | "done">("all");
  const setQuickAddModalOpen = useUiStore((state) => state.setQuickAddModalOpen);

  const selectedClient =
    mockClients.find((c) => c.id === selectedClientId) || mockClients[0];

  const handleToggleChecklist = (itemId: string) => {
    toast.info("Status checklist diperbarui");
  };

  const filteredClients = mockClients.filter((cl) => {
    const matchesSearch =
      cl.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cl.venueName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cl.clientPhone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (stageFilter === "all") return true;
    return cl.stage === stageFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. HEADER SECTION */}
      <PageHeader
        category={
          <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px] uppercase tracking-wider font-semibold">
            <span>Operasional</span>
            <span>&gt;</span>
            <span className="text-indigo-600">Database Pengantin & Kru</span>
          </div>
        }
        title="Manajemen Klien & Kesiapan Acara"
        description="Pantau tahapan prospek pengantin, rincian paket layanan, penugasan kru lapangan, dan checklist hari-H."
        actions={
          <button
            type="button"
            onClick={() => setQuickAddModalOpen(true)}
            className="h-10 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-xs flex items-center gap-2 transition active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Tambah Klien Baru</span>
          </button>
        }
      />

      {/* 2. TOP 4 KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <MetricKpiCard
          title="Total Klien Acara"
          value="24 Pasangan"
          icon={<Users className="h-4 w-4 text-indigo-600" />}
          subtext="18 Aktif • 6 Selesai"
        />

        <MetricKpiCard
          title="Prospek Baru"
          value="4 Calon Klien"
          icon={<span className="w-2 h-2 rounded-full bg-amber-500" />}
          badge={{ text: "Perlu Follow-up Quote", variant: "warning" }}
        />

        <MetricKpiCard
          title="Persiapan Hari-H"
          value="12 Terjadwal"
          icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
          badge={{ text: "Kru Sudah Ditugaskan", variant: "success" }}
        />

        <MetricKpiCard
          title="Acara Pekan Ini"
          value="2 Wedding"
          icon={<Clock className="h-4 w-4 text-rose-600" />}
          badge={{ text: "14 Nov & 15 Nov", variant: "neutral" }}
        />
      </div>

      {/* 3. FILTER, SEARCH & STATUS TABS */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Search */}
          <div className="relative min-w-[260px] sm:w-80">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama pasangan, gedung, nomor WA..."
              className="w-full h-10 pl-9 pr-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: "all", label: "Semua (24)" },
              { id: "prospect", label: "Prospek Chat (4)" },
              { id: "dp", label: "Sudah DP (12)" },
              { id: "ready", label: "Siap Hari-H (2)" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStageFilter(tab.id as any)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition",
                  stageFilter === tab.id
                    ? "bg-indigo-50 text-indigo-700 shadow-2xs border border-indigo-200"
                    : "text-slate-600 hover:bg-slate-100"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Menampilkan {filteredClients.length} klien
        </div>
      </div>

      {/* 4. SPLIT WORKSPACE: CLIENTS TABLE (65%) + DOSSIER (35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: CLIENTS & EVENTS TABLE (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-100">
            <div>
              <h2 className="font-display text-base font-bold text-slate-900">
                Jadwal Acara & Kesiapan
              </h2>
              <p className="text-xs text-slate-500">
                Klik salah satu baris pengantin untuk membuka berkas operasional acara di samping.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-mono text-slate-600 font-bold">
              {filteredClients.length} Ditampilkan
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                  <th className="py-3 px-4 font-bold">Pasangan & Kontak</th>
                  <th className="py-3 px-4 font-bold">Tanggal & Venue</th>
                  <th className="py-3 px-4 font-bold">Paket & Tim Kru</th>
                  <th className="py-3 px-4 font-bold">Tahap Operasional</th>
                  <th className="py-3 px-4 font-bold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredClients.map((client) => {
                  const isSelected = client.id === selectedClientId;
                  return (
                    <tr
                      key={client.id}
                      onClick={() => setSelectedClientId(client.id)}
                      className={cn(
                        "cursor-pointer transition-colors",
                        isSelected
                          ? "bg-indigo-50/70 border-l-4 border-l-indigo-600"
                          : "hover:bg-slate-50"
                      )}
                    >
                      {/* Col 1 */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                              isSelected
                                ? "bg-indigo-600 text-white shadow-xs"
                                : "bg-slate-100 text-slate-700"
                            )}
                          >
                            {client.clientInitials}
                          </div>
                          <div>
                            <div className="font-display text-sm font-bold text-slate-900">
                              {client.clientName}
                            </div>
                            <div className="font-mono text-[11px] text-slate-400">
                              {client.clientPhone}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Col 2 */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900">{client.eventDate}</div>
                        <div className="text-[11px] text-slate-500 truncate max-w-[140px]">
                          {client.venueName}
                        </div>
                      </td>

                      {/* Col 3 */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-900">{client.packageName}</div>
                        <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {client.teamLabel}
                        </span>
                      </td>

                      {/* Col 4 */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border",
                            client.stageBadgeClass
                          )}
                        >
                          <span>{client.stageLabel}</span>
                        </span>
                      </td>

                      {/* Col 5 */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <a
                            href={`https://wa.me/${client.clientPhone.replace(/\D/g, "")}`}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#25D366] flex items-center justify-center transition"
                            title="WhatsApp"
                          >
                            <MessageCircle className="h-4 w-4" />
                          </a>
                          <button
                            type="button"
                            className="w-8 h-8 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-600 flex items-center justify-center transition"
                            title="Lembar Kerja"
                          >
                            <FileText className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT: SELECTED EVENT OPERATIONAL DOSSIER (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 sticky top-20">
          {/* Header */}
          <div className="p-4 bg-slate-50/70 border-b border-slate-100 space-y-2 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-indigo-600 font-mono text-[11px] uppercase tracking-wider font-bold">
                <FolderOpen className="h-4 w-4" />
                <span>Berkas Operasional Acara</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                Booked
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-slate-900">
                {selectedClient.clientName}
              </h3>
              <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                <Clock className="h-3.5 w-3.5 text-indigo-600" />
                <span>{selectedClient.eventDate} • Standby {selectedClient.standbyTime}</span>
              </p>
            </div>

            <div className="pt-1">
              <span className="font-mono text-[11px] text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200 block shadow-2xs">
                {selectedClient.invoiceCode} (DP Rp 5jt • Sisa Rp 3jt)
              </span>
            </div>
          </div>

          <div className="px-4 pb-4 space-y-4">
            {/* Section 1: Lokasi & PIC WO */}
            <div className="space-y-1.5">
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                1. Koordinasi Lokasi & PIC
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Gedung / Venue:</div>
                  <div className="font-semibold text-slate-900">{selectedClient.venueName}</div>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedClient.venueName)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-indigo-600 hover:underline text-[11px] font-medium mt-0.5"
                  >
                    <Navigation className="h-3 w-3" /> Buka Google Maps
                  </a>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
                  <div>
                    <div className="text-slate-400 text-[11px]">PIC WO / Lapangan:</div>
                    <div className="font-semibold text-slate-800">{selectedClient.picWO}</div>
                  </div>
                  {selectedClient.picWOPhone !== "-" && (
                    <a
                      href={`https://wa.me/${selectedClient.picWOPhone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-bold"
                    >
                      <Phone className="h-3 w-3" />
                      <span>Kontak</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Rincian Layanan & Addon */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  2. Rincian Paket Layanan
                </h4>
                <span className="font-mono text-xs font-bold text-indigo-700">
                  {formatIDR(selectedClient.totalContract || 11000000)}
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{selectedClient.packageName}</p>
                    <p className="text-[10px] text-slate-400">Adat Sunda Siger, 2x retouch</p>
                  </div>
                  <span className="font-mono font-bold text-slate-700">Rp 8.000.000</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Melati Segar Pagi Kualitas Utama</p>
                    <p className="text-[10px] text-slate-400">2 Set Ronce Melati</p>
                  </div>
                  <span className="font-mono font-bold text-slate-700">Rp 600.000</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">Rias Ibu Pengantin & Pagar Ayu</p>
                    <p className="text-[10px] text-slate-400">2 Ibu & 4 Pagar Ayu</p>
                  </div>
                  <span className="font-mono font-bold text-slate-700">Rp 2.400.000</span>
                </div>
              </div>
            </div>

            {/* Section 3: Checklist Hari-H using DossierChecklist */}
            <div className="pt-1">
              <DossierChecklist
                items={selectedClient.checklist}
                onToggleItem={handleToggleChecklist}
              />
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={`https://wa.me/${selectedClient.clientPhone.replace(/\D/g, "")}?text=Halo%20Kak%20${encodeURIComponent(selectedClient.clientName)},%20kami%20dari%20Sanggar%20Ayu%20Lestari%20ingin%20mengonfirmasi%20kesiapan%20acara.`}
                target="_blank"
                rel="noreferrer"
                className="w-full h-10 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-2xs transition"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat WhatsApp Pengantin</span>
              </a>

              <button
                type="button"
                onClick={() => toast.success("Menyiapkan lembar kerja cetak surat tugas kru...")}
                className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <Printer className="h-4 w-4 text-slate-500" />
                <span>Cetak Lembar Kerja Surat Tugas Kru</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

