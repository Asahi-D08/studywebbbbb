import Link from "next/link";
import { getSession } from "@/lib/auth-server";
import { LogoutButton } from "@/components/LogoutButton";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  const loginHref = loginReturnHref
    ? `/login?next=${encodeURIComponent(loginReturnHref)}`
    : "/login";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/75 backdrop-blur-md dark:border-white/10 dark:bg-slate-950/70">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 via-violet-400 to-fuchsia-400 text-sm font-bold text-slate-950 shadow-lg shadow-indigo-500/30 transition-transform group-hover:scale-105">
            SW
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-wide text-slate-900 dark:text-white">
              StudyWeb
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              Notes Hub
            </div>
          </div>
        </Link>

        <div className="flex flex-1 flex-wrap items-center justify-end gap-3 sm:gap-4">
          <ThemeToggle />
          <nav className="hidden items-center gap-1 text-sm text-slate-600 dark:text-slate-300 md:flex">
            {(
              [
                { slug: "igcse", label: "IGCSE" },
                { slug: "ib", label: "IB" },
              ] as const
            ).map((p) => (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="rounded-lg px-3 py-1.5 transition hover:bg-slate-200/80 hover:text-slate-900 dark:hover:bg-white/5 dark:hover:text-white"
              >
                {p.label}
              </Link>
            ))}
          </nav>
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
              Sign in
            </Link>
          )}
        </div>
      </div>

      {crumbs && crumbs.length > 0 && (
        <div className="border-t border-slate-200/80 dark:border-white/5">
          <div className="mx-auto max-w-6xl px-6 py-2 text-sm text-slate-600 dark:text-slate-400">
            <Breadcrumbs crumbs={crumbs} />
          </div>
        </div>
      )}
    </header>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-1.5">
      <li>
        <Link
          href="/"
          className="hover:text-slate-900 dark:hover:text-white"
        >
          Home
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
