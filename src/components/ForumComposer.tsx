"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ForumAttachment } from "@/lib/forum";

type CiteOptionsResponse = {
  program: string;
  sections: {
    slug: string;
    title: string;
    subjects: {
      slug: string;
      name: string;
      notes: { id: string; title: string; kind: "text" | "file" | "image"; createdAt: string }[];
    }[];
  }[];
};

type Mode = "new-post" | "edit-post" | "new-reply" | "edit-reply";

type Props = {
  mode: Mode;
  program: string;
  section: string;
  /** New posts: parent of section forum. Replies/edits: post to attach to. */
  postId?: string;
  replyId?: string;
  /** Pre-existing values when editing. */
  initialTitle?: string;
  initialBody?: string;
  initialAttachments?: ForumAttachment[];
  /** Pre-resolved labels for shared-note refs in initialAttachments. */
  initialNoteLabels?: Record<string, string>;
  onCancel?: () => void;
};

type PendingNoteRef = { id: string; label: string };
type ExistingUpload = Extract<ForumAttachment, { type: "upload" }>;

export function ForumComposer({
  mode,
  program,
  section,
  postId,
  replyId,
  initialTitle = "",
  initialBody = "",
  initialAttachments = [],
  initialNoteLabels = {},
  onCancel,
}: Props) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const showTitle = mode === "new-post" || mode === "edit-post";
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);

  const initialNoteRefs: PendingNoteRef[] = initialAttachments
    .filter((a): a is Extract<ForumAttachment, { type: "note" }> => a.type === "note")
    .map((a) => ({ id: a.noteId, label: initialNoteLabels[a.noteId] ?? "(shared note)" }));
  const initialUploads: ExistingUpload[] = initialAttachments.filter(
    (a): a is ExistingUpload => a.type === "upload",
  );

  const [noteRefs, setNoteRefs] = useState<PendingNoteRef[]>(initialNoteRefs);
  const [keptUploads, setKeptUploads] = useState<ExistingUpload[]>(initialUploads);
  const [files, setFiles] = useState<File[]>([]);
  const [picker, setPicker] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (showTitle && !title.trim()) return setError("Please give your post a title.");
    if (!body.trim()) return setError("Please write a body.");

    setSubmitting(true);
    try {
      const fd = new FormData();
      if (mode === "new-post") {
        fd.set("program", program);
        fd.set("section", section);
      }
      if (showTitle) fd.set("title", title.trim());
      fd.set("body", body.trim());
      for (const ref of noteRefs) fd.append("noteRefs", ref.id);
      for (const up of keptUploads) fd.append("keepUploads", up.uploadId);
      for (const f of files) fd.append("files", f);

      const url =
        mode === "new-post"
          ? "/api/forum"
          : mode === "edit-post"
            ? `/api/forum/${postId}`
            : mode === "new-reply"
              ? `/api/forum/${postId}/replies`
              : `/api/forum/${postId}/replies/${replyId}`;
      const method = mode === "new-post" || mode === "new-reply" ? "POST" : "PATCH";

      const res = await fetch(url, { method, body: fd });
      const data = (await res.json().catch(() => null)) as
        | { error?: string; post?: { id: string }; reply?: { id: string } }
        | null;
      if (!res.ok) {
        throw new Error(data?.error ?? `Request failed (${res.status})`);
      }

      if (mode === "new-post" && data?.post?.id) {
        router.push(`/${program}/${section}/forum/${data.post.id}`);
        return;
      }
      if (mode === "new-reply") {
        setTitle("");
        setBody("");
        setNoteRefs([]);
        setKeptUploads([]);
        setFiles([]);
      }
      startTransition(() => router.refresh());
      onCancel?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  }

  function removeNoteRef(id: string) {
    setNoteRefs((prev) => prev.filter((r) => r.id !== id));
  }
  function removeKeptUpload(id: string) {
    setKeptUploads((prev) => prev.filter((u) => u.uploadId !== id));
  }
  function removeFile(idx: number) {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  }

  const inputCls =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-200/90 bg-white/80 p-5 shadow-sm dark:border-white/10 dark:bg-slate-900/50"
    >
      {showTitle && (
        <label className="mb-4 block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Title
          </span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What is this post about?"
            className={inputCls}
          />
        </label>
      )}

      <label className="block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {mode === "new-reply" || mode === "edit-reply" ? "Your reply" : "Body"}
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={mode === "new-reply" || mode === "edit-reply" ? 4 : 8}
          placeholder="Write here. Line breaks are preserved."
          className={`${inputCls} resize-y leading-relaxed`}
        />
      </label>

      <div className="mt-4 space-y-2">
        {(noteRefs.length > 0 || keptUploads.length > 0 || files.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {noteRefs.map((r) => (
              <Chip
                key={`note-${r.id}`}
                label={`Note · ${r.label}`}
                tone="indigo"
                onRemove={() => removeNoteRef(r.id)}
              />
            ))}
            {keptUploads.map((u) => (
              <Chip
                key={`up-${u.uploadId}`}
                label={`File · ${u.originalName}`}
                tone="amber"
                onRemove={() => removeKeptUpload(u.uploadId)}
              />
            ))}
            {files.map((f, i) => (
              <Chip
                key={`new-${i}-${f.name}`}
                label={`New · ${f.name} (${(f.size / 1024).toFixed(1)} KB)`}
                tone="teal"
                onRemove={() => removeFile(i)}
              />
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer rounded-lg border border-slate-300 bg-slate-100/70 px-3 py-1.5 text-xs font-medium text-slate-800 hover:border-slate-400 hover:bg-slate-200 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-white/20 dark:hover:bg-white/10">
            Attach file
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const list = e.target.files;
                if (!list) return;
                const picked = Array.from(list);
                setFiles((prev) => [...prev, ...picked]);
                e.target.value = "";
              }}
            />
          </label>
          <button
            type="button"
            onClick={() => setPicker(true)}
            className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 hover:border-indigo-300 hover:bg-indigo-100 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:border-indigo-400/50 dark:hover:bg-indigo-500/20"
          >
            Attach shared note
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:text-white"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-50"
        >
          {submitting ? "Saving…" : labelFor(mode)}
        </button>
      </div>

      {picker && (
        <NotePickerModal
          program={program}
          alreadySelected={new Set(noteRefs.map((r) => r.id))}
          onClose={() => setPicker(false)}
          onPick={(picked) => {
            setNoteRefs((prev) => {
              const seen = new Set(prev.map((r) => r.id));
              const merged = [...prev];
              for (const p of picked) {
                if (!seen.has(p.id)) merged.push(p);
              }
              return merged;
            });
            setPicker(false);
          }}
        />
      )}
    </form>
  );
}

function labelFor(mode: Mode): string {
  switch (mode) {
    case "new-post":
      return "Publish post";
    case "edit-post":
      return "Save changes";
    case "new-reply":
      return "Post reply";
    case "edit-reply":
      return "Save changes";
  }
}

function Chip({
  label,
  tone,
  onRemove,
}: {
  label: string;
  tone: "indigo" | "amber" | "teal";
  onRemove: () => void;
}) {
  const tones: Record<string, string> = {
    indigo:
      "border-indigo-200 bg-indigo-50 text-indigo-800 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200",
    amber:
      "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200",
    teal:
      "border-teal-200 bg-teal-50 text-teal-900 dark:border-teal-500/30 dark:bg-teal-500/10 dark:text-teal-200",
  };
  return (
    <span
      className={`inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tones[tone]}`}
    >
      <span className="truncate">{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove attachment"
        className="text-current opacity-70 hover:opacity-100"
      >
        ×
      </button>
    </span>
  );
}

function NotePickerModal({
  program,
  alreadySelected,
  onClose,
  onPick,
}: {
  program: string;
  alreadySelected: Set<string>;
  onClose: () => void;
  onPick: (picked: PendingNoteRef[]) => void;
}) {
  const [data, setData] = useState<CiteOptionsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/forum/cite-options?program=${encodeURIComponent(program)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed to load notes (${res.status})`);
        return (await res.json()) as CiteOptionsResponse;
      })
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load notes");
      });
    return () => {
      cancelled = true;
    };
  }, [program]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function commit() {
    if (!data) return;
    const out: PendingNoteRef[] = [];
    for (const sec of data.sections) {
      for (const sub of sec.subjects) {
        for (const n of sub.notes) {
          if (selected.has(n.id)) out.push({ id: n.id, label: n.title });
        }
      }
    }
    onPick(out);
  }

  return (
    <div
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4"
    >
      <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3 dark:border-white/10">
          <div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">
              Attach a shared note
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400">
              Only notes shared in this programme are listed.
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/5"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto px-5 py-4">
          {error && (
            <p className="rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
              {error}
            </p>
          )}
          {!data && !error && (
            <p className="text-sm text-slate-500 dark:text-slate-400">Loading…</p>
          )}
          {data && data.sections.length === 0 && (
            <p className="text-sm text-slate-500 dark:text-slate-400">
              No shared notes in this programme yet.
            </p>
          )}
          {data &&
            data.sections.map((sec) => (
              <section key={sec.slug} className="mb-5">
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  {sec.title}
                </h3>
                {sec.subjects.map((sub) => (
                  <div key={sub.slug} className="mb-2">
                    <div className="text-xs text-slate-500 dark:text-slate-400">{sub.name}</div>
                    <ul className="mt-1 space-y-1">
                      {sub.notes.map((n) => {
                        const isAlready = alreadySelected.has(n.id);
                        const checked = selected.has(n.id);
                        return (
                          <li key={n.id}>
                            <label
                              className={`flex items-center gap-2 rounded-lg px-2 py-1 text-sm ${
                                isAlready
                                  ? "cursor-not-allowed opacity-50"
                                  : "cursor-pointer hover:bg-slate-100 dark:hover:bg-white/5"
                              }`}
                            >
                              <input
                                type="checkbox"
                                disabled={isAlready}
                                checked={checked || isAlready}
                                onChange={() => toggle(n.id)}
                              />
                              <span className="flex-1 truncate text-slate-800 dark:text-slate-200">
                                {n.title}
                              </span>
                              <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400">
                                {n.kind}
                              </span>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
        </div>
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-3 dark:border-white/10">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={commit}
            disabled={selected.size === 0}
            className="rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white shadow hover:bg-indigo-400 disabled:opacity-50"
          >
            Attach {selected.size > 0 ? `(${selected.size})` : ""}
          </button>
        </div>
      </div>
    </div>
  );
}
