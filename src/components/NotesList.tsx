"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { NoteRecord } from "@/lib/storage";

type ListContext = "shared" | "private";

type Props = {
  notes: NoteRecord[];
  emptyVariant?: "shared" | "private";
  isAuthenticated: boolean;
  listContext: ListContext;
  program: string;
  section: string;
  subject: string;
  guestEmptyHint?: boolean;
};

export function NotesList({
  notes,
  emptyVariant = "shared",
  isAuthenticated,
  listContext,
  program,
  section,
  subject,
  guestEmptyHint,
}: Props) {
  if (notes.length === 0) {
    const copy =
      emptyVariant === "shared"
        ? guestEmptyHint
          ? {
              title: "No shared notes yet",
              body: "Shared notes will appear here. Sign in if you want to upload your own.",
            }
          : {
              title: "No shared notes yet",
              body: "Upload a note with sharing on, or flip an existing private note to share it.",
            }
        : {
            title: "Nothing private here",
            body: "Untick \u201CShare in sharing area\u201D when uploading to keep a note here.",
          };
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-10 text-center dark:border-white/10 dark:bg-slate-900/30">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{copy.title}</div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-500">{copy.body}</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {notes.map((n) => (
        <NoteItem
          key={n.id}
          note={n}
          isAuthenticated={isAuthenticated}
          listContext={listContext}
          program={program}
          section={section}
          subject={subject}
        />
      ))}
    </ul>
  );
}

function NoteItem({
  note,
  isAuthenticated,
  listContext,
  program,
  section,
  subject,
}: {
  note: NoteRecord;
  isAuthenticated: boolean;
  listContext: ListContext;
  program: string;
  section: string;
  subject: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [togglingShare, setTogglingShare] = useState(false);
  const [copying, setCopying] = useState(false);
  const [, startTransition] = useTransition();

  const canModerate = isAuthenticated;
  const showCopyToMine =
    isAuthenticated && listContext === "shared" && note.shared;

  async function onDelete() {
    if (!confirm(`Delete "${note.title}"?`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/notes/${note.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("delete failed");
      startTransition(() => router.refresh());
    } catch (err) {
      alert(err instanceof Error ? err.message : "delete failed");
      setDeleting(false);
    }
  }

  async function onToggleShare() {
    setTogglingShare(true);
    try {
      const res = await fetch(`/api/notes/${note.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shared: !note.shared }),
      });
      if (!res.ok) throw new Error("failed to update sharing");
      startTransition(() => router.refresh());
    } catch (err) {
      alert(err instanceof Error ? err.message : "failed to update sharing");
    } finally {
      setTogglingShare(false);
    }
  }

  async function onCopyToMine() {
    setCopying(true);
    try {
      const res = await fetch("/api/notes/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceId: note.id,
          program,
          section,
          subject,
        }),
      });
      const data = (await res.json().catch(() => null)) as { error?: string } | null;
      if (!res.ok) throw new Error(data?.error ?? "copy failed");
      startTransition(() => router.refresh());
    } catch (err) {
      alert(err instanceof Error ? err.message : "copy failed");
    } finally {
      setCopying(false);
    }
  }

  function saveTextLocally() {
    if (note.kind !== "text" || !note.content) return;
    const safeName = note.title.replace(/[/\\?%*:|"<>]/g, "-").slice(0, 80);
    const blob = new Blob([note.content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${safeName || "note"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const btnGhost =
    "rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200/80 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white";

  return (
    <li className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white/60 transition hover:border-indigo-200 dark:border-white/10 dark:bg-slate-900/40 dark:hover:border-white/20">
      <div className="flex items-start gap-4 p-4">
        <Glyph kind={note.kind} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {note.title}
            </h3>
            <span className="text-[11px] uppercase tracking-wide text-slate-500">
              {formatTime(note.createdAt)}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 dark:text-slate-400">
            <span className="rounded-full bg-slate-200/70 px-2 py-0.5 capitalize dark:bg-white/5">
              {note.kind}
            </span>
            <SharedBadge shared={note.shared} />
            {note.originalName && <span className="truncate">{note.originalName}</span>}
            {typeof note.size === "number" && (
              <span>{(note.size / 1024).toFixed(1)} KB</span>
            )}
          </div>
        </div>

        <div className="flex max-w-[11rem] shrink-0 flex-wrap items-center justify-end gap-1">
          {note.kind === "text" ? (
            <button type="button" onClick={() => setOpen((o) => !o)} className={btnGhost}>
              {open ? "Hide" : "View"}
            </button>
          ) : (
            <>
              <a
                href={`/api/files/${note.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={btnGhost}
              >
                Open
              </a>
              <a
                href={`/api/files/${note.id}?download=1`}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-100 dark:text-teal-300 dark:hover:bg-teal-500/10 dark:hover:text-teal-200"
              >
                Save locally
              </a>
            </>
          )}
          {note.kind === "text" && (
            <button
              type="button"
              onClick={saveTextLocally}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-teal-700 hover:bg-teal-100 dark:text-teal-300 dark:hover:bg-teal-500/10 dark:hover:text-teal-200"
            >
              Save locally
            </button>
          )}
          {showCopyToMine && (
            <button
              type="button"
              onClick={onCopyToMine}
              disabled={copying}
              title="Create a private copy under Private"
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-amber-800 hover:bg-amber-100 disabled:opacity-50 dark:text-amber-200 dark:hover:bg-amber-500/10 dark:hover:text-amber-100"
            >
              {copying ? "…" : "Copy to my notes"}
            </button>
          )}
          {canModerate && (
            <>
              <button
                type="button"
                onClick={onToggleShare}
                disabled={togglingShare}
                title={note.shared ? "Move to Private" : "Move to Sharing area"}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-100 disabled:opacity-50 dark:text-indigo-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200"
              >
                {togglingShare ? "…" : note.shared ? "Unshare" : "Share"}
              </button>
              <button
                type="button"
                onClick={onDelete}
                disabled={deleting}
                className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
              >
                {deleting ? "…" : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>

      {note.kind === "text" && open && note.content && (
        <pre className="max-h-[480px] overflow-auto border-t border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-800 dark:border-white/5 dark:bg-slate-950/60 dark:text-slate-200">
          {note.content}
        </pre>
      )}

      {note.kind === "image" && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/api/files/${note.id}`}
          alt={note.title}
          className="max-h-[480px] w-full border-t border-slate-200 bg-slate-100 object-contain dark:border-white/5 dark:bg-slate-950/40"
        />
      )}
    </li>
  );
}

function SharedBadge({ shared }: { shared: boolean }) {
  return shared ? (
    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300">
      Shared
    </span>
  ) : (
    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 dark:bg-slate-500/15 dark:text-slate-400">
      Private
    </span>
  );
}

function Glyph({ kind }: { kind: NoteRecord["kind"] }) {
  const styles: Record<NoteRecord["kind"], string> = {
    text: "from-indigo-400 to-violet-500",
    file: "from-amber-400 to-rose-500",
    image: "from-teal-400 to-emerald-500",
  };
  const labels: Record<NoteRecord["kind"], string> = {
    text: "T",
    file: "F",
    image: "I",
  };
  return (
    <div
      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${styles[kind]} text-sm font-bold text-slate-950`}
    >
      {labels[kind]}
    </div>
  );
}

function formatTime(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
