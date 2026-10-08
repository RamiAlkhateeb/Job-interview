# Roadmap

## Done
- Guest-only Vite + React + TS app (no accounts, no backend), EN + AR with RTL, light/dark theme.
- Multi-course structure (`src/content/courses.ts`); first course: **Tech Interview Prep** (Resume & ATS, .NET Q&A, DSA patterns).
- Local progress (sections read, quiz answers) in localStorage, shown on each course page, with reset.
- Content validation tests (unique question IDs, answer ranges, every exercise resolves, Arabic present everywhere).
- GitHub Actions: CI (PRs/branches) and Pages deploy from `master`; Dependabot; PR template.
- Duolingo-style **Lesson mode** (`/course/:courseId/:moduleId/lesson`): 8 questions one at a time, instant feedback, score screen; XP (10 per correct, +20 perfect), daily streak (local midnight), Leitner boxes that make lessons favour unseen/missed questions. Streak + XP shown in the top bar.
- **Masar identity**: navy + saffron on paper, Fraunces/Amiri display type, flat cards, generated course covers, new logo/favicon (`src/components/Logo.tsx`).
- **Journey course page**: overview header (stats, what you'll learn, who it's for, Start/Continue, Review mistakes) and a timeline of chapters (modules) that open into lesson rows with status and minutes. Lessons unlock in order within a chapter; chapters are independent. Finished lessons: `progress.lessonsDone`.
- **Home dashboard**: Continue card (from `progress.lastLesson`), 7-day XP strip (`progress.activity`), course cards with cover, chapters/lessons/time and a progress ring.
- **Review mistakes** (`/course/:c/review`): replays questions whose latest answer was wrong. Lesson summary has a "What you learned" recap (takeaways or key terms).
- **Audiences**: every course is tagged for Job seekers / Managers & professionals / Entrepreneurs (`Course.audiences`); Home has a shareable filter (`?for=`), cards and course headers show badges. Third category: Management & decision science.
- **Outlined courses** (titles, descriptions, planned chapters; no lessons yet): Data Analysis, Accounting and Cost Analysis, Financial Management & Feasibility Study, Introduction to Economics, Fundamentals of Management and Theories of Organizations, Operations and Supply Chain Management, Decision Theory, Game Theory, Modeling Procedures in Decision Support Systems. Write chapters with the `add-module` skill (add a loader to make a chapter live).
- **Bite-size lessons** for every module (`/course/:c/:m/learn/:lessonId`): content is cut automatically into one-idea cards (`src/features/lesson/chunks.ts`: each paragraph, list, box, table, code sample; headings and lead-ins ending in ":" stay with what follows; `cardBreak` forces a cut), then the questions on what that lesson showed. Finishing gives XP (5 + 10/correct + 20 perfect) and the streak; "Continue" opens the next lesson. The module URL stays the one-page reading view (print/PDF).
- **Settings** page (`/settings`, ⚙ in the top bar): language, theme (light/dark/system), sound effects (synthesised with Web Audio, no files).

- Business courses (category "Business & finance" on the home page): **Investing Fundamentals** (3 modules), **Personal Finance**, **Accounting Essentials**, **Entrepreneurship**, **Marketing Fundamentals** (1 module each), with "Soon" placeholders for the rest. Shared content helpers in `src/content/helpers.ts`; per-question shuffled option order.

## Next: finish the courses
Write the "Soon" modules. Tech interview: Behavioral (STAR), Offers & negotiation, SQL (from `solutions/sql/`), JavaScript (from `solutions/javascript/`), System design, Mock-interview checklist. Business: investing (valuation, retirement accounts, investment plan), personal finance (debt, credit, insurance, goals), accounting (bookkeeping, ratios, cash management), entrepreneurship (business model, pricing, unit economics, funding, legal), marketing (branding, digital, content & SEO, sales). Use the `add-module` skill.

More course ideas: Project management, Negotiation, Business analytics (port from `../BA2`), Leadership & management, E-commerce.

## Improvement ideas (not built yet)
Learning experience
- **Review-missed mode**: a page that replays only questions answered wrongly (data is already in `progress.answers`).
- **Spaced repetition** across modules: boxes already exist (`progress.boxes`); add a "Practice" lesson that pulls due questions from every module.
- **Next for the journey**: daily goal ring, certificates per finished course, bookmarks/notes on cards, search across lessons, more question types (true/false, fill-in-the-blank, ordering), illustrations per chapter.
- **Timed mock quiz**: random N questions across modules with a score screen.
- **Search** across modules (Pagefind or MiniSearch, built at deploy time).
- **Per-question explanations** shown after answering; **bookmarks / notes** per section.
- **Runnable code**: in-browser Python (Pyodide) / JS for the DSA samples; syntax highlighting (shiki).
- **Printable cheat sheets** per module (print CSS already exists via "Save as PDF").

Platform
- **PWA / offline** (service worker) so modules can be read without a connection.
- **Analytics** (privacy-friendly: Plausible/Umami) to see which modules are used.
- **Lighthouse CI** + link checker in CI; **i18n check** that every UI string has `en` and `ar`.
- Component tests for `Exercise` (Testing Library) and a Playwright smoke test of EN/AR + dark mode.
- Code-split by course once there are several (already one chunk per module).
- Contributions: issue templates for "wrong answer" and "suggest a question".

## Later: accounts (optional)
Guest mode is a deliberate choice. If cross-device progress is wanted later: the BA2 repo (`../BA2`) has a working Supabase setup (auth provider, RLS migrations, `question_attempts` / `week_progress`). To re-add it, implement the same API as `src/features/progress/store.ts` on top of Supabase, keep guest mode as the fallback, and add `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` as repository secrets for the Pages build. Frontend uses the anon key only; every table needs RLS.
