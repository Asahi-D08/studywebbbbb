import Link from "next/link";
import { ProgressBar } from "@/components/ProgressBar";
import { pick, t, type Lang } from "@/lib/i18n";
import { courseProgress, type ReviewSubject } from "@/lib/subjects";

export function SubjectCard({ subject, lang }: { subject: ReviewSubject; lang: Lang }) {
  const { ready, total } = courseProgress(subject.courses[0]);

  return (
    <Link
      href={`/subjects/${subject.slug}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-400/50"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg bg-brand-50 text-sm font-bold text-brand-800 dark:bg-brand-500/15 dark:text-brand-200">
          {subject.monogram}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {subject.courses.map((c) => pick(c.name, lang)).join(" · ")}
        </span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-slate-900 group-hover:text-brand-800 dark:text-white dark:group-hover:text-brand-200">
        {pick(subject.name, lang)}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {pick(subject.tagline, lang)}
      </p>
      <div className="mt-auto pt-6">
        <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
          {t("progress.label", lang, { ready, total })}
        </div>
        <ProgressBar ready={ready} total={total} />
      </div>
    </Link>
  );
}
