import { NextResponse } from "next/server";
import { getUserCount, verifyCredentials } from "@/lib/users";
import {
  SESSION_COOKIE_NAME,
  sessionCookieOptions,
  signSessionToken,
} from "@/lib/auth-jwt";

export const runtime = "nodejs";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const o = body as { username?: unknown; password?: unknown };
  const username = typeof o.username === "string" ? o.username : "";
  const password = typeof o.password === "string" ? o.password : "";
  if (!username.trim() || !password) {
    return NextResponse.json(
      { error: "Username and password are required." },
      { status: 400 },
    );
  }

  if ((await getUserCount()) === 0) {
    return NextResponse.json(
      {
        error:
          "No accounts yet. Set STUDYWEB_BOOTSTRAP_USERNAME and STUDYWEB_BOOTSTRAP_PASSWORD in .env.local, restart the server, then sign in.",
      },
      { status: 503 },
    );
  }

  const user = await verifyCredentials(username, password);
  if (!user) {
    return NextResponse.json(
      { error: "Invalid username or password." },
      { status: 401 },
    );
  }

  let token: string;
  try {
    token = await signSessionToken({ sub: user.id, username: user.username });
  } catch {
    return NextResponse.json(
      {
        error:
          "Server misconfiguration: set STUDYWEB_AUTH_SECRET (at least 32 characters) in production.",
      },
      { status: 500 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE_NAME, token, sessionCookieOptions());
  return res;
}
