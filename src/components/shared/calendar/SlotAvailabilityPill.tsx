import { cn } from "@/lib/utils";

export type SlotStatusVariant = "available" | "partial" | "full" | "locked";

export interface SlotAvailabilityPillProps {
  status: SlotStatusVariant;
  usedSlots: number;
  maxSlots: number;
  labelOverride?: string;
  className?: string;
}

const statusClasses: Record<SlotStatusVariant, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  partial: "bg-amber-50 text-amber-700 border-amber-200",
  full: "bg-rose-50 text-rose-700 border-rose-200",
  locked: "bg-slate-100 text-slate-500 border-slate-200",
};

const defaultLabels: Record<SlotStatusVariant, (used: number, max: number) => string> = {
  available: (used, max) => `Tersedia (${used}/${max})`,
  partial: (used, max) => `Terisi Sebagian (${used}/${max})`,
  full: (_, max) => `Penuh (${max}/${max})`,
  locked: () => "Terkunci",
};

export function SlotAvailabilityPill({
  status,
  usedSlots,
  maxSlots,
  labelOverride,
  className,
}: SlotAvailabilityPillProps) {
  const label = labelOverride || defaultLabels[status](usedSlots, maxSlots);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
        statusClasses[status],
        className
      )}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", {
          "bg-emerald-500": status === "available",
          "bg-amber-500": status === "partial",
          "bg-rose-500": status === "full",
          "bg-slate-400": status === "locked",
        })}
      />
      <span>{label}</span>
    </span>
  );
}

