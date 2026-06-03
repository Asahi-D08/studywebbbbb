"use client";

import { useMemo, useState } from "react";
import type { NoteRecord } from "@/lib/storage";
import { NotesList } from "./NotesList";

type Tab = "shared" | "private";

export function NotesView({
  notes,
  isAuthenticated,
  program,
  section,
  subject,
}: {
  notes: NoteRecord[];
  isAuthenticated: boolean;
  program: string;
  section: string;
  subject: string;
}) {
  const [tab, setTab] = useState<Tab>("shared");

  const { shared, priv } = useMemo(() => {
    const shared: NoteRecord[] = [];
    const priv: NoteRecord[] = [];
    for (const n of notes) (n.shared ? shared : priv).push(n);
    return { shared, priv };
  }, [notes]);

  if (!isAuthenticated) {
    return (
      <div>
        <p className="mb-4 text-xs leading-relaxed text-slate-600 dark:text-slate-500">
          You are viewing the public sharing area.{" "}
          <span className="text-slate-700 dark:text-slate-400">
            Sign in to upload, manage private notes, or copy shared items into
            your own library.
          </span>
        </p>
        <NotesList
          notes={shared}
          emptyVariant="shared"
          isAuthenticated={false}
          listContext="shared"
          program={program}
          section={section}
          subject={subject}
          guestEmptyHint
        />
      </div>
    );
  }

  const visible = tab === "shared" ? shared : priv;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100/90 p-1 text-xs font-medium dark:border-white/10 dark:bg-slate-950/60">
          <TabButton
            active={tab === "shared"}
            onClick={() => setTab("shared")}
            label="Sharing area"
            count={shared.length}
          />
          <TabButton
            active={tab === "private"}
            onClick={() => setTab("private")}
            label="Private"
            count={priv.length}
          />
        </div>
        <span className="text-xs text-slate-500">{notes.length} total</span>
      </div>

      {tab === "shared" ? (
        <p className="mb-3 text-xs text-slate-600 dark:text-slate-500">
          Shared notes are visible to everyone. Use &quot;Copy to my notes&quot;
          to keep a private duplicate.
        </p>
      ) : (
        <p className="mb-3 text-xs text-slate-600 dark:text-slate-500">
          Personal notes — hidden from visitors who are not signed in.
        </p>
      )}

      <NotesList
        notes={visible}
        emptyVariant={tab}
        isAuthenticated
        listContext={tab}
        program={program}
        section={section}
        subject={subject}
      />
    </div>
  );
}

function TabButton({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 transition ${
        active
          ? "bg-indigo-500 text-white shadow-sm"
          : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-[10px] font-semibold ${
          active
            ? "bg-white/20 text-white"
            : "bg-slate-200/80 text-slate-600 dark:bg-white/5 dark:text-slate-400"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
