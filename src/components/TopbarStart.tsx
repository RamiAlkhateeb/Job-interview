import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styles from './TopbarStart.module.css'

export function TopbarStart({ courseId, onOpenContents }: { courseId?: string; onOpenContents: () => void }) {
  const { t } = useTranslation()
  return (
    <div className={styles.topbarStart}>
      <Link className={styles.pillBtn} to={courseId ? `/course/${courseId}` : '/'}>
        ← <span>{courseId ? t('backToCourse') : t('home')}</span>
      </Link>
      {courseId && (
        <button type="button" className={styles.pillBtn} onClick={onOpenContents}>
          ☰ <span>{t('courseContents')}</span>
        </button>
      )}
    </div>
  )
}
