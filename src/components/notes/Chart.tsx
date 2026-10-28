// SVG kit for economics diagrams. All coordinates are in a 0–100 data space:
// x grows to the right, y grows upwards, (0, 0) is the origin of the axes.

import type { ReactNode } from "react";

export type Pt = [number, number];
export type Seg = [Pt, Pt];

const W = 440;
const H = 330;
const L = 60;
const R = 410;
const T = 34;
const B = 290;

export const sx = (x: number) => L + (x / 100) * (R - L);
export const sy = (y: number) => B - (y / 100) * (B - T);

/** Intersection of the two infinite lines through segments a and b. */
export function intersect([a1, a2]: Seg, [b1, b2]: Seg): Pt {
  const d = (a1[0] - a2[0]) * (b1[1] - b2[1]) - (a1[1] - a2[1]) * (b1[0] - b2[0]);
  const ta = a1[0] * a2[1] - a1[1] * a2[0];
  const tb = b1[0] * b2[1] - b1[1] * b2[0];
  return [
    (ta * (b1[0] - b2[0]) - (a1[0] - a2[0]) * tb) / d,
    (ta * (b1[1] - b2[1]) - (a1[1] - a2[1]) * tb) / d,
  ];
}

/** Point on the line through `seg` with the given x. */
export function atX([[x1, y1], [x2, y2]]: Seg, x: number): Pt {
  return [x, y1 + ((x - x1) * (y2 - y1)) / (x2 - x1)];
}

/** Point on the line through `seg` with the given y. */
export function atY([[x1, y1], [x2, y2]]: Seg, y: number): Pt {
  return [x1 + ((y - y1) * (x2 - x1)) / (y2 - y1), y];
}

/** Shift a segment by (dx, dy), e.g. an increase in demand. */
export function shift([[x1, y1], [x2, y2]]: Seg, dx: number, dy = 0): Seg {
  return [
    [x1 + dx, y1 + dy],
    [x2 + dx, y2 + dy],
  ];
}

type Tone = "main" | "alt" | "muted";

const STROKE: Record<Tone, string> = {
  main: "stroke-brand-800 dark:stroke-brand-200",
  alt: "stroke-brand-400 dark:stroke-brand-400",
  muted: "stroke-slate-400 dark:stroke-slate-500",
};

const TEXT = "fill-slate-800 dark:fill-slate-100";
const TEXT_MUTED = "fill-slate-500 dark:fill-slate-400";

type Fill = "a" | "b" | "c";

const FILL: Record<Fill, string> = {
  a: "fill-brand-300/45 dark:fill-brand-400/30",
  b: "fill-slate-300/60 dark:fill-slate-500/30",
  c: "fill-brand-700/35 dark:fill-brand-200/30",
};

function path(points: Pt[]): string {
  return "M" + points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(" L");
}

