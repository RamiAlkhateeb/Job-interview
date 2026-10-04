# Interview Prep

Free, guest-friendly study app for tech job interviews — English and Arabic, light and dark mode, quizzes and code samples in Python / C# / JavaScript. No account needed; progress is saved in your browser.

**Live site:** https://ramialkhateeb.github.io/Job-interview/

## Courses

**Tech Interview Prep**

| Module | Status |
| --- | --- |
| Resume & ATS | ✅ |
| .NET interview Q&A (35 questions with analogies) | ✅ |
| Data structures & algorithms patterns | ✅ |
| Behavioral (STAR), offers & negotiation, SQL, JavaScript, system design, mock-interview checklist | soon |

More courses can be added later (see below).

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # content validation + progress logic
npm run lint
npm run build    # type-check + production build
```

## Adding content

- New lesson: use the `add-module` skill (`.claude/skills/add-module/SKILL.md`) — one TypeScript file in `src/content/courses/<course>/`, registered in the course's `index.ts`.
- New course: `add-course` skill — one folder + one line in `src/content/courses.ts`.
- All text needs `en` and `ar`; `npm test` enforces it, and enforces unique question IDs.

## Deployment (GitHub Pages)

Pushing to `master` runs `.github/workflows/deploy.yml` (lint → test → build → publish). One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**. Pull requests run `.github/workflows/ci.yml`.

The build uses base path `/Job-interview/` (`GITHUB_PAGES=true`) and copies `index.html` to `404.html` so deep links to a module work on Pages.

## Repository layout

```
src/                 the app (content in src/content/courses/)
solutions/           practice solutions by language (not part of the build)
legacy/              old backend files kept for reference
docs/PLAN.md         roadmap and improvement ideas
docs/content-sources original Arabic README the first modules came from
```
