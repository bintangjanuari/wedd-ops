"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Check,
  CheckCircle2,
  Store,
  Users,
  CreditCard,
  Building2,
  Clock,
  MapPin,
  Instagram,
  Upload,
  Crop,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Plus,
  Minus,
  MessageCircle,
  Eye,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sparkles,
  Percent,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";
import { StepperProgress } from "@/components/shared/onboarding/StepperProgress";

const availableCategories = [
  { id: "mua", label: "MUA & Rias Pengantin" },
  { id: "kebaya", label: "Busana & Kebaya" },
  { id: "decor", label: "Dekorasi & Pelaminan" },
  { id: "photo", label: "Fotografi & Videografi" },
  { id: "wo", label: "Wedding Organizer" },
  { id: "catering", label: "Catering & Prasmanan" },
];

const availableBanks = [
  { id: "BCA", label: "BCA", sub: "Bank BCA" },
  { id: "Mandiri", label: "MANDIRI", sub: "Bank Mandiri" },
  { id: "BRI", label: "BRI", sub: "Bank BRI" },
  { id: "BNI", label: "BNI", sub: "Bank BNI" },
  { id: "BSI", label: "BSI", sub: "Syariah" },
  { id: "OTHER", label: "Lainnya", sub: "Mitra Bank" },
];

