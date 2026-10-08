import { describe, expect, it } from 'vitest'
import { courses } from '../src/content/courses'
import type { Week } from '../src/content/types'
import { lessonsFor, MAX_CARDS } from '../src/features/lesson/lessons'

async function allWeeks() {
  const weeks: Week[] = []
  for (const course of courses) for (const load of Object.values(course.loaders)) weeks.push(await load())
  return weeks
}

describe('roadmap lessons (every module)', () => {
  it('asks every question exactly once, after content of the same lesson', async () => {
    for (const week of await allWeeks()) {
      const asked: string[] = []
      for (const lesson of lessonsFor(week)) {
        let shown = 0
        for (const step of lesson.steps) {
          if (step.kind === 'content') shown++
          else {
            expect(shown, `${week.id}/${lesson.id}: ${step.question.id} asked before any card`).toBeGreaterThan(0)
            asked.push(step.question.id)
          }
        }
      }
      expect(asked.sort(), week.id).toEqual(week.questions.map((q) => q.id).sort())
    }
  })

  it('keeps lessons short, with unique ids, one per section part', async () => {
    for (const week of await allWeeks()) {
      const lessons = lessonsFor(week)
      const ids = lessons.map((l) => l.id)
      expect(new Set(ids).size, `${week.id}: duplicate lesson ids`).toBe(ids.length)
      for (const lesson of lessons) {
        const cards = lesson.steps.filter((s) => s.kind === 'content')
        expect(cards.length, `${week.id}/${lesson.id}`).toBeGreaterThan(0)
        expect(cards.length, `${week.id}/${lesson.id}`).toBeLessThanOrEqual(MAX_CARDS)
        expect(lesson.part).toBeLessThanOrEqual(lesson.parts)
      }
      expect(new Set(lessons.map((l) => l.sectionId)).size).toBe(week.sections.length)
    }
  })

  it('opens each section with its heading, and later parts with its label', async () => {
    for (const week of await allWeeks()) {
      for (const lesson of lessonsFor(week)) {
        const section = week.sections.find((s) => s.id === lesson.sectionId)!
        const first = lesson.steps[0]
        expect(first.kind).toBe('content')
        if (first.kind !== 'content') continue
        expect(first.heading?.label).toEqual(section.sectionLabel)
        expect(first.heading?.html, `${week.id}/${lesson.id}`).toEqual(lesson.part === 1 ? section.headingHtml : undefined)
      }
    }
  })

  it('cuts content into cards without losing Arabic', async () => {
    for (const week of await allWeeks()) {
      for (const lesson of lessonsFor(week)) {
        for (const step of lesson.steps) {
          if (step.kind !== 'content') continue
          for (const b of step.blocks) if (b.type === 'html') expect(b.html.ar, `${week.id}/${lesson.id}`).toBeTruthy()
        }
      }
    }
  })
})
