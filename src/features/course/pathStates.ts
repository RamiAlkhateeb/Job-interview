export type NodeState = 'done' | 'current' | 'locked'

/**
 * Roadmap state of each lesson in one unit (module), in order: finished lessons are `done` (and can be
 * replayed), the first unfinished one is `current`, the ones after it `locked`. Units don't lock each other,
 * so any module can be started at its first lesson.
 */
export function unitStates(lessonIds: string[], lessonsDone: string[], keyPrefix: string): NodeState[] {
  let currentFound = false
  return lessonIds.map((id) => {
    if (lessonsDone.includes(`${keyPrefix}/${id}`)) return 'done'
    if (currentFound) return 'locked'
    currentFound = true
    return 'current'
  })
}

/** Sideways offset (px) of the n-th node, so the path winds like Duolingo's. Logical: mirrors in RTL. */
const WIND = [0, 44, 72, 44, 0, -44, -72, -44]
export const nodeOffset = (n: number) => WIND[n % WIND.length]
