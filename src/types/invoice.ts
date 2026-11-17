/**
 * Domain types untuk modul Penagihan, Termin & Invoice Sesuai PRD
 */

export type PaymentStatus = "UNPAID" | "PARTIAL" | "PAID" | "VOID";

export type MilestoneType = "DOWN_PAYMENT" | "INTERMEDIATE" | "FINAL_SETTLEMENT";

export interface PaymentMilestone {
  id: string;
  invoiceId: string;
  type: MilestoneType;
  title: string;
  amount: number;
  dueDate: string;
  isPaid: boolean;
  paidAt?: string;
  paymentProofUrl?: string;
}

export interface InvoiceDetail {
  id: string;
  publicToken: string; // UUID v4 untuk akses publik tanpa login
  invoiceNumber: string; // Format: INV/{YYYYMM}/{BOOKING_CODE}
  bookingId: string;
  tenantId: string;
  totalAmount: number;
  paidAmount: number;
  remainingAmount: number;
  status: PaymentStatus;
  milestones: PaymentMilestone[];
  bankDetails: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
  };
  client: {
    name: string;
    phone: string;
    email?: string;
  };
  eventDate: string;
  eventShift: string;
  createdAt: string;
}

