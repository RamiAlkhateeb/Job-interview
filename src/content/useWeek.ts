import { useQuery } from '@tanstack/react-query'
import { hasWeek, loadWeek } from './courses'

/** Loads a module's content chunk on demand. `week` is undefined while loading or for unknown ids. */
export function useWeek(courseId: string | undefined, id: string | undefined) {
  const known = courseId !== undefined && id !== undefined && hasWeek(courseId, id)
  const { data, isLoading } = useQuery({
    queryKey: ['week', courseId, id],
    queryFn: () => loadWeek(courseId!, id!),
    enabled: known,
    staleTime: Infinity,
  })
  return { week: data, loading: known && isLoading, notFound: !known }
}
