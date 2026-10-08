import { useTranslation } from 'react-i18next'
import type { AudienceId } from '../content/courses'
import styles from './AudienceBadges.module.css'

/** "Job seekers · Managers & professionals"-style pills for a course's audiences. */
export function AudienceBadges({ audiences, className }: { audiences: AudienceId[]; className?: string }) {
  const { t } = useTranslation()
  return (
    <ul className={`${styles.badges} ${className ?? ''}`} aria-label={t('forAudience')}>
      {audiences.map((a) => (
        <li key={a} className={`${styles.badge} ${styles[a]}`}>
          {t(`audience.${a}`)}
        </li>
      ))}
    </ul>
  )
}
