import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// English + Arabic. Course content carries its own `Localized` text (src/content); these are UI strings only.
const resources = {
  en: {
    translation: {
      appName: 'Interview Prep',
      appTagline: 'Tech job interview courses',
      homeIntro: 'Free study material for tech job interviews. No account needed — pick a course and start reading. Your progress is saved in this browser.',
      openCourse: 'Open course',
      courseContents: 'Course contents',
      backToCourse: 'Back to course',
      home: 'Home',
      soon: 'Soon',
      previous: 'Previous',
      next: 'Next',
      loading: 'Loading…',
      moduleNotFound: "This module doesn't exist yet.",
      pageNotFound: 'Page not found.',
      saveAsPdf: 'Save as PDF',
      quickCheck: 'Quick check',
      checkAnswer: 'Check answer',
      tryAgain: 'Try again',
      correct: '✓ Correct',
      notQuite: '✗ Not quite — the answer is "{{answer}}"',
      copy: 'Copy',
      copied: 'Copied',
      close: 'Close',
      lightMode: 'Switch to light mode',
      darkMode: 'Switch to dark mode',
      quizScore: 'Quiz {{correct}}/{{total}}',
      resetProgress: 'Reset my progress',
      resetConfirm: 'Clear all saved progress in this browser?',
      startLesson: 'Start lesson',
      lessonQuit: 'Quit lesson',
      lessonContinue: 'Continue',
      lessonFinish: 'Finish',
      lessonCorrect: 'Nice!',
      lessonWrong: 'Correct answer:',
      lessonComplete: 'Lesson complete!',
      lessonPerfect: 'Perfect lesson!',
      lessonScore: 'Score',
      lessonXpEarned: 'XP earned',
      lessonAgain: 'Practice again',
      lessonNoQuestions: 'This module has no questions yet.',
      streak: 'Streak',
      streakDays: '{{count}}-day streak',
      totalXp: '{{xp}} XP total',
    },
  },
  ar: {
    translation: {
      appName: 'التحضير للمقابلات',
      appTagline: 'دورات المقابلات الوظيفية التقنية',
      homeIntro: 'مواد دراسية مجانية للمقابلات الوظيفية التقنية. لا حاجة لحساب — اختر دورة وابدأ القراءة. يُحفظ تقدمك في هذا المتصفح.',
      openCourse: 'افتح الدورة',
      courseContents: 'محتوى الدورة',
      backToCourse: 'العودة إلى الدورة',
      home: 'الرئيسية',
      soon: 'قريبًا',
      previous: 'السابق',
      next: 'التالي',
      loading: 'جارٍ التحميل…',
      moduleNotFound: 'هذه الوحدة غير موجودة بعد.',
      pageNotFound: 'الصفحة غير موجودة.',
      saveAsPdf: 'حفظ كملف PDF',
      quickCheck: 'اختبار سريع',
      checkAnswer: 'تحقق من الإجابة',
      tryAgain: 'حاول مرة أخرى',
      correct: '✓ إجابة صحيحة',
      notQuite: '✗ ليست تمامًا — الإجابة هي "{{answer}}"',
      copy: 'نسخ',
      copied: 'تم النسخ',
      close: 'إغلاق',
      lightMode: 'التبديل إلى الوضع الفاتح',
      darkMode: 'التبديل إلى الوضع الداكن',
      quizScore: 'الاختبار {{correct}}/{{total}}',
      resetProgress: 'مسح تقدمي',
      resetConfirm: 'هل تريد مسح كل التقدم المحفوظ في هذا المتصفح؟',
      startLesson: 'ابدأ الدرس',
      lessonQuit: 'إنهاء الدرس',
      lessonContinue: 'متابعة',
      lessonFinish: 'إنهاء',
      lessonCorrect: 'أحسنت!',
      lessonWrong: 'الإجابة الصحيحة:',
      lessonComplete: 'اكتمل الدرس!',
      lessonPerfect: 'درس مثالي!',
      lessonScore: 'النتيجة',
      lessonXpEarned: 'نقاط الخبرة المكتسبة',
      lessonAgain: 'تدرّب مرة أخرى',
      lessonNoQuestions: 'لا توجد أسئلة في هذه الوحدة بعد.',
      streak: 'السلسلة',
      streakDays: 'سلسلة {{count}} يوم',
      totalXp: 'إجمالي نقاط الخبرة {{xp}}',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') === 'ar' ? 'ar' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

const RTL_LANGS = ['ar']

const applyDir = (lng: string) => {
  document.documentElement.lang = lng
  document.documentElement.dir = RTL_LANGS.includes(lng) ? 'rtl' : 'ltr'
  localStorage.setItem('lang', lng)
}
applyDir(i18n.language)
i18n.on('languageChanged', applyDir)

export default i18n
