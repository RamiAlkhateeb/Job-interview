import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCourse, lessonHref, moduleHref, type Course, type NavItem } from '../../content/courses'
import { useLocalized } from '../../content/useLocalized'
import { useWeek } from '../../content/useWeek'
import { useProgress } from '../progress/useProgress'
import { nodeOffset, pathStates, type NodeState } from './pathStates'
import styles from './CoursePage.module.css'

/** Banner colours, cycled per unit. */
const UNIT_TONES = [styles.toneTeal, styles.toneLav, styles.toneAmber, styles.toneGreen]

/** A course as a Duolingo-style skill path: one banner per unit (nav group), round lesson nodes below. */
export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { t: tUi } = useTranslation()
  const t = useLocalized()
  const { progress, reset } = useProgress()
  const course = getCourse(courseId)

  if (!course) return <p>{tUi('pageNotFound')}</p>

  const states = pathStates(course, progress.modulesDone)
  let n = 0 // node index across the whole course, so the path keeps winding between units

  function handleReset() {
    if (window.confirm(tUi('resetConfirm'))) reset()
  }

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <h1>{t(course.title)}</h1>
        <p>{t(course.description)}</p>
      </header>
      {course.notice && (
        <p className={styles.notice} role="note">
          {t(course.notice)}
        </p>
      )}
      {course.groups.map((group, u) => (
        <section key={t(group.label)} className={styles.unit}>
          <div className={`${styles.banner} ${UNIT_TONES[u % UNIT_TONES.length]}`}>
            <span className={styles.unitNo}>{tUi('unit', { n: u + 1 })}</span>
            <h2>{t(group.label)}</h2>
          </div>
          <ol className={styles.path}>
            {group.items.map((item) => (
              <PathNode key={item.id} course={course} item={item} state={states[item.id]} offset={nodeOffset(n++)} />
            ))}
          </ol>
        </section>
      ))}
      <button type="button" className={styles.reset} onClick={handleReset}>
        {tUi('resetProgress')}
      </button>
    </div>
  )
}

const ICONS: Record<NodeState, string> = { done: '✓', current: '★', locked: '🔒', soon: '…' }

function PathNode({ course, item, state, offset }: { course: Course; item: NavItem; state: NodeState; offset: number }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const title = t(item.title)
  const open = state === 'done' || state === 'current'

  return (
    <li className={styles.nodeWrap} style={{ insetInlineStart: offset }}>
      {state === 'current' && <span className={styles.startBubble}>{tUi('pathStart')}</span>}
      {open ? (
        <Link to={moduleHref(course.id, item.id)} className={`${styles.node} ${styles[state]}`} aria-label={title}>
          <span aria-hidden>{ICONS[state]}</span>
        </Link>
      ) : (
        <span
          className={`${styles.node} ${styles[state]}`}
          role="img"
          aria-label={`${title} (${state === 'soon' ? tUi('soon') : tUi('pathLocked')})`}
          title={state === 'soon' ? tUi('soon') : tUi('pathLocked')}
        >
          <span aria-hidden>{ICONS[state]}</span>
        </span>
      )}
      <span className={styles.nodeTitle}>
        {title}
        {state === 'soon' && <span className={styles.badge}>{tUi('soon')}</span>}
      </span>
      {state === 'current' && <NodeProgress courseId={course.id} moduleId={item.id} />}
      {state === 'done' && (
        <Link to={lessonHref(course.id, item.id)} className={styles.practice}>
          {tUi('pathPractice')}
        </Link>
      )}
    </li>
  )
}

/** Sections read and quiz score for the current module (loads its chunk; text only, small). */
function NodeProgress({ courseId, moduleId }: { courseId: string; moduleId: string }) {
  const { t: tUi } = useTranslation()
  const { progress } = useProgress()
  const { week } = useWeek(courseId, moduleId)
  if (!week) return null

  const read = progress.sectionsRead[`${courseId}/${moduleId}`]?.length ?? 0
  const answered = week.questions.filter((q) => progress.answers[q.id]).length
  const correct = week.questions.filter((q) => progress.answers[q.id]?.correct).length
  const percent = Math.round((Math.min(read, week.sections.length) / week.sections.length) * 100)

  return (
    <span className={styles.meta}>
      <span className={styles.bar} aria-label={`${percent}%`}>
        <span style={{ width: `${percent}%` }} />
      </span>
      {percent}% · {tUi('quizScore', { correct, answered, total: week.questions.length })}
      {/* A card module ends in its own quiz; a one-page module is finished by taking the quiz lesson. */}
      {week.layout !== 'cards' && week.questions.length > 0 && (
        <Link to={lessonHref(courseId, moduleId)} className={styles.practice}>
          {tUi('takeQuiz')}
        </Link>
      )}
    </span>
  )
}
