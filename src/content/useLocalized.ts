import { useTranslation } from 'react-i18next'
import type { Lang, Localized } from './types'

/** Picks the active-language string from a Localized value, falling back to English. */
export function useLocalized() {
  const { i18n } = useTranslation()
  const lang = i18n.language as Lang
  return (value: Localized) => value[lang] ?? value.en
}
