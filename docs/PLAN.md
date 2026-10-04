# Roadmap

## Done
- Guest-only Vite + React + TS app (no accounts, no backend), EN + AR with RTL, light/dark theme.
- Multi-course structure (`src/content/courses.ts`); first course: **Tech Interview Prep** (Resume & ATS, .NET Q&A, DSA patterns).
- Local progress (sections read, quiz answers) in localStorage, shown on each course page, with reset.
- Content validation tests (unique question IDs, answer ranges, every exercise resolves, Arabic present everywhere).
- GitHub Actions: CI (PRs/branches) and Pages deploy from `master`; Dependabot; PR template.

## Next: finish the first course
Write the "Soon" modules: Behavioral (STAR), Offers & negotiation, SQL (from `solutions/sql/`), JavaScript (from `solutions/javascript/`), System design, Mock-interview checklist. Use the `add-module` skill.

## Improvement ideas (not built yet)
Learning experience
- **Review-missed mode**: a page that replays only questions answered wrongly (data is already in `progress.answers`).
- **Spaced repetition** for questions (Leitner boxes in the same localStorage store).
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
