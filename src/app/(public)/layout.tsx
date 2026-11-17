import Link from "next/link";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Public Sticky Minimal Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
        <div className="h-14 max-w-2xl mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <span className="font-display text-sm font-bold tracking-tight text-slate-900">
              Wedd<span className="text-indigo-600">Ops</span>
            </span>
          </Link>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            <span>Verifikasi Resmi Vendor</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-2xl mx-auto">{children}</main>

      {/* Security Footer */}
      <footer className="w-full bg-slate-50 border-t border-slate-200/60 py-6 text-center text-xs text-slate-400">
        <p>© 2026 WeddOps Platform. Layanan Transaksi & Kalender Terenkripsi SSL 256-bit.</p>
      </footer>
    </div>
  );
}

