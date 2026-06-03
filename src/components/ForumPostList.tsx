import Link from "next/link";

type Item = {
  id: string;
  title: string;
  body: string;
  author: { id: string; username: string };
  attachmentCount: number;
  replyCount: number;
  createdAt: string;
  updatedAt?: string;
};

type Props = {
  posts: Item[];
  program: string;
  section: string;
};

export function ForumPostList({ posts, program, section }: Props) {
  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-10 text-center dark:border-white/10 dark:bg-slate-900/30">
        <div className="text-sm font-medium text-slate-800 dark:text-slate-200">
          No posts yet
        </div>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-500">
          Be the first to start a conversation in this section.
        </p>
      </div>
    );
  }
  return (
    <ul className="space-y-3">
      {posts.map((p) => (
        <li
          key={p.id}
          className="rounded-2xl border border-slate-200/90 bg-white/60 transition hover:border-indigo-200 dark:border-white/10 dark:bg-slate-900/40 dark:hover:border-white/20"
        >
          <Link
            href={`/${program}/${section}/forum/${p.id}`}
            className="block p-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                {p.title}
              </h3>
              <span className="text-[11px] uppercase tracking-wide text-slate-500">
                {formatTime(p.createdAt)}
              </span>
              {p.updatedAt && (
                <span className="text-[11px] italic text-slate-400">edited</span>
              )}
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {p.body}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
              <span>by {p.author.username}</span>
              <span>·</span>
              <span>
                {p.replyCount} {p.replyCount === 1 ? "reply" : "replies"}
              </span>
              {p.attachmentCount > 0 && (
                <>
                  <span>·</span>
                  <span>
                    {p.attachmentCount}{" "}
                    {p.attachmentCount === 1 ? "attachment" : "attachments"}
                  </span>
                </>
              )}
            </div>
          </Link>
        </li>
      ))}
    </ul>
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
