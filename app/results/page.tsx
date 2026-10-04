import type { Metadata } from "next"
import { ResultsExplorer } from "@/components/results/results-explorer"
import { SiteFooter } from "@/components/landing/features"
import { SiteHeader } from "@/components/site-header"
import { parsePreferences } from "@/lib/preferences"

export const metadata: Metadata = {
  title: "Your matches — StudySpot",
  description: "Study spots ranked by how well they match your preferences.",
}

export default async function ResultsPage({ searchParams }: PageProps<"/results">) {
  const initialPreferences = parsePreferences(await searchParams)

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <ResultsExplorer initialPreferences={initialPreferences} />
      </main>
      <SiteFooter />
    </>
  )
}
