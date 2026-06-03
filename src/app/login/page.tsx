import { redirect } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { getSession } from "@/lib/auth-server";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign in — StudyWeb",
  description: "Sign in to StudyWeb",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const session = await getSession();
  const sp = await searchParams;
  if (session) {
    const next = sp.next;
    redirect(next && next.startsWith("/") ? next : "/");
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-center px-6 py-16">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>
      <div className="mb-8 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 via-violet-400 to-fuchsia-400 text-sm font-bold text-slate-950 shadow-lg shadow-indigo-500/30">
            SW
          </span>
          <span className="text-lg font-semibold text-slate-900 dark:text-white">
            StudyWeb
          </span>
        </Link>
        <p className="mt-3 max-w-sm text-sm text-slate-600 dark:text-slate-400">
          Sign in to access notes and uploads.
        </p>
      </div>
      <div className="w-full max-w-sm">
        <Suspense
          fallback={
            <div className="h-48 animate-pulse rounded-2xl bg-slate-200/80 dark:bg-slate-900/50" />
          }
        >
          <LoginForm />
        </Suspense>
        <p className="mt-6 text-center text-xs text-slate-500">
          First run? Create{" "}
          <code className="text-slate-600 dark:text-slate-400">.env.local</code>{" "}
          with{" "}
          <code className="text-slate-600 dark:text-slate-400">
            STUDYWEB_BOOTSTRAP_*
          </code>{" "}
          and restart.
        </p>
      </div>
    </main>
  );
}
