"use client";

import { usePathname } from "next/navigation";
import { TopNavbar } from "@/components/shared/navigation/TopNavbar";
import { MobileBottomBar } from "@/components/shared/navigation/MobileBottomBar";
import { QuickBookingModal } from "@/components/shared/modals/QuickBookingModal";
import { useUiStore } from "@/stores/use-ui-store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuickAddModalOpen = useUiStore((state) => state.isQuickAddModalOpen);
  const setQuickAddModalOpen = useUiStore((state) => state.setQuickAddModalOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar Desktop */}
      <TopNavbar
        tenantName="Sanggar Ayu Lestari"
        activePath={pathname}
        onQuickAddClick={() => setQuickAddModalOpen(true)}
        unreadNotifications={true}
      />

      {/* Main Back-Office Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <MobileBottomBar
        activePath={pathname}
        onQuickAddClick={() => setQuickAddModalOpen(true)}
      />

      {/* Global Quick Add Booking & Invoice Modal */}
      <QuickBookingModal
        isOpen={isQuickAddModalOpen}
        onClose={() => setQuickAddModalOpen(false)}
      />
    </div>
  );
}
