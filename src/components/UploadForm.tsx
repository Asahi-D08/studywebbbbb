"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Mode = "text" | "file";

type Props = {
  program: string;
  section: string;
  subject: string;
};

export function UploadForm({ program, section, subject }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("text");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [shared, setShared] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [submitting, setSubmitting] = useState(false);

  function reset() {
    setTitle("");
    setContent("");
    setFile(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === "text") {
      if (!title.trim()) return setError("Please give your note a title.");
      if (!content.trim()) return setError("Please write some content.");
    } else {
      if (!file) return setError("Please choose a file to upload.");
    }

    setSubmitting(true);
    try {
      let res: Response;
      if (mode === "text") {
        res = await fetch("/api/notes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ program, section, subject, title, content, shared }),
        });
      } else {
        const fd = new FormData();
        fd.set("program", program);
        fd.set("section", section);
        fd.set("subject", subject);
        fd.set("title", title);
        fd.set("shared", String(shared));
        fd.set("file", file as File);
        res = await fetch("/api/notes", { method: "POST", body: fd });
      }

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Upload failed (${res.status})`);
      }
      reset();
      startTransition(() => router.refresh());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setSubmitting(false);
    }
  }

  const busy = submitting || pending;

  const inputCls =
    "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:border-white/10 dark:bg-slate-950/60 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/30";

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-slate-200/90 bg-white/80 p-6 shadow-lg shadow-slate-200/40 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/20"
    >
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">New note</h2>
        <div className="inline-flex rounded-full border border-slate-200 bg-slate-100/90 p-1 text-xs font-medium dark:border-white/10 dark:bg-slate-950/60">
          <button
            type="button"
            onClick={() => setMode("text")}
            className={`rounded-full px-3 py-1.5 transition ${
              mode === "text"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            Text
          </button>
          <button
            type="button"
            onClick={() => setMode("file")}
            className={`rounded-full px-3 py-1.5 transition ${
              mode === "file"
                ? "bg-indigo-500 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            }`}
          >
            File / Image
          </button>
        </div>
      </div>

      <label className="mb-4 block">
        <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Title
        </span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={
            mode === "text" ? "e.g. Chapter 4 — derivatives" : "Optional (defaults to filename)"
          }
          className={inputCls}
        />
      </label>

      {mode === "text" ? (
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Content
          </span>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your notes here. Markdown is fine — it'll be shown as plain text."
            className={`${inputCls} resize-y font-mono leading-relaxed`}
          />
        </label>
      ) : (
        <FileDrop file={file} onFile={setFile} />
      )}

      <SharingToggle shared={shared} onChange={setShared} />

      {error && (
        <p className="mt-4 rounded-lg border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-800 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={reset}
          disabled={busy}
          className="rounded-lg px-3 py-2 text-sm text-slate-600 hover:text-slate-900 disabled:opacity-50 dark:text-slate-300 dark:hover:text-white"
        >
          Clear
        </button>
        <button
          type="submit"
          disabled={busy}
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-50"
        >
          {busy ? "Uploading…" : "Save note"}
        </button>
      </div>
    </form>
  );
}

function SharingToggle({
  shared,
  onChange,
}: {
  shared: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={shared}
      onClick={() => onChange(!shared)}
      className="mt-5 flex w-full items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/90 p-3 text-left transition hover:border-slate-300 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-white/20"
    >
      <span
        aria-hidden
        className={`mt-0.5 inline-flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition ${
          shared ? "bg-emerald-500" : "bg-slate-400 dark:bg-slate-700"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition ${
            shared ? "translate-x-4" : "translate-x-0"
          }`}
        />
      </span>
      <span className="flex-1 text-sm">
        <span className="font-medium text-slate-900 dark:text-white">Share in sharing area</span>
        <span className="block text-xs text-slate-600 dark:text-slate-400">
          {shared
            ? "Visible to anyone who opens this subject. You can switch this off later."
            : "Kept in the Private tab. You can share it later from the notes list."}
        </span>
      </span>
    </button>
  );
}

function FileDrop({
  file,
  onFile,
}: {
  file: File | null;
  onFile: (f: File | null) => void;
}) {
  const [drag, setDrag] = useState(false);
  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-10 text-center transition ${
        drag
          ? "border-indigo-500 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-500/10"
          : "border-slate-300 bg-slate-50/80 hover:border-slate-400 dark:border-white/15 dark:bg-slate-950/40 dark:hover:border-white/30 dark:hover:bg-slate-950/60"
      }`}
    >
      <input
        type="file"
        className="hidden"
        onChange={(e) => onFile(e.target.files?.[0] ?? null)}
      />
      {file ? (
        <>
          <div className="text-sm font-medium text-slate-900 dark:text-white">{file.name}</div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {(file.size / 1024).toFixed(1)} KB · {file.type || "unknown type"}
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onFile(null);
            }}
            className="mt-2 text-xs text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
          >
            Choose another file
          </button>
        </>
      ) : (
        <>
          <div className="text-sm font-medium text-slate-900 dark:text-white">
            Drop a file here, or click to browse
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Images, PDFs, documents — up to 25 MB.
          </div>
        </>
      )}
    </label>
  );
}
