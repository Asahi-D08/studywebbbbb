import Link from "next/link";
import { UploadForm } from "@/components/UploadForm";

type Props = {
  isAuthenticated: boolean;
  program: string;
  section: string;
  subject: string;
  loginNextPath: string;
};

export function UploadSidebar({
  isAuthenticated,
  program,
  section,
  subject,
  loginNextPath,
}: Props) {
  if (isAuthenticated) {
    return (
      <UploadForm program={program} section={section} subject={subject} />
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white/70 p-6 shadow-lg shadow-slate-200/50 dark:border-white/10 dark:bg-slate-900/50 dark:shadow-black/20">
      <h2 className="text-lg font-semibold text-slate-900 dark:text-white">New note</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        Uploading requires an account. Anyone can still open this subject and
        browse the sharing area, save shared notes locally, or copy them into a
        private note after signing in.
      </p>
      <Link
        href={`/login?next=${encodeURIComponent(loginNextPath)}`}
        className="mt-5 inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:from-indigo-400 hover:to-violet-400"
      >
        Sign in to upload
      </Link>
    </div>
  );
}
