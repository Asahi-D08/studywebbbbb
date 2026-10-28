# StudyWeb

A Next.js revision site for **IB Economics, Physics, Computer Science and
Maths**, with a bilingual (中文 / EN) interface. Each subject also keeps an
upload area with a public **Sharing area** and a **Private** tab.

## Structure

- `/` — home page with the four review subjects
- `/subjects/[subject]` — syllabus topics for `economics`, `physics`, `cs`, `math`
  (`?course=aa-hl|aa-sl` for maths). Outlines live in `src/lib/subjects.ts`;
  set a topic's `status: "ready"` and `href` once its notes exist.
- `public/notes/physics/` — static IB Physics HL notes (copied from the
  standalone notes; `i18n.js` adds the “← StudyWeb” link to their top bar)
- `/[program]` — legacy programme overview (IGCSE / IB upload areas)
- `/[program]/[section]` — IB: themed sections; IGCSE: a single flat section
- `/[program]/[section]/[subject]` — notes list (tabs) + upload form
- `data/` — local-only JSON + uploads (gitignored)

## Sign in

Pages and APIs (except `POST /api/auth/login`) require a signed session cookie.

1. Copy `env.example` to `.env.local`.
2. Set **`STUDYWEB_BOOTSTRAP_USERNAME`** and **`STUDYWEB_BOOTSTRAP_PASSWORD`** — on first start (empty `data/users.json`), the first account is created automatically.
3. For production, set **`STUDYWEB_AUTH_SECRET`** to a random string **at least 32 characters** (dev uses a built-in fallback).
4. Open `/login` and sign in.

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

## Notes

- All uploads land in `data/` next to the project — no DB, no cloud.
- Files are capped at 25 MB.
- IB Section 6 → Economics is an alias that redirects to Section 4.
# studywebbbbb
