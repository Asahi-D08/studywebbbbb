import type { Accent } from "@/lib/subjects";

export type AccentStyle = {
  /** Gradient start for the soft glow at the top of a card. */
  glow: string;
  /** Gradient + shadow for the monogram tile. */
  mono: string;
  bar: string;
  text: string;
  soft: string;
  hoverBorder: string;
};

export const ACCENT_STYLES: Record<Accent, AccentStyle> = {
  amber: {
    glow: "from-amber-400/30",
    mono: "from-amber-300 to-orange-500 shadow-amber-500/30",
    bar: "bg-gradient-to-r from-amber-400 to-orange-500",
    text: "text-amber-700 dark:text-amber-300",
    soft: "bg-amber-500/10 text-amber-700 dark:text-amber-300",
    hoverBorder: "hover:border-amber-300 dark:hover:border-amber-400/40",
  },
  indigo: {
    glow: "from-indigo-400/30",
    mono: "from-indigo-300 to-violet-500 shadow-indigo-500/30",
    bar: "bg-gradient-to-r from-indigo-400 to-violet-500",
    text: "text-indigo-700 dark:text-indigo-300",
    soft: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    hoverBorder: "hover:border-indigo-300 dark:hover:border-indigo-400/40",
  },
  emerald: {
    glow: "from-emerald-400/30",
    mono: "from-emerald-300 to-teal-500 shadow-emerald-500/30",
    bar: "bg-gradient-to-r from-emerald-400 to-teal-500",
    text: "text-emerald-700 dark:text-emerald-300",
    soft: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    hoverBorder: "hover:border-emerald-300 dark:hover:border-emerald-400/40",
  },
  rose: {
    glow: "from-rose-400/30",
    mono: "from-rose-300 to-pink-500 shadow-rose-500/30",
    bar: "bg-gradient-to-r from-rose-400 to-pink-500",
    text: "text-rose-700 dark:text-rose-300",
    soft: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
    hoverBorder: "hover:border-rose-300 dark:hover:border-rose-400/40",
  },
};
