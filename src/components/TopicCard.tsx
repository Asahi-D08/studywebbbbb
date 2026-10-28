import { ACCENT_STYLES } from "@/components/accents";
import { pick, t, type Lang } from "@/lib/i18n";
import type { Accent, Topic } from "@/lib/subjects";

export function TopicCard({ topic, lang, accent }: { topic: Topic; lang: Lang; accent: Accent }) {
  const s = ACCENT_STYLES[accent];
  const ready = topic.status === "ready" && topic.href;

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className={`font-mono text-xs font-semibold ${s.text}`}>{topic.code}</span>
        <span className="flex items-center gap-1.5">
          {topic.hlOnly && (
            <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-semibold text-white dark:bg-white dark:text-slate-900">
              HL
            </span>
          )}
          <span
            className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
              ready ? s.soft : "bg-slate-200/80 text-slate-500 dark:bg-white/5 dark:text-slate-400"
            }`}
          >
            {t(ready ? "subject.ready" : "subject.soon", lang)}
          </span>
        </span>
      </div>
      <div className="mt-2 text-sm font-semibold leading-snug text-slate-900 dark:text-white">
        {pick(topic.name, lang)}
      </div>
      {lang === "zh" && (
        <div className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
          {topic.name.en}
        </div>
      )}
    </>
  );

  if (ready) {
    return (
      <a
        href={topic.href}
        className={`block rounded-xl border border-slate-200/90 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md dark:border-white/10 dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/80 ${s.hoverBorder}`}
      >
        {body}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-dashed border-slate-300/80 bg-white/40 p-4 opacity-75 dark:border-white/10 dark:bg-slate-900/20">
      {body}
    </div>
  );
}
