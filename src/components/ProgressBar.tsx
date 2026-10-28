export function progressPercent(ready: number, total: number): number {
  return total === 0 ? 0 : Math.round((ready / total) * 100);
}

export function ProgressBar({
  ready,
  total,
  barClass,
}: {
  ready: number;
  total: number;
  barClass: string;
}) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/10">
      <div
        className={`h-full rounded-full ${barClass}`}
        style={{ width: `${progressPercent(ready, total)}%` }}
      />
    </div>
  );
}
