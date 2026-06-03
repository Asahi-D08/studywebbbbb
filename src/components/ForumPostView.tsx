import type { ForumAttachment, ForumPost, ForumReply } from "@/lib/forum";
import type { NoteRecord } from "@/lib/storage";
import { AttachmentChip } from "@/components/AttachmentChip";
import { ForumActions } from "@/components/ForumActions";
import { ForumComposer } from "@/components/ForumComposer";

type Props = {
  post: ForumPost;
  replies: ForumReply[];
  /** Resolved metadata for any shared-note refs across post + replies. */
  noteIndex: Map<string, NoteRecord>;
  /** Authenticated session info (or null when browsing as a guest). */
  session: { sub: string; username: string } | null;
  /** Whether the current session belongs to the admin (first user). */
  isAdmin: boolean;
};

function noteLabelMap(
  attachments: ForumAttachment[],
  noteIndex: Map<string, NoteRecord>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const a of attachments) {
    if (a.type === "note") {
      out[a.noteId] = noteIndex.get(a.noteId)?.title ?? "(shared note)";
    }
  }
  return out;
}

export function ForumPostView({ post, replies, noteIndex, session, isAdmin }: Props) {
  const canEditPost = !!session && (session.sub === post.author.id || isAdmin);

  return (
    <article className="space-y-8">
      <section className="rounded-2xl border border-slate-200/90 bg-white/70 p-6 shadow-sm dark:border-white/10 dark:bg-slate-900/40">
        <header className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {post.title}
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              by {post.author.username} · {formatTime(post.createdAt)}
              {post.updatedAt && (
                <span className="ml-1 italic">(edited {formatTime(post.updatedAt)})</span>
              )}
            </p>
          </div>
        </header>
        <Body text={post.body} />
        {post.attachments.length > 0 && (
          <AttachmentList
            attachments={post.attachments}
            noteIndex={noteIndex}
            program={post.program}
          />
        )}
        {canEditPost && (
          <ForumActions
            kind="post"
            program={post.program}
            section={post.section}
            postId={post.id}
            initialTitle={post.title}
            initialBody={post.body}
            initialAttachments={post.attachments}
            initialNoteLabels={noteLabelMap(post.attachments, noteIndex)}
          />
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Replies ({replies.length})
        </h2>
        {replies.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-6 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-slate-900/30 dark:text-slate-400">
            No replies yet.
          </div>
        ) : (
          <ul className="space-y-3">
            {replies.map((r) => {
              const canEditReply = !!session && (session.sub === r.author.id || isAdmin);
              return (
                <li
                  key={r.id}
                  className="rounded-2xl border border-slate-200/90 bg-white/60 p-4 dark:border-white/10 dark:bg-slate-900/40"
                >
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    by {r.author.username} · {formatTime(r.createdAt)}
                    {r.updatedAt && (
                      <span className="ml-1 italic">(edited {formatTime(r.updatedAt)})</span>
                    )}
                  </div>
                  <div className="mt-1.5">
                    <Body text={r.body} />
                  </div>
                  {r.attachments.length > 0 && (
                    <AttachmentList
                      attachments={r.attachments}
                      noteIndex={noteIndex}
                      program={post.program}
                    />
                  )}
                  {canEditReply && (
                    <ForumActions
                      kind="reply"
                      program={post.program}
                      section={post.section}
                      postId={post.id}
                      replyId={r.id}
                      initialBody={r.body}
                      initialAttachments={r.attachments}
                      initialNoteLabels={noteLabelMap(r.attachments, noteIndex)}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Add a reply
        </h2>
        {session ? (
          <ForumComposer
            mode="new-reply"
            program={post.program}
            section={post.section}
            postId={post.id}
          />
        ) : (
          <SignInPrompt program={post.program} section={post.section} postId={post.id} />
        )}
      </section>
    </article>
  );
}

function Body({ text }: { text: string }) {
  return (
    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-800 dark:text-slate-200">
      {text}
    </p>
  );
}

function AttachmentList({
  attachments,
  noteIndex,
  program,
}: {
  attachments: ForumAttachment[];
  noteIndex: Map<string, NoteRecord>;
  program: string;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-start gap-2">
      {attachments.map((a, i) => (
        <AttachmentChip
          key={a.type === "upload" ? `up-${a.uploadId}-${i}` : `note-${a.noteId}-${i}`}
          attachment={a}
          noteIndex={noteIndex}
          program={program}
        />
      ))}
    </div>
  );
}

function SignInPrompt({
  program,
  section,
  postId,
}: {
  program: string;
  section: string;
  postId: string;
}) {
  const next = `/${program}/${section}/forum/${postId}`;
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/30 dark:text-slate-300">
      <a
        href={`/login?next=${encodeURIComponent(next)}`}
        className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
      >
        Sign in
      </a>{" "}
      to reply or post.
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
