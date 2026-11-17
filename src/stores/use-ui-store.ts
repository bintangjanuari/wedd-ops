import { create } from "zustand";
import { format } from "date-fns";

interface UiState {
  isSidebarOpen: boolean;
  isQuickAddModalOpen: boolean;
  activeTenantId: string | null;
  selectedDate: string; // YYYY-MM-DD
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setQuickAddModalOpen: (open: boolean) => void;
  setActiveTenantId: (tenantId: string) => void;
  setSelectedDate: (date: string) => void;
}

export const useUiStore = create<UiState>((set) => ({
  isSidebarOpen: false,
  isQuickAddModalOpen: false,
  activeTenantId: null,
  selectedDate: format(new Date(), "yyyy-MM-dd"),
  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setQuickAddModalOpen: (open) => set({ isQuickAddModalOpen: open }),
  setActiveTenantId: (tenantId) => set({ activeTenantId: tenantId }),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

