import { NextRequest, NextResponse } from "next/server";
import { getSubject } from "@/lib/curriculum";
import { copySharedNoteToPrivate } from "@/lib/storage";
import { getSessionFromRequest } from "@/lib/auth-request";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Sign in to copy notes to your library." }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as
    | {
        sourceId?: string;
        program?: string;
        section?: string;
        subject?: string;
      }
    | null;

  if (!body) return badRequest("invalid JSON");
  const { sourceId, program, section, subject } = body;
  if (!sourceId || !program || !section || !subject) {
    return badRequest("sourceId, program, section and subject are required");
  }
  if (!getSubject(program, section, subject)) {
    return notFound("subject not found");
  }

  const note = await copySharedNoteToPrivate(sourceId, program, section, subject);
  if (!note) {
    return NextResponse.json(
      { error: "Cannot copy this note (not shared or wrong subject)." },
      { status: 400 },
    );
  }
  return NextResponse.json({ note }, { status: 201 });
}
