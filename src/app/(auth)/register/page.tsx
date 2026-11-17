"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Store,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  Receipt,
  Globe,
  Star,
  CheckCircle2,
  ShieldCheck,
  Paintbrush,
  Sparkles,
  Camera,
  ClipboardList,
  UtensilsCrossed,
  Link as LinkIcon,
} from "lucide-react";
import { toast } from "sonner";

const categories = [
  { id: "mua", label: "MUA & Rias", icon: Paintbrush },
  { id: "decor", label: "Dekorasi & Pelaminan", icon: Sparkles },
  { id: "photo", label: "Fotografi & Video", icon: Camera },
  { id: "wo", label: "Wedding Organizer", icon: ClipboardList },
  { id: "catering", label: "Catering", icon: UtensilsCrossed },
];

export default function RegisterPage() {
  const router = useRouter();

  // Form states
  const [picName, setPicName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [category, setCategory] = useState("mua");
  const [waNumber, setWaNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Computed slug preview
  const slug = businessName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  // Password strength calculation
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0 - 4
  };

  const strengthScore = getPasswordStrength();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      toast.error("Harap setujui Ketentuan Layanan dan Kebijakan Privasi");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Pendaftaran berhasil! Selamat datang di WeddOps.");
      router.push("/calendar");
    }, 900);
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row bg-white">
      {/* LEFT COLUMN: Authority, Social Proof & Features */}
      <div className="w-full lg:w-1/2 bg-[#0F172A] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        {/* Glow Decorators */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        {/* Top Section */}
        <div className="relative z-10 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-indigo-200 w-fit backdrop-blur-md">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-wide">
              Uji Coba Gratis 14 Hari Tanpa Kartu Kredit
            </span>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[34px] font-bold text-white tracking-tight leading-tight lg:leading-[42px]">
              Mulai Lindungi Jadwal & Otomasi Tagihan DP Vendor Anda Sekarang.
            </h1>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed">
              Sistem operasional pintar berstandar modern untuk studio, sanggar, & profesional pernikahan di Indonesia.
            </p>
          </div>

          {/* 3 Feature Pillars */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">Anti Double-Booking Real-Time</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold">
                    Otomatis
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-normal">
                  Kalender mengunci otomatis saat kapasitas slot harian penuh, mencegah jadwal bentrok antar kru secara instan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                <Receipt className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Kirim Invoice & Kwitansi Instan</span>
                <p className="text-xs text-slate-300 mt-1 leading-normal">
                  Buat invoice profesional dalam 30 detik siap kirim via WhatsApp lengkap dengan split DP dan rekening tujuan.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.05] border border-white/5 backdrop-blur-sm transition-all hover:bg-white/[0.08]">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/30 text-indigo-300 flex items-center justify-center shrink-0 shadow-md">
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Portofolio Publik & Cek Slot Calon Pengantin</span>
                <p className="text-xs text-slate-300 mt-1 leading-normal">
                  Link khusus <span className="font-mono text-amber-300">weddops.id/v/nama-sanggar</span> siap dibagikan ke calon pengantin untuk cek ketersediaan mandiri.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Social Proof */}
        <div className="relative z-10 pt-8 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3 overflow-hidden">
              <div className="h-10 w-10 rounded-full bg-indigo-500 ring-2 ring-[#0F172A] flex items-center justify-center text-xs font-bold text-white">
                SA
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-500 ring-2 ring-[#0F172A] flex items-center justify-center text-xs font-bold text-white">
                DP
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-500 ring-2 ring-[#0F172A] flex items-center justify-center text-xs font-bold text-white">
                RM
              </div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-white text-xs font-bold ring-2 ring-[#0F172A] shadow-md">
                +480
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white">480+ Vendor Bergabung</span>
              <span className="text-xs text-slate-400">MUA, Dekorasi, & Dokumentasi</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[#FBBF24]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
            ))}
            <span className="text-xs text-slate-200 ml-1 font-semibold">4.9/5</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Vendor Registration Form */}
      <div className="w-full lg:w-1/2 bg-white p-6 sm:p-10 lg:p-14 flex items-center justify-center">
        <div className="w-full max-w-lg flex flex-col space-y-6">
          {/* Header */}
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Buat Akun Vendor Baru
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Daftar dalam 1 menit dan nikmati manajemen jadwal tanpa ribet.
            </p>
          </div>

          {/* Google Quick Sign-Up */}
          <button
            type="button"
            onClick={() => toast.info("Mengalihkan ke pendaftaran Google...")}
            className="w-full h-11 flex items-center justify-center gap-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200 shadow-2xs text-slate-800 text-xs sm:text-sm font-semibold active:scale-[0.99]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Daftar dengan Akun Google</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="w-full h-px bg-slate-200" />
            <span className="absolute bg-white px-3 text-[11px] font-mono uppercase text-slate-400 font-medium tracking-wider">
              Atau Daftar dengan Email Bisnis
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Field: PIC Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between" htmlFor="pic-name">
                <span>Nama Lengkap Pemilik / PIC</span>
                <span className="text-[11px] text-slate-400 font-normal">Wajib</span>
              </label>
              <div className="relative rounded-xl border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <User className="absolute left-3.5 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                <input
                  id="pic-name"
                  type="text"
                  required
                  value={picName}
                  onChange={(e) => setPicName(e.target.value)}
                  placeholder="Sarah Anindita"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Field: Business Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between" htmlFor="business-email">
                <span>Email Bisnis Vendor</span>
                <span className="text-[11px] text-slate-400 font-normal">Wajib</span>
              </label>
              <div className="relative rounded-xl border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Mail className="absolute left-3.5 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                <input
                  id="business-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@sanggarayu.id"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Field: Business Name & Live Slug Preview */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between" htmlFor="business-name">
                <span>Nama Bisnis / Sanggar / Vendor</span>
                <span className="text-[11px] text-slate-400 font-normal">Untuk Tautan Portofolio</span>
              </label>
              <div className="relative rounded-xl border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Store className="absolute left-3.5 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                <input
                  id="business-name"
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Sanggar Ayu Lestari"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>

              {/* Dynamic URL Slug preview */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 truncate">
                  <LinkIcon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    Preview URL: <span className="font-mono text-indigo-600 font-medium">weddops.com/v/{slug || "nama-vendor"}</span>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold shrink-0">
                  <CheckCircle2 className="h-3 w-3" />
                  Slug Tersedia
                </span>
              </div>
            </div>

            {/* Field: Category Pills */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-700">
                Kategori Usaha Vendor
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = category === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border select-none cursor-pointer ${
                        isSelected
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field: WhatsApp Number */}
            <div className="space-y-1.5 pt-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center justify-between" htmlFor="wa-number">
                <span>Nomor WhatsApp Aktif</span>
                <span className="text-[11px] text-slate-400 font-normal">Untuk Notifikasi & OTP</span>
              </label>
              <div className="relative flex items-center rounded-xl border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <div className="absolute left-3 flex items-center gap-1.5 pointer-events-none select-none text-xs font-semibold text-slate-600 border-r border-slate-200 pr-2">
                  <span className="text-sm">🇮🇩</span>
                  <span className="font-mono">+62</span>
                </div>
                <input
                  id="wa-number"
                  type="tel"
                  required
                  value={waNumber}
                  onChange={(e) => setWaNumber(e.target.value)}
                  placeholder="812-3456-7890"
                  className="w-full h-11 pl-20 pr-3 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Format contoh: 812-3456-7890 (tanpa angka 0 di depan).
              </p>
            </div>

            {/* Field: Password with Strength Meter */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <label htmlFor="password">Kata Sandi</label>
                <span className="text-[11px] text-slate-400 font-normal">
                  {strengthScore <= 1 && "Terlalu pendek"}
                  {strengthScore === 2 && "Cukup"}
                  {strengthScore === 3 && "Kuat"}
                  {strengthScore === 4 && "Sangat Kuat"}
                </span>
              </div>
              <div className="relative rounded-xl border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <Lock className="absolute left-3.5 top-3.5 text-slate-400 h-4 w-4 pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan sandi"
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength Bars */}
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5 flex gap-1">
                <div
                  className={`h-full w-1/4 rounded-full transition-all ${
                    strengthScore >= 1 ? (strengthScore === 1 ? "bg-rose-500" : "bg-emerald-500") : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-full w-1/4 rounded-full transition-all ${
                    strengthScore >= 2 ? (strengthScore === 2 ? "bg-amber-500" : "bg-emerald-500") : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-full w-1/4 rounded-full transition-all ${
                    strengthScore >= 3 ? "bg-emerald-500" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-full w-1/4 rounded-full transition-all ${
                    strengthScore >= 4 ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                />
              </div>
            </div>

            {/* Terms and Privacy Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                id="terms"
                type="checkbox"
                required
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 select-none leading-relaxed">
                Saya menyetujui{" "}
                <a href="#" className="text-indigo-600 hover:underline font-semibold">
                  Ketentuan Layanan
                </a>{" "}
                dan{" "}
                <a href="#" className="text-indigo-600 hover:underline font-semibold">
                  Kebijakan Privasi
                </a>{" "}
                WeddOps.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? "Membuat Akun..." : "Daftar & Mulai Atur Jadwal"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Footer Redirection to Login */}
          <div className="pt-2 text-center space-y-4">
            <p className="text-xs sm:text-sm text-slate-600">
              Sudah memiliki akun vendor?{" "}
              <Link
                href="/login"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline inline-flex items-center gap-0.5"
              >
                <span>Masuk di Sini</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </p>

            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Enkripsi SSL 256-bit</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Lock className="h-3.5 w-3.5 text-indigo-600" />
                <span>Data Vendor Terlindungi</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

