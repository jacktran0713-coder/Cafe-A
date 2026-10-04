import Link from "next/link"
import { Hero } from "@/components/landing/hero"
import {
  CallToAction,
  HowItWorks,
  PreferenceStrip,
  SiteFooter,
} from "@/components/landing/features"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <>
      <SiteHeader>
        <Link
          href="/preferences"
          className={cn(buttonVariants({ variant: "outline" }), "h-9 rounded-full px-4")}
        >
          Find a spot
        </Link>
      </SiteHeader>
      <main className="flex-1">
        <Hero />
        <PreferenceStrip />
        <HowItWorks />
        <CallToAction />
      </main>
      <SiteFooter />
    </>
  )
}
