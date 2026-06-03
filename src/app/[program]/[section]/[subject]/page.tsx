import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getProgram, getSection, getSubject } from "@/lib/curriculum";
import { listNotes } from "@/lib/storage";
import { getSession } from "@/lib/auth-server";
import { SiteHeader } from "@/components/SiteHeader";
import { NotesView } from "@/components/NotesView";
import { UploadSidebar } from "@/components/UploadSidebar";

export const dynamic = "force-dynamic";

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ program: string; section: string; subject: string }>;
}) {
  const {
    program: programSlug,
    section: sectionSlug,
    subject: subjectSlug,
  } = await params;

  const program = getProgram(programSlug);
  const section = getSection(programSlug, sectionSlug);
  const subject = getSubject(programSlug, sectionSlug, subjectSlug);
  if (!program || !section || !subject) notFound();

  // Honour aliases (e.g. Economics in Section 6 → Section 4).
  if (subject.redirectTo) {
    redirect(
      `/${program.slug}/${subject.redirectTo.section}/${subject.redirectTo.subject}`,
    );
  }

  const session = await getSession();
  const allNotes = await listNotes(program.slug, section.slug, subject.slug);
  const notesForView = session ? allNotes : allNotes.filter((n) => n.shared);

  const subjectPath = `/${program.slug}/${section.slug}/${subject.slug}`;

  return (
    <>
      <SiteHeader
        loginReturnHref={subjectPath}
        crumbs={[
          { href: `/${program.slug}`, label: program.name },
          { href: `/${program.slug}/${section.slug}`, label: section.title },
          {
            href: subjectPath,
            label: subject.name,
          },
        ]}
      />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {program.name} · {section.title.replace(/^Section \d+ — /, "")}
            </span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              {subject.name}
            </h1>
            {subject.caption && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{subject.caption}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/${program.slug}/${section.slug}/forum`}
              className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/20"
            >
              Discuss in section forum →
            </Link>
            <Link
              href={`/${program.slug}/${section.slug}`}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
            >
              ← Back to section
            </Link>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <NotesView
              notes={notesForView}
              isAuthenticated={Boolean(session)}
              program={program.slug}
              section={section.slug}
              subject={subject.slug}
            />
          </section>
          <aside>
            <UploadSidebar
              isAuthenticated={Boolean(session)}
              program={program.slug}
              section={section.slug}
              subject={subject.slug}
              loginNextPath={subjectPath}
            />
          </aside>
        </div>
      </main>
    </>
  );
}
