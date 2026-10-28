import Link from "next/link";

type Props = {
  href: string;
  eyebrow?: string;
  title: string;
  description?: string;
  badge?: string;
};

export function NavCard({ href, eyebrow, title, description, badge }: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition hover:border-brand-300 dark:border-white/10 dark:bg-slate-900/60 dark:hover:border-brand-400/50"
    >
      <div className="flex items-start justify-between gap-3">
        {eyebrow && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{eyebrow}</span>
        )}
        {badge && (
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-medium text-slate-700 dark:bg-white/10 dark:text-slate-200">
            {badge}
          </span>
        )}
      </div>
      <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {description}
        </p>
      )}
      <div className="mt-6 text-sm font-medium text-brand-700 group-hover:underline dark:text-brand-300">
        Open →
      </div>
    </Link>
  );
}
