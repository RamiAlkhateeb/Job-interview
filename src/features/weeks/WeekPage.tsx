import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWeek } from '../../content/useWeek'
import { Cover } from '../../components/content/Cover'
import { SectionView } from '../../components/content/SectionView'
import { WeekNav } from '../../components/content/WeekNav'
import contentStyles from '../../components/content/content.module.css'
import { useProgress } from '../progress/useProgress'
import { WeekQuestionsContext } from '../quiz/weekQuestions'
import { useScrollSpy } from './useScrollSpy'

export function WeekPage() {
  const { courseId, id } = useParams<{ courseId: string; id: string }>()
  const { t } = useTranslation()
  const { week, loading, notFound } = useWeek(courseId, id)
  const { markRead } = useProgress()

  const sectionIds = useMemo(() => week?.sections.map((s) => s.id) ?? [], [week])
  const activeId = useScrollSpy(sectionIds)

  useEffect(() => {
    if (week && activeId) markRead(`${week.courseId}/${week.id}`, activeId)
    // markRead is a fresh closure each render; only the active section changing matters here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [week, activeId])

  // Content loads asynchronously, so a #section deep link can't be scrolled to by the browser on load.
  useEffect(() => {
    if (week && window.location.hash) {
      document.getElementById(decodeURIComponent(window.location.hash.slice(1)))?.scrollIntoView()
    }
  }, [week])

  if (loading) return <p>{t('loading')}</p>
  if (notFound || !week) return <p>{t('moduleNotFound')}</p>

  return (
    <WeekQuestionsContext.Provider value={week.questions}>
      <div className={contentStyles.content}>
        <Cover week={week} />
        {week.sections.map((section) => (
          <SectionView key={section.id} section={section} />
        ))}
        <WeekNav courseId={week.courseId} weekId={week.id} />
      </div>
    </WeekQuestionsContext.Provider>
  )
}
