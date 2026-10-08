// Building blocks shared by the quiz lesson (LessonPage) and the card lesson (CardLesson).
import { useEffect, useRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import type { Question } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { currentStreak, lessonXp, localDay } from '../progress/store'
import { useProgress } from '../progress/useProgress'
import { optionOrder } from '../quiz/optionOrder'
import { playSound } from '../settings/sound'
import type { Recap } from './lessons'
import styles from './LessonPage.module.css'

/** ✕ (quit), a segmented progress bar (one segment per step; question steps drawn thicker), an "n/total"
 *  counter, and optionally the lesson's title and time left underneath. */
export function LessonTopBar({
  quitTo,
  done,
  total,
  kinds,
  title,
  minutesLeft,
}: {
  quitTo: string
  done: number
  total: number
  kinds?: ('content' | 'question')[]
  title?: string
  minutesLeft?: number
}) {
  const { t } = useTranslation()
  return (
    <>
      <div className={styles.top}>
        <Link to={quitTo} className={styles.quit} aria-label={t('lessonQuit')}>
          ✕
        </Link>
        <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done}>
          {Array.from({ length: total }, (_, i) => (
            <span
              key={i}
              className={[
                styles.seg,
                kinds?.[i] === 'question' ? styles.segQ : '',
                i < done ? styles.segDone : i === done ? styles.segNow : '',
              ].join(' ')}
            />
          ))}
        </div>
        <span className={styles.counter}>
          {Math.min(done + 1, total)}/{total}
        </span>
      </div>
      {title ? (
        <p className={styles.lessonTitle}>
          <span>{title}</span>
          {minutesLeft !== undefined && <span>{t('minutesLeft', { n: minutesLeft })}</span>}
        </p>
      ) : (
        <div style={{ height: 24 }} />
      )}
    </>
  )
}

/** A question's prompt and options (in their stable shuffled order), with right/wrong states once checked. */
export function QuestionCard({
  question,
  kicker,
  selected,
  checked,
  onSelect,
}: {
  question: Question
  kicker?: string
  selected: number | null
  checked: boolean
  onSelect: (option: number) => void
}) {
  const t = useLocalized()
  // Display position → index into question.options (see optionOrder).
  const order = optionOrder(question.id, question.options.length)
  return (
    <>
      {kicker && <p className={styles.kicker}>{kicker}</p>}
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
              onClick={() => onSelect(i)}
            >
              <span className={styles.key}>{position + 1}</span>
              <span>{t(question.options[i])}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

/** Fixed bottom bar: feedback on the start side, the main action on the end side. */
export function LessonFooter({
  tone,
  feedback,
  action,
  disabled,
  onAction,
}: {
  tone?: 'right' | 'wrong'
  feedback?: ReactNode
  action: string
  disabled?: boolean
  onAction: () => void
}) {
  const toneClass = tone === 'right' ? styles.footerRight : tone === 'wrong' ? styles.footerWrong : ''
  return (
    <div className={`${styles.footer} ${toneClass}`}>
      <div className={styles.feedback} aria-live="polite">
        {feedback}
      </div>
      {/* Keyed by action so the button remounts (and autofocuses) when Check turns into Continue. */}
      <button key={action} type="button" className={styles.primary} disabled={disabled} onClick={onAction} autoFocus={!!tone}>
        {action}
      </button>
    </div>
  )
}

/** "Nice!" or "Correct answer: …" for a checked question. */
export function AnswerFeedback({ question, correct }: { question: Question; correct: boolean }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  return (
    <>
      <span className={styles.feedbackIcon} aria-hidden>
        <span>{correct ? '✓' : '✕'}</span>
      </span>
      <span className={styles.feedbackText}>
        {correct ? (
          <strong>{tUi('lessonCorrect')}</strong>
        ) : (
          <>
            <strong>{tUi('lessonWrong')}</strong>
            <span>{t(question.options[question.answer])}</span>
          </>
        )}
      </span>
    </>
  )
}

/** Plays the right/wrong sound for a check; call it where the answer is graded. */
export const playAnswerSound = (correct: boolean) => playSound(correct ? 'correct' : 'wrong')

/**
 * Keyboard for a lesson screen: Enter runs `onEnter` (check / continue), 1–9 pick the n-th displayed
 * option of `question` while it is not yet checked. Links keep their own Enter.
 */
export function useLessonKeys(opts: {
  enabled: boolean
  onEnter: () => void
  question?: Question
  checked?: boolean
  onPick?: (option: number) => void
}) {
  // Read through a ref so the listener is registered once but always sees the latest handlers.
  const latest = useRef(opts)
  latest.current = opts
  useEffect(() => {
    if (!opts.enabled) return
    function onKey(e: KeyboardEvent) {
      const { onEnter, question, checked, onPick } = latest.current
      if (e.target instanceof HTMLAnchorElement) return
      if (e.key === 'Enter') {
        e.preventDefault() // stop a focused button from also handling it
        onEnter()
        return
      }
      if (!question || checked || !onPick) return
      const order = optionOrder(question.id, question.options.length)
      const n = Number(e.key)
      if (n >= 1 && n <= order.length) onPick(order[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [opts.enabled])
}

/** End screen: score (if the lesson asked anything), XP earned, streak, then the main action, an optional
 *  second one and a way back to the course. */
export function LessonSummary({
  courseId,
  correct,
  total,
  action,
  onAction,
  secondary,
  onSecondary,
  recap,
}: {
  courseId: string
  correct: number
  total: number
  action: string
  onAction: () => void
  secondary?: string
  onSecondary?: () => void
  /** "What you learned" (card lessons only) */
  recap?: Recap | null
}) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const { progress } = useProgress()
  const streak = currentStreak(progress.streak, localDay())
  const perfect = total > 0 && correct === total

  useEffect(() => playSound('complete'), [])

  return (
    <div className={`${styles.lesson} ${styles.summary}`}>
      <div className={styles.trophy} aria-hidden>
        {perfect ? '★' : '✓'}
      </div>
      <h1>{perfect ? tUi('lessonPerfect') : tUi('lessonComplete')}</h1>
      <div className={styles.stats}>
        {total > 0 && (
          <div className={styles.stat}>
            <span className={styles.statLabel}>{tUi('lessonScore')}</span>
            <span className={styles.statValue}>
              {correct}/{total}
            </span>
          </div>
        )}
        <div className={`${styles.stat} ${styles.statXp}`}>
          <span className={styles.statLabel}>{tUi('lessonXpEarned')}</span>
          <span className={styles.statValue}>+{lessonXp(correct, total)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>{tUi('streak')}</span>
          <span className={styles.statValue}>🔥 {streak}</span>
        </div>
      </div>
      {recap && (
        <section className={styles.recap}>
          <h2>{tUi('whatYouLearned')}</h2>
          {recap.kind === 'takeaways' ? (
            <ul>
              {recap.items.map((item, k) => (
                <li key={k}>{t(item)}</li>
              ))}
            </ul>
          ) : (
            <div className={styles.chips}>
              {recap.items.map((item, k) => (
                <span key={k} className={styles.chip}>
                  {t(item)}
                </span>
              ))}
            </div>
          )}
        </section>
      )}
      <div className={styles.actions}>
        <button type="button" className={styles.primary} onClick={onAction} autoFocus>
          {action}
        </button>
        {secondary && onSecondary && (
          <button type="button" className={styles.secondary} onClick={onSecondary}>
            {secondary}
          </button>
        )}
        <Link className={styles.secondary} to={`/course/${courseId}`}>
          {tUi('backToCourse')}
        </Link>
      </div>
    </div>
  )
}
