import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Questionnaire } from "@/components/preferences/questionnaire"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { PREFERENCE_KEYS, parsePreferences } from "@/lib/preferences"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Your study preferences — StudySpot",
  description: "Answer a few quick questions so we can match you with the best study spots.",
}

export default async function PreferencesPage({ searchParams }: PageProps<"/preferences">) {
  const params = await searchParams
  const initialPreferences = parsePreferences(params)
  const initiallyAnswered = PREFERENCE_KEYS.filter((key) => params[key] !== undefined)

  return (
    <>
      <SiteHeader>
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "ghost" }), "h-9 gap-1 rounded-full px-3")}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back
        </Link>
      </SiteHeader>
      <main className="flex-1 px-4 sm:px-6">
        <div className="mx-auto max-w-3xl pt-10 pb-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            How do you like to study?
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">
            Pick what fits you best. There are no wrong answers — you can tweak everything later.
          </p>
        </div>
        <Questionnaire
          initialPreferences={initialPreferences}
          initiallyAnswered={initiallyAnswered}
        />
      </main>
    </>
  )
}
