import Link from "next/link";
import { LayoutDashboard, Calendar, Plus, Receipt, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MobileBottomBarProps {
  activePath?: string;
  onQuickAddClick?: () => void;
  className?: string;
}

export function MobileBottomBar({
  activePath = "/",
  onQuickAddClick,
  className,
}: MobileBottomBarProps) {
  const navItems = [
    { href: "/", label: "Ringkasan", icon: LayoutDashboard },
    { href: "/calendar", label: "Kalender", icon: Calendar },
    { href: "#add", label: "Tambah", icon: Plus, isAction: true },
    { href: "/invoices", label: "Invoice", icon: Receipt },
    { href: "/clients-events", label: "Klien", icon: Users },
  ];

  return (
    <nav
      aria-label="Navigasi Mobile"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg md:hidden",
        className
      )}
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          if (item.isAction) {
            return (
              <button
                key={item.label}
                type="button"
                onClick={onQuickAddClick}
                aria-label="Buat booking baru"
                className="flex flex-col items-center justify-center p-1 text-indigo-600 focus:outline-none min-h-[44px] min-w-[44px]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md active:scale-95 transition-all">
                  <Plus className="h-5 w-5 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-semibold text-slate-700 mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          }

          const isActive =
            item.href === "/"
              ? activePath === "/"
              : activePath.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center min-w-[54px] min-h-[44px] py-1 px-1.5 rounded-xl transition-colors",
                isActive
                  ? "text-indigo-600 font-semibold"
                  : "text-slate-500 hover:text-slate-900"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

