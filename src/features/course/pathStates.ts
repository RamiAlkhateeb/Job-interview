import { flatNav, hasWeek, type Course } from '../../content/courses'

export type NodeState = 'done' | 'current' | 'locked' | 'soon'

/**
 * Skill-path state of each module, by id, in course order: finished lessons are `done`, the first written
 * module not done yet is `current`, written modules after it are `locked`, unwritten ones `soon`.
 */
export function pathStates(course: Course, modulesDone: string[]): Record<string, NodeState> {
  const states: Record<string, NodeState> = {}
  let currentFound = false
  for (const item of flatNav(course)) {
    if (!hasWeek(course.id, item.id)) states[item.id] = 'soon'
    else if (modulesDone.includes(`${course.id}/${item.id}`)) states[item.id] = 'done'
    else if (!currentFound) {
      states[item.id] = 'current'
      currentFound = true
    } else states[item.id] = 'locked'
  }
  return states
}

/** Sideways offset (px) of the n-th node, so the path winds like Duolingo's. Logical: mirrors in RTL. */
const WIND = [0, 44, 72, 44, 0, -44, -72, -44]
export const nodeOffset = (n: number) => WIND[n % WIND.length]
