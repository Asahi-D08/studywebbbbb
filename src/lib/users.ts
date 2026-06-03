import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";

export type UserRecord = {
  id: string;
  username: string;
  passwordHash: string;
  createdAt: string;
};

type UserDb = { users: UserRecord[] };

const USERS_PATH = path.join(process.cwd(), "data", "users.json");

async function readDb(): Promise<UserDb> {
  await fs.mkdir(path.dirname(USERS_PATH), { recursive: true });
  try {
    const raw = await fs.readFile(USERS_PATH, "utf8");
    const parsed: unknown = JSON.parse(raw);
    const users =
      typeof parsed === "object" &&
      parsed !== null &&
      "users" in parsed &&
      Array.isArray((parsed as UserDb).users)
        ? ((parsed as UserDb).users as UserRecord[])
        : [];
    let db: UserDb = { users };

    if (db.users.length === 0) {
      db = await bootstrapFromEnv(db);
      if (db.users.length > 0) await writeDb(db);
    }
    return db;
  } catch (err: unknown) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      let db: UserDb = { users: [] };
      db = await bootstrapFromEnv(db);
      if (db.users.length > 0) await writeDb(db);
      return db;
    }
    throw err;
  }
}

async function writeDb(db: UserDb): Promise<void> {
  const tmp = `${USERS_PATH}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await fs.rename(tmp, USERS_PATH);
}

/**
 * If `data/users.json` is empty, create the first account from env (optional).
 * Set STUDYWEB_BOOTSTRAP_USERNAME and STUDYWEB_BOOTSTRAP_PASSWORD in `.env.local`.
 */
async function bootstrapFromEnv(current: UserDb): Promise<UserDb> {
  if (current.users.length > 0) return current;
  const username = process.env.STUDYWEB_BOOTSTRAP_USERNAME?.trim();
  const password = process.env.STUDYWEB_BOOTSTRAP_PASSWORD ?? "";
  if (!username || !password) return current;
  const passwordHash = await bcrypt.hash(password, 10);
  const user: UserRecord = {
    id: randomUUID(),
    username,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  return { users: [user] };
}

export async function getUserCount(): Promise<number> {
  const db = await readDb();
  return db.users.length;
}

/**
 * Admin = the **first** account in `data/users.json`. Whoever bootstraps the
 * instance is the admin. Returns `null` if no users exist yet.
 */
export async function getAdminId(): Promise<string | null> {
  const db = await readDb();
  return db.users[0]?.id ?? null;
}

export async function isAdmin(userId: string | null | undefined): Promise<boolean> {
  if (!userId) return false;
  const adminId = await getAdminId();
  return adminId === userId;
}

export async function findUserByUsername(
  username: string,
): Promise<UserRecord | undefined> {
  const u = username.trim().toLowerCase();
  const db = await readDb();
  return db.users.find((x) => x.username.toLowerCase() === u);
}

export async function verifyCredentials(
  username: string,
  password: string,
): Promise<UserRecord | null> {
  const user = await findUserByUsername(username);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}
