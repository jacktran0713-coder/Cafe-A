import { CheckCircle2, CircleAlert, CircleMinus, Clock, Footprints, Plug, Users, Volume2, Wallet, Wifi, WifiOff } from "lucide-react"
import {
  CROWD_LABELS,
  NOISE_LABELS,
  OUTLET_LABELS,
  PRICE_LABELS,
  type StudyLocation,
} from "@/lib/locations"
import type { Reason } from "@/lib/scoring"
import { cn } from "@/lib/utils"

export function MatchBadge({ match, size = "md" }: { match: number; size?: "md" | "lg" }) {
  const large = size === "lg"
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-full",
        large ? "size-20" : "size-14",
      )}
      style={{
        background: `conic-gradient(var(--primary) ${match * 3.6}deg, var(--muted) 0deg)`,
      }}
      role="img"
      aria-label={`${match}% match`}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-center rounded-full bg-card",
          large ? "size-16" : "size-11",
        )}
      >
        <span className={cn("font-heading font-bold leading-none", large ? "text-xl" : "text-sm")}>
          {match}%
        </span>
        {large && <span className="text-[10px] font-medium text-muted-foreground">match</span>}
      </div>
    </div>
  )
}

const STATUS_STYLES = {
  match: { icon: CheckCircle2, className: "text-emerald-600" },
  partial: { icon: CircleAlert, className: "text-amber-600" },
  miss: { icon: CircleMinus, className: "text-rose-600" },
  neutral: { icon: CircleMinus, className: "text-muted-foreground" },
} as const

export function ReasonList({
  reasons,
  limit,
  className,
}: {
  reasons: Reason[]
  limit?: number
  className?: string
}) {
  const visible = reasons.filter((r) => r.status !== "neutral").slice(0, limit)
  if (visible.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You&apos;re flexible on everything — this spot works.
      </p>
    )
  }
  return (
    <ul className={cn("flex flex-col gap-2", className)}>
      {visible.map((reason) => {
        const { icon: Icon, className: tone } = STATUS_STYLES[reason.status]
        return (
          <li key={reason.key} className="flex items-start gap-2 text-sm">
            <Icon aria-hidden="true" className={cn("mt-0.5 size-4 shrink-0", tone)} />
            <span>
              <span className="font-medium">{reason.label}:</span>{" "}
              <span className="text-muted-foreground">{reason.detail}</span>
              <span className="sr-only">
                {reason.status === "match"
                  ? " (match)"
                  : reason.status === "partial"
                    ? " (partial match)"
                    : " (not a match)"}
              </span>
            </span>
          </li>
        )
      })}
    </ul>
  )
}

export function QuickStats({ location, className }: { location: StudyLocation; className?: string }) {
  const stats = [
    { icon: Volume2, label: "Noise", value: NOISE_LABELS[location.noise] },
    { icon: Users, label: "Crowd", value: CROWD_LABELS[location.crowd] },
    { icon: Wallet, label: "Price", value: PRICE_LABELS[location.price] },
    { icon: location.wifi ? Wifi : WifiOff, label: "Wi-Fi", value: location.wifi ? "Yes" : "No" },
    {
      icon: Plug,
      label: "Outlets",
      value: OUTLET_LABELS[location.outlets].replace(" outlets", "").replace("No", "None"),
    },
    { icon: Footprints, label: "Distance", value: `${location.distance} min` },
  ]
  return (
    <dl className={cn("grid grid-cols-3 gap-2", className)}>
      {stats.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex flex-col gap-0.5 rounded-lg bg-muted px-2.5 py-2">
          <dt className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <Icon aria-hidden="true" className="size-3" />
            {label}
          </dt>
          <dd className="text-sm font-semibold capitalize">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function HoursLine({ hours }: { hours: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <Clock aria-hidden="true" className="size-3.5" />
      {hours}
    </span>
  )
}
