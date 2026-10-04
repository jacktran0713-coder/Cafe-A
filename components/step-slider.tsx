"use client"

import type { LucideIcon } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import type { Option } from "@/lib/preferences"
import { cn } from "@/lib/utils"

type StepSliderProps = {
  label: string
  options: Option<string>[]
  value: string
  onChange: (value: string) => void
  optionIcons?: Record<string, LucideIcon>
}

export function StepSlider({ label, options, value, onChange, optionIcons }: StepSliderProps) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const current = options[index]
  const CurrentIcon = optionIcons?.[current.value]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3 rounded-xl bg-muted px-4 py-3">
        {CurrentIcon && (
          <span className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <CurrentIcon aria-hidden="true" className="size-5" />
          </span>
        )}
        <div className="flex flex-col">
          <span className="font-heading text-lg font-semibold leading-tight">{current.label}</span>
          {current.hint && <span className="text-sm text-muted-foreground">{current.hint}</span>}
        </div>
      </div>

      <Slider
        aria-label={label}
        min={0}
        max={options.length - 1}
        step={1}
        value={index}
        onValueChange={(v) => {
          const next = Array.isArray(v) ? v[0] : v
          onChange(options[next].value)
        }}
        className="px-1 [&_[data-slot=slider-thumb]]:size-5 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-primary [&_[data-slot=slider-track]]:data-horizontal:h-2"
      />

      <div className="flex justify-between gap-1" aria-hidden="true">
        {options.map((option, i) => (
          <button
            key={option.value}
            type="button"
            tabIndex={-1}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-md px-1 text-xs font-medium transition-colors",
              i === index ? "text-primary" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}
