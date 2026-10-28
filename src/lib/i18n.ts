// UI language model. Kept free of runtime imports so `node --test` can load it
// directly (see tests/).

export type Lang = "zh" | "en";
export type Localized = Record<Lang, string>;

export const DEFAULT_LANG: Lang = "zh";
export const LANG_COOKIE = "sw-lang";
/** localStorage key read by the static physics notes in public/notes/physics. */
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
  "home.title": { zh: "IB 复习笔记", en: "IB revision notes" },
  "home.sub": {
    zh: "经济、物理、计算机科学、数学，按官方大纲整理。",
    en: "Economics, Physics, Computer Science and Maths, organised by the official syllabus.",
  },
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
  footer: { zh: "StudyWeb · IB 复习站", en: "StudyWeb · IB revision hub" },
  "progress.label": { zh: "{ready}/{total} 个 Topic 已上线", en: "{ready}/{total} topics ready" },
  "subject.back": { zh: "← 全部科目", en: "← All subjects" },
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
