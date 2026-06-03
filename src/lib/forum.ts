import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

// JSON-backed forum store. Mirrors the shape of src/lib/storage.ts:
//   - atomic temp-file writes
//   - serialised through an in-process write chain
//   - uploads live in a flat directory (separate from notes)

export type ForumAttachment =
  | { type: "note"; noteId: string }
  | {
      type: "upload";
      uploadId: string; // also the basename in data/forum-uploads/
      originalName: string;
      mimeType: string;
      size: number;
    };

export type ForumAuthor = { id: string; username: string };

export type ForumPost = {
  id: string;
  program: string;
  section: string;
  title: string;
  body: string;
  author: ForumAuthor;
  attachments: ForumAttachment[];
  createdAt: string;
  updatedAt?: string;
};

export type ForumReply = {
  id: string;
  postId: string;
  body: string;
  author: ForumAuthor;
  attachments: ForumAttachment[];
  createdAt: string;
  updatedAt?: string;
};

type ForumDb = { posts: ForumPost[]; replies: ForumReply[] };

const DATA_DIR = path.join(process.cwd(), "data");
const UPLOADS_DIR = path.join(DATA_DIR, "forum-uploads");
const DB_PATH = path.join(DATA_DIR, "forum.json");

let writeChain: Promise<unknown> = Promise.resolve();

async function ensureDirs(): Promise<void> {
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
}

function emptyDb(): ForumDb {
  return { posts: [], replies: [] };
}

async function readDb(): Promise<ForumDb> {
  await ensureDirs();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !Array.isArray((parsed as ForumDb).posts) ||
      !Array.isArray((parsed as ForumDb).replies)
    ) {
      return emptyDb();
    }
    return parsed as ForumDb;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return emptyDb();
    throw err;
  }
}

