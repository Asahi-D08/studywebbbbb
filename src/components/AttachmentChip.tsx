import Link from "next/link";
import type { ForumAttachment } from "@/lib/forum";
import type { NoteRecord } from "@/lib/storage";

type Props = {
  attachment: ForumAttachment;
  /**
   * Already-resolved metadata for shared-note refs (looked up server-side
   * so the chip can label itself). Falls back to a placeholder if missing.
   */
  noteIndex?: Map<string, NoteRecord>;
  program: string;
};

export function AttachmentChip({ attachment, noteIndex, program }: Props) {
  if (attachment.type === "upload") {
    const isImage = (attachment.mimeType ?? "").startsWith("image/");
    return (
      <div className="flex flex-col gap-1.5">
        <div className="inline-flex max-w-full items-center gap-2 self-start rounded-full border border-slate-300 bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-800 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <Badge label={isImage ? "Image" : "File"} />
          <a
            href={`/api/forum/uploads/${attachment.uploadId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate hover:text-slate-900 dark:hover:text-white"
          >
            {attachment.originalName}
          </a>
          {typeof attachment.size === "number" && (
            <span className="text-[10px] text-slate-500 dark:text-slate-400">
              {(attachment.size / 1024).toFixed(1)} KB
            </span>
          )}
          <a
            href={`/api/forum/uploads/${attachment.uploadId}?download=1`}
            className="ml-1 text-[11px] text-brand-700 hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
            title="Download"
          >
            ↓
          </a>
        </div>
        {isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/forum/uploads/${attachment.uploadId}`}
            alt={attachment.originalName}
            className="max-h-48 max-w-xs rounded-lg border border-slate-200 bg-slate-50 object-contain dark:border-white/5 dark:bg-slate-950/40"
          />
        )}
      </div>
    );
  }

  // Shared-note reference
  const note = noteIndex?.get(attachment.noteId);
  if (!note) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-slate-300 bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400">
        <Badge label="Note" />
        <span>(unavailable)</span>
      </span>
    );
  }
  const href = `/${program}/${note.section}/${note.subject}`;
  return (
    <Link
      href={href}
      className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-800 transition hover:border-brand-300 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-200 dark:hover:border-brand-400/50 dark:hover:bg-brand-500/20"
    >
      <Badge label="Note" />
      <span className="truncate">{note.title}</span>
      <span className="text-[10px] uppercase tracking-wide text-brand-600/70 dark:text-brand-300/70">
        {note.section} · {note.subject}
      </span>
    </Link>
  );
}

function Badge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-brand-200 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-900 dark:bg-brand-500/30 dark:text-brand-100">
      {label}
    </span>
  );
}
