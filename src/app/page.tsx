import Link from "next/link";
import { CURRICULUM } from "@/lib/curriculum";
import { NavCard } from "@/components/Card";
import { SiteHeader } from "@/components/SiteHeader";
import { getSession } from "@/lib/auth-server";

const accents = ["indigo", "fuchsia"] as const;

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            IGCSE · IB
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            Your study notes,{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-indigo-300 dark:via-violet-300 dark:to-fuchsia-300">
              organised by programme & subject.
            </span>
          </h1>
          <p className="mt-4 text-balance text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            Browse shared notes without an account. Sign in to upload, manage
            private notes, copy from the sharing area, or save files to your
            device.
          </p>
        </section>

        <section className="mx-auto mt-10 max-w-xl rounded-2xl border border-slate-200/90 bg-white/70 p-6 text-center shadow-sm dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
          {session ? (
            <>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Signed in as{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {session.username}
                </span>
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Open a programme below, pick a subject, then use the sharing area
                or upload new notes.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Account
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                You can read public sharing areas as a visitor. Sign in when you
                want to upload or copy shared notes into your private library.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400"
              >
                Sign in
              </Link>
            </>
          )}
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Choose a programme
            </h2>
            <span className="text-xs text-slate-500">{CURRICULUM.length} programmes</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {CURRICULUM.map((p, i) => (
              <NavCard
                key={p.slug}
                href={`/${p.slug}`}
                eyebrow="Programme"
                title={p.name}
                description={p.description}
                badge={
                  p.sections.length === 1
                    ? `${p.sections[0].subjects.length} subjects`
                    : `${p.sections.length} sections`
                }
                accent={accents[i % accents.length]}
              />
            ))}
          </div>
        </section>

        <section className="mt-16 grid gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-6 shadow-sm sm:grid-cols-3 dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
          <Feature
            title="Sharing area"
            body="Visitors see shared notes only. Uploading always requires signing in."
          />
          <Feature
            title="Copy to my notes"
            body="Save a duplicate of any shared note into your Private tab (same subject)."
          />
          <Feature
            title="Save locally"
            body="Download text as .txt or grab files with Save locally — works signed in or not (for shared content)."
          />
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-6 text-center text-xs text-slate-500">
        StudyWeb · Built with Next.js
      </footer>
    </>
  );
}

function Feature({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <div className="text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
      <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {body}
      </p>
    </div>
  );
}
