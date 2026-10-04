---
name: add-course
description: Add a whole new course (e.g. "Cloud interview prep") alongside tech-interview. Use when the user wants a second course.
---

# Add a course

1. Create `src/content/courses/<course-id>/index.ts` exporting a `Course` (see `tech-interview/index.ts`): `id`, localized `title`/`description`, nav `groups`, and `loaders`.
2. Create `helpers.ts` only if you need your own `COURSE_ID`-bound helpers; otherwise import from `tech-interview/helpers` after moving the generic ones (`heading`, `html`, `mcq`, `cover`) to `src/content/helpers.ts`.
3. List the course in `src/content/courses.ts` (`courses` array). The home page, `/course/<id>` page, sidebar, contents panel and prev/next all derive from it — no router changes needed.
4. Pick a distinct question-ID prefix per module and keep it globally unique (a test enforces this).
5. Add modules with the `add-module` skill. Run `npm test`.
