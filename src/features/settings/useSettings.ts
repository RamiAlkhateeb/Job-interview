import { useSyncExternalStore } from 'react'
import { getSettings, subscribe, updateSettings } from './store'

export function useSettings() {
  return { settings: useSyncExternalStore(subscribe, getSettings), updateSettings }
}
