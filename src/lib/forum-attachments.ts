import { getNote } from "@/lib/storage";
import {
  saveForumUpload,
  type ForumAttachment,
} from "@/lib/forum";

export const MAX_FORUM_FILE_BYTES = 25 * 1024 * 1024;

export type ParseResult =
  | { ok: true; attachments: ForumAttachment[] }
  | { ok: false; error: string };

/**
 * Reads `noteRefs[]` (shared note ids), `keepUploads[]` (existing upload ids
 * to retain on edits), and `files[]` (new uploads) from a `FormData` payload
 * and produces the merged attachment list.
 *
 * `existing` is the prior attachments array — used during PATCH so callers can
 * carry already-saved uploads forward without re-uploading them.
 */
export async function parseAttachments(
  form: FormData,
  program: string,
  existing: ForumAttachment[] = [],
): Promise<ParseResult> {
  const out: ForumAttachment[] = [];

  const noteRefs = form.getAll("noteRefs").map((v) => String(v));
  for (const id of noteRefs) {
    const note = await getNote(id);
    if (!note) return { ok: false, error: `referenced note not found: ${id}` };
    if (!note.shared) return { ok: false, error: "only shared notes can be referenced" };
    if (note.program !== program) {
      return { ok: false, error: "referenced note is in a different programme" };
    }
    out.push({ type: "note", noteId: id });
  }

  const keepRaw = form.getAll("keepUploads").map((v) => String(v));
  const keep = new Set(keepRaw);
  for (const att of existing) {
    if (att.type === "upload" && keep.has(att.uploadId)) {
      out.push(att);
    }
  }

  const files = form.getAll("files").filter((v): v is File => v instanceof File);
  for (const file of files) {
    if (file.size === 0) continue;
    if (file.size > MAX_FORUM_FILE_BYTES) {
      return {
        ok: false,
        error: `file too large (max ${(MAX_FORUM_FILE_BYTES / 1024 / 1024).toFixed(0)} MB)`,
      };
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveForumUpload({
      buffer,
      originalName: file.name,
      mimeType: file.type || "application/octet-stream",
    });
    out.push(saved);
  }

  return { ok: true, attachments: out };
}
