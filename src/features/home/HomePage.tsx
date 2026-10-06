import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { courses, type CourseCategory } from '../../content/courses'
import { useLocalized } from '../../content/useLocalized'
import styles from './HomePage.module.css'

/** Display order of the catalog's sections; a category with no courses is skipped. */
const CATEGORIES: CourseCategory[] = ['careers', 'business']

/** Course catalog, grouped by category. Open to everyone — no account needed. */
export function HomePage() {
  const { t: tUi } = useTranslation()
  const t = useLocalized()

  return (
    <div>
      <header className={styles.hero}>
        <h1>{tUi('appName')}</h1>
        <p>{tUi('homeIntro')}</p>
      </header>
      {CATEGORIES.map((category) => {
        const inCategory = courses.filter((c) => c.category === category)
        if (inCategory.length === 0) return null
        return (
          <section key={category} className={styles.category}>
            <h2 className={styles.categoryLabel}>{tUi(`category.${category}`)}</h2>
            <div className={styles.cards}>
              {inCategory.map((course) => (
                <Link key={course.id} to={`/course/${course.id}`} className={styles.card}>
                  <h3>{t(course.title)}</h3>
                  <p>{t(course.description)}</p>
                  <span className={styles.cardCta}>{tUi('openCourse')} →</span>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
