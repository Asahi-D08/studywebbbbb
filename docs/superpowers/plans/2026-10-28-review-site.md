# StudyWeb 复习网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 新首页展示 IB 经济、物理、CS、数学四科，点击进入按官方大纲排列的科目分区页；物理分区接入现有静态 HTML 笔记；界面中英双语。

**Architecture:** 科目大纲是纯数据（`src/lib/subjects.ts`），界面文案字典在 `src/lib/i18n.ts`，两者都不依赖 Next，用 Node 自带测试运行器测试。页面是服务端组件，从 cookie `sw-lang` 读语言。物理笔记原样复制到 `public/notes/physics/`，只改其中的 `i18n.js` 给顶栏加“返回网站”链接。

**Tech Stack:** Next.js 16.2（App Router，`cookies()` / `params` / `searchParams` 均为 async），React 19，Tailwind v4，next-themes，Node 22 `node --test`（原生 TS 类型擦除）。

## Global Constraints

- 语言只有 `zh | en`，默认 `zh`，cookie 名 `sw-lang`；切换时同时写 `localStorage["phys-lang"]`。
- 科目主题色：economics=amber，physics=indigo，cs=emerald，math=rose。
- 静态笔记链接用 `<a>`，不用 `next/link`。
- 不改动登录、上传、论坛、`/[program]/...` 路由的行为。
- `src/lib/i18n.ts` 与 `src/lib/subjects.ts` 不得有运行时 import（只允许 `import type`），以便 `node --test` 直接加载。
- 测试文件放在 `tests/`，并从 `tsconfig.json` 中排除（测试用 `.ts` 后缀导入）。

## File Structure

- Create `src/lib/i18n.ts` — 语言类型、cookie 名、`parseLang`、`pick`、界面文案 `t()`。
- Create `src/lib/lang-server.ts` — `getLang()`，服务端读 cookie。
- Create `src/lib/subjects.ts` — 四科大纲数据与查询函数。
- Create `src/components/accents.ts` — 主题色 → Tailwind 类名。
- Create `src/components/LanguageToggle.tsx` — 中文/EN 切换（客户端）。
- Create `src/components/ProgressBar.tsx`、`SubjectCard.tsx`、`TopicCard.tsx`。
- Create `src/app/subjects/[subject]/page.tsx` — 科目分区页。
- Modify `src/app/page.tsx`（重写）、`src/components/SiteHeader.tsx`、`src/app/layout.tsx`。
- Create `public/notes/physics/**`（复制），modify 其中 `i18n.js`、`common.css`。
- Create `tests/i18n.test.ts`、`tests/subjects.test.ts`；modify `package.json`、`tsconfig.json`。

---

### Task 1: 语言核心 `i18n.ts`

**Files:**
- Create: `src/lib/i18n.ts`
- Create: `tests/i18n.test.ts`
- Modify: `package.json`（scripts 加 `"test": "node --test \"tests/*.test.ts\""`）
- Modify: `tsconfig.json`（`"exclude": ["node_modules", "tests"]`）

**Interfaces:**
- Produces: `type Lang = "zh" | "en"`、`type Localized = Record<Lang, string>`、`LANG_COOKIE = "sw-lang"`、`PHYS_LANG_KEY = "phys-lang"`、`parseLang(v: string | null | undefined): Lang`、`pick(text: Localized, lang: Lang): string`、`type UIKey`、`t(key: UIKey, lang: Lang, vars?: Record<string, string | number>): string`。

- [ ] **Step 1: 写失败的测试** `tests/i18n.test.ts`

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { parseLang, pick, t } from "../src/lib/i18n.ts";

test("parseLang accepts zh and en, falls back to zh", () => {
  assert.equal(parseLang("en"), "en");
  assert.equal(parseLang("zh"), "zh");
  assert.equal(parseLang("ko"), "zh");
  assert.equal(parseLang(undefined), "zh");
  assert.equal(parseLang(null), "zh");
});

test("pick returns the requested language", () => {
  assert.equal(pick({ zh: "物理", en: "Physics" }, "en"), "Physics");
});

test("t interpolates variables", () => {
  assert.equal(t("progress.label", "en", { ready: 3, total: 10 }), "3/10 topics ready");
  assert.equal(t("progress.label", "zh", { ready: 3, total: 10 }), "3/10 个 Topic 已上线");
});
```

- [ ] **Step 2: 运行，确认失败** — `npm test`，期望：找不到 `../src/lib/i18n.ts`。

- [ ] **Step 3: 实现** `src/lib/i18n.ts`

```ts
export type Lang = "zh" | "en";
export type Localized = Record<Lang, string>;

