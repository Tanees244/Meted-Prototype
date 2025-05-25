"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  title: string
  description: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Steps({ steps, currentStep, className }: StepsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {steps.map((step, index) => {
        const isCompleted = index + 1 < currentStep
        const isCurrent = index + 1 === currentStep

        return (
          <div
            key={step.title}
            className={cn(
              "flex items-start gap-4 p-4 rounded-lg transition-colors",
              isCurrent ? "bg-purple-50" : "hover:bg-purple-50/50"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                isCompleted
                  ? "border-purple-600 bg-purple-600"
                  : isCurrent
                  ? "border-purple-600"
                  : "border-gray-300"
              )}
            >
              {isCompleted ? (
                <CheckIcon className="h-4 w-4 text-white" />
              ) : (
                <span
                  className={cn(
                    "text-sm font-medium",
                    isCurrent ? "text-purple-600" : "text-gray-500"
                  )}
                >
                  {index + 1}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <h3
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-purple-700" : "text-gray-900"
                )}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
} 