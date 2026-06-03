import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from "@/lib/auth-jwt";

/**
 * Guests can browse the site and read **shared** notes (see API handlers).
 * Uploading, importing, and mutating notes always requires a session.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (pathname === "/login") {
    return NextResponse.next();
  }

  if (pathname === "/api/auth/login" && method === "POST") {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    const publicRead =
      (method === "GET" || method === "HEAD") &&
      (pathname.startsWith("/api/notes") ||
        pathname.startsWith("/api/files/") ||
        pathname.startsWith("/api/forum"));

    if (publicRead) {
      return NextResponse.next();
    }

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized", hint: "Sign in to use this API." },
        { status: 401 },
      );
    }

    return NextResponse.next();
  }

  // Pages are public; uploads are blocked at the API layer if not signed in.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
