export type Noise = "silent" | "quiet" | "moderate" | "social"
export type Crowd = "empty" | "moderate" | "busy"
export type PricePref = "free" | "cheap" | "any"
export type WifiPref = "required" | "not-required"
export type Need = "required" | "preferred" | "any"
export type SeatingPref = "individual" | "group" | "either"
export type Environment = "library" | "cafe" | "campus" | "outdoor"
export type EnvironmentPref = Environment | "any"
export type DistancePref = "5" | "10" | "20" | "any"

export type Preferences = {
  noise: Noise
  crowd: Crowd
  price: PricePref
  wifi: WifiPref
  outlets: Need
  food: Need
  seating: SeatingPref
  environment: EnvironmentPref
  distance: DistancePref
}

export type PreferenceKey = keyof Preferences

export type Option<V extends string> = {
  value: V
  label: string
  hint?: string
}

export const NOISE_OPTIONS: Option<Noise>[] = [
  { value: "silent", label: "Silent", hint: "Pin-drop quiet" },
  { value: "quiet", label: "Quiet", hint: "Soft whispers" },
  { value: "moderate", label: "Moderate", hint: "Background hum" },
  { value: "social", label: "Social", hint: "Chatter is fine" },
]

export const CROWD_OPTIONS: Option<Crowd>[] = [
  { value: "empty", label: "Empty", hint: "Plenty of space" },
  { value: "moderate", label: "Moderate", hint: "Some company" },
  { value: "busy", label: "Busy", hint: "I like the buzz" },
]

export const PRICE_OPTIONS: Option<PricePref>[] = [
  { value: "free", label: "Free", hint: "$0 to sit" },
  { value: "cheap", label: "Cheap", hint: "Under $5" },
  { value: "any", label: "Any", hint: "Price doesn't matter" },
]

export const WIFI_OPTIONS: Option<WifiPref>[] = [
  { value: "required", label: "Required", hint: "I need to be online" },
  { value: "not-required", label: "Not required", hint: "Offline is fine" },
]

export const NEED_OPTIONS: Option<Need>[] = [
  { value: "required", label: "Required" },
  { value: "preferred", label: "Preferred" },
  { value: "any", label: "Doesn't matter" },
]

export const SEATING_OPTIONS: Option<SeatingPref>[] = [
  { value: "individual", label: "Individual", hint: "Solo desk" },
  { value: "group", label: "Group", hint: "Shared tables" },
  { value: "either", label: "Either", hint: "Flexible" },
]

export const ENVIRONMENT_OPTIONS: Option<EnvironmentPref>[] = [
  { value: "library", label: "Library" },
  { value: "cafe", label: "Cafe" },
  { value: "campus", label: "Campus" },
  { value: "outdoor", label: "Outdoor" },
  { value: "any", label: "Any" },
]

export const DISTANCE_OPTIONS: Option<DistancePref>[] = [
  { value: "5", label: "5 min" },
  { value: "10", label: "10 min" },
  { value: "20", label: "20 min" },
  { value: "any", label: "Any" },
]

export const DEFAULT_PREFERENCES: Preferences = {
  noise: "quiet",
  crowd: "moderate",
  price: "any",
  wifi: "required",
  outlets: "preferred",
  food: "any",
  seating: "either",
  environment: "any",
  distance: "any",
}

const OPTIONS_BY_KEY: { [K in PreferenceKey]: Option<Preferences[K]>[] } = {
  noise: NOISE_OPTIONS,
  crowd: CROWD_OPTIONS,
  price: PRICE_OPTIONS,
  wifi: WIFI_OPTIONS,
  outlets: NEED_OPTIONS,
  food: NEED_OPTIONS,
  seating: SEATING_OPTIONS,
  environment: ENVIRONMENT_OPTIONS,
  distance: DISTANCE_OPTIONS,
}

export const PREFERENCE_KEYS = Object.keys(OPTIONS_BY_KEY) as PreferenceKey[]

export function getOptionLabel<K extends PreferenceKey>(key: K, value: Preferences[K]) {
  return OPTIONS_BY_KEY[key].find((o) => o.value === value)?.label ?? value
}

type SearchParamsLike = Record<string, string | string[] | undefined>

export function parsePreferences(params: SearchParamsLike): Preferences {
  const result = { ...DEFAULT_PREFERENCES }
  for (const key of PREFERENCE_KEYS) {
    const raw = params[key]
    const value = Array.isArray(raw) ? raw[0] : raw
    const valid = OPTIONS_BY_KEY[key].some((o) => o.value === value)
    if (valid) {
      ;(result as Record<PreferenceKey, string>)[key] = value as string
    }
  }
  return result
}

export function preferencesToQuery(prefs: Preferences) {
  return new URLSearchParams(prefs as Record<string, string>).toString()
}