export const DEFAULT_LANG: Lang = "zh";
export const LANG_COOKIE = "sw-lang";
export const PHYS_LANG_KEY = "phys-lang";

export function parseLang(value: string | null | undefined): Lang {
  return value === "zh" || value === "en" ? value : DEFAULT_LANG;
}

export function pick(text: Localized, lang: Lang): string {
  return text[lang];
}

const UI = {
  "nav.home": { zh: "首页", en: "Home" },
  "nav.signIn": { zh: "登录", en: "Sign in" },
  "brand.sub": { zh: "IB 复习站", en: "IB Revision" },
  "home.eyebrow": { zh: "IB Diploma · 复习", en: "IB Diploma · Revision" },
  "home.title": { zh: "复习，", en: "Revise smarter," },
  "home.titleAccent": { zh: "按科目、按大纲来。", en: "subject by subject." },
  "home.sub": {
    zh: "经济、物理、计算机、数学——按 IB 官方大纲整理的复习笔记。选一个科目，从任意一个 Topic 开始。",
    en: "Economics, Physics, Computer Science and Maths — revision notes organised by the official IB syllabus. Pick a subject and start from any topic.",
  },
  "home.pick": { zh: "选择科目", en: "Choose a subject" },
  "home.subjectsCount": { zh: "{n} 个科目", en: "{n} subjects" },
  "home.signedIn": { zh: "已登录：{name}", en: "Signed in as {name}" },
  "home.signedInHint": {
    zh: "在各科页面底部可以进入上传区，上传或管理自己的笔记。",
    en: "Use the upload area at the bottom of each subject page to add or manage your notes.",
  },
  "home.guest": { zh: "正在以访客身份浏览", en: "Browsing as a guest" },
  "home.guestHint": {
    zh: "所有复习笔记都可以直接阅读。登录后可以上传笔记、参与讨论。",
    en: "All revision notes are open to read. Sign in to upload notes and join discussions.",
  },
  "footer": { zh: "StudyWeb · IB 复习站", en: "StudyWeb · IB revision hub" },
  "progress.label": { zh: "{ready}/{total} 个 Topic 已上线", en: "{ready}/{total} topics ready" },
  "subject.eyebrow": { zh: "IB 科目", en: "IB subject" },
  "subject.back": { zh: "← 全部科目", en: "← All subjects" },
  "subject.ready": { zh: "已上线", en: "Ready" },
  "subject.soon": { zh: "即将上线", en: "Coming soon" },
  "subject.topicsCount": { zh: "{n} 个 Topic", en: "{n} topics" },
  "subject.upload": { zh: "笔记上传区与讨论", en: "Upload area & discussion" },
  "subject.uploadHint": {
    zh: "上传自己的笔记、文件或图片，或者在讨论区提问。",
    en: "Upload your own notes, files or images, or ask in the discussion board.",
  },
  "subject.open": { zh: "进入", en: "Open" },
} satisfies Record<string, Localized>;

export type UIKey = keyof typeof UI;

