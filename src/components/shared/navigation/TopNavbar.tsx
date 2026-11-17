import Link from "next/link";
import { Plus, Bell, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TopNavbarProps {
  tenantName?: string;
  activePath?: string;
  avatarUrl?: string;
  unreadNotifications?: boolean;
  onQuickAddClick?: () => void;
  onSearchClick?: () => void;
  onNotificationClick?: () => void;
  className?: string;
}

const navItems = [
  { href: "/", label: "Ringkasan" },
  { href: "/calendar", label: "Kalender Slot" },
  { href: "/invoices", label: "Tagihan & Invoice" },
  { href: "/clients-events", label: "Klien & Acara" },
];

export function TopNavbar({
  tenantName = "Sanggar Ayu Lestari",
  activePath = "/",
  avatarUrl,
  unreadNotifications = true,
  onQuickAddClick,
  onSearchClick,
  onNotificationClick,
  className,
}: TopNavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs",
        className
      )}
    >
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left: Brand + Tenant Switcher + Nav items */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white font-display font-bold flex items-center justify-center shadow-xs text-base">
              W
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-slate-900">
              WeddOps
            </span>
          </Link>

          {/* Tenant Switcher Pill */}
          <button
            type="button"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200/70 transition-colors text-xs font-semibold text-slate-800"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="truncate max-w-[150px]">{tenantName}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? activePath === "/"
                  : activePath.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs font-medium transition-all",
                    isActive
                      ? "bg-slate-100 text-indigo-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Action Group */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search */}
          <button
            type="button"
            onClick={onSearchClick}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-xs text-slate-500 transition-colors"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span>Cari klien / invoice</span>
            <kbd className="font-mono text-[10px] bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Quick Add Booking CTA */}
          <button
            type="button"
            onClick={onQuickAddClick}
            className="flex items-center gap-1.5 h-10 px-3.5 sm:px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs rounded-xl shadow-xs transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Buat Booking / Invoice</span>
            <span className="sm:hidden">Booking</span>
          </button>

          {/* Notification Icon */}
          <button
            type="button"
            onClick={onNotificationClick}
            aria-label="Notifikasi"
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <Bell className="h-5 w-5" />
            {unreadNotifications && (
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Profile Avatar */}
          <div className="relative flex items-center">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200 flex items-center justify-center text-xs font-bold">
                SA
              </div>
            )}
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
        </div>
      </div>
    </header>
  );
}

