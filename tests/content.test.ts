import { describe, expect, it } from 'vitest'
import { courses } from '../src/content/courses'
import type { Block, Localized, Week } from '../src/content/types'

/** Every module of every course, loaded the same way the app loads them. */
async function allWeeks() {
  const weeks: Week[] = []
  for (const course of courses) {
    for (const load of Object.values(course.loaders)) weeks.push(await load())
  }
  return weeks
}

function* walkBlocks(blocks: Block[]): Generator<Block> {
  for (const block of blocks) {
    yield block
    if (block.type === 'tabs') for (const tab of block.tabs) yield* walkBlocks(tab.blocks)
  }
}

function* localizedIn(week: Week): Generator<Localized> {
  yield week.cover.kicker
  yield week.cover.titleHtml
  for (const q of week.questions) {
    yield q.prompt
    yield* q.options
  }
  for (const s of week.sections) {
    yield s.navLabel
    yield s.sectionLabel
    yield s.headingHtml
    for (const b of walkBlocks(s.blocks)) {
      if (b.type === 'html' || b.type === 'box') yield b.html
      if (b.type === 'objectives' || b.type === 'takeaways') yield* b.items
    }
  }
}

describe('course content', () => {
  it('every nav item with a loader resolves to a module with matching ids', async () => {
    for (const course of courses) {
      const navIds = course.groups.flatMap((g) => g.items.map((i) => i.id))
      expect(new Set(navIds).size, `${course.id}: duplicate nav ids`).toBe(navIds.length)
      for (const [id, load] of Object.entries(course.loaders)) {
        expect(navIds, `${course.id}/${id} has a loader but no nav item`).toContain(id)
        const week = await load()
        expect(week.id).toBe(id)
        expect(week.courseId).toBe(course.id)
      }
    }
  })

  it('question ids are unique across the whole app and answers are in range', async () => {
    const seen = new Set<string>()
    for (const week of await allWeeks()) {
      for (const q of week.questions) {
        expect(seen.has(q.id), `duplicate question id ${q.id}`).toBe(false)
        seen.add(q.id)
        expect(q.id).toMatch(/^[a-z]+-q\d{3}$/)
        expect(q.weekId).toBe(week.id)
        expect(q.answer, `${q.id}: answer out of range`).toBeGreaterThanOrEqual(0)
        expect(q.answer, `${q.id}: answer out of range`).toBeLessThan(q.options.length)
      }
    }
  })

  it('every exercise block points at an existing question, and every question is used', async () => {
    for (const week of await allWeeks()) {
      const ids = new Set(week.questions.map((q) => q.id))
      const used = new Set<string>()
      for (const s of week.sections) {
        for (const b of walkBlocks(s.blocks)) {
          if (b.type === 'exercise') {
            expect(ids.has(b.questionId), `${week.id}: unknown question ${b.questionId}`).toBe(true)
            used.add(b.questionId)
          }
        }
      }
      for (const id of ids) expect(used.has(id), `${week.id}: question ${id} is never shown`).toBe(true)
    }
  })

  it('section ids are unique within a module', async () => {
    for (const week of await allWeeks()) {
      const ids = week.sections.map((s) => s.id)
      expect(new Set(ids).size, `${week.id}: duplicate section ids`).toBe(ids.length)
    }
  })

  it('every piece of text has an Arabic translation', async () => {
    for (const week of await allWeeks()) {
      for (const text of localizedIn(week)) {
        expect(text.ar, `${week.id}: missing ar for "${text.en.slice(0, 50)}"`).toBeTruthy()
      }
    }
  })

  it('every course says who it is for, in both languages', () => {
    for (const course of courses) {
      expect(course.audience?.en, course.id).toBeTruthy()
      expect(course.audience?.ar, course.id).toBeTruthy()
    }
  })
})
