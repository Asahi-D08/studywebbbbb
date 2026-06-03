import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgram, getSection } from "@/lib/curriculum";
import { NavCard } from "@/components/Card";
import { SiteHeader } from "@/components/SiteHeader";

const accents = ["indigo", "violet", "fuchsia", "teal", "amber", "rose"] as const;

export default async function SectionPage({
  params,
}: {
  params: Promise<{ program: string; section: string }>;
}) {
  const { program: programSlug, section: sectionSlug } = await params;
  const program = getProgram(programSlug);
  const section = getSection(programSlug, sectionSlug);
  if (!program || !section) notFound();

  return (
    <>
      <SiteHeader
        loginReturnHref={`/${program.slug}/${section.slug}`}
        crumbs={[
          { href: `/${program.slug}`, label: program.name },
          { href: `/${program.slug}/${section.slug}`, label: section.title },
        ]}
      />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {program.name} · {section.number ? `Section ${section.number}` : "Subjects"}
            </span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {section.title.replace(/^Section \d+ — /, "")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {section.tagline}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${program.slug}/${section.slug}/forum`}
              className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400"
            >
              Open forum →
            </Link>
            <Link
              href={`/${program.slug}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
            >
              ← All sections
            </Link>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {section.subjects.map((sub, i) => {
            // Subjects with redirectTo link directly to their canonical home,
            // skipping the alias page entirely. The alias page also handles
            // direct URL access via a server redirect.
            const target = sub.redirectTo
              ? `/${program.slug}/${sub.redirectTo.section}/${sub.redirectTo.subject}`
              : `/${program.slug}/${section.slug}/${sub.slug}`;
            return (
              <NavCard
                key={sub.slug}
                href={target}
                eyebrow={sub.redirectTo ? "Alias →" : "Subject"}
                title={sub.name}
                description={sub.caption}
                badge={sub.redirectTo ? "Section 4" : undefined}
                accent={accents[i % accents.length]}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
