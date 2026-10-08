import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { flatNav, getCourse, hasWeek, moduleHref, practiceHref, type NavItem } from '../../content/courses'
import type { Week } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { useWeeks } from '../../content/useWeek'
import { learnHref, lessonsFor, type Lesson } from '../lesson/lessons'
import { useProgress } from '../progress/useProgress'
import { nodeOffset, unitStates, type NodeState } from './pathStates'
import styles from './CoursePage.module.css'

/** Banner colours, cycled per unit. */
const UNIT_TONES = [styles.toneTeal, styles.toneLav, styles.toneAmber, styles.toneGreen]
const ICONS: Record<NodeState, string> = { done: '✓', current: '★', locked: '🔒' }

interface UnitData {
  item: NavItem
  number: number
  lessons?: Lesson[]
  states?: NodeState[]
}

/**
 * A course as a Duolingo-style roadmap. Each module is a unit (banner) and each of its sections a lesson node
 * (long sections are split into parts). Lessons unlock in order within a unit; units are independent.
 */
export function CoursePage() {
  const { courseId } = useParams<{ courseId: string }>()
  const { t: tUi } = useTranslation()
  const t = useLocalized()
  const { progress, reset } = useProgress()
  const course = getCourse(courseId)
  const weeks: Record<string, Week> = useWeeks(courseId ?? '', course ? flatNav(course).map((i) => i.id) : [])

  if (!course) return <p>{tUi('pageNotFound')}</p>

  // Unit numbers run through the whole course; the "Start" bubble goes on the first unfinished unit.
  const units = new Map<string, UnitData>()
  let startUnit: string | undefined
  flatNav(course).forEach((item, i) => {
    const week = weeks[item.id]
    const lessons = week ? lessonsFor(week) : undefined
    const states = lessons && unitStates(lessons.map((l) => l.id), progress.lessonsDone, `${course.id}/${item.id}`)
    if (!startUnit && states?.includes('current')) startUnit = item.id
    units.set(item.id, { item, number: i + 1, lessons, states })
  })
  let node = 0 // node index across the whole course, so the path keeps winding between units

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
      {course.groups.map((group) => (
        <section key={t(group.label)} className={styles.group}>
          <h2 className={styles.groupLabel}>{t(group.label)}</h2>
          {group.items.map((item) => {
            const unit = units.get(item.id)!
            const offsets = unit.lessons?.map(() => nodeOffset(node++)) ?? []
            return (
              <Unit
                key={item.id}
                courseId={course.id}
                unit={unit}
                week={weeks[item.id]}
                offsets={offsets}
                showStart={item.id === startUnit}
              />
            )
          })}
        </section>
      ))}
      <button type="button" className={styles.reset} onClick={handleReset}>
        {tUi('resetProgress')}
      </button>
    </div>
  )
}

function Unit({
  courseId,
  unit,
  week,
  offsets,
  showStart,
}: {
  courseId: string
  unit: UnitData
  week?: Week
  offsets: number[]
  showStart: boolean
}) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const { item, number, lessons, states } = unit
  const tone = UNIT_TONES[(number - 1) % UNIT_TONES.length]

  // Not written yet (no loader): a grey banner, no lessons.
  if (!hasWeek(courseId, item.id)) {
    return (
      <div className={styles.unit}>
        <div className={`${styles.banner} ${styles.bannerSoon}`}>
          <span className={styles.unitNo}>{tUi('unit', { n: number })}</span>
          <h3>{t(item.title)}</h3>
          <span className={styles.badge}>{tUi('soon')}</span>
        </div>
      </div>
    )
  }

  const done = states?.filter((s) => s === 'done').length ?? 0
  const total = lessons?.length ?? 0

  return (
    <div className={styles.unit}>
      <div className={`${styles.banner} ${tone}`}>
        <span className={styles.unitNo}>{tUi('unit', { n: number })}</span>
        <h3>{t(item.title)}</h3>
        <div className={styles.bannerRow}>
          {lessons && (
            <span className={styles.unitProgress}>
              <span className={styles.bannerBar} aria-hidden>
                <span style={{ width: `${total ? (done / total) * 100 : 0}%` }} />
              </span>
              {tUi('unitLessons', { done, total })}
            </span>
          )}
          <span className={styles.bannerLinks}>
            <Link to={moduleHref(courseId, item.id)}>{tUi('readModule')}</Link>
            {week && week.questions.length > 0 && <Link to={practiceHref(courseId, item.id)}>{tUi('practice')}</Link>}
          </span>
        </div>
      </div>
      {lessons && states ? (
        <ol className={styles.path}>
          {lessons.map((lesson, i) => (
            <LessonNode
              key={lesson.id}
              href={learnHref(courseId, item.id, lesson.id)}
              lesson={lesson}
              state={states[i]}
              offset={offsets[i]}
              showStart={showStart && states[i] === 'current'}
            />
          ))}
        </ol>
      ) : (
        <p className={styles.unitLoading}>{tUi('loading')}</p>
      )}
    </div>
  )
}

function LessonNode({
  href,
  lesson,
  state,
  offset,
  showStart,
}: {
  href: string
  lesson: Lesson
  state: NodeState
  offset: number
  showStart: boolean
}) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const title =
    lesson.parts > 1 ? tUi('lessonOfParts', { title: t(lesson.title), n: lesson.part, of: lesson.parts }) : t(lesson.title)

  return (
    <li className={styles.nodeWrap} style={{ insetInlineStart: offset }}>
      {showStart && <span className={styles.startBubble}>{tUi('pathStart')}</span>}
      {state === 'locked' ? (
        <span
          className={`${styles.node} ${styles.locked}`}
          role="img"
          aria-label={`${title} (${tUi('pathLocked')})`}
          title={tUi('pathLocked')}
        >
          <span aria-hidden>{ICONS.locked}</span>
        </span>
      ) : (
        <Link to={href} className={`${styles.node} ${styles[state]}`} aria-label={title}>
          <span aria-hidden>{ICONS[state]}</span>
        </Link>
      )}
      <span className={styles.nodeTitle}>{title}</span>
    </li>
  )
}