export function t(key: UIKey, lang: Lang, vars?: Record<string, string | number>): string {
  let text: string = UI[key][lang];
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replaceAll(`{${k}}`, String(v));
    }
  }
  return text;
}
```

- [ ] **Step 4: 运行，确认通过** — `npm test`，期望 3 pass。
- [ ] **Step 5: Commit** — `git add src/lib/i18n.ts tests/i18n.test.ts package.json tsconfig.json && git commit -m "feat: add bilingual UI dictionary"`

---

### Task 2: 复制物理笔记并加返回链接

**Files:**
- Create: `public/notes/physics/**`（从 `~/Desktop/wuli/electricity/` 复制，排除 `*.md`、`.DS_Store`）
- Modify: `public/notes/physics/i18n.js`（`initTopbar`）
- Modify: `public/notes/physics/common.css`（追加 `.site-back` 样式）

- [ ] **Step 1: 复制**

```bash
mkdir -p public/notes/physics
rsync -a --exclude '*.md' --exclude '.DS_Store' ~/Desktop/wuli/electricity/ public/notes/physics/
ls public/notes/physics/topics | wc -l   # 期望 24
```

- [ ] **Step 2: 修改 `i18n.js` 的 `initTopbar`**，两个分支都调用新函数 `mountSiteBack`：

```js
  function mountSiteBack(inner) {
    if (!inner || inner.querySelector(".site-back")) return;
    const a = document.createElement("a");
    a.className = "site-back";
    a.href = "/subjects/physics";
    a.textContent = "← StudyWeb";
    inner.insertBefore(a, inner.firstChild);
  }

  function initTopbar(options) {
    options = options || {};
    const existing = document.querySelector(".topbar");
    if (existing) {
      mountSiteBack(existing.querySelector(".topbar-inner"));
      const mount = existing.querySelector("[data-lang-mount]");
      mountSwitcher(mount);
      apply();
      return;
    }
    // …原有创建 bar 的代码不变…
    document.body.insertBefore(bar, document.body.firstChild);
    mountSiteBack(bar.querySelector(".topbar-inner"));
    mountSwitcher(bar.querySelector("[data-lang-mount]"));
    apply();
  }
```

- [ ] **Step 3: 在 `common.css` 末尾追加**

```css
.site-back{
  font-size:13px;font-weight:700;text-decoration:none;
  color:var(--muted);background:#fff;
  border:1px solid var(--line);border-radius:999px;padding:6px 12px;
}
.site-back:hover{color:var(--ink);}
```

- [ ] **Step 4: Commit** — `git add public/notes && git commit -m "feat: add IB Physics HL static notes"`

---

### Task 3: 科目大纲数据 `subjects.ts`

**Files:**
- Create: `src/lib/subjects.ts`
- Create: `tests/subjects.test.ts`

**Interfaces:**
- Consumes: `type Localized` from `./i18n`（`import type`）。
- Produces: `type Accent = "amber" | "indigo" | "emerald" | "rose"`、`type Topic { code; name: Localized; status: "ready" | "soon"; href?; hlOnly? }`、`type Group { code; title: Localized; topics }`、`type Course { slug; name: Localized; groups }`、`type ReviewSubject { slug; name; short; tagline; monogram; accent; courses; extras?: { label: Localized; href: string }[]; uploadHref }`、`SUBJECTS: ReviewSubject[]`、`getSubject(slug: string): ReviewSubject | undefined`、`getCourse(subject: ReviewSubject, slug?: string): Course`、`courseTopics(course: Course): Topic[]`、`courseProgress(course: Course): { ready: number; total: number }`。

- [ ] **Step 1: 写失败的测试** `tests/subjects.test.ts`

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import {
  SUBJECTS,
  courseProgress,
  courseTopics,
  getCourse,
  getSubject,
} from "../src/lib/subjects.ts";

test("four subjects in display order", () => {
  assert.deepEqual(SUBJECTS.map((s) => s.slug), ["economics", "physics", "cs", "math"]);
});

test("physics: 25 topics, all ready", () => {
  const physics = getSubject("physics")!;
  assert.deepEqual(courseProgress(physics.courses[0]), { ready: 25, total: 25 });
});

test("economics, cs and math are all coming soon", () => {
  for (const slug of ["economics", "cs", "math"]) {
    for (const course of getSubject(slug)!.courses) {
      assert.equal(courseProgress(course).ready, 0, `${slug}/${course.slug}`);
    }
  }
});

test("every ready topic and extra links to a file in public/", () => {
  const hrefs: string[] = [];
  for (const s of SUBJECTS) {
    for (const c of s.courses) {
      for (const tp of courseTopics(c)) {
        if (tp.status === "ready") {
          assert.ok(tp.href, `${s.slug} ${tp.code} missing href`);
          hrefs.push(tp.href);
        }
      }
    }
    for (const e of s.extras ?? []) hrefs.push(e.href);
  }
  for (const href of hrefs) {
    assert.ok(existsSync(path.join("public", href)), `missing file for ${href}`);
  }
});

test("math: SL has no HL-only topics and fewer topics than HL", () => {
  const math = getSubject("math")!;
  const hl = getCourse(math, "aa-hl");
  const sl = getCourse(math, "aa-sl");
  assert.ok(courseTopics(sl).every((tp) => !tp.hlOnly));
  assert.ok(courseTopics(sl).length < courseTopics(hl).length);
});

test("getCourse falls back to the first course", () => {
  const math = getSubject("math")!;
  assert.equal(getCourse(math, "nope").slug, math.courses[0].slug);
  assert.equal(getCourse(math).slug, math.courses[0].slug);
});

test("topic codes are unique within a course", () => {
  for (const s of SUBJECTS) {
    for (const c of s.courses) {
      const codes = courseTopics(c).map((tp) => tp.code);
      assert.equal(new Set(codes).size, codes.length, `${s.slug}/${c.slug}`);
    }
  }
});

test("unknown subject is undefined", () => {
  assert.equal(getSubject("history"), undefined);
});
```

- [ ] **Step 2: 运行，确认失败** — `npm test`，期望：找不到 `../src/lib/subjects.ts`。

- [ ] **Step 3: 实现** `src/lib/subjects.ts`（大纲内容见下，按 IB 官方大纲：Economics 2020 guide、Physics 2023 guide、CS 2025 guide、Math AA 2019 guide）

```ts
import type { Localized } from "./i18n";

export type Accent = "amber" | "indigo" | "emerald" | "rose";

export type Topic = {
  code: string;
  name: Localized;
  status: "ready" | "soon";
  href?: string;
  hlOnly?: boolean;
};

export type Group = { code: string; title: Localized; topics: Topic[] };

export type Course = { slug: string; name: Localized; groups: Group[] };

export type ReviewSubject = {
  slug: "economics" | "physics" | "cs" | "math";
  name: Localized;
  short: Localized;
  tagline: Localized;
  monogram: string;
  accent: Accent;
  courses: Course[];
  extras?: { label: Localized; href: string }[];
  uploadHref: string;
};

function soon(code: string, zh: string, en: string, hlOnly = false): Topic {
  return { code, name: { zh, en }, status: "soon", hlOnly };
}

const PHYSICS_NOTES = "/notes/physics";

function note(code: string, zh: string, en: string, file: string, hlOnly = false): Topic {
  return { code, name: { zh, en }, status: "ready", href: `${PHYSICS_NOTES}/${file}`, hlOnly };
}

// …economics / physics / cs / math 数据，见实现文件…

export const SUBJECTS: ReviewSubject[] = [economics, physics, cs, math];

export function getSubject(slug: string): ReviewSubject | undefined {
  return SUBJECTS.find((s) => s.slug === slug);
}

export function getCourse(subject: ReviewSubject, slug?: string): Course {
  return subject.courses.find((c) => c.slug === slug) ?? subject.courses[0];
}

export function courseTopics(course: Course): Topic[] {
  return course.groups.flatMap((g) => g.topics);
}

export function courseProgress(course: Course): { ready: number; total: number } {
  const topics = courseTopics(course);
  return { ready: topics.filter((tp) => tp.status === "ready").length, total: topics.length };
}
```

数据要求：
- 物理（course `hl`）：Skills（`topics/skills.html`）；Theme A：A.1–A.5（A.4、A.5 为 HL）；Theme B：B.1–B.4（B.4 为 HL），B.5 Current and circuits → `electricity.html`；Theme C：C.1–C.5；Theme D：D.1–D.4（D.4 为 HL）；Theme E：E.1–E.5（E.2 为 HL）。文件名与 `public/notes/physics/topics/` 一致。extras：综合复习 `rev.html`、原版目录 `index.html`。uploadHref `/ib/section-5/physics`。
- 经济（course `sl-hl`）：Unit 1（1.1–1.2）、Unit 2（2.1–2.12）、Unit 3（3.1–3.7）、Unit 4（4.1–4.10）。uploadHref `/ib/section-4/economics`。
- CS（course `sl-hl`）：Theme A（A1 Computer fundamentals、A2 Networks、A3 Databases、A4 Machine learning）、Theme B（B1 Computational thinking、B2 Programming、B3 Object-oriented programming、B4 Abstract data types，B4 为 HL）。uploadHref `/ib/section-6/cs`。
- 数学：先定义 `aaGroups`（Topic 1–5，SL 子 Topic 加 AHL 子 Topic，AHL 标 `hlOnly`），course `aa-hl` 用全部，`aa-sl` 用过滤掉 `hlOnly` 的结果。uploadHref `/ib/section-2/math-aahl`。

- [ ] **Step 4: 运行，确认通过** — `npm test`，期望全部 pass。
- [ ] **Step 5: Commit** — `git add src/lib/subjects.ts tests/subjects.test.ts && git commit -m "feat: add syllabus data for four review subjects"`

---

### Task 4: 语言切换与站点顶栏

**Files:**
- Create: `src/lib/lang-server.ts`、`src/components/LanguageToggle.tsx`
- Modify: `src/components/SiteHeader.tsx`、`src/app/layout.tsx`

**Interfaces:**
- Consumes: `LANG_COOKIE`、`PHYS_LANG_KEY`、`parseLang`、`pick`、`t`、`SUBJECTS`。
- Produces: `getLang(): Promise<Lang>`；`<LanguageToggle lang={lang} />`；`SiteHeader` 的 props 不变。

- [ ] **Step 1: `src/lib/lang-server.ts`**

```ts
import { cookies } from "next/headers";
import { LANG_COOKIE, parseLang, type Lang } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return parseLang(store.get(LANG_COOKIE)?.value);
}
```

- [ ] **Step 2: `src/components/LanguageToggle.tsx`**

```tsx
"use client";

import { useRouter } from "next/navigation";
import { LANG_COOKIE, PHYS_LANG_KEY, type Lang } from "@/lib/i18n";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "zh", label: "中文" },
  { lang: "en", label: "EN" },
];

export function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function choose(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      localStorage.setItem(PHYS_LANG_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the cookie still applies.
    }
    router.refresh();
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label="Language"
    >
      {OPTIONS.map((o) => (
        <button
          key={o.lang}
          type="button"
          onClick={() => choose(o.lang)}
          aria-pressed={lang === o.lang}
          className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
            lang === o.lang
              ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
              : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: 修改 `SiteHeader.tsx`** — 读 `getLang()`；品牌副标题用 `t("brand.sub")`；导航改为 `SUBJECTS` 的 `/subjects/{slug}` 链接（文字 `pick(s.short, lang)`）；`ThemeToggle` 前加 `<LanguageToggle lang={lang} />`；“Sign in” 用 `t("nav.signIn")`；面包屑 “Home” 用 `t("nav.home")`（给 `Breadcrumbs` 传 `homeLabel`）。

- [ ] **Step 4: 修改 `layout.tsx`** — `RootLayout` 改为 async，`const lang = await getLang()`，`<html lang={lang === "zh" ? "zh-CN" : "en"}>`；metadata 改为 title `"StudyWeb — IB 复习站"`、description `"IB 经济、物理、计算机、数学复习笔记。"`。

- [ ] **Step 5: 验证** — `npm run lint && npx tsc --noEmit`，期望无错误。
- [ ] **Step 6: Commit** — `git commit -am "feat: bilingual site header with subject navigation"`（新文件先 `git add`）。

---

### Task 5: 首页

**Files:**
- Create: `src/components/accents.ts`、`src/components/ProgressBar.tsx`、`src/components/SubjectCard.tsx`
- Modify: `src/app/page.tsx`（重写）

**Interfaces:**
- Consumes: `Accent`、`ReviewSubject`、`courseProgress`、`SUBJECTS`、`getLang`、`t`、`pick`、`getSession`。
- Produces: `ACCENT_STYLES: Record<Accent, { glow; mono; bar; text; soft; hoverBorder }>`、`<ProgressBar ready total barClass />`、`<SubjectCard subject lang />`。

- [ ] **Step 1: `src/components/accents.ts`**

```ts
import type { Accent } from "@/lib/subjects";

export type AccentStyle = {
  glow: string;
  mono: string;
  bar: string;
  text: string;
  soft: string;
  hoverBorder: string;
};

export const ACCENT_STYLES: Record<Accent, AccentStyle> = {
  amber: {
    glow: "from-amber-400/30",
    mono: "from-amber-300 to-orange-500 shadow-amber-500/30",
    bar: "bg-gradient-to-r from-amber-400 to-orange-500",
    text: "text-amber-700 dark:text-amber-300",
    soft: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-400/40",
  },
  indigo: {
    glow: "from-indigo-400/30",
    mono: "from-indigo-300 to-violet-500 shadow-indigo-500/30",
    bar: "bg-gradient-to-r from-indigo-400 to-violet-500",
    text: "text-indigo-700 dark:text-indigo-300",
    soft: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-400/40",
  },
  emerald: {
    glow: "from-emerald-400/30",
    mono: "from-emerald-300 to-teal-500 shadow-emerald-500/30",
    bar: "bg-gradient-to-r from-emerald-400 to-teal-500",
    text: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-400/40",
  },
  rose: {
    glow: "from-rose-400/30",
    mono: "from-rose-300 to-pink-500 shadow-rose-500/30",
    bar: "bg-gradient-to-r from-rose-400 to-pink-500",
    text: "text-rose-700 dark:text-rose-300",
    soft: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-400/40",
  },
};
```

- [ ] **Step 2: `ProgressBar.tsx`**

```tsx
export function ProgressBar({ ready, total, barClass }: { ready: number; total: number; barClass: string }) {
  const pct = total === 0 ? 0 : Math.round((ready / total) * 100);
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
      <div className={`h-full rounded-full ${barClass}`} style={{ width: `${pct}%` }} />
    </div>
  );
}
```

- [ ] **Step 3: `SubjectCard.tsx`** — `Link` 到 `/subjects/{slug}`；顶部主题色光晕；左上 monogram 方块；右上课程名（`courses.map(c => pick(c.name, lang)).join(" · ")`）；标题 `pick(name)`、副标题 `pick(tagline)`；底部 `t("progress.label", {ready,total})` + 百分比 + `ProgressBar`（数据取 `courseProgress(courses[0])`）。
- [ ] **Step 4: 重写 `page.tsx`** — `SiteHeader`；hero（`home.eyebrow`、`home.title` + 渐变 `home.titleAccent`、`home.sub`）；“选择科目”标题 + `home.subjectsCount`；`grid gap-6 sm:grid-cols-2` 的四张 `SubjectCard`；账号卡片（已登录：`home.signedIn` + `home.signedInHint`；访客：`home.guest` + `home.guestHint` + 登录按钮）；footer `t("footer")`。
- [ ] **Step 5: 验证** — `npm run lint && npx tsc --noEmit`。
- [ ] **Step 6: Commit** — `git commit -m "feat: subject-first bilingual home page"`。

---

### Task 6: 科目分区页

**Files:**
- Create: `src/components/TopicCard.tsx`、`src/app/subjects/[subject]/page.tsx`

**Interfaces:**
- Consumes: `getSubject`、`getCourse`、`courseProgress`、`Topic`、`Accent`、`ACCENT_STYLES`、`ProgressBar`、`getLang`、`t`、`pick`、`SiteHeader`。

- [ ] **Step 1: `TopicCard.tsx`** — ready 且有 href 时渲染 `<a href>` 卡片（hover 上浮 + 主题色描边），否则渲染虚线边框、`opacity-70` 的 `<div>`。内容：等宽字体 code（主题色）；右侧徽章（`hlOnly` 时显示 “HL”，再显示 `subject.ready` / `subject.soon`）；主名称 `pick(name, lang)`；`lang === "zh"` 时下方灰色小字显示英文名。
- [ ] **Step 2: `page.tsx`** — `params: Promise<{ subject: string }>`、`searchParams: Promise<{ course?: string | string[] }>`；未知科目 `notFound()`；`getCourse(subject, typeof course === "string" ? course : undefined)`。布局：返回链接 `subject.back`；标题区（monogram、`subject.eyebrow`、名称、tagline、右侧完成度 + `ProgressBar`）；`courses.length > 1` 时显示切换（`Link` 到 `?course=slug`，当前项高亮）；`extras` 显示为 `<a>` 胶囊按钮；每个 group 一个 section（code、标题、`subject.topicsCount`）+ `grid gap-3 sm:grid-cols-2 lg:grid-cols-3` 的 `TopicCard`；底部上传区卡片（`subject.upload`、`subject.uploadHint`、`Link` 到 `uploadHref`，文字 `subject.open →`）。并实现 `generateMetadata` 返回 `"{科目名} — StudyWeb"`。
- [ ] **Step 3: 验证** — `npm test && npm run lint && npx tsc --noEmit`。
- [ ] **Step 4: Commit** — `git commit -m "feat: subject review pages with syllabus topics"`。

---

### Task 7: 整体验证与文档

- [ ] **Step 1:** `npm test && npm run lint && npm run build`，全部通过。
- [ ] **Step 2:** `npm run dev`，在浏览器里检查：首页四张卡片（物理 100%，其余 0%）；四个分区页；数学 AA HL / AA SL 切换（SL 没有 HL 徽章）；点物理 A.1 打开笔记，图片和公式正常，顶栏 “← StudyWeb” 能返回物理分区；网站切 EN 后打开笔记也是 EN；深色模式；`/subjects/history` 显示 404。
- [ ] **Step 3:** 更新 `README.md` 的 Structure 段落，并把设计文档中 `site-nav.js` 的描述改为“修改复制后的 `i18n.js` 给顶栏加返回链接”。
- [ ] **Step 4: Commit** — `git commit -m "docs: update README for review site"`。
