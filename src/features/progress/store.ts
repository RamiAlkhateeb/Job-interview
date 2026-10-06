// Guest-mode progress, kept in this browser's localStorage. No account, no backend.
// Every reader/writer goes through this file so a real backend can replace it later
// without touching the components (see docs/PLAN.md).

export interface Streak {
  /** Consecutive days with at least one finished lesson, as of `lastDay` */
  count: number
  /** Local date of the latest finished lesson, 'YYYY-MM-DD' ('' = never) */
  lastDay: string
}

export interface Progress {
  /** questionId -> the option the reader picked on their latest check */
  answers: Record<string, { selected: number; correct: boolean }>
  /** `${courseId}/${moduleId}` -> section ids scrolled into view */
  sectionsRead: Record<string, string[]>
  /** Total XP earned from lessons */
  xp: number
  streak: Streak
  /** questionId -> Leitner box (1 = shaky … MAX_BOX = known); lessons favour low boxes */
  boxes: Record<string, number>
}

// Still v1: the lesson fields were added with defaults, so older saved progress parses unchanged.
const STORAGE_KEY = 'progress:v1'
const empty: Progress = { answers: {}, sectionsRead: {}, xp: 0, streak: { count: 0, lastDay: '' }, boxes: {} }

export const MAX_BOX = 5
export const XP_PER_CORRECT = 10
export const XP_PERFECT_BONUS = 20

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v)

export function parseProgress(raw: string | null): Progress {
  if (!raw) return empty
  try {
    const data = JSON.parse(raw) as Record<string, unknown>
    const streak: Record<string, unknown> = isRecord(data.streak) ? data.streak : {}
    return {
      answers: isRecord(data.answers) ? (data.answers as Progress['answers']) : {},
      sectionsRead: isRecord(data.sectionsRead) ? (data.sectionsRead as Progress['sectionsRead']) : {},
      xp: typeof data.xp === 'number' ? data.xp : 0,
      streak: {
        count: typeof streak.count === 'number' ? streak.count : 0,
        lastDay: typeof streak.lastDay === 'string' ? streak.lastDay : '',
      },
      boxes: isRecord(data.boxes) ? (data.boxes as Progress['boxes']) : {},
    }
  } catch {
    return empty
  }
}

export const recordAnswer = (p: Progress, questionId: string, selected: number, correct: boolean): Progress => ({
  ...p,
  answers: { ...p.answers, [questionId]: { selected, correct } },
})

export function markRead(p: Progress, moduleKey: string, sectionId: string): Progress {
  const read = p.sectionsRead[moduleKey] ?? []
  if (read.includes(sectionId)) return p
  return { ...p, sectionsRead: { ...p.sectionsRead, [moduleKey]: [...read, sectionId] } }
}

/** Local calendar day as 'YYYY-MM-DD' (the streak follows the reader's own midnight, not UTC). */
export function localDay(date: Date = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** Whole days from `from` to `to` (both 'YYYY-MM-DD'); NaN if either is empty or malformed. */
export function daysBetween(from: string, to: string): number {
  const toUtc = (day: string) => {
    const [y, m, d] = day.split('-').map(Number)
    return Date.UTC(y, m - 1, d)
  }
  return Math.round((toUtc(to) - toUtc(from)) / 86_400_000)
}

/** The streak to show on `today`: it survives until the end of the day after the last lesson. */
export function currentStreak(streak: Streak, today: string): number {
  const gap = daysBetween(streak.lastDay, today)
  return gap === 0 || gap === 1 ? streak.count : 0
}

/** Streak after finishing a lesson on `today`: same day keeps it, next day extends it, a gap restarts it. */
export function bumpStreak(streak: Streak, today: string): Streak {
  const gap = daysBetween(streak.lastDay, today)
  if (gap === 0) return streak
  return { count: gap === 1 ? streak.count + 1 : 1, lastDay: today }
}

export const lessonXp = (correct: number, total: number) =>
  correct * XP_PER_CORRECT + (total > 0 && correct === total ? XP_PERFECT_BONUS : 0)

/** Leitner step: a right answer moves the question up a box, a wrong one sends it back to box 1. */
export function recordReview(p: Progress, questionId: string, correct: boolean): Progress {
  const box = p.boxes[questionId] ?? 0
  return { ...p, boxes: { ...p.boxes, [questionId]: correct ? Math.min(box + 1, MAX_BOX) : 1 } }
}

/** Award a finished lesson's XP and count `today` towards the streak. */
export function completeLesson(p: Progress, correct: number, total: number, today: string): Progress {
  return { ...p, xp: p.xp + lessonXp(correct, total), streak: bumpStreak(p.streak, today) }
}

/** Up to `size` question ids for a lesson: never-seen and low-box questions first, ties shuffled. */
export function pickLessonQuestions(
  ids: string[],
  boxes: Record<string, number>,
  size: number,
  random: () => number = Math.random,
): string[] {
  return ids
    .map((id) => ({ id, box: boxes[id] ?? 0, tie: random() }))
    .sort((a, b) => a.box - b.box || a.tie - b.tie)
    .slice(0, size)
    .map((q) => q.id)
}

// useSyncExternalStore needs a stable snapshot between changes, so parse once and cache.
let cache: Progress | undefined
const listeners = new Set<() => void>()

function load(): Progress {
  if (!cache) {
    try {
      cache = parseProgress(localStorage.getItem(STORAGE_KEY))
    } catch {
      cache = empty // localStorage unavailable (private mode) — progress lasts for this page view only
    }
  }
  return cache
}

export function update(fn: (p: Progress) => Progress) {
  const next = fn(load())
  if (next === cache) return
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // ignore
  }
  listeners.forEach((l) => l())
}

export const reset = () => update(() => empty)

export const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export const getSnapshot = load
