import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

export interface CalendarEventSummary {
  id: string;
  clientName: string;
  shift: "MORNING_AKAD" | "EVENING_RECEPTION" | "FULL_DAY";
  isPaid: boolean;
}

export interface CalendarCellProps {
  date: number; // 1 - 31
  fullDateString: string; // YYYY-MM-DD
  isCurrentMonth: boolean;
  isSelected?: boolean;
  isToday?: boolean;
  status: "available" | "partial" | "full" | "locked";
  usedSlots: number;
  maxSlots: number;
  lockLabel?: string; // misal: "Libur Kru"
  events?: CalendarEventSummary[];
  onClick?: (fullDateString: string) => void;
}

const shiftLabels: Record<CalendarEventSummary["shift"], string> = {
  MORNING_AKAD: "Pagi",
  EVENING_RECEPTION: "Malam",
  FULL_DAY: "Seharian",
};

export function CalendarCell({
  date,
  fullDateString,
  isCurrentMonth,
  isSelected = false,
  isToday = false,
  status,
  usedSlots,
  maxSlots,
  lockLabel,
  events = [],
  onClick,
}: CalendarCellProps) {
  const isLocked = status === "locked";

  const handleClick = () => {
    if (!isLocked && onClick) {
      onClick(fullDateString);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "min-h-[110px] p-2 border border-slate-100 flex flex-col justify-between transition-all select-none rounded-lg",
        isCurrentMonth ? "bg-white" : "bg-slate-50/50 text-slate-300 opacity-60",
        isSelected && "ring-2 ring-indigo-600 bg-indigo-50/20 shadow-sm",
        isLocked ? "bg-slate-100/80 cursor-not-allowed text-slate-400" : "cursor-pointer hover:border-slate-300 hover:shadow-sm"
      )}
    >
      {/* Top Header: Date number & Indicator */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "text-xs font-semibold h-6 w-6 flex items-center justify-center rounded-full",
            isToday
              ? "bg-indigo-600 text-white font-bold"
              : isCurrentMonth
              ? "text-slate-800"
              : "text-slate-400"
          )}
        >
          {date}
        </span>

        {/* Status Indicator */}
        {isLocked ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-500">
            <Lock className="h-3 w-3" />
            {lockLabel || "Terkunci"}
          </span>
        ) : isCurrentMonth ? (
          <span
            className={cn(
              "text-[10px] font-medium px-1.5 py-0.2 rounded-full",
              status === "available" && "text-emerald-700 bg-emerald-50",
              status === "partial" && "text-amber-700 bg-amber-50",
              status === "full" && "text-rose-700 bg-rose-50"
            )}
          >
            {usedSlots}/{maxSlots}
          </span>
        ) : null}
      </div>

      {/* Middle/Events Area */}
      <div className="flex-1 my-1.5 space-y-1 overflow-hidden">
        {events.slice(0, 2).map((ev) => (
          <div
            key={ev.id}
            className={cn(
              "px-1.5 py-0.5 rounded text-[11px] truncate flex items-center justify-between gap-1 font-medium",
              ev.isPaid
                ? "bg-emerald-50 text-emerald-800 border border-emerald-200/60"
                : "bg-amber-50 text-amber-800 border border-amber-200/60"
            )}
          >
            <span className="truncate">{ev.clientName}</span>
            <span className="text-[9px] font-semibold opacity-75 shrink-0 uppercase">
              {shiftLabels[ev.shift]}
            </span>
          </div>
        ))}
        {events.length > 2 && (
          <div className="text-[10px] text-slate-400 font-medium pl-1">
            +{events.length - 2} acara lainnya
          </div>
        )}
      </div>

      {/* Bottom Slot Pill on Full */}
      {status === "full" && isCurrentMonth && (
        <div className="h-1 w-full rounded-full bg-rose-500" />
      )}
    </div>
  );
}

