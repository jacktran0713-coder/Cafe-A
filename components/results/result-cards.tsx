import Image from "next/image"
import { MapPin, Trophy } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { TYPE_LABELS } from "@/lib/locations"
import type { ScoredLocation } from "@/lib/scoring"
import { LocationDetailsDialog } from "./location-details-dialog"
import { HoursLine, MatchBadge, QuickStats, ReasonList } from "./match-parts"

export function BestMatchCard({ result }: { result: ScoredLocation }) {
  const { location, match, reasons } = result
  return (
    <article
      aria-labelledby="best-match-title"
      className="overflow-hidden rounded-3xl border-2 border-primary bg-card shadow-xl shadow-primary/10"
    >
      <div className="grid md:grid-cols-[1.1fr_1fr]">
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full">
          <Image
            src={location.image}
            alt={`Photo of ${location.name}`}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-sm font-semibold text-accent-foreground shadow">
            <Trophy aria-hidden="true" className="size-4" />
            Best Match
          </span>
        </div>
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">{TYPE_LABELS[location.type]}</Badge>
                <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin aria-hidden="true" className="size-3.5" />
                  {location.neighborhood}
                </span>
              </div>
              <h2 id="best-match-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
                {location.name}
              </h2>
              <HoursLine hours={location.hours} />
            </div>
            <MatchBadge match={match} size="lg" />
          </div>
          <p className="leading-relaxed text-muted-foreground">{location.description}</p>
          <QuickStats location={location} />
          <div className="flex flex-col gap-2 rounded-2xl bg-secondary/50 p-4">
            <h3 className="text-sm font-semibold">Why this matches you</h3>
            <ReasonList reasons={reasons} limit={5} />
          </div>
          <LocationDetailsDialog result={result} triggerClassName="self-start" />
        </div>
      </div>
    </article>
  )
}

export function ResultCard({ result, rank }: { result: ScoredLocation; rank: number }) {
  const { location, match, reasons } = result
  const titleId = `result-${location.id}`
  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={location.image}
          alt={`Photo of ${location.name}`}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-3 left-3 rounded-full bg-card/95 px-2.5 py-1 text-xs font-semibold shadow-sm">
          #{rank}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{TYPE_LABELS[location.type]}</Badge>
              <span className="text-xs text-muted-foreground">{location.neighborhood}</span>
            </div>
            <h3 id={titleId} className="text-lg font-semibold leading-snug">
              {location.name}
            </h3>
          </div>
          <MatchBadge match={match} />
        </div>
        <QuickStats location={location} />
        <div className="flex flex-col gap-1.5">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Why it fits
          </h4>
          <ReasonList reasons={reasons} limit={3} />
        </div>
        <LocationDetailsDialog result={result} triggerClassName="mt-auto w-full" />
      </div>
    </article>
  )
}
