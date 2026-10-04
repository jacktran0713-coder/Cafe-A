"use client"

import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"
import { ChoiceGroup } from "@/components/choice-group"
import { StepSlider } from "@/components/step-slider"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  preferencesToQuery,
  type PreferenceKey,
  type Preferences,
} from "@/lib/preferences"
import { ALL_QUESTIONS, QUESTION_SECTIONS, type Question } from "@/lib/questions"
import { cn } from "@/lib/utils"

type QuestionnaireProps = {
  initialPreferences: Preferences
  initiallyAnswered: PreferenceKey[]
}

export function Questionnaire({ initialPreferences, initiallyAnswered }: QuestionnaireProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [prefs, setPrefs] = useState(initialPreferences)
  const [answered, setAnswered] = useState(() => new Set(initiallyAnswered))

  const total = ALL_QUESTIONS.length
  const answeredCount = answered.size
  const percent = Math.round((answeredCount / total) * 100)

  function update(key: PreferenceKey, value: string) {
    setPrefs((prev) => ({ ...prev, [key]: value }))
    setAnswered((prev) => new Set(prev).add(key))
  }

  function submit() {
    startTransition(() => {
      router.push(`/results?${preferencesToQuery(prefs)}`)
    })
  }

  let questionNumber = 0

  return (
    <div className="flex flex-col">
      <div className="sticky top-16 z-30 -mx-4 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <Progress
            value={percent}
            aria-label="Questionnaire progress"
            className="flex-1 [&_[data-slot=progress-track]]:h-2"
          />
          <span className="shrink-0 text-sm font-medium tabular-nums text-muted-foreground">
            {answeredCount} of {total} answered
          </span>
        </div>
        <nav aria-label="Sections" className="mx-auto mt-2 flex max-w-3xl gap-2">
          {QUESTION_SECTIONS.map((section) => {
            const done = section.questions.every((q) => answered.has(q.key))
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  done
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground",
                )}
              >
                {done && <Check aria-hidden="true" className="size-3" />}
                {section.title}
              </a>
            )
          })}
        </nav>
      </div>

      <form
        className="mx-auto flex w-full max-w-3xl flex-col gap-12 py-10"
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
      >
        {QUESTION_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="flex scroll-mt-40 flex-col gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
              <p className="text-muted-foreground">{section.description}</p>
            </div>
            {section.questions.map((question) => {
              questionNumber += 1
              return (
                <QuestionCard
                  key={question.key}
                  number={questionNumber}
                  question={question}
                  value={prefs[question.key]}
                  answered={answered.has(question.key)}
                  onChange={(v) => update(question.key, v)}
                />
              )
            })}
          </section>
        ))}

        <div className="sticky bottom-4 z-20 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:flex-row sm:justify-between">
          <p className="text-center text-sm text-muted-foreground sm:text-left">
            {answeredCount === total
              ? "All set! Let's find your spot."
              : "Unanswered questions use sensible defaults."}
          </p>
          <Button
            type="submit"
            disabled={isPending}
            className="h-12 w-full gap-2 rounded-full px-8 text-base sm:w-auto"
          >
            {isPending ? (
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
            ) : null}
            Find My Spot
            {!isPending && <ArrowRight aria-hidden="true" className="size-4" />}
          </Button>
        </div>
      </form>
    </div>
  )
}

type QuestionCardProps = {
  number: number
  question: Question
  value: string
  answered: boolean
  onChange: (value: string) => void
}

function QuestionCard({ number, question, value, answered, onChange }: QuestionCardProps) {
  const Icon = question.icon
  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl border bg-card p-5 transition-colors sm:p-6",
        answered ? "border-primary/30" : "border-border",
      )}
    >
      <div className="flex items-start gap-4">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors",
            answered ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
          )}
        >
          {answered ? (
            <Check aria-hidden="true" className="size-5" />
          ) : (
            <Icon aria-hidden="true" className="size-5" />
          )}
        </span>
        <div className="flex flex-col">
          <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Question {number}
          </span>
          <h3 className="text-lg font-semibold">{question.title}</h3>
          <p className="text-sm text-muted-foreground">{question.description}</p>
        </div>
      </div>

      {question.control === "slider" ? (
        <StepSlider
          label={question.title}
          options={question.options}
          value={value}
          onChange={onChange}
          optionIcons={question.optionIcons}
        />
      ) : (
        <ChoiceGroup
          name={question.key}
          legend={question.title}
          options={question.options}
          value={answered ? value : ""}
          onChange={onChange}
          optionIcons={question.optionIcons}
        />
      )}
    </div>
  )
}
