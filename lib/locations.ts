import type { Environment } from "./preferences"

export type NoiseLevel = 0 | 1 | 2 | 3
export type CrowdLevel = 0 | 1 | 2
export type PriceLevel = "free" | "cheap" | "paid"
export type Availability = "none" | "some" | "plenty"
export type FoodAvailability = "none" | "nearby" | "onsite"
export type Seating = "individual" | "group" | "both"

export type StudyLocation = {
  id: string
  name: string
  type: Environment
  neighborhood: string
  image: string
  noise: NoiseLevel
  crowd: CrowdLevel
  price: PriceLevel
  priceNote: string
  wifi: boolean
  outlets: Availability
  food: FoodAvailability
  seating: Seating
  distance: number
  hours: string
  description: string
  highlights: string[]
}

export const NOISE_LABELS = ["Silent", "Quiet", "Moderate", "Social"] as const
export const CROWD_LABELS = ["Empty", "Moderate", "Busy"] as const
export const PRICE_LABELS: Record<PriceLevel, string> = {
  free: "Free",
  cheap: "Cheap",
  paid: "Paid",
}
export const OUTLET_LABELS: Record<Availability, string> = {
  none: "No outlets",
  some: "Some outlets",
  plenty: "Plenty of outlets",
}
export const FOOD_LABELS: Record<FoodAvailability, string> = {
  none: "No food",
  nearby: "Food nearby",
  onsite: "Food on-site",
}
export const SEATING_LABELS: Record<Seating, string> = {
  individual: "Individual seats",
  group: "Group tables",
  both: "Solo & group",
}
export const TYPE_LABELS: Record<Environment, string> = {
  library: "Library",
  cafe: "Cafe",
  campus: "Campus",
  outdoor: "Outdoor",
}

export const LOCATIONS: StudyLocation[] = [
  {
    id: "hartwell-library",
    name: "Hartwell Library — 4th Floor",
    type: "library",
    neighborhood: "North Campus",
    image: "/images/hartwell-library.png",
    noise: 0,
    crowd: 0,
    price: "free",
    priceNote: "Free with student ID",
    wifi: true,
    outlets: "plenty",
    food: "none",
    seating: "individual",
    distance: 8,
    hours: "7am – 2am",
    description:
      "A designated silent floor with lamp-lit carrels and tall windows. The go-to spot for deep focus before exams.",
    highlights: ["Silent floor policy", "Outlets at every carrel", "Open late"],
  },
  {
    id: "bean-byte-cafe",
    name: "Bean & Byte Café",
    type: "cafe",
    neighborhood: "College Ave",
    image: "/images/bean-byte-cafe.png",
    noise: 2,
    crowd: 2,
    price: "cheap",
    priceNote: "Drip coffee from $2.50",
    wifi: true,
    outlets: "some",
    food: "onsite",
    seating: "both",
    distance: 6,
    hours: "6:30am – 10pm",
    description:
      "A lively student favorite with fast Wi-Fi, strong espresso, and a steady background buzz that keeps you moving.",
    highlights: ["Student discount", "Fast Wi-Fi", "Pastries & sandwiches"],
  },
  {
    id: "student-union",
    name: "Student Union Commons",
    type: "campus",
    neighborhood: "Central Campus",
    image: "/images/student-union.png",
    noise: 3,
    crowd: 2,
    price: "free",
    priceNote: "Free",
    wifi: true,
    outlets: "plenty",
    food: "onsite",
    seating: "group",
    distance: 4,
    hours: "7am – midnight",
    description:
      "Big round tables, booths, and a food court downstairs. Perfect for group projects and study sessions with friends.",
    highlights: ["Bookable booths", "Food court", "Close to classes"],
  },
  {
    id: "maple-courtyard",
    name: "Maple Grove Courtyard",
    type: "outdoor",
    neighborhood: "Arts Quad",
    image: "/images/maple-courtyard.png",
    noise: 1,
    crowd: 0,
    price: "free",
    priceNote: "Free",
    wifi: true,
    outlets: "none",
    food: "nearby",
    seating: "both",
    distance: 12,
    hours: "Open 24/7",
    description:
      "Shaded picnic tables under maple trees with campus Wi-Fi coverage. Calm, breezy, and great for reading.",
    highlights: ["Campus Wi-Fi reaches", "Shaded seating", "Food truck nearby"],
  },
  {
    id: "engineering-pods",
    name: "Engineering Hall Study Pods",
    type: "campus",
    neighborhood: "East Campus",
    image: "/images/engineering-pods.png",
    noise: 1,
    crowd: 1,
    price: "free",
    priceNote: "Free, reservable",
    wifi: true,
    outlets: "plenty",
    food: "nearby",
    seating: "group",
    distance: 9,
    hours: "8am – 11pm",
    description:
      "Glass-walled pods with whiteboards and screens. Reserve one for a focused group session without the noise.",
    highlights: ["Whiteboards & screens", "Reservable rooms", "Acoustic panels"],
  },
  {
    id: "inkwell-tea",
    name: "Inkwell Tea House",
    type: "cafe",
    neighborhood: "Elm Street",
    image: "/images/inkwell-tea.png",
    noise: 1,
    crowd: 0,
    price: "cheap",
    priceNote: "Pots of tea from $4",
    wifi: true,
    outlets: "some",
    food: "onsite",
    seating: "individual",
    distance: 15,
    hours: "9am – 9pm",
    description:
      "A calm, plant-filled tea house with window seats and unhurried staff. Rarely crowded on weekday afternoons.",
    highlights: ["Window seating", "Calm playlist", "Loose-leaf tea"],
  },
  {
    id: "riverside-library",
    name: "Riverside Public Library",
    type: "library",
    neighborhood: "Riverside",
    image: "/images/riverside-library.png",
    noise: 1,
    crowd: 1,
    price: "free",
    priceNote: "Free",
    wifi: true,
    outlets: "some",
    food: "nearby",
    seating: "both",
    distance: 18,
    hours: "9am – 8pm",
    description:
      "Airy public library with river views, lounge chairs, and long study tables. A nice change of scenery from campus.",
    highlights: ["River views", "Printing available", "Quiet zones"],
  },
  {
    id: "daily-grind",
    name: "The Daily Grind Cowork",
    type: "cafe",
    neighborhood: "Downtown",
    image: "/images/daily-grind-cowork.png",
    noise: 2,
    crowd: 1,
    price: "paid",
    priceNote: "$8 day pass",
    wifi: true,
    outlets: "plenty",
    food: "onsite",
    seating: "both",
    distance: 25,
    hours: "7am – 11pm",
    description:
      "A coworking café with power at every seat, unlimited coffee on a day pass, and a productive, focused vibe.",
    highlights: ["Unlimited coffee", "Power at every seat", "Phone booths"],
  },
  {
    id: "lakeview-pavilion",
    name: "Lakeview Park Pavilion",
    type: "outdoor",
    neighborhood: "Lakeview",
    image: "/images/lakeview-pavilion.png",
    noise: 2,
    crowd: 0,
    price: "free",
    priceNote: "Free",
    wifi: false,
    outlets: "none",
    food: "none",
    seating: "group",
    distance: 22,
    hours: "Sunrise – sunset",
    description:
      "A covered lakeside pavilion with big picnic tables. Unplug, spread out your notes, and enjoy the fresh air.",
    highlights: ["Lake views", "Covered from rain", "Great for flashcards"],
  },
]
