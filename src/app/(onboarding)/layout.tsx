import Link from "next/link";
import { Sparkles, HelpCircle, LogOut, User } from "lucide-react";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/80 shadow-2xs">
        <div className="h-16 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-display font-bold shadow-xs">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-slate-900">
              Wedd<span className="text-indigo-600">Ops</span>
            </span>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-medium">
            <nav className="flex items-center gap-4 sm:gap-6 text-slate-600">
              <a
                href="#help"
                className="hover:text-slate-900 transition-colors flex items-center gap-1.5"
              >
                <HelpCircle className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">Pusat Bantuan</span>
              </a>
              <Link
                href="/login"
                className="hover:text-rose-600 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="h-4 w-4 text-slate-400" />
                <span className="hidden sm:inline">Keluar</span>
              </Link>
            </nav>

            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs border border-indigo-200">
              <User className="h-4 w-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Multi-Step Wizard Body */}
      <main className="flex-1 w-full">{children}</main>

      {/* Simple Clean Footnote */}
      <footer className="w-full bg-slate-50 border-t border-slate-200/60 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 WeddOps Platform. Pengaturan data terlindungi enkripsi end-to-end.</p>
          <div className="flex items-center gap-2 text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sistem Siap Operasional</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

