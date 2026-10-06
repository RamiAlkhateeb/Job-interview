import { useTranslation } from 'react-i18next'
import { currentStreak, localDay } from '../features/progress/store'
import { useProgress } from '../features/progress/useProgress'
import { useTheme } from '../features/theme/useTheme'
import styles from './TopBar.module.css'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
] as const

export function TopBar() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const { progress } = useProgress()
  const streak = currentStreak(progress.streak, localDay())

  return (
    <div className={styles.langbar}>
      <span className={styles.stats}>
        <span className={streak > 0 ? styles.streakOn : undefined} title={t('streakDays', { count: streak })}>
          🔥 {streak}
        </span>
        <span title={t('totalXp', { xp: progress.xp })}>⚡ {progress.xp}</span>
      </span>
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
