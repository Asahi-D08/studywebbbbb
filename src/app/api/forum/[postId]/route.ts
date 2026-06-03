import { NextRequest, NextResponse } from "next/server";
import { getSessionFromRequest } from "@/lib/auth-request";
import { isAdmin } from "@/lib/users";
import {
  getPost,
  listReplies,
  updatePost,
  deletePost,
} from "@/lib/forum";
import { parseAttachments } from "@/lib/forum-attachments";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound() {
  return NextResponse.json({ error: "post not found" }, { status: 404 });
}

function forbidden() {
  return NextResponse.json({ error: "Forbidden" }, { status: 403 });
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ postId: string }> },
) {
  const { postId } = await ctx.params;
  const post = await getPost(postId);
  if (!post) return notFound();
  const replies = await listReplies(postId);
  return NextResponse.json({ post, replies });
}

export async function PATCH(
  req: NextRequest,
  ctx: { params: Promise<{ postId: string }> },
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId } = await ctx.params;
  const post = await getPost(postId);
  if (!post) return notFound();
  if (post.author.id !== session.sub && !(await isAdmin(session.sub))) {
    return forbidden();
  }

  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return badRequest("expected multipart/form-data");
  }

  const form = await req.formData();
  const titleRaw = form.get("title");
  const bodyRaw = form.get("body");
  const title = typeof titleRaw === "string" ? titleRaw.trim() : undefined;
  const body = typeof bodyRaw === "string" ? bodyRaw.trim() : undefined;
  if (title !== undefined && !title) return badRequest("title cannot be empty");
  if (body !== undefined && !body) return badRequest("body cannot be empty");

  const parsed = await parseAttachments(form, post.program, post.attachments);
  if (!parsed.ok) return badRequest(parsed.error);

  const updated = await updatePost(postId, {
    title,
    body,
    attachments: parsed.attachments,
  });
  return NextResponse.json({ post: updated });
}

export async function DELETE(
  req: NextRequest,
  ctx: { params: Promise<{ postId: string }> },
) {
  const session = await getSessionFromRequest(req);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { postId } = await ctx.params;
  const post = await getPost(postId);
  if (!post) return notFound();
  if (post.author.id !== session.sub && !(await isAdmin(session.sub))) {
    return forbidden();
  }

  await deletePost(postId);
  return NextResponse.json({ ok: true });
}
