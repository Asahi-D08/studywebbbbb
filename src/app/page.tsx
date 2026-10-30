import { SiteHeader } from "@/components/SiteHeader";
import { SubjectCard } from "@/components/SubjectCard";
import { getLang } from "@/lib/lang-server";
import { t } from "@/lib/i18n";
import { SUBJECTS } from "@/lib/subjects";

export default async function HomePage() {
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
      </main>
      <footer className="mx-auto max-w-5xl px-6 pb-10 pt-6 text-xs text-slate-500">
        {t("footer", lang)}
      </footer>
    </>
  );
}
