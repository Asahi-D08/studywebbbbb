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
      <main className="mx-auto max-w-5xl px-6 py-14">
        <section>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            {t("home.title", lang)}
          </h1>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            {t("home.sub", lang)}
          </p>
        </section>

        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {SUBJECTS.map((s) => (
            <SubjectCard key={s.slug} subject={s} lang={lang} />
          ))}
        </section>

        <section className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center dark:border-white/10">
          {session ? (
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                {t("home.signedIn", lang, { name: session.username })}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {t("home.signedInHint", lang)}
              </p>
            </div>
          ) : (
            <>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {t("home.guest", lang)}
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {t("home.guestHint", lang)}
                </p>
              </div>
              <Link
                href="/login"
                className="shrink-0 rounded-lg bg-brand-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 dark:bg-brand-200 dark:text-brand-950 dark:hover:bg-brand-100"
              >
                {t("nav.signIn", lang)}
              </Link>
            </>
          )}
        </section>
      </main>
      <footer className="mx-auto max-w-5xl px-6 pb-10 pt-6 text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}
