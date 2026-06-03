import { NextRequest, NextResponse } from "next/server";
import { findUploadAttachment, readForumUpload } from "@/lib/forum";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const att = await findUploadAttachment(id);
  if (!att) {
    return NextResponse.json({ error: "upload not found" }, { status: 404 });
  }

  let buffer: Buffer;
  try {
    buffer = await readForumUpload(id);
  } catch {
    return NextResponse.json({ error: "upload not found" }, { status: 404 });
  }

  const wantsDownload = req.nextUrl.searchParams.get("download") === "1";
  const filename = att.originalName;
  const disposition = wantsDownload ? "attachment" : "inline";

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": att.mimeType || "application/octet-stream",
      "Content-Length": String(buffer.byteLength),
      "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
