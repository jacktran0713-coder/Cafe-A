"use client"

import Image from "next/image"
import { MapPin, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FOOD_LABELS, SEATING_LABELS, TYPE_LABELS } from "@/lib/locations"
import type { ScoredLocation } from "@/lib/scoring"
import { cn } from "@/lib/utils"
import { HoursLine, MatchBadge, QuickStats } from "./match-parts"

const BAR_TONE = {
  match: "bg-emerald-500",
  partial: "bg-amber-500",
  miss: "bg-rose-500",
  neutral: "bg-muted-foreground/40",
} as const

export function LocationDetailsDialog({
  result,
  triggerClassName,
}: {
  result: ScoredLocation
  triggerClassName?: string
}) {
  const { location, match, reasons } = result
  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" className={cn("h-10 rounded-full px-4", triggerClassName)} />
        }
      >
        View details
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-2xl">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={location.image}
            alt={`Photo of ${location.name}`}
            fill
            sizes="(min-width: 640px) 672px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6 p-6 pt-2">
          <DialogHeader className="flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{TYPE_LABELS[location.type]}</Badge>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {location.neighborhood}
                </span>
              </div>
              <DialogTitle className="font-heading text-2xl font-bold">{location.name}</DialogTitle>
              <DialogDescription className="text-base">{location.description}</DialogDescription>
            </div>
            <MatchBadge match={match} size="lg" />
          </DialogHeader>

          <QuickStats location={location} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
              <h3 className="text-sm font-semibold">Good to know</h3>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                <li>
                  <HoursLine hours={location.hours} />
                </li>
                <li>{location.priceNote}</li>
                <li>{FOOD_LABELS[location.food]}</li>
                <li>{SEATING_LABELS[location.seating]}</li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 rounded-xl border border-border p-4">
              <h3 className="flex items-center gap-1.5 text-sm font-semibold">
                <Sparkles aria-hidden="true" className="size-4 text-primary" />
                Highlights
              </h3>
              <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                {location.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold">How it scores for you</h3>
            <ul className="flex flex-col gap-3">
              {reasons.map((reason) => (
                <li key={reason.key} className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-3 text-sm">
                    <span className="font-medium">{reason.label}</span>
                    <span className="text-right text-xs text-muted-foreground">
                      {reason.status === "neutral" ? "Doesn't matter to you" : reason.detail}
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-muted"
                    role="meter"
                    aria-label={`${reason.label} score`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(reason.score * 100)}
                  >
                    <div
                      className={cn("h-full rounded-full", BAR_TONE[reason.status])}
                      style={{ width: `${Math.max(reason.score * 100, 4)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
