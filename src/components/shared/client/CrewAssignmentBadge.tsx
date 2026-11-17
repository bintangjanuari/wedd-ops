import { cn } from "@/lib/utils";
import { UserCheck } from "lucide-react";

export type CrewRole =
  | "LEAD_MUA"
  | "ASSISTANT_MUA"
  | "PHOTOGRAPHER"
  | "VIDEOGRAPHER"
  | "DECOR_CREW"
  | "SOUND_ENGINEER";

export interface CrewAssignmentBadgeProps {
  name: string;
  role: CrewRole;
  phone?: string;
  className?: string;
}

const roleLabels: Record<CrewRole, { label: string; badge: string }> = {
  LEAD_MUA: { label: "Lead MUA", badge: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  ASSISTANT_MUA: { label: "Asisten MUA", badge: "bg-purple-50 text-purple-700 border-purple-200" },
  PHOTOGRAPHER: { label: "Fotografer", badge: "bg-sky-50 text-sky-700 border-sky-200" },
  VIDEOGRAPHER: { label: "Videografer", badge: "bg-blue-50 text-blue-700 border-blue-200" },
  DECOR_CREW: { label: "Tim Dekor", badge: "bg-amber-50 text-amber-700 border-amber-200" },
  SOUND_ENGINEER: { label: "Sound Crew", badge: "bg-emerald-50 text-emerald-700 border-emerald-200" },
};

export function CrewAssignmentBadge({
  name,
  role,
  phone,
  className,
}: CrewAssignmentBadgeProps) {
  const config = roleLabels[role];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border bg-white shadow-xs text-xs",
        className
      )}
    >
      <div className="h-6 w-6 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
        <UserCheck className="h-3.5 w-3.5" />
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-slate-900">{name}</span>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={cn("px-1.5 py-0.2 rounded text-[10px] font-medium border", config.badge)}>
            {config.label}
          </span>
          {phone && <span className="text-[10px] text-slate-400 font-mono">{phone}</span>}
        </div>
      </div>
    </div>
  );
}

