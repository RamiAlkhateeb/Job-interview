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

describe('lesson time, recap and next lesson', () => {
  it('estimates at least a minute per lesson, more for longer ones', async () => {
    const { lessonMinutes } = await import('../src/features/lesson/lessons')
    for (const week of await allWeeks()) {
      for (const lesson of lessonsFor(week)) expect(lessonMinutes(lesson), `${week.id}/${lesson.id}`).toBeGreaterThanOrEqual(1)
    }
    const short = { id: 'a', sectionId: 's', part: 1, parts: 1, title: { en: '' }, steps: [{ kind: 'content' as const, sectionId: 's', blocks: [{ type: 'html' as const, html: { en: 'word '.repeat(150) } }] }] }
    const long = { ...short, steps: [{ ...short.steps[0], blocks: [{ type: 'html' as const, html: { en: 'word '.repeat(900) } }] }] }
    expect(lessonMinutes(short)).toBe(1)
    expect(lessonMinutes(long)).toBe(5)
  })

  it('recaps with the takeaways block if a lesson has one, else its bold terms (deduped, at most 6)', async () => {
    const { lessonRecap } = await import('../src/features/lesson/lessons')
    const lesson = (blocks: import('../src/content/types').Block[]) => ({
      id: 'a', sectionId: 's', part: 1, parts: 1, title: { en: '' },
      steps: [{ kind: 'content' as const, sectionId: 's', blocks }],
    })
    const takeaways = { type: 'takeaways' as const, label: { en: 'K' }, items: [{ en: 'one', ar: 'واحد' }] }
    expect(lessonRecap(lesson([{ type: 'html', html: { en: '<strong>x</strong>' } }, takeaways]))).toEqual({ kind: 'takeaways', items: takeaways.items })
    const html = { en: '<p><strong>ATS</strong> and <strong>keywords</strong>, <strong>ATS</strong></p>', ar: '<p><strong>ATS</strong> و<strong>الكلمات</strong>، <strong>ATS</strong></p>' }
    expect(lessonRecap(lesson([{ type: 'html', html }]))).toEqual({
      kind: 'terms',
      items: [{ en: 'ATS', ar: 'ATS' }, { en: 'keywords', ar: 'الكلمات' }],
    })
    expect(lessonRecap(lesson([{ type: 'html', html: { en: '<p>plain</p>' } }]))).toBeNull()
  })

  it('continues a course in the chapter already started, else the first unfinished one', async () => {
    const { nextInCourse, lessonKey } = await import('../src/features/lesson/lessons')
    const weeks = (await allWeeks()).filter((w) => w.courseId === 'tech-interview')
    expect(nextInCourse('tech-interview', weeks, [])).toMatchObject({ week: { id: 'resume' }, lesson: { id: 'overview' } })
    const started = [lessonKey('tech-interview', 'dsa', 'approach')]
    expect(nextInCourse('tech-interview', weeks, started)).toMatchObject({ week: { id: 'dsa' }, lesson: { id: 'big-o' } })
    const all = weeks.flatMap((w) => lessonsFor(w).map((l) => lessonKey('tech-interview', w.id, l.id)))
    expect(nextInCourse('tech-interview', weeks, all)).toBeNull()
  })
})
