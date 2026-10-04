import {
  CROWD_LABELS,
  FOOD_LABELS,
  LOCATIONS,
  NOISE_LABELS,
  OUTLET_LABELS,
  PRICE_LABELS,
  SEATING_LABELS,
  TYPE_LABELS,
  type StudyLocation,
} from "./locations"
import { getOptionLabel, type PreferenceKey, type Preferences } from "./preferences"

export type ReasonStatus = "match" | "partial" | "miss" | "neutral"

export type Reason = {
  key: PreferenceKey
  label: string
  status: ReasonStatus
  detail: string
  weight: number
  score: number
}

export type ScoredLocation = {
  location: StudyLocation
  match: number
  reasons: Reason[]
}

const WEIGHTS: Record<PreferenceKey, number> = {
  noise: 20,
  wifi: 15,
  distance: 15,
  crowd: 10,
  price: 10,
  outlets: 10,
  food: 10,
  seating: 5,
  environment: 5,
}

const CRITERIA_LABELS: Record<PreferenceKey, string> = {
  noise: "Noise level",
  crowd: "Crowdedness",
  price: "Price",
  wifi: "Wi-Fi",
  outlets: "Outlets",
  food: "Food & drinks",
  seating: "Seating",
  environment: "Environment",
  distance: "Distance",
}

const NOISE_INDEX = { silent: 0, quiet: 1, moderate: 2, social: 3 } as const
const CROWD_INDEX = { empty: 0, moderate: 1, busy: 2 } as const

function scoreCriterion(
  key: PreferenceKey,
  prefs: Preferences,
  loc: StudyLocation,
): { score: number; neutral: boolean } {
  switch (key) {
    case "noise": {
      const diff = Math.abs(NOISE_INDEX[prefs.noise] - loc.noise)
      return { score: [1, 0.6, 0.2, 0][diff], neutral: false }
    }
    case "crowd": {
      const diff = Math.abs(CROWD_INDEX[prefs.crowd] - loc.crowd)
      return { score: [1, 0.5, 0][diff], neutral: false }
    }
    case "price": {
      if (prefs.price === "any") return { score: 1, neutral: true }
      if (prefs.price === "free")
        return { score: { free: 1, cheap: 0.4, paid: 0 }[loc.price], neutral: false }
      return { score: { free: 1, cheap: 1, paid: 0.3 }[loc.price], neutral: false }
    }
    case "wifi": {
      if (prefs.wifi === "not-required") return { score: 1, neutral: true }
      return { score: loc.wifi ? 1 : 0, neutral: false }
    }
    case "outlets": {
      if (prefs.outlets === "any") return { score: 1, neutral: true }
      const table =
        prefs.outlets === "required"
          ? { plenty: 1, some: 0.6, none: 0 }
          : { plenty: 1, some: 0.8, none: 0.4 }
      return { score: table[loc.outlets], neutral: false }
    }
    case "food": {
      if (prefs.food === "any") return { score: 1, neutral: true }
      const table =
        prefs.food === "required"
          ? { onsite: 1, nearby: 0.6, none: 0 }
          : { onsite: 1, nearby: 0.8, none: 0.4 }
      return { score: table[loc.food], neutral: false }
    }
    case "seating": {
      if (prefs.seating === "either") return { score: 1, neutral: true }
      const ok = loc.seating === "both" || loc.seating === prefs.seating
      return { score: ok ? 1 : 0.2, neutral: false }
    }
    case "environment": {
      if (prefs.environment === "any") return { score: 1, neutral: true }
      return { score: loc.type === prefs.environment ? 1 : 0.2, neutral: false }
    }
    case "distance": {
      if (prefs.distance === "any") return { score: 1, neutral: true }
      const limit = Number(prefs.distance)
      if (loc.distance <= limit) return { score: 1, neutral: false }
      if (loc.distance <= limit * 1.5) return { score: 0.5, neutral: false }
      return { score: 0.1, neutral: false }
    }
  }
}

function describe(key: PreferenceKey, prefs: Preferences, loc: StudyLocation): string {
  const wanted = getOptionLabel(key, prefs[key] as never)
  switch (key) {
    case "noise":
      return `You want ${wanted.toLowerCase()} — it's ${NOISE_LABELS[loc.noise].toLowerCase()} here`
    case "crowd":
      return `You prefer ${wanted.toLowerCase()} — usually ${CROWD_LABELS[loc.crowd].toLowerCase()}`
    case "price":
      return `You chose ${wanted.toLowerCase()} — ${loc.priceNote.toLowerCase()}`
    case "wifi":
      return loc.wifi ? "Wi-Fi is available" : "No Wi-Fi at this spot"
    case "outlets":
      return `Outlets ${wanted.toLowerCase()} — ${OUTLET_LABELS[loc.outlets].toLowerCase()}`
    case "food":
      return `Food ${wanted.toLowerCase()} — ${FOOD_LABELS[loc.food].toLowerCase()}`
    case "seating":
      return `You want ${wanted.toLowerCase()} seating — ${SEATING_LABELS[loc.seating].toLowerCase()}`
    case "environment":
      return `You picked ${wanted.toLowerCase()} — this is a ${TYPE_LABELS[loc.type].toLowerCase()}`
    case "distance":
      return prefs.distance === "any"
        ? `${loc.distance} min away`
        : `Within ${wanted}? It's ${loc.distance} min away`
  }
}

export function scoreLocation(prefs: Preferences, loc: StudyLocation): ScoredLocation {
  let earned = 0
  let total = 0
  const reasons: Reason[] = (Object.keys(WEIGHTS) as PreferenceKey[]).map((key) => {
    const weight = WEIGHTS[key]
    const { score, neutral } = scoreCriterion(key, prefs, loc)
    earned += score * weight
    total += weight
    const status: ReasonStatus = neutral
      ? "neutral"
      : score >= 0.8
        ? "match"
        : score >= 0.5
          ? "partial"
          : "miss"
    return {
      key,
      label: CRITERIA_LABELS[key],
      status,
      detail: describe(key, prefs, loc),
      weight,
      score,
    }
  })

  const statusOrder: Record<ReasonStatus, number> = { match: 0, partial: 1, miss: 2, neutral: 3 }
  reasons.sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || b.weight - a.weight)

  return { location: loc, match: Math.round((earned / total) * 100), reasons }
}

export function rankLocations(prefs: Preferences): ScoredLocation[] {
  return LOCATIONS.map((loc) => scoreLocation(prefs, loc)).sort(
    (a, b) => b.match - a.match || a.location.distance - b.location.distance,
  )
}
