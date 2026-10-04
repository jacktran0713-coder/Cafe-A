import {
  Armchair,
  Building2,
  Coffee,
  Footprints,
  Library,
  MapPin,
  Plug,
  School,
  Shuffle,
  Trees,
  User,
  Users,
  UsersRound,
  Volume1,
  Volume2,
  VolumeX,
  Volume,
  Wallet,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react"
import {
  CROWD_OPTIONS,
  DISTANCE_OPTIONS,
  ENVIRONMENT_OPTIONS,
  NEED_OPTIONS,
  NOISE_OPTIONS,
  PRICE_OPTIONS,
  SEATING_OPTIONS,
  WIFI_OPTIONS,
  type Option,
  type PreferenceKey,
} from "./preferences"

export type Question = {
  key: PreferenceKey
  title: string
  description: string
  icon: LucideIcon
  control: "choice" | "slider"
  options: Option<string>[]
  optionIcons?: Record<string, LucideIcon>
}

export type QuestionSection = {
  id: string
  title: string
  description: string
  questions: Question[]
}

export const QUESTION_SECTIONS: QuestionSection[] = [
  {
    id: "vibe",
    title: "The vibe",
    description: "How should your spot feel?",
    questions: [
      {
        key: "noise",
        title: "Noise level",
        description: "How much sound can you handle while studying?",
        icon: Volume2,
        control: "slider",
        options: NOISE_OPTIONS,
        optionIcons: { silent: VolumeX, quiet: Volume, moderate: Volume1, social: Volume2 },
      },
      {
        key: "crowd",
        title: "Crowdedness",
        description: "How many people do you want around?",
        icon: Users,
        control: "choice",
        options: CROWD_OPTIONS,
        optionIcons: { empty: User, moderate: Users, busy: UsersRound },
      },
      {
        key: "environment",
        title: "Study environment",
        description: "What kind of place do you like?",
        icon: Building2,
        control: "choice",
        options: ENVIRONMENT_OPTIONS,
        optionIcons: {
          library: Library,
          cafe: Coffee,
          campus: School,
          outdoor: Trees,
          any: Shuffle,
        },
      },
    ],
  },
  {
    id: "essentials",
    title: "The essentials",
    description: "What do you need to get work done?",
    questions: [
      {
        key: "wifi",
        title: "Wi-Fi",
        description: "Do you need to be online?",
        icon: Wifi,
        control: "choice",
        options: WIFI_OPTIONS,
        optionIcons: { required: Wifi, "not-required": WifiOff },
      },
      {
        key: "outlets",
        title: "Outlets",
        description: "Will your laptop need a charge?",
        icon: Plug,
        control: "choice",
        options: NEED_OPTIONS,
      },
      {
        key: "food",
        title: "Food & drinks",
        description: "Snacks and caffeine nearby?",
        icon: Coffee,
        control: "choice",
        options: NEED_OPTIONS,
      },
    ],
  },
  {
    id: "logistics",
    title: "The logistics",
    description: "Budget, seating, and how far you'll go.",
    questions: [
      {
        key: "price",
        title: "Price",
        description: "How much are you willing to spend?",
        icon: Wallet,
        control: "choice",
        options: PRICE_OPTIONS,
      },
      {
        key: "seating",
        title: "Seating",
        description: "Solo session or group study?",
        icon: Armchair,
        control: "choice",
        options: SEATING_OPTIONS,
        optionIcons: { individual: User, group: Users, either: Shuffle },
      },
      {
        key: "distance",
        title: "Distance",
        description: "How far are you willing to walk?",
        icon: Footprints,
        control: "slider",
        options: DISTANCE_OPTIONS,
        optionIcons: { "5": MapPin, "10": MapPin, "20": MapPin, any: MapPin },
      },
    ],
  },
]

export const ALL_QUESTIONS = QUESTION_SECTIONS.flatMap((s) => s.questions)
