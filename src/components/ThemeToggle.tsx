"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch: theme isn’t known on the server (next-themes).
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional after mount
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        className="inline-flex h-8 w-[7.75rem] rounded-lg border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-white/5"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-slate-200 bg-slate-100/80 p-0.5 dark:border-white/10 dark:bg-white/5"
      role="group"
      aria-label="Theme"
    >
      <button
        type="button"
        onClick={() => setTheme("light")}
        title="Light theme"
        aria-pressed={theme === "light"}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
          theme === "light"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        title="Dark theme"
        aria-pressed={theme === "dark"}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
          theme === "dark"
            ? "bg-slate-800 text-white shadow-sm dark:bg-slate-700"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        Dark
      </button>
      <button
        type="button"
        onClick={() => setTheme("system")}
        title="Match system"
        aria-pressed={theme === "system"}
        className={`rounded-md px-2 py-1 text-[11px] font-medium transition ${
          theme === "system"
            ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        Auto
      </button>
    </div>
  );
}