function smoothPath(points: Pt[]): string {
  const p = points.map(([x, y]) => [sx(x), sy(y)] as const);
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

export function Chart({
  x,
  y,
  caption,
  children,
}: {
  /** Horizontal axis label, e.g. "Quantity". */
  x: string;
  /** Vertical axis label, e.g. "Price". */
  y: string;
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <figure className="notes-figure">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={`${y} / ${x}`}
        className="mx-auto block w-full max-w-[440px]"
        fontSize={12}
      >
        <defs>
          <marker
            id="nb-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className="fill-slate-700 dark:fill-slate-300" />
          </marker>
        </defs>
        <path
          d={`M${L},${T - 14} L${L},${B} L${R + 14},${B}`}
          fill="none"
          strokeWidth={1.5}
          className="stroke-slate-700 dark:stroke-slate-300"
          markerStart="url(#nb-arrow)"
          markerEnd="url(#nb-arrow)"
        />
        <text x={L + 8} y={T - 12} className={TEXT} fontWeight={600}>
          {y}
        </text>
        <text x={R + 14} y={B + 30} textAnchor="end" className={TEXT} fontWeight={600}>
          {x}
        </text>
        <text x={L - 8} y={B + 16} textAnchor="end" className={TEXT_MUTED}>
          0
        </text>
        {children}
      </svg>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

/** A curve or straight line through `points`, with an optional end label (e.g. "D₁"). */
export function Line({
  points,
  label,
  labelAt = "end",
  labelOffset = [6, -6],
  tone = "main",
  dashed = false,
  smooth = false,
}: {
  points: Pt[];
  label?: string;
  labelAt?: "start" | "end";
  /** Pixel offset of the label from the chosen end point. */
  labelOffset?: [number, number];
  tone?: Tone;
  dashed?: boolean;
  smooth?: boolean;
}) {
  const p = labelAt === "end" ? points[points.length - 1] : points[0];
  return (
    <g>
      <path
        d={smooth ? smoothPath(points) : path(points)}
        fill="none"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeDasharray={dashed ? "6 5" : undefined}
        className={STROKE[tone]}
      />
      {label && (
        <text
          x={sx(p[0]) + labelOffset[0]}
          y={sy(p[1]) + labelOffset[1]}
          className={TEXT}
          fontWeight={600}
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Dashed guide lines from a point to both axes, with tick labels such as "P₁" and "Q₁". */
export function Guide({ at, x, y }: { at: Pt; x?: string; y?: string }) {
  const [px, py] = at;
  return (
    <g className={TEXT_MUTED}>
      <path
        d={`M${sx(0)},${sy(py)} L${sx(px)},${sy(py)} L${sx(px)},${sy(0)}`}
        fill="none"
        strokeWidth={1}
        strokeDasharray="4 4"
        className="stroke-slate-400 dark:stroke-slate-500"
      />
      {y && (
        <text x={sx(0) - 8} y={sy(py) + 4} textAnchor="end" className={TEXT}>
          {y}
        </text>
      )}
      {x && (
        <text x={sx(px)} y={sy(0) + 16} textAnchor="middle" className={TEXT}>
          {x}
        </text>
      )}
    </g>
  );
}

export function Dot({
  at,
  label,
  labelOffset = [7, -7],
}: {
  at: Pt;
  label?: string;
  labelOffset?: [number, number];
}) {
  return (
    <g>
      <circle cx={sx(at[0])} cy={sy(at[1])} r={3.5} className="fill-brand-800 dark:fill-brand-200" />
      {label && (
        <text x={sx(at[0]) + labelOffset[0]} y={sy(at[1]) + labelOffset[1]} className={TEXT}>
          {label}
        </text>
      )}
    </g>
  );
}

/** Shaded polygon, e.g. consumer surplus ("a"), revenue ("b") or welfare loss ("c"). */
export function Region({
  points,
  fill = "a",
  label,
  labelAt,
}: {
  points: Pt[];
  fill?: Fill;
  label?: string;
  /** Defaults to the centroid of the points. */
  labelAt?: Pt;
}) {
  const c: Pt =
    labelAt ??
    [
      points.reduce((s, p) => s + p[0], 0) / points.length,
      points.reduce((s, p) => s + p[1], 0) / points.length,
    ];
  return (
    <g>
      <path d={path(points) + " Z"} className={FILL[fill]} />
      {label && (
        <text x={sx(c[0])} y={sy(c[1]) + 4} textAnchor="middle" className={TEXT} fontWeight={600}>
          {label}
        </text>
      )}
    </g>
  );
}

/** Arrow showing a shift or movement. */
export function Arrow({ from, to }: { from: Pt; to: Pt }) {
  return (
    <line
      x1={sx(from[0])}
      y1={sy(from[1])}
      x2={sx(to[0])}
      y2={sy(to[1])}
      strokeWidth={1.5}
      className="stroke-slate-700 dark:stroke-slate-300"
      markerEnd="url(#nb-arrow)"
    />
  );
}

/** Free text placed at a data point. */
export function Label({
  at,
  children,
  anchor = "start",
  muted = false,
}: {
  at: Pt;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  muted?: boolean;
}) {
  return (
    <text x={sx(at[0])} y={sy(at[1])} textAnchor={anchor} className={muted ? TEXT_MUTED : TEXT}>
      {children}
    </text>
  );
}
