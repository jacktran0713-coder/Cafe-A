
"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import { sendGAEvent } from "@next/third-parties/google"

export function PremiumBanner() {
  const [showSurvey, setShowSurvey] = useState(false)

  return (
    <section className="mx-auto mb-6 w-full max-w-5xl px-4">
      <div className="flex flex-col gap-4 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Get more out of Caf-A
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Would personalized recommendations and focus tools be worth
            $3.99/month to you? Help us test the idea.
          </p>
        </div>

        <button
          onClick={() =>  {
            track("premium_button_clicked")
            sendGAEvent("event", "premium_button_clicked")
            setShowSurvey(true)
          }} 
          className="shrink-0 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
        > 
          Explore Caf-A Plus
        </button>

    
      </div>

      {showSurvey && (
        <div
          className="mt-4 rounded-2xl border bg-white p-5 shadow-sm"
          role="dialog"
          aria-labelledby="survey-title"
        >
          <div className="flex items-center justify-between gap-4">
            <h3 id="survey-title" className="text-lg font-bold">
              Help us improve Caf-A
            </h3>
            <button
              onClick={() => setShowSurvey(false)}
              className="rounded-lg px-3 py-1 text-slate-600 hover:bg-slate-100"
              aria-label="Close survey"
            >
              ✕
            </button>
          </div>

          <p className="mt-2 text-sm text-slate-600">
            We're students testing a business idea. Your answers will help us
            decide which features to build.
          </p>

          <a
            href="https://forms.gle/hcnq351pp2ArcB9k7"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Take our 1-minute survey
          </a>

          <p className="mt-3 text-xs text-slate-500">
            No payment required. Your feedback helps us understand what
            students want.
          </p>
        </div>
      )}
    </section>
  )
}
