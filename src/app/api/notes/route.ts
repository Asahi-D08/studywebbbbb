import { NextRequest, NextResponse } from "next/server";
import { createNote, listNotes, type NoteKind } from "@/lib/storage";
import { getSubject } from "@/lib/curriculum";
import { getSessionFromRequest } from "@/lib/auth-request";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 25 * 1024 * 1024; // 25 MB cap to keep things sane.

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 });
}

function ensureValidLocation(program: string, section: string, subject: string) {
  return Boolean(getSubject(program, section, subject));
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const program = searchParams.get("program");
  const section = searchParams.get("section");
  const subject = searchParams.get("subject");

  if (!program || !section || !subject) {
    return badRequest("program, section and subject query params are required");
  }
  if (!ensureValidLocation(program, section, subject)) {
    return notFound("subject not found");
  }

  const session = await getSessionFromRequest(req);
  let notes = await listNotes(program, section, subject);
  if (!session) {
    notes = notes.filter((n) => n.shared);
  }
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Sign in to upload notes." }, { status: 401 });
  }

  const contentType = req.headers.get("content-type") ?? "";

  // Two flavours: JSON (for text notes) or multipart (for file uploads).
  if (contentType.includes("application/json")) {
    const body = (await req.json().catch(() => null)) as
      | {
          program?: string;
          section?: string;
          subject?: string;
          title?: string;
          content?: string;
          shared?: boolean;
        }
      | null;
    if (!body) return badRequest("invalid JSON");
    const { program, section, subject, title, content, shared } = body;
    if (!program || !section || !subject) return badRequest("missing location");
    if (!ensureValidLocation(program, section, subject)) {
      return notFound("subject not found");
    }
    if (!title?.trim()) return badRequest("title is required");
    if (!content?.trim()) return badRequest("content is required");

    const note = await createNote({
      kind: "text",
      program,
      section,
      subject,
      title: title.trim(),
      content,
      shared: shared ?? true,
    });
    return NextResponse.json({ note }, { status: 201 });
  }

  if (contentType.includes("multipart/form-data")) {
    const form = await req.formData();
    const program = String(form.get("program") ?? "");
    const section = String(form.get("section") ?? "");
    const subject = String(form.get("subject") ?? "");
    const title = String(form.get("title") ?? "").trim();
    const sharedRaw = form.get("shared");
    const shared = sharedRaw == null ? true : sharedRaw === "true" || sharedRaw === "1";
    const file = form.get("file");

    if (!program || !section || !subject) return badRequest("missing location");
    if (!ensureValidLocation(program, section, subject)) {
      return notFound("subject not found");
    }
    if (!(file instanceof File)) return badRequest("file is required");
    if (file.size === 0) return badRequest("file is empty");
    if (file.size > MAX_FILE_BYTES) {
      return badRequest(
        `file too large (max ${(MAX_FILE_BYTES / 1024 / 1024).toFixed(0)} MB)`,
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mimeType = file.type || "application/octet-stream";
    const kind: NoteKind = mimeType.startsWith("image/") ? "image" : "file";

    const note = await createNote({
      kind,
      program,
      section,
      subject,
      title: title || file.name,
      buffer,
      originalName: file.name,
      mimeType,
      shared,
    });
    return NextResponse.json({ note }, { status: 201 });
  }

  return badRequest("unsupported content-type");
}
