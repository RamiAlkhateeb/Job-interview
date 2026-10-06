import type { Block, Localized, Question, Week } from '../../content/types'

export type CardStep =
  | {
      kind: 'content'
      sectionId: string
      /** Set on a section's first card only: kicker ("Step 1") + `<h2>` markup. */
      heading?: { label: Localized; html: Localized }
      blocks: Block[]
    }
  | { kind: 'question'; sectionId: string; question: Question }

/** A card-layout module as a flat run of steps: for each section, its content split on `cardBreak`,
 *  then that section's exercises as question cards — so nothing is asked before it has been taught. */
export function toCardSteps(week: Week): CardStep[] {
  const steps: CardStep[] = []
  for (const section of week.sections) {
    const chunks: Block[][] = [[]]
    const questions: Question[] = []
    for (const block of section.blocks) {
      if (block.type === 'cardBreak') chunks.push([])
      else if (block.type === 'exercise') {
        const question = week.questions.find((q) => q.id === block.questionId)
        if (question) questions.push(question)
      } else chunks.at(-1)!.push(block)
    }
    const heading = { label: section.sectionLabel, html: section.headingHtml }
    // A section whose only content is its heading still gets one card, so the heading is shown.
    const cards = chunks.filter((c) => c.length > 0)
    if (cards.length === 0) cards.push([])
    cards.forEach((blocks, i) =>
      steps.push({ kind: 'content', sectionId: section.id, heading: i === 0 ? heading : undefined, blocks }),
    )
    for (const question of questions) steps.push({ kind: 'question', sectionId: section.id, question })
  }
  return steps
}
