# Interview Prep: working conventions

Vite + React + TypeScript study app for tech job interviews. Open to guests: **no accounts, no backend**. Progress lives in the browser's localStorage. Pattern borrowed from the BA2 course app (`../BA2`), minus Supabase/auth/submissions.

## Commands
- `npm run dev`: dev server
- `npm run build`: type-check + build
- `npm run lint`: oxlint (ignores `solutions/`, `legacy/`)
- `npm test`: vitest — validates all course content + progress helpers

## Layout
- `src/content/courses.ts`: course registry. Each course is `src/content/courses/<id>/index.ts` + one file per module.
- `src/features/<name>/`: feature code (`course`, `weeks`, `quiz`, `progress`, `home`, `theme`); shared UI in `src/components/`.
- `solutions/`: the author's practice solutions (C#/Python/JS/SQL/Java). Not part of the app build.
- `legacy/`: old unrelated backend files, kept for reference only.
- `docs/content-sources/README.ar.md`: the original Arabic README the first modules were migrated from.

## Conventions
- Content is typed data (`Week` in `src/content/types.ts`), all text `Localized` with `en` + `ar`. UI strings go through i18next (`src/i18n/index.ts`, EN + AR); use logical CSS properties for RTL.
- Question IDs are stable (`<prefix>-qNNN`); saved progress references them. Never renumber.
- Progress goes only through `src/features/progress/store.ts` (so a backend can replace it later).
- Deploy base path is `/Job-interview/` when `GITHUB_PAGES=true` (see `vite.config.ts`); use `import.meta.env.BASE_URL` / `resolveAssetPath`, never hard-code it.
- No secrets are needed. If a backend is ever added, see `docs/PLAN.md` ("Later: accounts").

## Skills
`add-module`, `add-course` in `.claude/skills/`.

Roadmap: `docs/PLAN.md`.
