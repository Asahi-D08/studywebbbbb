import Link from "next/link";
import { pick, t, type Lang } from "@/lib/i18n";
import type { Topic } from "@/lib/subjects";

const CARD =
  "block rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-400/50";

export function TopicCard({ topic, lang }: { topic: Topic; lang: Lang }) {
  const ready = topic.status === "ready" && topic.href;

  const body = (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-semibold text-brand-700 dark:text-brand-300">
          {topic.code}
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-semibold">
          {topic.hlOnly && (
            <span className="rounded bg-brand-800 px-1.5 py-px text-white dark:bg-brand-200 dark:text-brand-950">
              HL only
            </span>
          )}
          {topic.hasHL && (
            <span className="rounded border border-brand-300 px-1.5 py-px text-brand-700 dark:border-brand-400/50 dark:text-brand-300">
              {t("notes.hasHL", lang)}
            </span>
          )}
          {!ready && (
            <span className="font-medium text-slate-400 dark:text-slate-500">{t("subject.soon", lang)}</span>
          )}
        </span>
      </div>
      <div className="mt-2 text-sm font-medium leading-snug text-slate-900 dark:text-white">
        {pick(topic.name, lang)}
      </div>
      {lang === "zh" && (
        <div className="mt-0.5 text-xs leading-snug text-slate-500 dark:text-slate-400">
          {topic.name.en}
        </div>
      )}
    </>
  );

  if (ready && topic.href?.startsWith("/subjects/")) {
    return (
      <Link href={topic.href} className={CARD}>
        {body}
      </Link>
    );
  }

  if (ready) {
    return (
      <a href={topic.href} className={CARD}>
        {body}
      </a>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500 dark:border-white/5 dark:bg-slate-900/30">
      {body}
    </div>
  );
}
