import type { Course } from '../../courses'

export const techInterview: Course = {
  id: 'tech-interview',
  category: 'careers',
  title: { en: 'Tech Interview Prep', ar: 'التحضير للمقابلات التقنية' },
  description: {
    en: 'Everything for a software-engineering job search: ATS-friendly resume, .NET interview questions with analogies, and the data-structure patterns behind coding rounds.',
    ar: 'كل ما تحتاجه للبحث عن وظيفة في هندسة البرمجيات: سيرة ذاتية متوافقة مع ATS، وأسئلة مقابلات .NET مع التشبيهات، وأنماط هياكل البيانات خلف جولات البرمجة.',
  },
  groups: [
    {
      label: { en: 'Getting hired', ar: 'الحصول على الوظيفة' },
      items: [
        { id: 'resume', title: { en: 'Resume & ATS', ar: 'السيرة الذاتية و ATS' } },
        { id: 'behavioral', title: { en: 'Behavioral questions (STAR)', ar: 'الأسئلة السلوكية (STAR)' } },
        { id: 'negotiation', title: { en: 'Offers & negotiation', ar: 'العروض والتفاوض' } },
      ],
    },
    {
      label: { en: 'Technical rounds', ar: 'الجولات التقنية' },
      items: [
        { id: 'dotnet', title: { en: '.NET interview Q&A', ar: 'أسئلة مقابلات .NET' } },
        { id: 'dsa', title: { en: 'Data structures & algorithms patterns', ar: 'أنماط هياكل البيانات والخوارزميات' } },
        { id: 'sql', title: { en: 'SQL', ar: 'SQL' } },
        { id: 'javascript', title: { en: 'JavaScript', ar: 'JavaScript' } },
        { id: 'system-design', title: { en: 'System design', ar: 'تصميم الأنظمة' } },
      ],
    },
    {
      label: { en: 'Final prep', ar: 'التحضير الأخير' },
      items: [{ id: 'mock-checklist', title: { en: 'Mock interview checklist', ar: 'قائمة المقابلة التجريبية' } }],
    },
  ],
  // Add a loader here (and a nav item above) when a module is written; items without one show "Soon".
  loaders: {
    resume: () => import('./resume').then((m) => m.resume),
    dotnet: () => import('./dotnet').then((m) => m.dotnet),
    dsa: () => import('./dsa').then((m) => m.dsa),
  },
}
