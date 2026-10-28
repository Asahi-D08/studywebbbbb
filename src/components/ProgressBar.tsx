export function progressPercent(ready: number, total: number): number {
  return total === 0 ? 0 : Math.round((ready / total) * 100);
}

export function ProgressBar({ ready, total }: { ready: number; total: number }) {
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
      <div
        className="h-full rounded-full bg-brand-700 dark:bg-brand-300"
        style={{ width: `${progressPercent(ready, total)}%` }}
      />
    </div>
  );
}
