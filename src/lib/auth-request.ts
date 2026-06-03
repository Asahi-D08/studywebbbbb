import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySessionToken,
  type SessionPayload,
} from "@/lib/auth-jwt";

export function getSessionFromRequest(req: NextRequest): Promise<SessionPayload | null> {
  return verifySessionToken(req.cookies.get(SESSION_COOKIE_NAME)?.value);
}
