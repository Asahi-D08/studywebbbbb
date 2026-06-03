import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { createReply, getPost } from "@/lib/forum";
import { parseAttachments } from "@/lib/forum-attachments";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ postId: string }> },
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Sign in to reply." }, { status: 401 });

  const { postId } = await ctx.params;
  const post = await getPost(postId);
  if (!post) return NextResponse.json({ error: "post not found" }, { status: 404 });

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return badRequest("expected multipart/form-data");
  }

  const form = await req.formData();
  const body = String(form.get("body") ?? "").trim();
  if (!body) return badRequest("body is required");

  const parsed = await parseAttachments(form, post.program);
  if (!parsed.ok) return badRequest(parsed.error);

  const reply = await createReply({
    postId,
    body,
    author: { id: session.sub, username: session.username },
    attachments: parsed.attachments,
  });
  if (!reply) return NextResponse.json({ error: "post not found" }, { status: 404 });
  return NextResponse.json({ reply }, { status: 201 });
}
