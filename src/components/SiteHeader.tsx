import Link from "next/link";
import { getSession } from "@/lib/auth-server";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageToggle } from "@/components/LanguageToggle";
import { getLang } from "@/lib/lang-server";
import { pick, t } from "@/lib/i18n";
import { SUBJECTS } from "@/lib/subjects";

export type Crumb = { href: string; label: string };

export async function SiteHeader({
  crumbs,
  loginReturnHref,
}: {
  crumbs?: Crumb[];
  /** Prefer sending users back here after sign-in (e.g. current subject path). */
  loginReturnHref?: string;
}) {
  const session = await getSession();
  const lang = await getLang();
  const loginHref = loginReturnHref
    ? `/login?next=${encodeURIComponent(loginReturnHref)}`
    : "/login";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-background dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-800 text-sm font-bold text-white dark:bg-brand-200 dark:text-brand-950">
            SW
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
              StudyWeb
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              {t("brand.sub", lang)}
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3 sm:gap-4">
          <nav className="hidden items-center gap-1 text-sm text-slate-600 dark:text-slate-300 md:flex">
            {SUBJECTS.map((s) => (
              <Link
                key={s.slug}
                href={`/subjects/${s.slug}`}
                className="rounded-lg px-3 py-1.5 transition hover:bg-slate-200/80 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {pick(s.short, lang)}
              </Link>
            ))}
          </nav>
          <LanguageToggle lang={lang} />
          <ThemeToggle />
          {session ? (
            <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-white/10 sm:pl-4">
              <span
                className="max-w-[8rem] truncate text-xs text-slate-600 dark:text-slate-400"
                title={session.username}
              >
                {session.username}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <Link
              href={loginHref}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-100 dark:border-white/15 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/5"
            >
              {t("nav.signIn", lang)}
            </Link>
          )}
        </div>
      </div>

      {crumbs && crumbs.length > 0 && (
        <div className="border-t border-slate-200/80 dark:border-white/5">
          <div className="mx-auto max-w-6xl px-6 py-2 text-sm text-slate-600 dark:text-slate-400">
            <Breadcrumbs crumbs={crumbs} homeLabel={t("nav.home", lang)} />
          </div>
        </div>
      )}
    </header>
  );
}

function Breadcrumbs({ crumbs, homeLabel }: { crumbs: Crumb[]; homeLabel: string }) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      <li>
        <Link
          href="/"
          className="hover:text-slate-900 dark:hover:text-white"
        >
          {homeLabel}
        </Link>
      </li>
      {crumbs.map((c, i) => (
        <li key={c.href} className="flex items-center gap-1.5">
          <span className="text-slate-400 dark:text-slate-600">/</span>
          {i === crumbs.length - 1 ? (
            <span className="text-slate-900 dark:text-white">{c.label}</span>
          ) : (
            <Link
              href={c.href}
              className="hover:text-slate-900 dark:hover:text-white"
            >
              {c.label}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
}
