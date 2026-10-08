import { Link, createBrowserRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppShell } from '../components/AppShell'
import { HomePage } from '../features/home/HomePage'

// Everything except the shell and home page is code-split: each route's chunk loads on first visit.
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      hydrateFallbackElement: <p>…</p>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'course/:courseId',
          lazy: async () => {
            const { CoursePage } = await import('../features/course/CoursePage')
            return { element: <CoursePage /> }
          },
        },
        {
          path: 'course/:courseId/:id',
          lazy: async () => {
            const { WeekPage } = await import('../features/weeks/WeekPage')
            return { element: <WeekPage /> }
          },
        },
        {
          // A roadmap lesson: small cards from one section, then its questions.
          path: 'course/:courseId/:moduleId/learn/:lessonId',
          lazy: async () => {
            const { LessonRoute } = await import('../features/lesson/CardLesson')
            return { element: <LessonRoute /> }
          },
        },
        {
          path: 'course/:courseId/review',
          lazy: async () => {
            const { ReviewPage } = await import('../features/lesson/ReviewPage')
            return { element: <ReviewPage /> }
          },
        },
        {
          path: 'settings',
          lazy: async () => {
            const { SettingsPage } = await import('../features/settings/SettingsPage')
            return { element: <SettingsPage /> }
          },
        },
        {
          // `moduleId`, not `id`: AppShell keys the sidebar's section list off `id`, and a lesson has no sections.
          path: 'course/:courseId/:moduleId/lesson',
          lazy: async () => {
            const { LessonPage } = await import('../features/lesson/LessonPage')
            return { element: <LessonPage /> }
          },
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  // Matches vite.config.ts's `base`: '/' in dev, '/<repo>/' when built for GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)

function NotFound() {
  const { t } = useTranslation()
  return (
    <p>
      {t('pageNotFound')} <Link to="/">{t('home')}</Link>
    </p>
  )
}
