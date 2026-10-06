import { describe, expect, it } from 'vitest'
import { courses } from '../src/content/courses'
import type { Week } from '../src/content/types'
import { toCardSteps } from '../src/features/lesson/cardSteps'

async function cardWeeks() {
  const weeks: Week[] = []
  for (const course of courses) for (const load of Object.values(course.loaders)) weeks.push(await load())
  return weeks.filter((w) => w.layout === 'cards')
}

describe('card lessons', () => {
  it('the Resume module is the card-layout sample', async () => {
    expect((await cardWeeks()).map((w) => w.id)).toContain('resume')
  })

  it('asks every question exactly once, after content from its own section', async () => {
    for (const week of await cardWeeks()) {
      const steps = toCardSteps(week)
      const asked = steps.flatMap((s) => (s.kind === 'question' ? [s.question.id] : []))
      expect(asked.sort(), week.id).toEqual(week.questions.map((q) => q.id).sort())
      expect(steps[0].kind, `${week.id} must open on a content card`).toBe('content')
      steps.forEach((step, i) => {
        if (step.kind !== 'question') return
        const taught = steps.slice(0, i).some((s) => s.kind === 'content' && s.sectionId === step.sectionId)
        expect(taught, `${step.question.id} is asked before its section is shown`).toBe(true)
      })
    }
  })

  it('gives each section a heading card and no empty cards', async () => {
    for (const week of await cardWeeks()) {
      const steps = toCardSteps(week)
      for (const section of week.sections) {
        const cards = steps.filter((s) => s.kind === 'content' && s.sectionId === section.id)
        expect(cards[0], `${week.id}/${section.id}`).toMatchObject({ heading: { html: section.headingHtml } })
        for (const card of cards) if (card.kind === 'content') expect(card.heading || card.blocks.length > 0).toBeTruthy()
        expect(cards.filter((c) => c.kind === 'content' && c.heading)).toHaveLength(1)
      }
    }
  })

  it('splits on cardBreak and moves exercises after the content', () => {
    const week = {
      id: 'w', courseId: 'c', order: 1, layout: 'cards', questions: [{ id: 'x-q001', weekId: 'w', prompt: { en: 'q' }, options: [{ en: 'a' }], answer: 0 }],
      cover: { kicker: { en: '' }, titleHtml: { en: '' }, timeEstimate: { en: '' } },
      sections: [
        {
          id: 's', navLabel: { en: '' }, sectionLabel: { en: 'S' }, headingHtml: { en: '<h2>S</h2>' },
          blocks: [
            { type: 'html', html: { en: 'one' } },
            { type: 'exercise', questionId: 'x-q001' },
            { type: 'cardBreak' },
            { type: 'cardBreak' },
            { type: 'html', html: { en: 'two' } },
          ],
        },
      ],
    } satisfies Week
    expect(toCardSteps(week).map((s) => (s.kind === 'content' ? s.blocks.length : s.question.id))).toEqual([1, 1, 'x-q001'])
  })
})
