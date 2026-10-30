# StudyWeb

A Next.js revision site for **IB Economics, Physics, Computer Science and
Maths**, with a bilingual (中文 / EN) interface. It is fully static content —
no accounts, database or uploads — so it deploys as-is to Vercel.

## Structure

- `/` — home page with the four review subjects
- `/subjects/[subject]` — syllabus topics for `economics`, `physics`, `cs`, `math`
  (`?course=aa-hl|aa-sl` for maths). Outlines live in `src/lib/subjects.ts`;
  set a topic's `status: "ready"` and `href` once its notes exist.
- `/subjects/[subject]/[topic]` — bilingual topic notes (all 31 IB Economics
  topics). Content lives in `src/content/<subject>/<slug>.tsx` (registered in
  `src/content/<subject>/index.ts`), built from `src/components/notes/`
  (`blocks.tsx` for definitions/callouts/HL boxes, `Chart.tsx` for SVG
  diagrams). Sections with `level: "hl"` and `<HL>` blocks are hidden by
  `?level=sl`.
- `public/notes/physics/` — static IB Physics HL notes (copied from the
  standalone notes; `i18n.js` adds the “← StudyWeb” link to their top bar)

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm test             # syllabus data + i18n unit tests (node --test)
```

## Build

```bash
npm run build
npm start
```

## Deploy

Import the GitHub repo in Vercel; the default Next.js settings work and no
environment variables are needed.
