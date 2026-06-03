import Link from "next/link";

type Props = {
  href: string;
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
  accent?: "indigo" | "violet" | "fuchsia" | "teal" | "amber" | "rose";
};

const accents: Record<NonNullable<Props["accent"]>, string> = {
  indigo: "from-indigo-500/30 via-indigo-500/0 to-transparent",
  violet: "from-violet-500/30 via-violet-500/0 to-transparent",
  fuchsia: "from-fuchsia-500/30 via-fuchsia-500/0 to-transparent",
  teal: "from-teal-500/30 via-teal-500/0 to-transparent",
  amber: "from-amber-500/30 via-amber-500/0 to-transparent",
  rose: "from-rose-500/30 via-rose-500/0 to-transparent",
};

export function NavCard({
  href,
  eyebrow,
  title,
  description,
  badge,
  accent = "indigo",
}: Props) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white/70 p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white dark:border-white/10 dark:bg-slate-900/50 dark:shadow-none dark:hover:border-white/20 dark:hover:bg-slate-900/80"
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${accents[accent]} opacity-50 transition-opacity group-hover:opacity-100 dark:opacity-60`}
      />
      <div className="relative flex items-start justify-between gap-3">
        {eyebrow && (
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            {eyebrow}
          </span>
        )}
        {badge && (
          <span className="rounded-full bg-slate-200/80 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200">
            {badge}
          </span>
        )}
      </div>
      <h3 className="relative mt-2 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h3>
      {description && (
        <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
      <div className="relative mt-6 flex items-center gap-1.5 text-sm font-medium text-indigo-600 transition group-hover:gap-2.5 group-hover:text-indigo-500 dark:text-indigo-300 dark:group-hover:text-indigo-200">
        Open
        <span aria-hidden>→</span>
      </div>
    </Link>
  );
}
