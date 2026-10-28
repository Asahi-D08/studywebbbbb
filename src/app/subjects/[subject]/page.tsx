import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ACCENT_STYLES } from "@/components/accents";
import { ProgressBar, progressPercent } from "@/components/ProgressBar";
import { SiteHeader } from "@/components/SiteHeader";
import { TopicCard } from "@/components/TopicCard";
import { pick, t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { courseProgress, getCourse, getSubject } from "@/lib/subjects";

type Props = {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ course?: string | string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) return {};
  const lang = await getLang();
  return { title: `${pick(subject.name, lang)} — StudyWeb` };
}

export default async function SubjectPage({ params, searchParams }: Props) {
  const { subject: slug } = await params;
  const subject = getSubject(slug);
  if (!subject) notFound();

  const { course: courseParam } = await searchParams;
  const course = getCourse(subject, typeof courseParam === "string" ? courseParam : undefined);
  const lang = await getLang();
  const s = ACCENT_STYLES[subject.accent];
  const { ready, total } = courseProgress(course);
  const href = `/subjects/${subject.slug}`;

  return (
    <>
      <SiteHeader
        loginReturnHref={href}
        crumbs={[{ href, label: pick(subject.name, lang) }]}
      />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        >
          {t("subject.back", lang)}
        </Link>

        <header className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-5">
            <span
              className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-lg font-bold text-slate-950 shadow-lg ${s.mono}`}
            >
              {subject.monogram}
            </span>
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                {t("subject.eyebrow", lang)}
              </span>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {pick(subject.name, lang)}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {pick(subject.tagline, lang)}
              </p>
            </div>
          </div>
          <div className="w-full sm:w-64">
            <div className="mb-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>{t("progress.label", lang, { ready, total })}</span>
              <span className={`font-semibold ${s.text}`}>{progressPercent(ready, total)}%</span>
            </div>
            <ProgressBar ready={ready} total={total} barClass={s.bar} />
          </div>
        </header>

        {(subject.courses.length > 1 || subject.extras) && (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {subject.courses.length > 1 && (
              <nav className="inline-flex gap-1 rounded-xl border border-slate-200 bg-slate-100/80 p-1 dark:border-white/10 dark:bg-white/5">
                {subject.courses.map((c) => (
                  <Link
                    key={c.slug}
                    href={`${href}?course=${c.slug}`}
                    aria-current={c.slug === course.slug ? "page" : undefined}
                    className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                      c.slug === course.slug
                        ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                        : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                    }`}
                  >
                    {pick(c.name, lang)}
                  </Link>
                ))}
              </nav>
            )}
            {subject.extras?.map((e) => (
              <a
                key={e.href}
                href={e.href}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition hover:opacity-80 ${s.soft}`}
              >
                {pick(e.label, lang)} →
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 space-y-12">
          {course.groups.map((g) => (
            <section key={g.code}>
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className={`text-xs font-bold uppercase tracking-[0.15em] ${s.text}`}>
                  {g.code}
                </span>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {pick(g.title, lang)}
                </h2>
                <span className="text-xs text-slate-500">
                  {t("subject.topicsCount", lang, { n: g.topics.length })}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.topics.map((topic) => (
                  <TopicCard key={topic.code} topic={topic} lang={lang} accent={subject.accent} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16 flex flex-col items-start justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-6 shadow-sm sm:flex-row sm:items-center dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
          <div>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              {t("subject.upload", lang)}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              {t("subject.uploadHint", lang)}
            </p>
          </div>
          <Link
            href={subject.uploadHref}
            className="shrink-0 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
          >
            {t("subject.open", lang)} →
          </Link>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-6 text-center text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}
