// App settings (theme, sound), kept in this browser's localStorage. Language is not here: i18next already
// persists it (src/i18n/index.ts). Same external-store pattern as src/features/progress/store.ts, so every
// component sees one shared value.

export type ThemePref = 'light' | 'dark' | 'system'

export interface Settings {
  theme: ThemePref
  sound: boolean
}

// 'theme' is the key the old light/dark toggle used, so a saved choice carries over.
const THEME_KEY = 'theme'
const SOUND_KEY = 'sound'

export function parseSettings(theme: string | null, sound: string | null): Settings {
  return {
    theme: theme === 'light' || theme === 'dark' ? theme : 'system',
    sound: sound !== 'off',
  }
}

const hasDom = typeof window !== 'undefined'
const darkQuery = hasDom ? window.matchMedia?.('(prefers-color-scheme: dark)') : undefined

function read(key: string) {
  try {
    return localStorage.getItem(key)
  } catch {
    return null // localStorage unavailable (private mode)
  }
}

let current = hasDom ? parseSettings(read(THEME_KEY), read(SOUND_KEY)) : parseSettings(null, null)
const listeners = new Set<() => void>()

/** Sets `data-theme` on <html> (see src/styles/tokens.css); 'system' follows the OS setting. */
function applyTheme() {
  if (!hasDom) return
  const dark = current.theme === 'dark' || (current.theme === 'system' && darkQuery?.matches === true)
  document.documentElement.dataset.theme = dark ? 'dark' : 'light'
}
applyTheme()
darkQuery?.addEventListener?.('change', applyTheme)

export function updateSettings(patch: Partial<Settings>) {
  current = { ...current, ...patch }
  try {
    if (current.theme === 'system') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, current.theme)
    localStorage.setItem(SOUND_KEY, current.sound ? 'on' : 'off')
  } catch {
    // ignore
  }
  applyTheme()
  listeners.forEach((l) => l())
}

export const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
export const getSettings = () => current