async function writeDb(db: ForumDb): Promise<void> {
  await ensureDirs();
  const tmp = `${DB_PATH}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, DB_PATH);
}

function newId(): string {
  return randomBytes(8).toString("hex");
}

function safeFilename(name: string): string {
  const base = name.replace(/[\\/]/g, "_").replace(/[^\w.\- ]+/g, "_").trim();
  return base.length > 120 ? base.slice(0, 120) : base || "upload";
}

export type UploadInput = {
  buffer: Buffer;
  originalName: string;
  mimeType: string;
};

/** Persist an uploaded file under data/forum-uploads/ and return its metadata. */
export async function saveForumUpload(input: UploadInput): Promise<
  Extract<ForumAttachment, { type: "upload" }>
> {
  await ensureDirs();
  const id = newId();
  const safe = safeFilename(input.originalName);
  const uploadId = `${id}-${safe}`;
  await fs.writeFile(path.join(UPLOADS_DIR, uploadId), input.buffer);
  return {
    type: "upload",
    uploadId,
    originalName: input.originalName,
    mimeType: input.mimeType,
    size: input.buffer.byteLength,
  };
}

export async function readForumUpload(uploadId: string): Promise<Buffer> {
  if (uploadId !== path.basename(uploadId)) {
    throw new Error("invalid upload id");
  }
  return fs.readFile(path.join(UPLOADS_DIR, uploadId));
}

async function deleteUpload(uploadId: string): Promise<void> {
  if (uploadId !== path.basename(uploadId)) return;
  try {
    await fs.unlink(path.join(UPLOADS_DIR, uploadId));
  } catch {
    // ignore — already gone
  }
}

/** Find an attachment by its uploadId across all posts/replies. */
export async function findUploadAttachment(
  uploadId: string,
): Promise<Extract<ForumAttachment, { type: "upload" }> | null> {
  const db = await readDb();
  const scan = (atts: ForumAttachment[]) =>
    atts.find((a): a is Extract<ForumAttachment, { type: "upload" }> =>
      a.type === "upload" && a.uploadId === uploadId,
    );
  for (const p of db.posts) {
    const hit = scan(p.attachments);
    if (hit) return hit;
  }
  for (const r of db.replies) {
    const hit = scan(r.attachments);
    if (hit) return hit;
  }
  return null;
}

export async function listPosts(
  program: string,
  section: string,
): Promise<ForumPost[]> {
  const db = await readDb();
  return db.posts
    .filter((p) => p.program === program && p.section === section)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getPost(id: string): Promise<ForumPost | undefined> {
  const db = await readDb();
  return db.posts.find((p) => p.id === id);
}

export async function listReplies(postId: string): Promise<ForumReply[]> {
  const db = await readDb();
  return db.replies
    .filter((r) => r.postId === postId)
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
}

export async function getReply(id: string): Promise<ForumReply | undefined> {
  const db = await readDb();
  return db.replies.find((r) => r.id === id);
}

export async function countRepliesByPost(): Promise<Map<string, number>> {
  const db = await readDb();
  const out = new Map<string, number>();
  for (const r of db.replies) {
    out.set(r.postId, (out.get(r.postId) ?? 0) + 1);
  }
  return out;
}

export type CreatePostInput = {
  program: string;
  section: string;
  title: string;
  body: string;
  author: ForumAuthor;
  attachments: ForumAttachment[];
};

export async function createPost(input: CreatePostInput): Promise<ForumPost> {
  return enqueue(async () => {
    const post: ForumPost = {
      id: newId(),
      program: input.program,
      section: input.section,
      title: input.title,
      body: input.body,
      author: input.author,
      attachments: input.attachments,
      createdAt: new Date().toISOString(),
    };
    const db = await readDb();
    db.posts.push(post);
    await writeDb(db);
    return post;
  });
}

export type UpdatePostInput = {
  title?: string;
  body?: string;
  attachments?: ForumAttachment[];
};

export async function updatePost(
  id: string,
  patch: UpdatePostInput,
): Promise<ForumPost | undefined> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return undefined;
    const prev = db.posts[idx];
    const next: ForumPost = {
      ...prev,
      title: patch.title ?? prev.title,
      body: patch.body ?? prev.body,
      attachments: patch.attachments ?? prev.attachments,
      updatedAt: new Date().toISOString(),
    };
    // Garbage-collect uploads dropped from the attachments list.
    if (patch.attachments) {
      const kept = new Set(
        next.attachments
          .filter((a): a is Extract<ForumAttachment, { type: "upload" }> => a.type === "upload")
          .map((a) => a.uploadId),
      );
      const removed = prev.attachments.filter(
        (a): a is Extract<ForumAttachment, { type: "upload" }> =>
          a.type === "upload" && !kept.has(a.uploadId),
      );
      for (const r of removed) await deleteUpload(r.uploadId);
    }
    db.posts[idx] = next;
    await writeDb(db);
    return next;
  });
}

export async function deletePost(id: string): Promise<boolean> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.posts.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    const [removed] = db.posts.splice(idx, 1);

    // Cascade: replies and their uploads, plus post uploads.
    const removedReplies: ForumReply[] = [];
    db.replies = db.replies.filter((r) => {
      if (r.postId === id) {
        removedReplies.push(r);
        return false;
      }
      return true;
    });
    for (const a of removed.attachments) {
      if (a.type === "upload") await deleteUpload(a.uploadId);
    }
    for (const r of removedReplies) {
      for (const a of r.attachments) {
        if (a.type === "upload") await deleteUpload(a.uploadId);
      }
    }
    await writeDb(db);
    return true;
  });
}

export type CreateReplyInput = {
  postId: string;
  body: string;
  author: ForumAuthor;
  attachments: ForumAttachment[];
};

export async function createReply(input: CreateReplyInput): Promise<ForumReply | null> {
  return enqueue(async () => {
    const db = await readDb();
    if (!db.posts.some((p) => p.id === input.postId)) return null;
    const reply: ForumReply = {
      id: newId(),
      postId: input.postId,
      body: input.body,
      author: input.author,
      attachments: input.attachments,
      createdAt: new Date().toISOString(),
    };
    db.replies.push(reply);
    await writeDb(db);
    return reply;
  });
}

export type UpdateReplyInput = {
  body?: string;
  attachments?: ForumAttachment[];
};

export async function updateReply(
  id: string,
  patch: UpdateReplyInput,
): Promise<ForumReply | undefined> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.replies.findIndex((r) => r.id === id);
    if (idx === -1) return undefined;
    const prev = db.replies[idx];
    const next: ForumReply = {
      ...prev,
      body: patch.body ?? prev.body,
      attachments: patch.attachments ?? prev.attachments,
      updatedAt: new Date().toISOString(),
    };
    if (patch.attachments) {
      const kept = new Set(
        next.attachments
          .filter((a): a is Extract<ForumAttachment, { type: "upload" }> => a.type === "upload")
          .map((a) => a.uploadId),
      );
      const removed = prev.attachments.filter(
        (a): a is Extract<ForumAttachment, { type: "upload" }> =>
          a.type === "upload" && !kept.has(a.uploadId),
      );
      for (const r of removed) await deleteUpload(r.uploadId);
    }
    db.replies[idx] = next;
    await writeDb(db);
    return next;
  });
}

export async function deleteReply(id: string): Promise<boolean> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.replies.findIndex((r) => r.id === id);
    if (idx === -1) return false;
    const [removed] = db.replies.splice(idx, 1);
    for (const a of removed.attachments) {
      if (a.type === "upload") await deleteUpload(a.uploadId);
    }
    await writeDb(db);
    return true;
  });
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeChain.then(fn, fn);
  writeChain = next.catch(() => undefined);
  return next;
}
