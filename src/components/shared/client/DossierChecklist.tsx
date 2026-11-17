import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export interface ChecklistItem {
  id: string;
  label: string;
  subtext?: string;
  isDone: boolean;
}

export interface DossierChecklistProps {
  items: ChecklistItem[];
  onToggleItem?: (itemId: string, currentStatus: boolean) => void;
  className?: string;
}

export function DossierChecklist({
  items,
  onToggleItem,
  className,
}: DossierChecklistProps) {
  const completedCount = items.filter((i) => i.isDone).length;
  const percentage =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Header with mini progress */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
        <span>Checklist Kesiapan Hari-H</span>
        <span className="text-xs text-indigo-600 font-medium">
          {completedCount} dari {items.length} Selesai ({percentage}%)
        </span>
      </div>

      {/* Progress mini bar */}
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Checklist items list */}
      <div className="space-y-2 pt-1">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onToggleItem && onToggleItem(item.id, item.isDone)}
            className={cn(
              "p-3 rounded-xl border border-slate-200 bg-white flex items-start gap-3 transition-all select-none",
              onToggleItem && "cursor-pointer hover:border-slate-300 hover:shadow-2xs",
              item.isDone && "bg-slate-50/70 border-slate-200/60"
            )}
          >
            {/* Custom Checkbox */}
            <div
              className={cn(
                "h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-colors",
                item.isDone
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : "border-slate-300 bg-white"
              )}
            >
              {item.isDone && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            </div>

            <div className="flex flex-col">
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  item.isDone ? "text-slate-500 line-through" : "text-slate-800"
                )}
              >
                {item.label}
              </span>
              {item.subtext && (
                <span className="text-[11px] text-slate-400 mt-0.5">
                  {item.subtext}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

