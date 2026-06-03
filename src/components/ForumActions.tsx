"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ForumAttachment } from "@/lib/forum";
import { ForumComposer } from "@/components/ForumComposer";

type Kind = "post" | "reply";

type Props = {
  kind: Kind;
  program: string;
  section: string;
  postId: string;
  replyId?: string;
  initialTitle?: string;
  initialBody: string;
  initialAttachments: ForumAttachment[];
  initialNoteLabels: Record<string, string>;
};

/**
 * Author-or-admin controls: Edit / Delete buttons plus the inline edit
 * composer. Rendered only when permitted (the parent page does the perm
 * check server-side, we just render whatever it gives us).
 */
export function ForumActions({
  kind,
  program,
  section,
  postId,
  replyId,
  initialTitle,
  initialBody,
  initialAttachments,
  initialNoteLabels,
}: Props) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [, startTransition] = useTransition();

  async function onDelete() {
    const what = kind === "post" ? "this post (and all replies)" : "this reply";
    if (!confirm(`Delete ${what}?`)) return;
    setDeleting(true);
    try {
      const url =
        kind === "post"
          ? `/api/forum/${postId}`
          : `/api/forum/${postId}/replies/${replyId}`;
      const res = await fetch(url, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? `Delete failed (${res.status})`);
      }
      if (kind === "post") {
        router.push(`/${program}/${section}/forum`);
        return;
      }
      startTransition(() => router.refresh());
    } catch (err) {
      alert(err instanceof Error ? err.message : "Delete failed");
      setDeleting(false);
    }
  }

  if (editing) {
    return (
      <div className="mt-3">
        <ForumComposer
          mode={kind === "post" ? "edit-post" : "edit-reply"}
          program={program}
          section={section}
          postId={postId}
          replyId={replyId}
          initialTitle={initialTitle}
          initialBody={initialBody}
          initialAttachments={initialAttachments}
          initialNoteLabels={initialNoteLabels}
          onCancel={() => setEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="mt-2 flex gap-1">
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="rounded-lg px-2.5 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-100 dark:text-indigo-300 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-200"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={deleting}
        className="rounded-lg px-2.5 py-1 text-xs font-medium text-rose-600 hover:bg-rose-100 disabled:opacity-50 dark:text-rose-300 dark:hover:bg-rose-500/10 dark:hover:text-rose-200"
      >
        {deleting ? "…" : "Delete"}
      </button>
    </div>
  );
}
