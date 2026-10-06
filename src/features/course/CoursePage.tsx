import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCourse, hasWeek, lessonHref, moduleHref, type Course, type NavItem } from '../../content/courses'
import { useLocalized } from '../../content/useLocalized'
import { useWeek } from '../../content/useWeek'
import { useProgress } from '../progress/useProgress'
import styles from './CoursePage.module.css'

export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { t: tUi } = useTranslation()
  const t = useLocalized()
  const { reset } = useProgress()
  const course = getCourse(courseId)

  if (!course) return <p>{tUi('pageNotFound')}</p>

  function handleReset() {
    if (window.confirm(tUi('resetConfirm'))) reset()
  }

  return (
    <div>
      <header className={styles.hero}>
        <h1>{t(course.title)}</h1>
        <p>{t(course.description)}</p>
      </header>
      {course.notice && (
        <p className={styles.notice} role="note">
          {t(course.notice)}
        </p>
      )}
      {course.groups.map((group) => (
        <section key={t(group.label)} className={styles.group}>
          <div className={styles.groupLabel}>{t(group.label)}</div>
          <ul className={styles.list}>
            {group.items.map((item) => (
              <ModuleRow key={item.id} course={course} item={item} />
            ))}
          </ul>
        </section>
      ))}
      <button type="button" className={styles.reset} onClick={handleReset}>
        {tUi('resetProgress')}
      </button>
    </div>
  )
}

/** One module: link + how much of it this browser has read / answered. Loads the module's chunk to count
 *  sections and questions (text only, small) — modules not written yet show a "soon" badge instead. */
function ModuleRow({ course, item }: { course: Course; item: NavItem }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const { progress } = useProgress()
  const { week } = useWeek(course.id, item.id)

  if (!hasWeek(course.id, item.id)) {
    return (
      <li className={`${styles.row} ${styles.soon}`}>
        <span>{t(item.title)}</span>
        <span className={styles.badge}>{tUi('soon')}</span>
      </li>
    )
  }

  const read = progress.sectionsRead[`${course.id}/${item.id}`]?.length ?? 0
  const answered = week ? week.questions.filter((q) => progress.answers[q.id]).length : 0
  const correct = week ? week.questions.filter((q) => progress.answers[q.id]?.correct).length : 0
  const percent = week ? Math.round((Math.min(read, week.sections.length) / week.sections.length) * 100) : 0

  return (
    <li className={styles.row}>
      <Link to={moduleHref(course.id, item.id)}>{t(item.title)}</Link>
      {week && (
        <span className={styles.meta}>
          <span className={styles.bar} aria-label={`${percent}%`}>
            <span style={{ width: `${percent}%` }} />
          </span>
          {percent}% · {tUi('quizScore', { correct, answered, total: week.questions.length })}
          {week.questions.length > 0 && (
            <Link className={styles.lessonBtn} to={lessonHref(course.id, item.id)}>
              {tUi('startLesson')}
            </Link>
          )}
        </span>
      )}
    </li>
  )
}
