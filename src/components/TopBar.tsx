import { useTranslation } from 'react-i18next'
import { useTheme } from '../features/theme/useTheme'
import styles from './TopBar.module.css'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
] as const

export function TopBar() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()

  return (
    <div className={styles.langbar}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={i18n.language === l.code ? styles.active : undefined}
          onClick={() => i18n.changeLanguage(l.code)}
        >
          {l.label}
        </button>
      ))}
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggle}
        aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
    </div>
  )
}
