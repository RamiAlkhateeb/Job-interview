// Guest-mode progress, kept in this browser's localStorage. No account, no backend.
// Every reader/writer goes through this file so a real backend can replace it later
// without touching the components (see docs/PLAN.md).

export interface Progress {
  /** questionId -> the option the reader picked on their latest check */
  answers: Record<string, { selected: number; correct: boolean }>
  /** `${courseId}/${moduleId}` -> section ids scrolled into view */
  sectionsRead: Record<string, string[]>
}

const STORAGE_KEY = 'progress:v1'
const empty: Progress = { answers: {}, sectionsRead: {} }

export function parseProgress(raw: string | null): Progress {
  if (!raw) return empty
  try {
    const data = JSON.parse(raw) as Partial<Progress>
    return { answers: data.answers ?? {}, sectionsRead: data.sectionsRead ?? {} }
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
