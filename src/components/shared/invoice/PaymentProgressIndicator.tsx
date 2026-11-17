import { cn } from "@/lib/utils";
import { formatIDR } from "@/lib/currency";

export interface PaymentProgressIndicatorProps {
  paidAmount: number;
  totalAmount: number;
  dueDateLabel?: string; // contoh: "Pelunasan H-3 (11 Nov)"
  className?: string;
}

export function PaymentProgressIndicator({
  paidAmount,
  totalAmount,
  dueDateLabel,
  className,
}: PaymentProgressIndicatorProps) {
  const remaining = Math.max(0, totalAmount - paidAmount);
  const percentage = totalAmount > 0 ? Math.min(100, Math.round((paidAmount / totalAmount) * 100)) : 0;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          Masuk: <span className="text-slate-700 font-semibold">{formatIDR(paidAmount)}</span>
        </span>
        <span className="text-slate-900 font-bold">
          Sisa: <span>{formatIDR(remaining)}</span>
        </span>
      </div>

      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn("h-full transition-all duration-300 rounded-full", {
            "bg-emerald-500": paidAmount >= totalAmount && totalAmount > 0,
            "bg-amber-500": paidAmount > 0 && paidAmount < totalAmount,
            "bg-slate-300": paidAmount === 0,
          })}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>{percentage}% terbayar</span>
        {dueDateLabel && <span className="font-medium text-amber-700">{dueDateLabel}</span>}
      </div>
    </div>
  );
}