const otherBankOptions = [
  "Bank Jago (Digital Banking)",
  "CIMB Niaga / CIMB Niaga Syariah",
  "Bank Permata",
  "Jenius / Bank BTPN",
  "Seabank Indonesia",
  "Bank Danamon",
  "Bank Panin",
  "BCA Syariah",
];

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // STEP 1 STATE: Identitas Usaha
  const [brandName, setBrandName] = useState("Sanggar Ayu Lestari");
  const [slug, setSlug] = useState("sanggar-ayu-lestari");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "mua",
    "kebaya",
  ]);
  const [selectedCities, setSelectedCities] = useState<string[]>([
    "DKI Jakarta & Jabodetabek (Area Utama)",
    "Bandung & Jawa Barat",
  ]);
  const [studioAddress, setStudioAddress] = useState(
    "Jl. Kemang Selatan No. 14, Jakarta Selatan"
  );
  const [instagramHandle, setInstagramHandle] = useState("sanggarayulestari");
  const [bio, setBio] = useState(
    "Spesialis tata rias pengantin adat tradisional modern (Sunda Siger, Solo Putri) & busana resepsi premium sejak 2018."
  );

  // STEP 2 STATE: Kapasitas & Tim
  const [teamModel, setTeamModel] = useState<"single" | "multi">("multi");
  const [capacity, setCapacity] = useState(2);
  const [teamNames, setTeamNames] = useState<string[]>([
    "Tim A (Utama)",
    "Tim B (Junior Squad)",
  ]);
  const [shifts, setShifts] = useState({
    morning: true,
    afternoon: true,
    night: false,
    fullday: true,
  });

  // STEP 3 STATE: Rekening & Payout
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [otherBankName, setOtherBankName] = useState(otherBankOptions[0]);
  const [accNumber, setAccNumber] = useState("8820192881");
  const [accName, setAccName] = useState("Ayu Lestari");
  const [dpPercentage, setDpPercentage] = useState("30");
  const [repaymentRule, setRepaymentRule] = useState("h-7");
  const [waPic, setWaPic] = useState("812-3456-7890");
  const [autoReminder, setAutoReminder] = useState(true);
  const [showWaPreview, setShowWaPreview] = useState(false);

  // Handlers for Step 1
  const toggleCategory = (catId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(catId) ? prev.filter((id) => id !== catId) : [...prev, catId]
    );
  };

  const removeCity = (city: string) => {
    setSelectedCities((prev) => prev.filter((c) => c !== city));
  };

  const addCity = (newCity: string) => {
    if (newCity && !selectedCities.includes(newCity)) {
      setSelectedCities((prev) => [...prev, newCity]);
      toast.success(`${newCity} ditambahkan ke wilayah operasional`);
    }
  };

  // Handlers for Step 2
  const handleModelChange = (model: "single" | "multi") => {
    setTeamModel(model);
    if (model === "single") {
      setCapacity(1);
      setTeamNames(["Tim Tunggal (Solo)"]);
    } else {
      setCapacity(2);
      setTeamNames(["Tim A (Utama)", "Tim B (Junior Squad)"]);
    }
  };

  const incrementCapacity = () => {
    if (teamModel === "single" || capacity >= 10) return;
    const newCap = capacity + 1;
    setCapacity(newCap);
    setTeamNames((prev) => [
      ...prev,
      `Tim ${String.fromCharCode(64 + newCap)} (Squad ${newCap})`,
    ]);
  };

  const decrementCapacity = () => {
    if (teamModel === "single" || capacity <= 2) return;
    const newCap = capacity - 1;
    setCapacity(newCap);
    setTeamNames((prev) => prev.slice(0, newCap));
  };

  const updateTeamName = (index: number, newName: string) => {
    setTeamNames((prev) => {
      const copy = [...prev];
      copy[index] = newName;
      return copy;
    });
  };

  // Step transitions
  const handleNextFromStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) {
      toast.error("Nama brand usaha wajib diisi");
      return;
    }
    if (selectedCategories.length === 0) {
      toast.error("Pilih minimal 1 kategori layanan pernikahan");
      return;
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNextFromStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFinishOnboarding = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
    toast.success("Setup profil & operasional vendor berhasil diselesaikan!");
    setTimeout(() => {
      router.push("/calendar");
    }, 1200);
  };

  return (
    <div className="w-full pb-16 pt-4">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP STEPPER PROGRESS BAR */}
        <StepperProgress
          currentStep={currentStep}
          onStepClick={(step) => {
            if (step < currentStep) setCurrentStep(step as 1 | 2 | 3);
          }}
          steps={[
            { stepNumber: 1, title: "Identitas Usaha", subtitle: "Langkah 1" },
            { stepNumber: 2, title: "Kapasitas & Kuota", subtitle: "Langkah 2" },
            { stepNumber: 3, title: "Payout & Rekening", subtitle: "Langkah 3" },
          ]}
        />

        {/* ======================================================== */}
        {/* STEP 1: IDENTITAS USAHA & PORTOFOLIO                    */}
        {/* ======================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            {/* Header Title */}
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Store className="h-3.5 w-3.5" />
                <span>Langkah 1 dari 3: Profil Usaha & Portofolio</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Ceritakan Tentang Usaha Pernikahan Anda
              </h1>
              <p className="text-sm text-slate-500">
                Informasi ini akan ditampilkan pada portofolio publik dan faktur resmi yang diterima oleh calon pengantin.
              </p>
            </div>

            {/* Sync Info Banner dari Registrasi */}
            <div className="p-4 rounded-xl bg-indigo-50/70 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold">
                  ✓
                </div>
                <div>
                  <span className="font-semibold text-slate-900">
                    Data Terhubung dari Registrasi:
                  </span>{" "}
                  PIC: <span className="text-indigo-700 font-medium">Sarah Anindita</span> • No. WhatsApp:{" "}
                  <span className="text-indigo-700 font-medium">0812-3456-7890</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] text-indigo-700 font-medium bg-white px-2.5 py-1 rounded-full border border-indigo-200">
                Bisa disesuaikan kapan saja
              </span>
            </div>

            {/* Main Form Bento */}
            <form
              onSubmit={handleNextFromStep1}
              className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-6"
            >
              {/* 1. Logo Profil Sanggar */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-800">
                  Logo atau Foto Profil Sanggar / Usaha
                </label>
                <p className="text-xs text-slate-500">
                  Maks. 2 MB format PNG, JPG, atau WEBP. Bila belum ada logo, sistem otomatis membuat inisial elegan.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="relative shrink-0">
                    <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center font-display text-xl font-bold shadow-xs">
                      AL
                    </div>
                    <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-2 ring-white">
                      ✓
                    </div>
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <button
                        type="button"
                        onClick={() => toast.info("Pilih file gambar logo baru")}
                        className="inline-flex items-center gap-1.5 px-3 h-8 rounded-lg bg-white text-slate-800 text-xs font-semibold border border-slate-200 shadow-2xs hover:bg-slate-50"
                      >
                        <Upload className="h-3.5 w-3.5 text-indigo-600" />
                        Ganti Berkas
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 h-8 rounded-lg bg-white text-slate-600 text-xs border border-slate-200 hover:bg-slate-50"
                      >
                        <Crop className="h-3.5 w-3.5 text-slate-400" />
                        Crop (1:1)
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1 px-2.5 h-8 rounded-lg text-rose-600 text-xs hover:bg-rose-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Hapus
                      </button>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      logo-sanggar-ayulestari-master.png (1.2 MB)
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Nama Brand & Live Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-800" htmlFor="brandName">
                    Nama Resmi Brand / Usaha <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="brandName"
                    type="text"
                    required
                    value={brandName}
                    onChange={(e) => {
                      setBrandName(e.target.value);
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")
                          .replace(/-+/g, "-")
                      );
                    }}
                    className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium focus:bg-white focus:border-indigo-600 outline-none transition"
                  />
                  <p className="text-[11px] text-slate-400">
                    Nama ini digunakan pada kop kwitansi pelunasan dan kartu identitas vendor.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-800" htmlFor="slug">
                      Tautan URL Portofolio Publik <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      ✓ URL Tersedia
                    </span>
                  </div>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-600 transition">
                    <span className="inline-flex items-center px-3 bg-slate-100 text-slate-500 font-mono text-xs select-none border-r border-slate-200">
                      weddops.id/v/
                    </span>
                    <input
                      id="slug"
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="flex-1 h-11 px-3 bg-slate-50 focus:bg-white text-xs font-mono text-slate-900 outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Tautan unik yang dapat dibagikan di bio Instagram & WhatsApp.
                  </p>
                </div>
              </div>

              {/* 3. Kategori Layanan Pernikahan */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-800">
                    Kategori Layanan Pernikahan <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-xs text-indigo-600 font-medium">
                    {selectedCategories.length} Terpilih
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={cn(
                          "min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border",
                          isSelected
                            ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        {isSelected ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600" />
                        ) : (
                          <Plus className="h-3.5 w-3.5 text-slate-400" />
                        )}
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4. Wilayah Layanan Operasional */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-800">
                  Wilayah Layanan Operasional <span className="text-rose-500">*</span>
                </label>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <div className="flex flex-wrap gap-2">
                    {selectedCities.map((city, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-800 text-xs font-medium border border-slate-200 shadow-2xs"
                      >
                        <MapPin className="h-3.5 w-3.5 text-indigo-600" />
                        <span>{city}</span>
                        <button
                          type="button"
                          onClick={() => removeCity(city)}
                          className="hover:text-rose-600 ml-0.5 text-slate-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>

                  {/* Add City Selector */}
                  <div className="pt-1">
                    <select
                      onChange={(e) => {
                        if (e.target.value) {
                          addCity(e.target.value);
                          e.target.value = "";
                        }
                      }}
                      className="text-xs bg-white border border-dashed border-indigo-300 text-indigo-700 font-semibold rounded-full px-3 py-1.5 outline-none cursor-pointer hover:bg-indigo-50"
                      defaultValue=""
                    >
                      <option value="" disabled>
                        + Tambah Kota / Wilayah Lainnya
                      </option>
                      <option value="Surabaya & Jawa Timur">Surabaya & Jawa Timur</option>
                      <option value="Semarang & Jawa Tengah">Semarang & Jawa Tengah</option>
                      <option value="DI Yogyakarta & Sekitarnya">DI Yogyakarta & Sekitarnya</option>
                      <option value="Bali (Denpasar, Badung, Gianyar)">Bali (Denpasar, Badung, Gianyar)</option>
                      <option value="Medan & Sumatera Utara">Medan & Sumatera Utara</option>
                      <option value="Makassar & Sulawesi Selatan">Makassar & Sulawesi Selatan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 4b. Alamat Studio Fisik */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-800" htmlFor="studioAddress">
                  Alamat Studio / Galeri Fisik (Opsional)
                </label>
                <input
                  id="studioAddress"
                  type="text"
                  value={studioAddress}
                  onChange={(e) => setStudioAddress(e.target.value)}
                  placeholder="Gedung / Jalan / Nomor unit studio"
                  className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:bg-white focus:border-indigo-600 outline-none transition"
                />
              </div>

              {/* 5. Instagram & Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-800" htmlFor="instagram">
                    Akun Instagram / Portofolio Digital
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-600 transition">
                    <span className="inline-flex items-center px-3 bg-slate-100 text-slate-500 font-mono text-xs select-none border-r border-slate-200">
                      instagram.com/
                    </span>
                    <input
                      id="instagram"
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      className="flex-1 h-11 px-3 bg-slate-50 focus:bg-white text-xs font-mono text-slate-900 outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                    <span className="text-emerald-600">✓ Portofolio terhubung</span>
                    <a
                      href={`https://instagram.com/${instagramHandle}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-indigo-600 hover:underline flex items-center gap-0.5"
                    >
                      Uji Tautan <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-800" htmlFor="bio">
                      Ringkasan Singkat Layanan (Bio)
                    </label>
                    <span className="text-[11px] text-slate-400 font-mono">{bio.length} / 200</span>
                  </div>
                  <textarea
                    id="bio"
                    rows={3}
                    maxLength={200}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:bg-white focus:border-indigo-600 outline-none resize-none transition"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
                <Link
                  href="/"
                  className="w-full sm:w-auto h-11 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Beranda
                </Link>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
                >
                  <span>Simpan & Lanjut: Kapasitas Tim</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 2: KAPASITAS & KUOTA SLOT TIM                      */}
        {/* ======================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <Users className="h-3.5 w-3.5" />
                <span>Langkah 2 dari 3: Kapasitas & Tim</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Tentukan Kapasitas Tim & Slot Acara
              </h1>
              <p className="text-sm text-slate-500">
                Atur batas maksimum pesanan paralel yang dapat ditangani kru Anda agar sistem mengunci kalender secara otomatis dan mencegah jadwal bentrok.
              </p>
            </div>

            <form
              onSubmit={handleNextFromStep2}
              className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-7"
            >
              {/* 1. Model Operasional Kru: Single Team vs Multi-Team */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-800">
                    Struktur Operasional Kru Lapangan
                  </label>
                  <span className="text-xs text-slate-400">Pilih salah satu model</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Single Team Card */}
                  <div
                    onClick={() => handleModelChange("single")}
                    className={cn(
                      "p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between",
                      teamModel === "single"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/60"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs">
                          <Users className="h-5 w-5" />
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            teamModel === "single"
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300 bg-white"
                          )}
                        >
                          {teamModel === "single" && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900">
                        Single Team
                      </h3>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">
                        Solo Practitioner / Solo MUA
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        Maksimal 1 acara per slot shift. Kalender otomatis terkunci seketika terdapat 1 reservasi aktif untuk mencegah jadwal bentrok.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60">
                      <span className="font-mono text-[11px] text-slate-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block">
                        1 Booking = Kalender Shift Dikunci
                      </span>
                    </div>
                  </div>

                  {/* Multi-Team Card */}
                  <div
                    onClick={() => handleModelChange("multi")}
                    className={cn(
                      "p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between relative",
                      teamModel === "multi"
                        ? "border-indigo-600 bg-indigo-50/40 shadow-xs"
                        : "border-slate-200 bg-slate-50/60 hover:bg-slate-100/60"
                    )}
                  >
                    <div className="absolute -top-3 right-4 bg-amber-400 text-slate-900 font-bold px-2.5 py-0.5 rounded-full text-[10px] shadow-xs flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      <span>Rekomendasi</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-2xs">
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            teamModel === "multi"
                              ? "border-indigo-600 bg-indigo-600 text-white"
                              : "border-slate-300 bg-white"
                          )}
                        >
                          {teamModel === "multi" && <Check className="h-3 w-3" />}
                        </div>
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900">
                        Multi-Team Squad
                      </h3>
                      <p className="text-xs text-indigo-700 font-semibold mt-0.5">
                        Agensi, Studio & Sanggar
                      </p>
                      <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                        2 atau lebih tim bertugas paralel. Sistem membolehkan pemesanan bersamaan hingga kapasitas total kuota harian terpenuhi.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60">
                      <span className="font-mono text-[11px] text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-indigo-200 inline-block font-medium">
                        Mendukung Tim A, Tim B, dst (2 - 10 Kru)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Kapasitas Slot Paralel & Penamaan Kru */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-sm font-bold text-slate-900">
                        Kapasitas Slot Paralel per Hari
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white border border-slate-200 text-slate-700 uppercase">
                        {teamModel === "single" ? "Solo Mode" : "Multi-Team Mode"}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Berapa kru/squad independen yang siap melayani pengantin di tanggal yang sama?
                    </p>
                  </div>

                  {/* Stepper Counter Widget */}
                  <div className="flex items-center bg-white p-1 rounded-xl border border-slate-200 shadow-2xs self-start sm:self-auto">
                    <button
                      type="button"
                      disabled={teamModel === "single" || capacity <= 2}
                      onClick={decrementCapacity}
                      aria-label="Kurangi kapasitas"
                      className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="px-4 text-center min-w-[4.5rem]">
                      <span className="font-display text-lg font-bold text-slate-900 block leading-tight">
                        {capacity}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Kru Paralel
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={teamModel === "single" || capacity >= 10}
                      onClick={incrementCapacity}
                      aria-label="Tambah kapasitas"
                      className="w-9 h-9 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Single Locked Notification Callout */}
                {teamModel === "single" && (
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
                    <Lock className="h-4 w-4 text-amber-700 shrink-0" />
                    <span>
                      <strong>Mode Solo Terkunci (1 Slot):</strong> 1 reservasi mengunci kalender pada shift terkait secara otomatis untuk mencegah bentrok jadwal rias solo.
                    </span>
                  </div>
                )}

                {/* Inline Crew Tag Labels */}
                <div className="space-y-2 pt-2 border-t border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-800">
                      Penamaan Kru / Label Tim Lapangan:
                    </span>
                    <span className="text-[11px] text-slate-400 italic">
                      Dapat diedit sesuai panggilan kru
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {teamNames.map((name, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs"
                      >
                        <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => updateTeamName(idx, e.target.value)}
                          className="flex-1 text-xs font-medium text-slate-800 bg-transparent outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. Shift Waktu Acara yang Didukung */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-800">
                    Shift Waktu Acara yang Didukung
                  </label>
                  <span className="text-xs text-slate-400">Pilih rentang operasional</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition",
                      shifts.morning
                        ? "bg-indigo-50/40 border-indigo-300"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={shifts.morning}
                      onChange={(e) =>
                        setShifts({ ...shifts, morning: e.target.checked })
                      }
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900">
                          Shift Pagi
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Akad / Pemberkatan
                      </span>
                      <span className="font-mono text-[11px] text-slate-700 font-semibold block mt-1 bg-white px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                        06:00 - 12:00 WIB
                      </span>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition",
                      shifts.afternoon
                        ? "bg-indigo-50/40 border-indigo-300"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={shifts.afternoon}
                      onChange={(e) =>
                        setShifts({ ...shifts, afternoon: e.target.checked })
                      }
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900">
                          Shift Siang / Sore
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Resepsi Siang
                      </span>
                      <span className="font-mono text-[11px] text-slate-700 font-semibold block mt-1 bg-white px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                        11:00 - 17:00 WIB
                      </span>
                    </div>
                  </label>

                  <label
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition",
                      shifts.fullday
                        ? "bg-indigo-50/40 border-indigo-300"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={shifts.fullday}
                      onChange={(e) =>
                        setShifts({ ...shifts, fullday: e.target.checked })
                      }
                      className="mt-0.5 rounded text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-900">
                          Full Day
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Akad + Resepsi Malam
                      </span>
                      <span className="font-mono text-[11px] text-slate-700 font-semibold block mt-1 bg-white px-1.5 py-0.5 rounded border border-slate-200 w-fit">
                        06:00 - 22:00 WIB
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full sm:w-auto h-11 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Langkah 1
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 shadow-xs transition active:scale-95"
                >
                  <span>Simpan & Lanjut: Rekening Bank</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ======================================================== */}
        {/* STEP 3: REKENING BANK & NOTIFIKASI PAYOUT               */}
        {/* ======================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold">
                <CreditCard className="h-3.5 w-3.5" />
                <span>Langkah 3 dari 3: Finansial & Notifikasi</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Pengaturan Rekening Bank & WhatsApp Notifikasi
              </h1>
              <p className="text-sm text-slate-500">
                Rekening ini akan dicantumkan secara otomatis pada faktur digital klien, dan WhatsApp akan digunakan untuk mengirim pengingat termin DP otomatis.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 sm:p-8 space-y-7">
              {/* 1. Rekening Bank */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-indigo-600" />
                    <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      1. Rekening Bank Penerimaan Resmi
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-400">Faktur Otomatis</span>
                </div>

                {/* 6 Bank Selector Pills */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Pilih Lembaga Perbankan
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                    {availableBanks.map((bank) => {
                      const isSelected = selectedBank === bank.id;
                      return (
                        <button
                          key={bank.id}
                          type="button"
                          onClick={() => setSelectedBank(bank.id)}
                          className={cn(
                            "p-2.5 rounded-xl text-center transition-all flex flex-col items-center justify-center min-h-[56px] border",
                            isSelected
                              ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-2xs"
                              : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                          )}
                        >
                          <span className="font-mono text-xs font-bold tracking-wider">
                            {bank.label}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5 font-normal">
                            {bank.sub}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Dropdown for Bank Lainnya */}
                  {selectedBank === "OTHER" && (
                    <div className="mt-2.5">
                      <label className="block text-[11px] text-slate-500 mb-1" htmlFor="otherBankSelect">
                        Pilih Lembaga Perbankan Mitra Lainnya:
                      </label>
                      <select
                        id="otherBankSelect"
                        value={otherBankName}
                        onChange={(e) => setOtherBankName(e.target.value)}
                        className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
                      >
                        {otherBankOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Account Number & Account Name Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700" htmlFor="accNumber">
                      Nomor Rekening Bank
                    </label>
                    <input
                      id="accNumber"
                      type="text"
                      inputMode="numeric"
                      value={accNumber}
                      onChange={(e) => setAccNumber(e.target.value.replace(/\D/g, ""))}
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                    />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Hanya angka numerik</span>
                      <span className="text-emerald-600 font-mono font-medium">
                        {accNumber.length} digit valid
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700" htmlFor="accName">
                      Nama Pemilik Rekening
                    </label>
                    <input
                      id="accName"
                      type="text"
                      value={accName}
                      onChange={(e) => setAccName(e.target.value)}
                      placeholder="Nama sesuai buku tabungan"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 focus:bg-white focus:border-indigo-600 outline-none"
                    />
                    <p className="text-[11px] text-slate-400">
                      Sesuai buku tabungan / e-statement resmi
                    </p>
                  </div>
                </div>

                {/* Verified Bank Status Badge */}
                <div className="p-3 bg-emerald-50 rounded-xl flex items-center justify-between border border-emerald-200">
                  <div className="flex items-center gap-2 min-w-0 text-xs">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span className="text-emerald-900 truncate">
                      Terverifikasi otomatis atas nama{" "}
                      <strong className="font-bold text-emerald-950">
                        {accName} ({brandName})
                      </strong>
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800 font-mono text-[10px] font-bold">
                    VALID
                  </span>
                </div>
              </div>

              {/* 2. Kebijakan DP & Pelunasan */}
              <div className="space-y-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Percent className="h-4 w-4 text-indigo-600" />
                    <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      2. Kebijakan Uang Muka (DP) & Pelunasan
                    </h2>
                  </div>
                  <span className="text-[11px] text-slate-400">Slot Lock</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-2">
                    Nilai Minimum DP Pengunci Tanggal
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { val: "20", label: "20%", desc: "Fleksibel" },
                      { val: "30", label: "30%", desc: "Standar Industri" },
                      { val: "50", label: "50%", desc: "Ketat / Peak" },
                      { val: "custom", label: "Nominal Rp", desc: "Kustom" },
                    ].map((dp) => (
                      <button
                        key={dp.val}
                        type="button"
                        onClick={() => setDpPercentage(dp.val)}
                        className={cn(
                          "p-3 rounded-xl flex flex-col items-center justify-center gap-0.5 border transition",
                          dpPercentage === dp.val
                            ? "bg-indigo-50 border-indigo-500 text-indigo-700 font-bold shadow-2xs"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        )}
                      >
                        <span className="font-display text-base font-bold">
                          {dp.label}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {dp.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="repaymentSelect">
                    Aturan Pelunasan Sisa Pembayaran (Termin Akhir)
                  </label>
                  <select
                    id="repaymentSelect"
                    value={repaymentRule}
                    onChange={(e) => setRepaymentRule(e.target.value)}
                    className="w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 outline-none focus:bg-white focus:border-indigo-600"
                  >
                    <option value="h-7">
                      Wajib Lunas H-7 Sebelum Acara (Rekomendasi Utama)
                    </option>
                    <option value="h-3">
                      Wajib Lunas H-3 Sebelum Acara (Jadwal Final Briefing)
                    </option>
                    <option value="h-1">
                      Wajib Lunas H-1 Sebelum Acara (Sebelum Berangkat ke Lokasi)
                    </option>
                    <option value="h-0">
                      Hari-H di Lokasi Acara (Khusus Katering & Dekorasi)
                    </option>
                  </select>
                </div>
              </div>

              {/* 3. WhatsApp Integrasi */}
              <div className="space-y-4 pt-4 border-t border-slate-200/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-[#25D366]" />
                    <h2 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      3. Integrasi WhatsApp & Gateway Notifikasi
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#25D366]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                    Live Link
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700" htmlFor="waPicInput">
                    Nomor WhatsApp PIC / Koordinator Operasional
                  </label>
                  <div className="flex rounded-xl overflow-hidden border border-slate-200 focus-within:border-indigo-600 transition">
                    <div className="flex items-center gap-1 px-3 bg-slate-100 text-slate-700 text-xs font-semibold select-none border-r border-slate-200">
                      <span>🇮🇩</span>
                      <span className="font-mono">+62</span>
                    </div>
                    <input
                      id="waPicInput"
                      type="tel"
                      value={waPic}
                      onChange={(e) => setWaPic(e.target.value)}
                      className="flex-1 h-11 px-3.5 bg-slate-50 focus:bg-white text-xs font-mono text-slate-900 outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Nomor ini terhubung sebagai hotline pengirim pesan konfirmasi resmi.
                  </p>
                </div>

                {/* WhatsApp Auto-reminder Switch */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-slate-900">
                      Kirim otomatis pengingat tagihan termin H-7 dan H-3 ke pengantin
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Mencegah keterlambatan pembayaran tanpa perlu menagih secara manual dan canggung.
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowWaPreview(true)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 pt-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Lihat Contoh Pesan WhatsApp Resmi</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={autoReminder}
                    onClick={() => setAutoReminder(!autoReminder)}
                    className={cn(
                      "shrink-0 w-11 h-6 rounded-full transition-colors relative focus:outline-none",
                      autoReminder ? "bg-[#25D366]" : "bg-slate-300"
                    )}
                  >
                    <span
                      className={cn(
                        "block w-5 h-5 bg-white rounded-full shadow-xs transform transition-transform",
                        autoReminder ? "translate-x-5" : "translate-x-0.5"
                      )}
                    />
                  </button>
                </div>
              </div>

              {/* Action Buttons & Fallback link */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full sm:w-auto h-11 px-4 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5 transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Langkah 2
                </button>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleFinishOnboarding}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 underline underline-offset-4"
                  >
                    Atur Rekening Nanti di Pengaturan
                  </button>

                  <button
                    type="button"
                    onClick={handleFinishOnboarding}
                    className="w-full sm:w-auto h-11 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition active:scale-95"
                  >
                    <span>Selesaikan Setup & Buka Dashboard</span>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL PREVIEW PESAN WHATSAPP OTOMATIS */}
      {showWaPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div className="bg-[#075E54] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
                  WO
                </div>
                <div>
                  <h3 className="font-semibold text-sm">WeddOps Official Notification</h3>
                  <p className="text-[11px] text-emerald-200">Terverifikasi WhatsApp Business</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowWaPreview(false)}
                className="text-white/80 hover:text-white text-lg font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-[#ECE5DD] space-y-3 font-sans text-xs text-slate-800 leading-relaxed max-h-[70vh] overflow-y-auto">
              <div className="bg-white p-3.5 rounded-xl shadow-xs space-y-2 border border-slate-200/50">
                <p>
                  Halo Kak <strong>Rina & Budi</strong>,
                </p>
                <p>
                  Semoga persiapan acara pernikahannya berjalan lancar! Kami dari{" "}
                  <strong>{brandName}</strong> ingin menginformasikan pengingat jatuh tempo pembayaran termin kedua (Pelunasan) sebesar{" "}
                  <strong>Rp 7.500.000</strong> dengan tenggat waktu <strong>H-7 (17 Nov 2026)</strong>.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1 font-mono text-[11px]">
                  <div>Bank: <strong>{selectedBank}</strong></div>
                  <div>No. Rek: <strong>{accNumber}</strong></div>
                  <div>Atas Nama: <strong>{accName}</strong></div>
                </div>
                <p>
                  Lihat rincian faktur digital dan unggah bukti transfer secara aman di:
                </p>
                <div className="text-indigo-600 font-mono text-[11px] underline">
                  https://weddops.id/i/inv-2026-004-token
                </div>
                <p className="text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  Pesan otomatis terenkripsi oleh sistem WeddOps. Terima kasih!
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 flex justify-end">
              <button
                type="button"
                onClick={() => setShowWaPreview(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

