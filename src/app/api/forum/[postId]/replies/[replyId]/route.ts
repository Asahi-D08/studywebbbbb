import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { isAdmin } from "@/lib/users";
import {
  deleteReply,
  getPost,
  getReply,
  updateReply,
} from "@/lib/forum";
import { parseAttachments } from "@/lib/forum-attachments";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound(what: string) {
  return NextResponse.json({ error: `${what} not found` }, { status: 404 });
}

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ postId: string; replyId: string }> },
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId, replyId } = await ctx.params;
  const reply = await getReply(replyId);
  if (!reply || reply.postId !== postId) return notFound("reply");
  const post = await getPost(postId);
  if (!post) return notFound("post");
  if (reply.author.id !== session.sub && !(await isAdmin(session.sub))) {
    return forbidden();
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return badRequest("expected multipart/form-data");
  }

  const form = await req.formData();
  const bodyRaw = form.get("body");
  const body = typeof bodyRaw === "string" ? bodyRaw.trim() : undefined;
  if (body !== undefined && !body) return badRequest("body cannot be empty");

  const parsed = await parseAttachments(form, post.program, reply.attachments);
  if (!parsed.ok) return badRequest(parsed.error);

  const updated = await updateReply(replyId, {
    body,
    attachments: parsed.attachments,
  });
  return NextResponse.json({ reply: updated });
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ postId: string; replyId: string }> },
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId, replyId } = await ctx.params;
  const reply = await getReply(replyId);
  if (!reply || reply.postId !== postId) return notFound("reply");
  if (reply.author.id !== session.sub && !(await isAdmin(session.sub))) {
    return forbidden();
  }

  await deleteReply(replyId);
  return NextResponse.json({ ok: true });
}
