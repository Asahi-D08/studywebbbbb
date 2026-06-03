import { NextRequest, NextResponse } from "next/server";
import { getNote, readStoredFile } from "@/lib/storage";
import { getSessionFromRequest } from "@/lib/auth-request";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const note = await getNote(id);
  if (!note || !note.storedName) {
    return NextResponse.json({ error: "file not found" }, { status: 404 });
  }

  const session = await getSessionFromRequest(req);
  if (!note.shared && !session) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const buffer = await readStoredFile(note.storedName);
  const url = req.nextUrl;
  const wantsDownload = url.searchParams.get("download") === "1";
  const filename = note.originalName ?? note.storedName;
  const disposition = wantsDownload ? "attachment" : "inline";

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": note.mimeType ?? "application/octet-stream",
      "Content-Length": String(buffer.byteLength),
      "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
