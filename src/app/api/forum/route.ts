import { NextRequest, NextResponse } from "next/server";
import { getSection } from "@/lib/curriculum";
import { getSessionFromRequest } from "@/lib/auth-request";
import {
  createPost,
  listPosts,
  countRepliesByPost,
} from "@/lib/forum";
import { parseAttachments } from "@/lib/forum-attachments";

export const runtime = "nodejs";

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

function notFound(message: string) {
  return NextResponse.json({ error: message }, { status: 404 });
}

function ensureValidLocation(program: string, section: string) {
  return Boolean(getSection(program, section));
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const program = searchParams.get("program");
  const section = searchParams.get("section");
  if (!program || !section) {
    return badRequest("program and section query params are required");
  }
  if (!ensureValidLocation(program, section)) {
    return notFound("section not found");
  }
  const posts = await listPosts(program, section);
  const counts = await countRepliesByPost();
  const summarised = posts.map((p) => ({
    id: p.id,
    program: p.program,
    section: p.section,
    title: p.title,
    body: p.body,
    author: p.author,
    attachmentCount: p.attachments.length,
    replyCount: counts.get(p.id) ?? 0,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
  return NextResponse.json({ posts: summarised });
}

export async function POST(req: NextRequest) {
  const session = await getSessionFromRequest(req);
  if (!session) {
    return NextResponse.json({ error: "Sign in to post." }, { status: 401 });
  }
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("multipart/form-data")) {
    return badRequest("expected multipart/form-data");
  }

  const form = await req.formData();
  const program = String(form.get("program") ?? "");
  const section = String(form.get("section") ?? "");
  const title = String(form.get("title") ?? "").trim();
  const body = String(form.get("body") ?? "").trim();

  if (!ensureValidLocation(program, section)) {
    return notFound("section not found");
  }
  if (!title) return badRequest("title is required");
  if (!body) return badRequest("body is required");

  const parsed = await parseAttachments(form, program);
  if (!parsed.ok) return badRequest(parsed.error);

  const post = await createPost({
    program,
    section,
    title,
    body,
    author: { id: session.sub, username: session.username },
    attachments: parsed.attachments,
  });

  return NextResponse.json({ post }, { status: 201 });
}
