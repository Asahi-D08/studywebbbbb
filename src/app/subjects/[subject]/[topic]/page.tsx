import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { getTopicNotes } from "@/content";
import { pick, t } from "@/lib/i18n";
import { getLang } from "@/lib/lang-server";
import { getSubject, topicSlug, type Topic } from "@/lib/subjects";

type Props = {
  params: Promise<{ subject: string; topic: string }>;
  searchParams: Promise<{ level?: string | string[] }>;
};

function findTopic(subjectSlug: string, slug: string) {
  const subject = getSubject(subjectSlug);
  if (!subject) return undefined;
  const groups = subject.courses[0].groups;
  const topics = groups.flatMap((g) => g.topics.map((tp) => ({ topic: tp, group: g })));
  const index = topics.findIndex((x) => topicSlug(x.topic.code) === slug);
  const notes = getTopicNotes(subject.slug, slug);
  if (index < 0 || !notes) return undefined;
  return {
    subject,
    notes,
    ...topics[index],
    prev: topics[index - 1]?.topic,
    next: topics[index + 1]?.topic,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subject, topic } = await params;
  const found = findTopic(subject, topic);
  if (!found) return {};
  const lang = await getLang();
  return { title: `${found.topic.code} ${pick(found.topic.name, lang)} — StudyWeb` };
}

export default async function TopicPage({ params, searchParams }: Props) {
  const { subject: subjectSlug, topic: slug } = await params;
  const found = findTopic(subjectSlug, slug);
  if (!found) notFound();

  const { subject, notes, topic, group, prev, next } = found;
  const lang = await getLang();
  const { level } = await searchParams;
  const slOnly = level === "sl";
  const sections = slOnly ? notes.sections.filter((s) => s.level !== "hl") : notes.sections;
  const base = `/subjects/${subject.slug}`;
  const href = `${base}/${slug}`;

  return (
    <>
      <SiteHeader
        crumbs={[
          { href: base, label: pick(subject.name, lang) },
          { href, label: `${topic.code} ${pick(topic.name, lang)}` },
        ]}
      />
      <main className="mx-auto max-w-3xl px-6 py-10">
        <Link
          href={base}
          className="text-sm text-slate-500 hover:text-brand-800 dark:text-slate-400 dark:hover:text-brand-200"
        >
          ← {group.code} · {pick(group.title, lang)}
        </Link>

        <header className="mt-6 border-b border-slate-200 pb-6 dark:border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-sm font-semibold text-brand-700 dark:text-brand-300">
              {topic.code}
            </span>
            <LevelBadge topic={topic} lang={lang} />
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
            {pick(topic.name, lang)}
          </h1>
          {lang === "zh" && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{topic.name.en}</p>
          )}
          {pick(notes.summary, lang) && (
            <p className="mt-4 text-[15px] leading-relaxed text-slate-700 dark:text-slate-300">
              {pick(notes.summary, lang)}
            </p>
          )}
          {topic.hlOnly && (
            <p className="mt-4 rounded-lg border-[1.5px] border-brand-800 px-3 py-2 text-sm font-medium text-brand-900 dark:border-brand-300 dark:text-brand-100">
              {t("notes.hlOnlyTopic", lang)}
            </p>
          )}
          {topic.hasHL && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <span className="text-slate-600 dark:text-slate-400">{t("notes.hasHLTopic", lang)}</span>
              <Link
                href={slOnly ? href : `${href}?level=sl`}
                className="rounded-lg border border-slate-300 px-3 py-1 font-medium text-slate-700 hover:border-brand-400 hover:text-brand-800 dark:border-white/15 dark:text-slate-200 dark:hover:border-brand-300"
              >
                {t(slOnly ? "notes.showAll" : "notes.slOnly", lang)}
              </Link>
            </div>
          )}
        </header>

        {sections.length === 0 ? (
          <p className="mt-10 text-sm text-slate-500">{t("notes.empty", lang)}</p>
        ) : (
          <>
            <nav className="mt-6 text-sm">
              <div className="font-medium text-slate-900 dark:text-white">{t("notes.contents", lang)}</div>
              <ol className="mt-2 space-y-1">
                {sections.map((s, i) => (
                  <li key={s.id} className="flex items-center gap-2">
                    <span className="w-5 text-right text-slate-400">{i + 1}.</span>
                    <a
                      href={`#${s.id}`}
                      className="text-slate-700 hover:text-brand-800 hover:underline dark:text-slate-300 dark:hover:text-brand-200"
                    >
                      {pick(s.title, lang)}
                    </a>
                    {s.level === "hl" && <span className="notes-hl-badge">HL only</span>}
                  </li>
                ))}
              </ol>
            </nav>

            <article className={`notes mt-8 space-y-10 ${slOnly ? "sl-view" : ""}`}>
              {sections.map((s, i) => (
                <section
                  key={s.id}
                  id={s.id}
                  className={`scroll-mt-32 ${s.level === "hl" ? "notes-hl" : ""}`}
                >
                  <h2 className="flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white">
                    <span className="text-brand-700 dark:text-brand-300">{i + 1}.</span>
                    {pick(s.title, lang)}
                    {s.level === "hl" && <span className="notes-hl-badge">HL only</span>}
                  </h2>
                  <div className="mt-2">{s.body[lang]}</div>
                </section>
              ))}
            </article>
          </>
        )}

        {notes.sources && notes.sources.length > 0 && (
          <section className="mt-12 border-t border-slate-200 pt-6 text-sm dark:border-white/10">
            <div className="font-medium text-slate-900 dark:text-white">{t("notes.sources", lang)}</div>
            <ul className="mt-2 space-y-1">
              {notes.sources.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <nav className="mt-12 grid gap-3 border-t border-slate-200 pt-6 text-sm sm:grid-cols-2 dark:border-white/10">
          {prev ? <TopicLink topic={prev} base={base} lang={lang} dir="prev" /> : <span />}
          {next && <TopicLink topic={next} base={base} lang={lang} dir="next" />}
        </nav>
      </main>
      <footer className="mx-auto max-w-3xl px-6 pb-10 pt-6 text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}

function LevelBadge({ topic, lang }: { topic: Topic; lang: "zh" | "en" }) {
  if (topic.hlOnly) return <span className="notes-hl-badge">HL only</span>;
  return (
    <span className="rounded border border-slate-300 px-1.5 text-[11px] font-semibold leading-relaxed text-slate-600 dark:border-white/20 dark:text-slate-300">
      SL / HL{topic.hasHL ? ` · ${t("notes.hasHL", lang)}` : ""}
    </span>
  );
}

function TopicLink({
  topic,
  base,
  lang,
  dir,
}: {
  topic: Topic;
  base: string;
  lang: "zh" | "en";
  dir: "prev" | "next";
}) {
  return (
    <Link
      href={`${base}/${topicSlug(topic.code)}`}
      className={`rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-400/50 ${
        dir === "next" ? "sm:text-right" : ""
      }`}
    >
      <div className="text-xs text-slate-500">
        {dir === "prev" ? `← ${t("notes.prev", lang)}` : `${t("notes.next", lang)} →`}
      </div>
      <div className="mt-1 font-medium text-slate-900 dark:text-white">
        {topic.code} {pick(topic.name, lang)}
      </div>
    </Link>
  );
}
