import Link from "next/link"
import { BookOpen } from "lucide-react"
import type { ReactNode } from "react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-lg" aria-label="StudySpot home">
      <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
        <BookOpen aria-hidden="true" className="size-5" />
      </span>
      <span className="font-heading text-xl font-bold tracking-tight">Caf-A</span>
    </Link>
  )
}

export function SiteHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        {children}
      </div>
    </header>
  )
}
