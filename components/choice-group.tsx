"use client"

import type { LucideIcon } from "lucide-react"
import type { Option } from "@/lib/preferences"
import { cn } from "@/lib/utils"

type ChoiceGroupProps = {
  name: string
  legend: string
  options: Option<string>[]
  value: string
  onChange: (value: string) => void
  optionIcons?: Record<string, LucideIcon>
  size?: "lg" | "sm"
  hideLegend?: boolean
}

export function ChoiceGroup({
  name,
  legend,
  options,
  value,
  onChange,
  optionIcons,
  size = "lg",
  hideLegend = true,
}: ChoiceGroupProps) {
  const isLarge = size === "lg"

  return (
    <fieldset>
      <legend className={cn(hideLegend ? "sr-only" : "mb-2 text-sm font-medium")}>{legend}</legend>
      <div
        className={cn(
          "grid gap-2",
          isLarge
            ? options.length >= 4
              ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              : options.length === 3
                ? "grid-cols-3"
                : "grid-cols-2"
            : "grid-cols-[repeat(auto-fit,minmax(5.5rem,1fr))]",
        )}
      >
        {options.map((option) => {
          const Icon = optionIcons?.[option.value]
          const selected = option.value === value
          const id = `${name}-${option.value}`
          return (
            <label
              key={option.value}
              htmlFor={id}
              className={cn(
                "group relative flex cursor-pointer select-none flex-col items-center justify-center gap-1 rounded-xl border bg-card text-center transition-all",
                "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/40",
                isLarge ? "min-h-20 px-3 py-3" : "px-2 py-2",
                selected
                  ? "border-primary bg-primary/5 text-primary shadow-sm"
                  : "border-border hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-sm",
              )}
            >
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {Icon && isLarge && (
                <Icon
                  aria-hidden="true"
                  className={cn("size-5", selected ? "text-primary" : "text-muted-foreground")}
                />
              )}
              <span className={cn("font-medium leading-tight", isLarge ? "text-sm" : "text-xs")}>
                {option.label}
              </span>
              {option.hint && isLarge && (
                <span className="text-xs leading-tight text-muted-foreground">{option.hint}</span>
              )}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
