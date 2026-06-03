import { notFound } from "next/navigation";
import { getProgram } from "@/lib/curriculum";
import { NavCard } from "@/components/Card";
import { SiteHeader } from "@/components/SiteHeader";

const accents = ["indigo", "violet", "fuchsia", "teal", "amber", "rose"] as const;

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ program: string }>;
}) {
  const { program: programSlug } = await params;
  const program = getProgram(programSlug);
  if (!program) notFound();

  const isFlat = program.sections.length === 1;
  const onlySection = program.sections[0];

  return (
    <>
      <SiteHeader
        loginReturnHref={`/${program.slug}`}
        crumbs={[{ href: `/${program.slug}`, label: program.name }]}
      />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Programme
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {program.name}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {program.description}
          </p>
        </header>

        {isFlat ? (
          <SubjectsGrid
            program={program.slug}
            section={onlySection.slug}
            subjects={onlySection.subjects.map((s) => ({
              slug: s.slug,
              name: s.name,
              caption: s.caption,
            }))}
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {program.sections.map((s, i) => (
              <NavCard
                key={s.slug}
                href={`/${program.slug}/${s.slug}`}
                eyebrow={`Section ${s.number ?? ""}`.trim()}
                title={s.title.replace(/^Section \d+ — /, "")}
                description={s.tagline}
                badge={`${s.subjects.length} subjects`}
                accent={accents[i % accents.length]}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function SubjectsGrid({
  program,
  section,
  subjects,
}: {
  program: string;
  section: string;
  subjects: { slug: string; name: string; caption?: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {subjects.map((s, i) => (
        <NavCard
          key={s.slug}
          href={`/${program}/${section}/${s.slug}`}
          eyebrow="Subject"
          title={s.name}
          description={s.caption}
          accent={accents[i % accents.length]}
        />
      ))}
    </div>
  );
}
