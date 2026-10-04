import { useSyncExternalStore } from 'react'
import { getSnapshot, markRead, recordAnswer, reset, subscribe, update } from './store'

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot)
  return {
    progress,
    recordAnswer: (questionId: string, selected: number, correct: boolean) =>
      update((p) => recordAnswer(p, questionId, selected, correct)),
    markRead: (moduleKey: string, sectionId: string) => update((p) => markRead(p, moduleKey, sectionId)),
    reset,
  }
}
