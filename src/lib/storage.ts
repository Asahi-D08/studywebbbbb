import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes } from "node:crypto";

// Local persistence: a single JSON metadata file + a flat files directory.
// Keeps things simple — no DB required for a personal study site.

export type NoteKind = "text" | "file" | "image";

export type NoteRecord = {
  id: string;
  program: string;
  section: string;
  subject: string;
  kind: NoteKind;
  title: string;
  /** Plain-text body (only for kind === "text"). */
  content?: string;
  /** Stored filename inside data/files/ (for file/image kinds). */
  storedName?: string;
  /** Original filename as uploaded. */
  originalName?: string;
  mimeType?: string;
  size?: number;
  /** Whether the note appears in the public Sharing area. */
  shared: boolean;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const FILES_DIR = path.join(DATA_DIR, "files");
const DB_PATH = path.join(DATA_DIR, "notes.json");

// Coalesce concurrent reads/writes onto a single in-process promise chain.
let writeChain: Promise<unknown> = Promise.resolve();

async function ensureDirs(): Promise<void> {
  await fs.mkdir(FILES_DIR, { recursive: true });
}

async function readDb(): Promise<NoteRecord[]> {
  await ensureDirs();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Back-fill `shared` for records written before this field existed.
    return (parsed as NoteRecord[]).map((n) => ({
      ...n,
      shared: typeof n.shared === "boolean" ? n.shared : true,
    }));
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException)?.code === "ENOENT") return [];
    throw err;
  }
}

async function writeDb(records: NoteRecord[]): Promise<void> {
  await ensureDirs();
  const tmp = `${DB_PATH}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(records, null, 2), "utf8");
  await fs.rename(tmp, DB_PATH);
}

function newId(): string {
  return randomBytes(8).toString("hex");
}

function safeFilename(name: string): string {
  // Strip path separators and weird chars; keep extension intact.
  const base = name.replace(/[\\/]/g, "_").replace(/[^\w.\- ]+/g, "_").trim();
  return base.length > 120 ? base.slice(0, 120) : base || "upload";
}

export async function listNotes(
  program: string,
  section: string,
  subject: string,
): Promise<NoteRecord[]> {
  const db = await readDb();
  return db
    .filter((n) => n.program === program && n.section === section && n.subject === subject)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

/** All shared notes inside a single programme, used by the forum cite picker. */
export async function listSharedInProgram(program: string): Promise<NoteRecord[]> {
  const db = await readDb();
  return db
    .filter((n) => n.program === program && n.shared)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function getNote(id: string): Promise<NoteRecord | undefined> {
  const db = await readDb();
  return db.find((n) => n.id === id);
}

type CreateInput = {
  program: string;
  section: string;
  subject: string;
  title: string;
  /** Defaults to true — new notes land in the Sharing area unless opted out. */
  shared?: boolean;
} & (
  | { kind: "text"; content: string }
  | {
      kind: "file" | "image";
      buffer: Buffer;
      originalName: string;
      mimeType: string;
    }
);

export async function createNote(input: CreateInput): Promise<NoteRecord> {
  return enqueue(async () => {
    const id = newId();
    const createdAt = new Date().toISOString();
    const shared = input.shared ?? true;
    let record: NoteRecord;

    if (input.kind === "text") {
      record = {
        id,
        program: input.program,
        section: input.section,
        subject: input.subject,
        kind: "text",
        title: input.title,
        content: input.content,
        shared,
        createdAt,
      };
    } else {
      await ensureDirs();
      const safe = safeFilename(input.originalName);
      const storedName = `${id}-${safe}`;
      await fs.writeFile(path.join(FILES_DIR, storedName), input.buffer);
      record = {
        id,
        program: input.program,
        section: input.section,
        subject: input.subject,
        kind: input.kind,
        title: input.title,
        storedName,
        originalName: input.originalName,
        mimeType: input.mimeType,
        size: input.buffer.byteLength,
        shared,
        createdAt,
      };
    }

    const db = await readDb();
    db.push(record);
    await writeDb(db);
    return record;
  });
}

export async function setNoteSharing(
  id: string,
  shared: boolean,
): Promise<NoteRecord | undefined> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.findIndex((n) => n.id === id);
    if (idx === -1) return undefined;
    db[idx] = { ...db[idx], shared };
    await writeDb(db);
    return db[idx];
  });
}

/**
 * Duplicate a **shared** note into the same subject as a **private** note.
 * Used from the Sharing area so signed-in users can keep a personal copy.
 */
export async function copySharedNoteToPrivate(
  sourceId: string,
  program: string,
  section: string,
  subject: string,
): Promise<NoteRecord | null> {
  return enqueue(async () => {
    const db = await readDb();
    const src = db.find((n) => n.id === sourceId);
    if (!src || !src.shared) return null;
    if (src.program !== program || src.section !== section || src.subject !== subject) {
      return null;
    }

    const id = newId();
    const createdAt = new Date().toISOString();
    let record: NoteRecord;

    if (src.kind === "text") {
      record = {
        id,
        program,
        section,
        subject,
        kind: "text",
        title: src.title,
        content: src.content ?? "",
        shared: false,
        createdAt,
      };
    } else if (src.storedName) {
      const buf = await readStoredFile(src.storedName);
      await ensureDirs();
      const safe = safeFilename(src.originalName ?? "file");
      const storedName = `${id}-${safe}`;
      await fs.writeFile(path.join(FILES_DIR, storedName), buf);
      record = {
        id,
        program,
        section,
        subject,
        kind: src.kind,
        title: src.title,
        storedName,
        originalName: src.originalName,
        mimeType: src.mimeType,
        size: buf.byteLength,
        shared: false,
        createdAt,
      };
    } else {
      return null;
    }

    db.push(record);
    await writeDb(db);
    return record;
  });
}

export async function deleteNote(id: string): Promise<boolean> {
  return enqueue(async () => {
    const db = await readDb();
    const idx = db.findIndex((n) => n.id === id);
    if (idx === -1) return false;
    const [removed] = db.splice(idx, 1);
    if (removed.storedName) {
      try {
        await fs.unlink(path.join(FILES_DIR, removed.storedName));
      } catch {
        // ignore — file may already be gone
      }
    }
    await writeDb(db);
    return true;
  });
}

export async function readStoredFile(storedName: string): Promise<Buffer> {
  // Prevent path traversal — only accept basenames.
  if (storedName !== path.basename(storedName)) {
    throw new Error("invalid filename");
  }
  return fs.readFile(path.join(FILES_DIR, storedName));
}

function enqueue<T>(fn: () => Promise<T>): Promise<T> {
  const next = writeChain.then(fn, fn);
  // Swallow rejections in the chain itself so one failure doesn't poison
  // subsequent operations; callers still get the original rejection.
  writeChain = next.catch(() => undefined);
  return next;
}
