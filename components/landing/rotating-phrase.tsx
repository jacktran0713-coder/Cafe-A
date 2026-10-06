"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const PHRASES = [
  "study spot",
  "study space",
  "academic corner",
  "study area",
  "learning space",
  "cognitive retreat",
  "brainstorming hub",
  "intellectual hideaway",
  "scholarly sanctuary",
  "knowledge nook",
  "learning environment",
  "educational setting",
  "knowledge hub",
  "scholarly retreat",
  "educational oasis",
  "study haven",
  "learning hub",
  "knowledge zone",
  "academic oasis",
  "scholarly haven",
 
]

const INTERVAL_MS = 2600

const highlight = {
  backgroundImage:
    "linear-gradient(transparent 62%, var(--accent) 62%, var(--accent) 90%, transparent 90%)",
}

export function RotatingPhrase() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (motionQuery.matches) return

    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHRASES.length)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <span className="sr-only">study spot.</span>
      {/* All phrases share one grid cell so the heading reserves the tallest phrase and never shifts. */}
      <span aria-hidden="true" className="grid">
        {PHRASES.map((phrase, i) => (
          <span
            key={phrase}
            className={cn(
              "col-start-1 row-start-1 transition-[opacity,translate] ease-out motion-reduce:transition-none",
              i === index
                ? "translate-y-0 opacity-100 duration-500 delay-300"
                : "-translate-y-3 opacity-0 duration-300",
            )}
          >
            <span className="box-decoration-clone" style={highlight}>
              {phrase}.
            </span>
          </span>
        ))}
      </span>
    </>
  )
}
