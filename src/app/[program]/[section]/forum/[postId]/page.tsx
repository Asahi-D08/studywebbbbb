import { notFound } from "next/navigation";
import Link from "next/link";
import { getProgram, getSection } from "@/lib/curriculum";
import { getPost, listReplies, type ForumAttachment } from "@/lib/forum";
import { getNote, type NoteRecord } from "@/lib/storage";
import { getSession } from "@/lib/auth-server";
import { isAdmin as checkIsAdmin } from "@/lib/users";
import { SiteHeader } from "@/components/SiteHeader";
import { ForumPostView } from "@/components/ForumPostView";

export const dynamic = "force-dynamic";

export default async function PostPage({
  params,
}: {
  params: Promise<{ program: string; section: string; postId: string }>;
}) {
  const { program: programSlug, section: sectionSlug, postId } = await params;
  const program = getProgram(programSlug);
  const section = getSection(programSlug, sectionSlug);
  if (!program || !section) notFound();

  const post = await getPost(postId);
  if (!post || post.program !== programSlug || post.section !== sectionSlug) {
    notFound();
  }
  const replies = await listReplies(postId);

  // Resolve all shared-note refs across post + replies in one pass.
  const noteIds = new Set<string>();
  const collect = (atts: ForumAttachment[]) => {
    for (const a of atts) {
      if (a.type === "note") noteIds.add(a.noteId);
    }
  };
  collect(post.attachments);
  for (const r of replies) collect(r.attachments);

  const noteIndex = new Map<string, NoteRecord>();
  await Promise.all(
    [...noteIds].map(async (id) => {
      const n = await getNote(id);
      if (n) noteIndex.set(id, n);
    }),
  );

  const session = await getSession();
  const admin = await checkIsAdmin(session?.sub);

  const postPath = `/${program.slug}/${section.slug}/forum/${post.id}`;

  return (
    <>
      <SiteHeader
        loginReturnHref={postPath}
        crumbs={[
          { href: `/${program.slug}`, label: program.name },
          { href: `/${program.slug}/${section.slug}`, label: section.title },
          { href: `/${program.slug}/${section.slug}/forum`, label: "Forum" },
          { href: postPath, label: post.title },
        ]}
      />
      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6">
          <Link
            href={`/${program.slug}/${section.slug}/forum`}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            ← Back to forum
          </Link>
        </div>
        <ForumPostView
          post={post}
          replies={replies}
          noteIndex={noteIndex}
          session={session}
          isAdmin={admin}
        />
      </main>
    </>
  );
}
