import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { courses } from '../../content/courses'
import { useLocalized } from '../../content/useLocalized'
import styles from './HomePage.module.css'

/** Course catalog. Open to everyone — no account needed. */
export function HomePage() {
  const { t: tUi } = useTranslation()
  const t = useLocalized()

  return (
    <div>
      <header className={styles.hero}>
        <h1>{tUi('appName')}</h1>
        <p>{tUi('homeIntro')}</p>
      </header>
      <div className={styles.cards}>
        {courses.map((course) => (
          <Link key={course.id} to={`/course/${course.id}`} className={styles.card}>
            <h2>{t(course.title)}</h2>
            <p>{t(course.description)}</p>
            <span className={styles.cardCta}>{tUi('openCourse')} →</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
