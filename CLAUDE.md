# Masar (مسار): working conventions

Vite + React + TypeScript study app (brand "Masar · مسار", repo `Courses`) with free courses for careers (tech interview prep) and business (investing, personal finance, accounting, entrepreneurship, marketing). Open to guests: **no accounts, no backend**. Progress lives in the browser's localStorage. Pattern borrowed from the BA2 course app (`../BA2`), minus Supabase/auth/submissions.

## Commands
- `npm run dev`: dev server
- `npm run build`: type-check + build
- `npm run lint`: oxlint (ignores `solutions/`, `legacy/`)
- `npm test`: vitest — validates all course content + progress helpers

## Layout
- `src/content/courses.ts`: course registry. Each course is `src/content/courses/<id>/index.ts` + one file per module; `category` (`careers` / `business` / `management`) groups it on the home page and `audiences` (`job-seekers` / `professionals` / `entrepreneurs`, at least one) drives the Home filter and badges. A course with no `loaders` is an outline: its chapters show as "Coming soon".
- `src/content/helpers.ts`: shared content builders (`L`, `section`, `mcq`, `box`, `table`, …).
- `src/features/<name>/`: feature code (`course`, `weeks`, `quiz`, `lesson`, `progress`, `home`, `settings`); shared UI in `src/components/`.
- `solutions/`: the author's practice solutions (C#/Python/JS/SQL/Java). Not part of the app build.
- `legacy/`: old unrelated backend files, kept for reference only.
- `docs/content-sources/README.ar.md`: the original Arabic README the first modules were migrated from.

## Conventions
- Identity lives in `src/styles/tokens.css`: use `--brand` (navy) / `--accent` (saffron, for "what's next") / `--on-brand`, `--radius`, `--shadow`, `--font-display` (Fraunces; Amiri in RTL) — never raw colours. Flat 1px-border cards, no chunky 3D buttons.
- Content is typed data (`Week` in `src/content/types.ts`), all text `Localized` with `en` + `ar`. UI strings go through i18next (`src/i18n/index.ts`, EN + AR); use logical CSS properties for RTL.
- Question IDs are stable (`<prefix>-qNNN`, prefix letters only, unique app-wide); saved progress references them. Never renumber.
- Option display order is shuffled per question (`src/features/quiz/optionOrder.ts`); stored answers are always indices into `question.options`.
- Finance courses (investing, personal finance) are educational only: no recommendations of specific products, figures labelled as illustrations, and the course `notice` keeps the not-financial-advice disclaimer.
- Progress goes only through `src/features/progress/store.ts` (so a backend can replace it later).
- Roadmap lessons come from `lessonsFor(week)` (`src/features/lesson/lessons.ts`); finished ones are saved as `course/module/lessonId` in `lessonsDone` (plus `lastLesson` for Home's Continue and per-day XP in `activity`), so changing how a section splits into parts can reset its ✓.
- Deploy base path is `/<repo>/` (from `GITHUB_REPOSITORY`, fallback `/Courses/`) when `GITHUB_PAGES=true` (see `vite.config.ts`); use `import.meta.env.BASE_URL` / `resolveAssetPath`, never hard-code it.
- No secrets are needed. If a backend is ever added, follow `docs/SUPABASE-INTEGRATION.md` (optional accounts on the BA2 Supabase archive; guest mode stays the default).

## Skills
`add-module`, `add-course` in `.claude/skills/`.

Roadmap: `docs/PLAN.md`.
