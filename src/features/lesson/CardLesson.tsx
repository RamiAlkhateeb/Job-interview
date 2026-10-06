import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Blocks } from '../../components/content/Blocks'
import contentStyles from '../../components/content/content.module.css'
import { moduleHref } from '../../content/courses'
import { resolveHtmlAssetPaths } from '../../content/resolveAssetPath'
import type { Week } from '../../content/types'
import { useLocalized } from '../../content/useLocalized'
import { useProgress } from '../progress/useProgress'
import { WeekQuestionsContext } from '../quiz/weekQuestions'
import { toCardSteps } from './cardSteps'
import {
  AnswerFeedback,
  LessonFooter,
  LessonSummary,
  LessonTopBar,
  playAnswerSound,
  QuestionCard,
  useLessonKeys,
} from './LessonParts'
import styles from './LessonPage.module.css'

/** A `layout: 'cards'` module as a Duolingo-style run: one idea per card, then the section's questions.
 *  "Practice again" (summary) restarts it via the key. */
export function CardLesson({ week }: { week: Week }) {
  const [round, setRound] = useState(0)
  return <CardRun key={round} week={week} onRestart={() => setRound((r) => r + 1)} />
}

function CardRun({ week, onRestart }: { week: Week; onRestart: () => void }) {
  const t = useLocalized()
  const { t: tUi } = useTranslation()
  const { markRead, recordLessonAnswer, completeLesson } = useProgress()
  const steps = useMemo(() => toCardSteps(week), [week])
  const total = steps.filter((s) => s.kind === 'question').length
  const moduleKey = `${week.courseId}/${week.id}`

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  const step = steps[index]
  const isLast = index === steps.length - 1
  const question = step.kind === 'question' ? step.question : undefined
  const isCorrect = checked && question !== undefined && selected === question.answer

  // A content card counts its section as read, which keeps the course page's progress bars working.
  useEffect(() => {
    markRead(moduleKey, step.sectionId)
    window.scrollTo({ top: 0 })
    // markRead is a fresh closure each render; only the card changing matters.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  function check() {
    if (!question || selected === null || checked) return
    const right = selected === question.answer
    setChecked(true)
    if (right) setCorrectCount((c) => c + 1)
    recordLessonAnswer(question.id, selected, right)
    playAnswerSound(right)
  }

  function next() {
    if (isLast) {
      completeLesson(correctCount, total, moduleKey)
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
    setChecked(false)
  }

  const onEnter = question && !checked ? check : next
  useLessonKeys({ enabled: !done, onEnter, question, checked, onPick: setSelected })

  if (done) {
    return (
      <LessonSummary
        courseId={week.courseId}
        correct={correctCount}
        total={total}
        againLabel={tUi('lessonRestart')}
        onAgain={onRestart}
      />
    )
  }

  const continueLabel = isLast ? tUi('lessonFinish') : tUi('lessonContinue')

  return (
    <WeekQuestionsContext.Provider value={week.questions}>
      <div className={styles.lesson}>
        <LessonTopBar quitTo={`/course/${week.courseId}`} done={index + (checked ? 1 : 0)} total={steps.length} />

        {step.kind === 'content' ? (
          // key: a new card replays the entrance animation.
          <div key={index} className={`${styles.card} ${contentStyles.content}`}>
            {step.heading && (
              <>
                <p className={styles.kicker}>{t(step.heading.label)}</p>
                <div dangerouslySetInnerHTML={{ __html: resolveHtmlAssetPaths(t(step.heading.html)) }} />
              </>
            )}
            <Blocks blocks={step.blocks} />
          </div>
        ) : (
          <div key={index} className={styles.card}>
            <QuestionCard
              question={step.question}
              kicker={tUi('quickCheck')}
              selected={selected}
              checked={checked}
              onSelect={setSelected}
            />
          </div>
        )}

        <p className={styles.onePage}>
          <Link to={`${moduleHref(week.courseId, week.id)}?view=page`}>{tUi('viewAsPage')}</Link>
        </p>

        {question && !checked ? (
          <LessonFooter action={tUi('checkAnswer')} disabled={selected === null} onAction={check} />
        ) : (
          <LessonFooter
            tone={question ? (isCorrect ? 'right' : 'wrong') : undefined}
            feedback={question && <AnswerFeedback question={question} correct={isCorrect} />}
            action={continueLabel}
            onAction={next}
          />
        )}
      </div>
    </WeekQuestionsContext.Provider>
  )
}
