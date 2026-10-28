import { cookies } from "next/headers";
import { LANG_COOKIE, parseLang, type Lang } from "@/lib/i18n";

export async function getLang(): Promise<Lang> {
  const store = await cookies();
  return parseLang(store.get(LANG_COOKIE)?.value);
}
