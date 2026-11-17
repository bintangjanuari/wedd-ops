import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle, XCircle } from "lucide-react";

export type PaymentStatusVariant = "UNPAID" | "PARTIAL" | "PAID" | "VOID";

export interface PaymentStatusBadgeProps {
  status: PaymentStatusVariant;
  className?: string;
}

const statusConfig: Record<
  PaymentStatusVariant,
  { label: string; badgeClass: string; icon: typeof CheckCircle2 }
> = {
  UNPAID: {
    label: "Belum Bayar",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    icon: Clock,
  },
  PARTIAL: {
    label: "DP Masuk (Sebagian)",
    badgeClass: "bg-amber-50 text-amber-700 border-amber-200",
    icon: AlertCircle,
  },
  PAID: {
    label: "Lunas",
    badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
    icon: CheckCircle2,
  },
  VOID: {
    label: "Batal (Void)",
    badgeClass: "bg-rose-50 text-rose-700 border-rose-200",
    icon: XCircle,
  },
};

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
        config.badgeClass,
        className
      )}
    >
      <Icon className="h-3 w-3 shrink-0" />
      <span>{config.label}</span>
    </span>
  );
}

