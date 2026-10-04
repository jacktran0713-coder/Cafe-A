"use client"

import { RotateCcw } from "lucide-react"
import { ChoiceGroup } from "@/components/choice-group"
import { Button } from "@/components/ui/button"
import type { PreferenceKey, Preferences } from "@/lib/preferences"
import { QUESTION_SECTIONS } from "@/lib/questions"

type FilterPanelProps = {
  idPrefix: string
  prefs: Preferences
  onChange: (key: PreferenceKey, value: string) => void
  onReset: () => void
}

export function FilterPanel({ idPrefix, prefs, onChange, onReset }: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-6">
      {QUESTION_SECTIONS.map((section) => (
        <div key={section.id} className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h3>
          {section.questions.map((q) => {
            const Icon = q.icon
            return (
              <div key={q.key} className="flex flex-col gap-2">
                <span className="flex items-center gap-1.5 text-sm font-medium" aria-hidden="true">
                  <Icon className="size-4 text-primary" />
                  {q.title}
                </span>
                <ChoiceGroup
                  name={`${idPrefix}-${q.key}`}
                  legend={q.title}
                  options={q.options}
                  value={prefs[q.key]}
                  onChange={(v) => onChange(q.key, v)}
                  size="sm"
                />
              </div>
            )
          })}
        </div>
      ))}
      <Button variant="ghost" onClick={onReset} className="h-9 gap-1.5 self-start">
        <RotateCcw aria-hidden="true" className="size-4" />
        Reset to defaults
      </Button>
    </div>
  )
}
