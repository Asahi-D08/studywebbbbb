import Link from "next/link";
import { ACCENT_STYLES } from "@/components/accents";
import { ProgressBar, progressPercent } from "@/components/ProgressBar";
import { pick, t, type Lang } from "@/lib/i18n";
import { courseProgress, type ReviewSubject } from "@/lib/subjects";

export function SubjectCard({ subject, lang }: { subject: ReviewSubject; lang: Lang }) {
  const s = ACCENT_STYLES[subject.accent];
  const { ready, total } = courseProgress(subject.courses[0]);

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white/75 p-7 shadow-sm transition hover:-translate-y-1 hover:bg-white hover:shadow-xl dark:border-white/10 dark:bg-slate-900/50 dark:shadow-none dark:hover:bg-slate-900/80 ${s.hoverBorder}`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${s.glow} to-transparent opacity-60 transition-opacity group-hover:opacity-100`}
      />
      <div className="relative flex items-start justify-between gap-3">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br text-base font-bold text-slate-950 shadow-lg ${s.mono}`}
        >
          {subject.monogram}
        </span>
        <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200">
          {subject.courses.map((c) => pick(c.name, lang)).join(" · ")}
        </span>
      </div>
      <h3 className="relative mt-6 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {pick(subject.name, lang)}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {pick(subject.tagline, lang)}
      </p>
      <div className="relative mt-auto pt-8">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{t("progress.label", lang, { ready, total })}</span>
          <span className={`font-semibold ${s.text}`}>{progressPercent(ready, total)}%</span>
        </div>
        <ProgressBar ready={ready} total={total} barClass={s.bar} />
      </div>
    </Link>
  );
}
