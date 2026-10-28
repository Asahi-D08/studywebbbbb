import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProgressBar } from "@/components/ProgressBar";
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
  const { ready, total } = courseProgress(course);
  const href = `/subjects/${subject.slug}`;

  return (
    <>
      <SiteHeader
        loginReturnHref={href}
        crumbs={[{ href, label: pick(subject.name, lang) }]}
      />
      <main className="mx-auto max-w-5xl px-6 py-10">
        <Link
          href="/"
          className="text-sm text-slate-500 hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-200"
        >
          {t("subject.back", lang)}
        </Link>

        <header className="mt-6 flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
              {pick(subject.name, lang)}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {pick(subject.tagline, lang)}
            </p>
          </div>
          <div className="w-full sm:w-56">
            <div className="mb-2 text-xs text-slate-500 dark:text-slate-400">
              {t("progress.label", lang, { ready, total })}
            </div>
            <ProgressBar ready={ready} total={total} />
          </div>
        </header>

        {(subject.courses.length > 1 || subject.extras) && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {subject.courses.length > 1 && (
              <nav className="inline-flex gap-1 rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10 dark:bg-slate-900/60">
                {subject.courses.map((c) => (
                  <Link
                    key={c.slug}
                    href={`${href}?course=${c.slug}`}
                    aria-current={c.slug === course.slug ? "page" : undefined}
                    className={`rounded-md px-3 py-1 text-sm font-medium transition ${
                      c.slug === course.slug
                        ? "bg-brand-800 text-white dark:bg-brand-200 dark:text-brand-950"
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
                className="text-sm font-medium text-brand-700 hover:underline dark:text-brand-300"
              >
                {pick(e.label, lang)} →
              </a>
            ))}
          </div>
        )}

        <div className="mt-10 space-y-10">
          {course.groups.map((g) => (
            <section key={g.code}>
              <h2 className="mb-3 flex flex-wrap items-baseline gap-x-3 text-base font-semibold text-slate-900 dark:text-white">
                <span className="text-brand-700 dark:text-brand-300">{g.code}</span>
                {pick(g.title, lang)}
                <span className="text-xs font-normal text-slate-500">
                  {t("subject.topicsCount", lang, { n: g.topics.length })}
                </span>
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.topics.map((topic) => (
                  <TopicCard key={topic.code} topic={topic} lang={lang} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center dark:border-white/10">
          <div>
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">
              {t("subject.upload", lang)}
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t("subject.uploadHint", lang)}
            </p>
          </div>
          <Link
            href={subject.uploadHref}
            className="shrink-0 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-brand-400 hover:text-brand-800 dark:border-white/15 dark:text-white dark:hover:border-brand-300"
          >
            {t("subject.open", lang)} →
          </Link>
        </section>
      </main>
      <footer className="mx-auto max-w-5xl px-6 pb-10 pt-6 text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}
