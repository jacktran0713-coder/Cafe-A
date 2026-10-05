import Link from "next/link"
import { ArrowRight, ListChecks, SlidersHorizontal, Trophy } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { ALL_QUESTIONS } from "@/lib/questions"
import { cn } from "@/lib/utils"

export function PreferenceStrip() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            We match on what actually matters to you
          </h2>
          <p className="max-w-sm text-muted-foreground">
            Every spot is scored across nine study preferences, so your results fit how you work.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {ALL_QUESTIONS.map(({ key, title, description, icon: Icon }) => (
            <li
              key={key}
              className="flex flex-col gap-3 rounded-2xl border border-border bg-background p-4 transition-transform hover:-translate-y-0.5"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-snug text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const STEPS = [
  {
    icon: ListChecks,
    title: "Answer 9 quick questions",
    body: "Pick your ideal noise level, crowd, budget, and must-haves like Wi-Fi and outlets.",
  },
  {
    icon: Trophy,
    title: "Get ranked matches",
    body: "We score every nearby spot and show you a match percentage with the reasons behind it.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tweak and explore",
    body: "Adjust filters on the fly and watch your results re-rank instantly.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-20 sm:px-6">
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight sm:text-4xl">
        How it works
      </h2>
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map(({ icon: Icon, title, body }, i) => (
          <li key={title} className="flex flex-col gap-4 rounded-3xl bg-muted p-6">
            <div className="flex items-center justify-between">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon aria-hidden="true" className="size-6" />
              </span>
              <span className="font-heading text-5xl font-bold text-border" aria-hidden="true">
                0{i + 1}
              </span>
            </div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="leading-relaxed text-muted-foreground">{body}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function CallToAction() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
      <div className="flex flex-col items-start gap-6 rounded-[2rem] bg-primary px-6 py-12 text-primary-foreground sm:px-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to lock in?</h2>
          <p className="max-w-md text-primary-foreground/80">
            Your next productive session is a minute away.
          </p>
        </div>
        <Link
          href="/preferences"
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "h-12 gap-2 rounded-full bg-accent px-6 text-base text-accent-foreground hover:bg-accent/90",
          )}
        >
          Find My Spot
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>Caf-A — made for students, by students.</p>
        <p>Location data shown is sample data for demonstration.</p>
      </div>
    </footer>
  )
}
