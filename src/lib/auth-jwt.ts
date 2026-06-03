import { SignJWT, jwtVerify } from "jose";

/** HttpOnly cookie name for the signed session JWT. */
export const SESSION_COOKIE_NAME = "studyweb_session";

/** Session lifetime (seconds). */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionPayload = {
  sub: string;
  username: string;
};

export function getAuthSecret(): Uint8Array {
  const raw = process.env.STUDYWEB_AUTH_SECRET;
  if (raw && raw.length >= 32) {
    return new TextEncoder().encode(raw);
  }
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "STUDYWEB_AUTH_SECRET must be set to a string of at least 32 characters in production.",
    );
  }
  // Dev-only fallback so `npm run dev` works out of the box.
  return new TextEncoder().encode(
    "development-only-secret-min-32-chars!!",
  );
}

export function sessionCookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax";
  path: string;
  maxAge: number;
} {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}

export async function signSessionToken(payload: SessionPayload): Promise<string> {
  const secret = getAuthSecret();
  return new SignJWT({ username: payload.username })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function verifySessionToken(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const secret = getAuthSecret();
    const { payload } = await jwtVerify(token, secret);
    const sub = payload.sub;
    const username = payload.username;
    if (typeof sub !== "string" || typeof username !== "string") return null;
    return { sub, username };
  } catch {
    return null;
  }
}
