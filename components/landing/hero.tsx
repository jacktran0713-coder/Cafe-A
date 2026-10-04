import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plug, Sparkles, Volume, Wifi } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 md:pt-20 lg:grid-cols-2 lg:gap-16">
      <div className="flex flex-col items-start gap-6 animate-rise">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
          <Sparkles aria-hidden="true" className="size-4 text-primary" />
          For high school & college students
        </span>
        <h1 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
          Find your perfect{" "}
          <span className="relative inline-block">
            <span className="relative z-10">study spot.</span>
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-1 z-0 h-4 -rotate-1 rounded-sm bg-accent sm:h-5"
            />
          </span>
        </h1>
        <p className="max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground">
          Tell us how you like to study — quiet or social, solo or group, near or far — and
          we&apos;ll match you with the best libraries, cafes, and campus spaces around you.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/preferences"
            className={cn(buttonVariants(), "h-12 gap-2 rounded-full px-6 text-base")}
          >
            Get Started
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            href="#how-it-works"
            className={cn(buttonVariants({ variant: "ghost" }), "h-12 rounded-full px-5 text-base")}
          >
            How it works
          </a>
        </div>
        <p className="text-sm text-muted-foreground">
          9 questions · Under a minute · No sign-up needed
        </p>
      </div>

      <div className="relative animate-rise [animation-delay:120ms]">
        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/10">
          <Image
            src="/images/hero.png"
            alt="Illustration of a student studying at a cozy desk with a laptop, books, and coffee"
            width={1024}
            height={1024}
            priority
            className="aspect-square h-auto w-full object-cover"
          />
        </div>

        <div className="absolute -bottom-6 -left-2 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 pr-5 shadow-lg sm:-left-8">
          <span className="flex size-12 items-center justify-center rounded-xl bg-accent font-heading text-lg font-bold text-accent-foreground">
            96%
          </span>
          <div className="flex flex-col">
            <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Best match
            </span>
            <span className="font-heading font-semibold">Hartwell Library</span>
          </div>
        </div>

        <ul
          className="absolute -top-4 -right-2 flex flex-col gap-2 rounded-2xl border border-border bg-card p-3 text-sm shadow-lg sm:-right-6"
          aria-label="Example matched features"
        >
          <li className="flex items-center gap-2">
            <Volume aria-hidden="true" className="size-4 text-primary" /> Quiet
          </li>
          <li className="flex items-center gap-2">
            <Wifi aria-hidden="true" className="size-4 text-primary" /> Fast Wi-Fi
          </li>
          <li className="flex items-center gap-2">
            <Plug aria-hidden="true" className="size-4 text-primary" /> Outlets
          </li>
        </ul>
      </div>
    </section>
  )
}
