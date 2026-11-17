import { create } from "zustand";
import { format } from "date-fns";
import { EventShift } from "@/types/calendar";

interface BookingDraft {
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventShift: EventShift;
  venueName: string;
  packageId?: string;
  packagePrice: number;
  addOns: { id: string; name: string; price: number }[];
  downPaymentPercent: number;
}

interface BookingState {
  draft: BookingDraft;
  setDraftField: <K extends keyof BookingDraft>(key: K, value: BookingDraft[K]) => void;
  resetDraft: () => void;
}

const initialDraft: BookingDraft = {
  clientName: "",
  clientPhone: "",
  eventDate: format(new Date(), "yyyy-MM-dd"),
  eventShift: "MORNING_AKAD",
  venueName: "",
  packagePrice: 0,
  addOns: [],
  downPaymentPercent: 30,
};

export const useBookingStore = create<BookingState>((set) => ({
  draft: initialDraft,
  setDraftField: (key, value) =>
    set((state) => ({
      draft: { ...state.draft, [key]: value },
    })),
  resetDraft: () => set({ draft: initialDraft }),
}));

