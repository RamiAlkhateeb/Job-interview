import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getCourse, moduleHref } from '../../content/courses'
import type { Question, Week } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { useWeek } from '../../content/useWeek'
import { currentStreak, lessonXp, localDay, pickLessonQuestions } from '../progress/store'
import { useProgress } from '../progress/useProgress'
import { optionOrder } from '../quiz/optionOrder'
import styles from './LessonPage.module.css'

/** Questions per lesson (fewer if the module has fewer). */
const LESSON_SIZE = 8

/** Duolingo-style lesson: a short run of a module's questions, one at a time, then XP + streak. */
export function LessonPage() {
  const { courseId, moduleId } = useParams<{ courseId: string; moduleId: string }>()
  const { t: tUi } = useTranslation()
  const { week, loading, notFound } = useWeek(courseId, moduleId)

  if (!getCourse(courseId) || notFound) return <p>{tUi('moduleNotFound')}</p>
  if (loading || !week) return <p>{tUi('loading')}</p>
  if (week.questions.length === 0) return <p>{tUi('lessonNoQuestions')}</p>
  return <LessonRunner week={week} />
}

function LessonRunner({ week }: { week: Week }) {
  const { progress } = useProgress()
  const [round, setRound] = useState(0)
  // Picked once per round: later box changes must not reshuffle the lesson mid-way.
  const [picks, setPicks] = useState(() => pick(week, progress.boxes))
  // Keyed by round so "Practice again" remounts a fresh lesson with a new pick of questions.
  return (
    <Lesson
      key={round}
      week={week}
      questions={picks}
      onRestart={() => {
        setPicks(pick(week, progress.boxes))
        setRound((r) => r + 1)
      }}
    />
  )
}

function pick(week: Week, boxes: Record<string, number>): Question[] {
  const ids = pickLessonQuestions(
    week.questions.map((q) => q.id),
    boxes,
    LESSON_SIZE,
  )
  return ids.map((id) => week.questions.find((q) => q.id === id)!)
}

function Lesson({ week, questions, onRestart }: { week: Week; questions: Question[]; onRestart: () => void }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const { recordLessonAnswer, completeLesson } = useProgress()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const question = questions[index]
  // Display position → index into question.options (see optionOrder).
  const order = optionOrder(question.id, question.options.length)
  const isCorrect = checked && selected === question?.answer
  const isLast = index === questions.length - 1

  function check() {
    if (selected === null || checked) return
    const right = selected === question.answer
    setChecked(true)
    if (right) setCorrectCount((c) => c + 1)
    recordLessonAnswer(question.id, selected, right)
  }

  function next() {
    if (isLast) {
      completeLesson(correctCount, questions.length)
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setChecked(false)
  }

  // Keyboard: 1–9 pick an option, Enter checks / continues.
  useEffect(() => {
    if (done) return
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLAnchorElement) return // let links (✕, back) work normally
      if (e.key === 'Enter') {
        e.preventDefault() // stop a focused button from also handling it
        if (checked) next()
        else check()
        return
      }
      const n = Number(e.key)
      if (!checked && n >= 1 && n <= order.length) setSelected(order[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  if (done) {
    return <LessonSummary week={week} correct={correctCount} total={questions.length} onRestart={onRestart} />
  }

  const answeredCount = index + (checked ? 1 : 0)
  const percent = Math.round((answeredCount / questions.length) * 100)

  return (
    <div className={styles.lesson}>
      <div className={styles.top}>
        <Link to={moduleHref(week.courseId, week.id)} className={styles.quit} aria-label={tUi('lessonQuit')}>
          ✕
        </Link>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={answeredCount}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
        <span className={styles.counter}>
          {index + 1}/{questions.length}
        </span>
      </div>

      <p className={styles.kicker}>{t(week.cover.kicker)}</p>
      <h1 className={styles.prompt}>{t(question.prompt)}</h1>

      <div className={styles.options} role="radiogroup">
        {order.map((i, position) => {
          const state = !checked
            ? selected === i
              ? styles.selected
              : ''
            : i === question.answer
              ? styles.right
              : i === selected
                ? styles.wrong
                : styles.dim
          return (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={selected === i}
              className={`${styles.option} ${state}`}
              disabled={checked}
              onClick={() => setSelected(i)}
            >
              <span className={styles.key}>{position + 1}</span>
              <span>{t(question.options[i])}</span>
            </button>
          )
        })}
      </div>

      <div className={`${styles.footer} ${checked ? (isCorrect ? styles.footerRight : styles.footerWrong) : ''}`}>
        <div className={styles.feedback} aria-live="polite">
          {checked &&
            (isCorrect ? (
              <strong>{tUi('lessonCorrect')}</strong>
            ) : (
              <>
                <strong>{tUi('lessonWrong')}</strong>
                <span>{t(question.options[question.answer])}</span>
              </>
            ))}
        </div>
        {checked ? (
          <button type="button" className={styles.primary} onClick={next} autoFocus>
            {isLast ? tUi('lessonFinish') : tUi('lessonContinue')}
          </button>
        ) : (
          <button type="button" className={styles.primary} disabled={selected === null} onClick={check}>
            {tUi('checkAnswer')}
          </button>
        )}
      </div>
    </div>
  )
}

function LessonSummary({
  week,
  correct,
  total,
  onRestart,
}: {
  week: Week
  correct: number
  total: number
  onRestart: () => void
}) {
  const { t: tUi } = useTranslation()
  const { progress } = useProgress()
  const streak = currentStreak(progress.streak, localDay())
  const perfect = correct === total

  return (
    <div className={`${styles.lesson} ${styles.summary}`}>
      <div className={styles.trophy} aria-hidden>
        {perfect ? '🏆' : '🎉'}
      </div>
      <h1>{perfect ? tUi('lessonPerfect') : tUi('lessonComplete')}</h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{tUi('lessonScore')}</span>
          <span className={styles.statValue}>
            {correct}/{total}
          </span>
        </div>
        <div className={`${styles.stat} ${styles.statXp}`}>
          <span className={styles.statLabel}>{tUi('lessonXpEarned')}</span>
          <span className={styles.statValue}>+{lessonXp(correct, total)}</span>
        </div>
        <div className={`${styles.stat} ${styles.statStreak}`}>
          <span className={styles.statLabel}>{tUi('streak')}</span>
          <span className={styles.statValue}>🔥 {streak}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={onRestart}>
          {tUi('lessonAgain')}
        </button>
        <Link className={styles.secondary} to={`/course/${week.courseId}`}>
          {tUi('backToCourse')}
        </Link>
      </div>
    </div>
  )
}
