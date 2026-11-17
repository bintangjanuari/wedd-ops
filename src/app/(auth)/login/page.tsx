"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Calendar,
  MessageCircle,
  Smartphone,
  Star,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Harap isi email dan kata sandi");
      return;
    }

    setIsLoading(true);
    // Simulasi autentikasi vendor
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Berhasil masuk! Mengalihkan ke dashboard...");
      router.push("/calendar");
    }, 800);
  };

  const handleGoogleLogin = () => {
    toast.info("Mengalihkan ke autentikasi Google...");
  };

  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row bg-white">
      {/* LEFT COLUMN: Luxury Editorial & Social Proof (Dark Slate #0F172A) */}
      <div className="w-full lg:w-1/2 relative bg-[#0F172A] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-[30rem] h-[30rem] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Badge & Tagline */}
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-indigo-200 uppercase">
              Platform Operasional Vendor Acara #1 di Indonesia
            </span>
          </div>

          <div className="max-w-xl pt-2">
            <p className="font-mono text-xs uppercase tracking-widest text-[#FCD34D] mb-3">
              WeddOps Operational OS
            </p>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-[34px] font-bold text-white tracking-tight leading-tight lg:leading-[42px]">
              Solusi Manajemen Slot Jadwal & Invoice Anti-Bentrok untuk Vendor Pernikahan & Event.
            </h1>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Menghubungkan kalender jadwal fotografer, tata rias, dan dekorasi dengan sistem pembayaran otomatis dalam satu ruang kerja cerdas.
            </p>
          </div>
        </div>

        {/* Middle: Editorial Testimonial Card */}
        <div className="relative z-10 my-8 space-y-6">
          <div className="rounded-2xl p-6 sm:p-7 bg-white/[0.07] backdrop-blur-lg border border-white/10 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-1 text-[#FBBF24]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
                <span className="ml-2 font-mono text-xs text-white font-semibold">5.0</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span className="text-xs font-semibold">Vendor Terverifikasi</span>
              </div>
            </div>

            <blockquote className="text-sm sm:text-base text-slate-100 italic leading-relaxed">
              “Sistem yang menyelamatkan sanggar rias kami dari double booking dan tagihan DP yang sering macet. Klien langsung percaya saat terima slip digital profesional.”
            </blockquote>

            <div className="mt-5 flex items-center gap-3.5 pt-4 border-t border-white/10">
              <div className="h-11 w-11 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm shadow-md border-2 border-white/20">
                SA
              </div>
              <div>
                <div className="font-display text-sm font-bold text-white">Sarah Anindita</div>
                <div className="text-xs text-slate-300">
                  Founder Sanggar Ayu Lestari • MUA & Wedding Specialist
                </div>
              </div>
            </div>
          </div>

          {/* Mini Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                <Calendar className="h-4 w-4" />
              </div>
              <span className="text-xs text-slate-200 font-medium">100% Slot Calendar Safe</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#25D366]/20 text-[#25D366] flex items-center justify-center shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs text-slate-200 font-medium">DP Otomatis via WhatsApp</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <Smartphone className="h-4 w-4" />
              </div>
              <span className="text-xs text-slate-200 font-medium">Mobile-First Lapangan</span>
            </div>
          </div>
        </div>

        {/* Bottom Operational Metrics */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between text-slate-400 gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <RefreshCw className="h-3.5 w-3.5 text-emerald-400 animate-spin" style={{ animationDuration: "6s" }} />
            <span className="text-slate-300">Sync Engine v2.4 Active</span>
          </div>
          <div>
            <span className="text-emerald-400 font-semibold">&gt; 24.800+</span> Jadwal Terkunci Tanpa Konflik
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Clean Auth Credentials Form */}
      <div className="w-full lg:w-1/2 bg-slate-50/70 flex flex-col justify-center items-center px-6 py-12 sm:px-12 lg:px-20">
        <div className="w-full max-w-[440px] space-y-7">
          {/* Header */}
          <div className="space-y-2">
            <div className="inline-flex lg:hidden items-center gap-2 px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>WeddOps Indonesia</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Masuk ke Dashboard
            </h2>
            <p className="text-sm text-slate-500">
              Kelola jadwal, tim lapangan, dan tagihan DP tanpa khawatir bentrok.
            </p>
          </div>

          {/* Social Auth: Google */}
          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full h-11 px-4 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-3 transition-all border border-slate-200 shadow-2xs active:scale-[0.99]"
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
              <span>Lanjutkan dengan Google</span>
            </button>

            {/* Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
              <span className="absolute px-3 bg-slate-50/70 font-mono text-[11px] tracking-wider uppercase text-slate-400 font-medium">
                Atau Masuk dengan Email
              </span>
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Field: Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700" htmlFor="email">
                Email Bisnis Vendor
              </label>
              <div className="relative rounded-xl bg-white border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sarah@sanggarrias.id"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
              </div>
            </div>

            {/* Field: Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-700" htmlFor="password">
                  Kata Sandi
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toast.info("Fitur reset password via email segera hadir");
                  }}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition"
                >
                  Lupa Sandi?
                </a>
              </div>
              <div className="relative rounded-xl bg-white border border-slate-200 shadow-2xs focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-11 rounded-xl bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan sandi"
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-600">Ingat saya di perangkat ini</span>
              </label>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] disabled:opacity-50"
            >
              <span>{isLoading ? "Memproses..." : "Masuk ke Dashboard"}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {/* Footer Redirection to Register */}
          <div className="pt-2 text-center space-y-4">
            <p className="text-xs sm:text-sm text-slate-600">
              Belum memiliki akun vendor?{" "}
              <Link
                href="/register"
                className="font-bold text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                Daftar Sekarang
              </Link>
            </p>

            {/* SSL & Privacy Security Pills */}
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-200/80 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span>Enkripsi SSL 256-bit</span>
              </div>
              <span className="text-slate-300">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Lock className="h-3.5 w-3.5 text-indigo-600" />
                <span>Data Vendor Terisolasi Mandiri</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

