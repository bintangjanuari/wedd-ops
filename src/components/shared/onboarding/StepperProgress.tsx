"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepItem {
  stepNumber: number;
  title: string;
  subtitle?: string;
}

export interface StepperProgressProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (stepNumber: number) => void;
  className?: string;
}

export function StepperProgress({
  steps,
  currentStep,
  onStepClick,
  className,
}: StepperProgressProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl shadow-xs border border-slate-200/80 p-4 sm:p-6 mb-8",
        className
      )}
    >
      <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center">
        {steps.map((step) => {
          const isDone = currentStep > step.stepNumber;
          const isActive = currentStep === step.stepNumber;

          return (
            <button
              key={step.stepNumber}
              type="button"
              onClick={() => onStepClick && onStepClick(step.stepNumber)}
              disabled={!onStepClick || step.stepNumber > currentStep}
              className="flex items-center gap-2 sm:gap-3 text-left focus:outline-none disabled:cursor-default"
            >
              <div
                className={cn(
                  "w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 font-semibold text-xs sm:text-sm transition-all",
                  isDone
                    ? "bg-emerald-500 text-white shadow-xs"
                    : isActive
                    ? "bg-indigo-600 text-white shadow-xs ring-4 ring-indigo-50"
                    : "bg-slate-100 text-slate-400"
                )}
              >
                {isDone ? (
                  <Check className="h-4 w-4 stroke-[3]" />
                ) : (
                  step.stepNumber
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider truncate">
                  {step.subtitle || `Langkah ${step.stepNumber}`}
                </p>
                <p
                  className={cn(
                    "text-xs sm:text-sm font-semibold truncate",
                    isActive ? "text-indigo-600" : "text-slate-800"
                  )}
                >
                  {step.title}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Line */}
      <div className="mt-5 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1 || 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}

