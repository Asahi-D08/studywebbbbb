import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SubjectCard } from "@/components/SubjectCard";
import { getSession } from "@/lib/auth-server";
import { getLang } from "@/lib/lang-server";
import { t } from "@/lib/i18n";
import { SUBJECTS } from "@/lib/subjects";

export default async function HomePage() {
  const session = await getSession();
  const lang = await getLang();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <section className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
            {t("home.eyebrow", lang)}
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
            {t("home.title", lang)}{" "}
            <span className="bg-gradient-to-r from-amber-500 via-indigo-500 to-rose-500 bg-clip-text text-transparent dark:from-amber-300 dark:via-indigo-300 dark:to-rose-300">
              {t("home.titleAccent", lang)}
            </span>
          </h1>
          <p className="mt-5 text-balance text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-400">
            {t("home.sub", lang)}
          </p>
        </section>

        <section className="mt-14">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {t("home.pick", lang)}
            </h2>
            <span className="text-xs text-slate-500">
              {t("home.subjectsCount", lang, { n: SUBJECTS.length })}
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {SUBJECTS.map((s) => (
              <SubjectCard key={s.slug} subject={s} lang={lang} />
            ))}
          </div>
        </section>

        <section className="mx-auto mt-14 flex max-w-3xl flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white/70 p-6 text-center shadow-sm sm:flex-row sm:text-left dark:border-white/10 dark:bg-slate-900/40 dark:shadow-none">
          {session ? (
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {t("home.signedIn", lang, { name: session.username })}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {t("home.signedInHint", lang)}
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {t("home.guest", lang)}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {t("home.guestHint", lang)}
                </p>
              </div>
              <Link
                href="/login"
                className="shrink-0 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:from-indigo-400 hover:to-violet-400"
              >
                {t("nav.signIn", lang)}
              </Link>
            </>
          )}
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-6 pb-10 pt-6 text-center text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}
