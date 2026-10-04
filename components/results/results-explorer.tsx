"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Pencil, SlidersHorizontal } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DEFAULT_PREFERENCES,
  PREFERENCE_KEYS,
  getOptionLabel,
  preferencesToQuery,
  type PreferenceKey,
  type Preferences,
} from "@/lib/preferences"
import { rankLocations } from "@/lib/scoring"
import { cn } from "@/lib/utils"
import { FilterPanel } from "./filter-panel"
import { BestMatchCard, ResultCard } from "./result-cards"

const SUMMARY_PREFIX: Partial<Record<PreferenceKey, string>> = {
  wifi: "Wi-Fi",
  outlets: "Outlets",
  food: "Food",
  seating: "Seating",
  distance: "Within",
  crowd: "Crowd",
  price: "Price",
}

export function ResultsExplorer({ initialPreferences }: { initialPreferences: Preferences }) {
  const [prefs, setPrefs] = useState(initialPreferences)
  const results = useMemo(() => rankLocations(prefs), [prefs])
  const [best, ...rest] = results

  function commit(next: Preferences) {
    setPrefs(next)
    window.history.replaceState(null, "", `/results?${preferencesToQuery(next)}`)
  }

  const handleChange = (key: PreferenceKey, value: string) => commit({ ...prefs, [key]: value })
  const handleReset = () => commit(DEFAULT_PREFERENCES)

  const summary = PREFERENCE_KEYS.filter((key) => {
    const v = prefs[key]
    return v !== "any" && v !== "either" && v !== "not-required"
  }).map((key) => {
    const label = getOptionLabel(key, prefs[key] as never)
    const prefix = SUMMARY_PREFIX[key]
    return { key, text: prefix ? `${prefix}: ${label}` : label }
  })

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[17rem_1fr]">
      <aside className="hidden lg:block" aria-label="Filters">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold">
            <SlidersHorizontal aria-hidden="true" className="size-4" />
            Adjust filters
          </h2>
          <FilterPanel
            idPrefix="desktop"
            prefs={prefs}
            onChange={handleChange}
            onReset={handleReset}
          />
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Your study spots</h1>
              <p className="mt-2 text-muted-foreground">
                {results.length} spots ranked by how well they fit your preferences.
              </p>
            </div>
            <div className="flex gap-2">
              <Sheet>
                <SheetTrigger
                  render={
                    <Button variant="outline" className="h-10 gap-1.5 rounded-full px-4 lg:hidden" />
                  }
                >
                  <SlidersHorizontal aria-hidden="true" className="size-4" />
                  Filters
                </SheetTrigger>
                <SheetContent side="left" className="w-[88vw] overflow-y-auto sm:max-w-sm">
                  <SheetHeader>
                    <SheetTitle>Adjust filters</SheetTitle>
                    <SheetDescription>Results update instantly as you change them.</SheetDescription>
                  </SheetHeader>
                  <div className="px-4 pb-6">
                    <FilterPanel
                      idPrefix="mobile"
                      prefs={prefs}
                      onChange={handleChange}
                      onReset={handleReset}
                    />
                  </div>
                </SheetContent>
              </Sheet>
              <Link
                href={`/preferences?${preferencesToQuery(prefs)}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "h-10 gap-1.5 rounded-full px-4",
                )}
              >
                <Pencil aria-hidden="true" className="size-4" />
                Retake quiz
              </Link>
            </div>
          </div>
          {summary.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Your preferences">
              {summary.map((item) => (
                <li
                  key={item.key}
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium"
                >
                  {item.text}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div aria-live="polite" className="flex flex-col gap-8">
          <BestMatchCard key={best.location.id} result={best} />

          <section aria-labelledby="more-options" className="flex flex-col gap-4">
            <h2 id="more-options" className="text-2xl font-bold tracking-tight">
              More great options
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {rest.map((result, i) => (
                <ResultCard key={result.location.id} result={result} rank={i + 2} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
