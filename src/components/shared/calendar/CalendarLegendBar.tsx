import { cn } from "@/lib/utils";

export interface CalendarLegendBarProps {
  className?: string;
}

const legends = [
  { label: "Slot Tersedia", color: "bg-emerald-500", text: "text-emerald-700" },
  { label: "Terisi Sebagian", color: "bg-amber-500", text: "text-amber-700" },
  { label: "Kuota Penuh", color: "bg-rose-500", text: "text-rose-700" },
  { label: "Terkunci / Libur", color: "bg-slate-400", text: "text-slate-600" },
];

export function CalendarLegendBar({ className }: CalendarLegendBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 flex-wrap text-xs font-medium text-slate-600",
        className
      )}
    >
      {legends.map((item) => (
        <div key={item.label} className="inline-flex items-center gap-1.5">
          <span className={cn("h-2.5 w-2.5 rounded-full", item.color)} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

