import { useQueries, useQuery } from '@tanstack/react-query'
import { hasWeek, loadWeek } from './courses'

/** Loads a module's content chunk on demand. `week` is undefined while loading or for unknown ids. */
export function useWeek(courseId: string | undefined, id: string | undefined) {
  const known = courseId !== undefined && id !== undefined && hasWeek(courseId, id)
  const { data, isLoading } = useQuery(weekQuery(courseId, id, known))
  return { week: data, loading: known && isLoading, notFound: !known }
}

const weekQuery = (courseId: string | undefined, id: string | undefined, enabled: boolean) => ({
  queryKey: ['week', courseId, id],
  queryFn: () => loadWeek(courseId!, id!),
  enabled,
  staleTime: Infinity,
})

/** Several modules of one course at once (same cache as useWeek), keyed by module id. Unwritten or
 *  still-loading modules are missing from the result. */
export function useWeeks(courseId: string, ids: string[]) {
  return useQueries({
    queries: ids.map((id) => weekQuery(courseId, id, hasWeek(courseId, id))),
    combine: (results) => Object.fromEntries(ids.flatMap((id, i) => (results[i].data ? [[id, results[i].data]] : []))),
  })
}
