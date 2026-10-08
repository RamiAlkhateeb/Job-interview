import type { Block, Localized, Question, Week } from '../../content/types'
import { toCards } from './chunks'

/** Most content cards in one lesson; a longer section is split into balanced parts. */
export const MAX_CARDS = 7

export type CardStep =
  | {
      kind: 'content'
      sectionId: string
      /** On a lesson's first card: kicker ("Step 1"), plus the section's `<h2>` markup on its first part. */
      heading?: { label: Localized; html?: Localized }
      blocks: Block[]
    }
  | { kind: 'question'; sectionId: string; question: Question }

/** One roadmap node: a short run of small cards from one section, then the questions on what it taught. */
export interface Lesson {
  /** Stable within the module: the section id, or `${sectionId}-${part}` when the section is split. */
  id: string
  sectionId: string
  /** 1-based part of the section, and how many parts it has. */
  part: number
  parts: number
  title: Localized
  steps: CardStep[]
}

/** Every lesson of a module, in reading order. */
export function lessonsFor(week: Week): Lesson[] {
  const lessons: Lesson[] = []
  for (const section of week.sections) {
    const { cards, exercises } = toCards(section.blocks)
    if (cards.length === 0) cards.push([]) // heading-only section: still one card to show the heading
    const parts = Math.ceil(cards.length / MAX_CARDS)
    const size = Math.ceil(cards.length / parts) // balanced, e.g. 9 cards → 5 + 4, not 7 + 2
    const partOf = (card: number) => Math.min(Math.floor(Math.max(card, 0) / size), parts - 1)

    for (let p = 0; p < parts; p++) {
      const steps: CardStep[] = cards.slice(p * size, (p + 1) * size).map((blocks, i) => ({
        kind: 'content' as const,
        sectionId: section.id,
        heading: i > 0 ? undefined : { label: section.sectionLabel, html: p === 0 ? section.headingHtml : undefined },
        blocks,
      }))
      for (const ex of exercises) {
        if (partOf(ex.afterCard) !== p) continue
        const question = week.questions.find((q) => q.id === ex.questionId)
        if (question) steps.push({ kind: 'question', sectionId: section.id, question })
      }
      lessons.push({
        id: parts === 1 ? section.id : `${section.id}-${p + 1}`,
        sectionId: section.id,
        part: p + 1,
        parts,
        title: section.navLabel,
        steps,
      })
    }
  }
  return lessons
}

/** Progress key of a lesson (see `lessonsDone` in src/features/progress/store.ts). */
export const lessonKey = (courseId: string, moduleId: string, lessonId: string) => `${courseId}/${moduleId}/${lessonId}`

/** URL of a roadmap lesson (the quiz-only practice run is `practiceHref` in src/content/courses.ts). */
export const learnHref = (courseId: string, moduleId: string, lessonId: string) =>
  `/course/${courseId}/${moduleId}/learn/${lessonId}`
