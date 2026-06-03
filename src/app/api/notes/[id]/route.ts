import { NextResponse } from "next/server";
import { deleteNote, setNoteSharing } from "@/lib/storage";

export const runtime = "nodejs";

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as { shared?: boolean } | null;
  if (!body || typeof body.shared !== "boolean") {
    return NextResponse.json(
      { error: "body must be { shared: boolean }" },
      { status: 400 },
    );
  }
  const updated = await setNoteSharing(id, body.shared);
  if (!updated) {
    return NextResponse.json({ error: "note not found" }, { status: 404 });
  }
  return NextResponse.json({ note: updated });
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const ok = await deleteNote(id);
  if (!ok) {
    return NextResponse.json({ error: "note not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
