"use client";

import { useRouter } from "next/navigation";
import { LANG_COOKIE, PHYS_LANG_KEY, type Lang } from "@/lib/i18n";

const OPTIONS: { lang: Lang; label: string }[] = [
  { lang: "zh", label: "中文" },
  { lang: "en", label: "EN" },
];

function persistLang(lang: Lang) {
  document.cookie = `${LANG_COOKIE}=${lang}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem(PHYS_LANG_KEY, lang);
  } catch {
    // Storage can be unavailable (e.g. private mode); the cookie still applies.
  }
}

export function LanguageToggle({ lang }: { lang: Lang }) {
  const router = useRouter();

  function choose(next: Lang) {
    if (next === lang) return;
    persistLang(next);
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
