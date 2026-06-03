import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgram, getSection } from "@/lib/curriculum";
import { listPosts, countRepliesByPost } from "@/lib/forum";
import { getSession } from "@/lib/auth-server";
import { SiteHeader } from "@/components/SiteHeader";
import { ForumPostList } from "@/components/ForumPostList";
import { ForumComposer } from "@/components/ForumComposer";

export const dynamic = "force-dynamic";

export default async function SectionForumPage({
  params,
}: {
  params: Promise<{ program: string; section: string }>;
}) {
  const { program: programSlug, section: sectionSlug } = await params;
  const program = getProgram(programSlug);
  const section = getSection(programSlug, sectionSlug);
  if (!program || !section) notFound();

  const session = await getSession();
  const posts = await listPosts(program.slug, section.slug);
  const counts = await countRepliesByPost();
  const summarised = posts.map((p) => ({
    id: p.id,
    title: p.title,
    body: p.body,
    author: p.author,
    attachmentCount: p.attachments.length,
    replyCount: counts.get(p.id) ?? 0,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));

  const forumPath = `/${program.slug}/${section.slug}/forum`;

  return (
    <>
      <SiteHeader
        loginReturnHref={forumPath}
        crumbs={[
          { href: `/${program.slug}`, label: program.name },
          { href: `/${program.slug}/${section.slug}`, label: section.title },
          { href: forumPath, label: "Forum" },
        ]}
      />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {program.name} · {section.title.replace(/^Section \d+ — /, "")} · Forum
            </span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Section forum
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Discuss anything from this section. Attach files or reference
              shared notes from this programme.
            </p>
          </div>
          <Link
            href={`/${program.slug}/${section.slug}`}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
          >
            ← Back to section
          </Link>
        </header>

        <section className="mb-10">
          {session ? (
            <details className="group rounded-2xl border border-slate-200/90 bg-white/60 p-2 dark:border-white/10 dark:bg-slate-900/40">
              <summary className="cursor-pointer list-none rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 dark:text-white dark:hover:bg-white/5">
                <span className="mr-2 inline-block transition group-open:rotate-90">▶</span>
                New post
              </summary>
              <div className="px-2 pb-2 pt-3 sm:px-3">
                <ForumComposer
                  mode="new-post"
                  program={program.slug}
                  section={section.slug}
                />
              </div>
            </details>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-100/50 p-5 text-sm text-slate-600 dark:border-white/10 dark:bg-slate-900/30 dark:text-slate-300">
              <Link
                href={`/login?next=${encodeURIComponent(forumPath)}`}
                className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-300 dark:hover:text-indigo-200"
              >
                Sign in
              </Link>{" "}
              to start a new post.
            </div>
          )}
        </section>

        <ForumPostList posts={summarised} program={program.slug} section={section.slug} />
      </main>
    </>
  );
}
