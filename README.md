# StudyWeb

A small Next.js notes hub for **IGCSE** and **IB** study notes. Upload text,
files, or images per subject; each subject has a public **Sharing area** and a
**Private** tab.

## Structure

- `/` — landing page (pick IGCSE or IB)
- `/[program]` — programme overview
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
