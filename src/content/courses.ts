import type { Localized, Week } from './types'
import { techInterview } from './courses/tech-interview'
import { investing } from './courses/investing'
import { personalFinance } from './courses/personal-finance'
import { accounting } from './courses/accounting'
import { entrepreneurship } from './courses/entrepreneurship'
import { marketing } from './courses/marketing'

export interface NavItem {
  id: string
  title: Localized
}

export interface NavGroup {
  label: Localized
  items: NavItem[]
}

export type CourseCategory = 'careers' | 'business'

export interface Course {
  id: string
  category: CourseCategory
  title: Localized
  description: Localized
  /** Shown above the module list, e.g. "educational only, not financial advice". */
  notice?: Localized
  groups: NavGroup[]
  /** One dynamic import per module so each lands in its own chunk. A nav item without a loader
   *  shows a "soon" badge automatically. */
  loaders: Record<string, () => Promise<Week>>
}

// Add a course: create src/content/courses/<id>/index.ts exporting a `Course`, then list it here.
export const courses: Course[] = [techInterview, investing, personalFinance, accounting, entrepreneurship, marketing]

export const getCourse = (id: string | undefined) => courses.find((c) => c.id === id)

export const moduleHref = (courseId: string, moduleId: string) => `/course/${courseId}/${moduleId}`
export const lessonHref = (courseId: string, moduleId: string) => `${moduleHref(courseId, moduleId)}/lesson`

/** A course's modules in reading order — used for prev/next navigation. Not-yet-written modules stay
 *  in the list so a "coming soon" nav button can still show their title. */
export const flatNav = (course: Course) => course.groups.flatMap((g) => g.items)

export const hasWeek = (courseId: string, moduleId: string) => {
  const course = getCourse(courseId)
  return Boolean(course && moduleId in course.loaders)
}

export const loadWeek = (courseId: string, moduleId: string) => getCourse(courseId)!.loaders[moduleId]()
