/**
 * Domain types untuk modul Pengantin, Kru Lapangan & Checklist Hari H
 */

export interface ClientProfile {
  id: string;
  tenantId: string;
  fullName: string;
  phone: string;
  instagramHandle?: string;
  notes?: string;
  createdAt: string;
}

export interface CrewMember {
  id: string;
  tenantId: string;
  name: string;
  role: "LEAD_MUA" | "ASSISTANT_MUA" | "PHOTOGRAPHER" | "VIDEOGRAPHER" | "DECOR_CREW" | "SOUND_ENGINEER";
  phone: string;
}

export interface EventChecklistItem {
  id: string;
  title: string;
  isCompleted: boolean;
  category: "BRIEFING" | "EQUIPMENT" | "LOGISTICS" | "PAYMENT_CLEARANCE";
}

