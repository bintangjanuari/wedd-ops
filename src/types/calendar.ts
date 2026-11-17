/**
 * Domain types untuk modul Kalender & Booking Sesuai PRD & SYSTEM_FLOW
 */

export type EventShift = "FULL_DAY" | "MORNING_AKAD" | "EVENING_RECEPTION";

export type BookingStatus =
  | "PROSPECT"
  | "BOOKED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type SlotStatusVariant = "available" | "partial" | "full" | "locked";

export interface BookingSlotSummary {
  date: string; // YYYY-MM-DD
  maxSlots: number;
  usedSlots: number;
  status: SlotStatusVariant;
  shifts: {
    shift: EventShift;
    bookingCount: number;
    isAvailable: boolean;
  }[];
}

export interface BookingItem {
  id: string;
  tenantId: string;
  bookingCode: string;
  clientName: string;
  clientPhone: string;
  eventDate: string;
  eventShift: EventShift;
  venueName: string;
  status: BookingStatus;
  totalAmount: number;
  paidAmount: number;
}

